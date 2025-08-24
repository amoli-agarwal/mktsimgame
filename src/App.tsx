// src/App.tsx
import { useState } from 'react';
import './styles.css';

import type { Role, Round, Option, Tier } from './types';
import { ROUNDS as RAW_ROUNDS } from './data';
const ROUNDS: Round[] = (Array.isArray(RAW_ROUNDS) ? RAW_ROUNDS : []) as unknown as Round[];

const ROLES: { id: Role; name: string }[] = [
  { id: 'wholesale_bank', name: 'Traditional Wholesale Bank' },
  { id: 'fintech',        name: 'Fintech' },
  { id: 'big_tech',       name: 'Big Tech' },
  { id: 'crypto',         name: 'Crypto' },
];

const MAX_SCORE = 18;
const TRANSITION_MS = 500; // fade duration & delay

type Screen = 'landing' | 'intro' | 'rules' | 'role' | 'round' | 'result' | 'over';

function pointsFor(tier: Tier, roleRankIndex: number): number {
  if (tier === 'best') return [6, 5, 4, 3][Math.max(0, Math.min(3, roleRankIndex))];
  return tier === 'b' ? 2 : 1;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing');

  const [role, setRole] = useState<Role | undefined>(undefined);
  const [idx, setIdx] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);

  // per-round result
  const [lastPts, setLastPts] = useState<number | null>(null);

  // transitions
  const [busy, setBusy] = useState<boolean>(false);
  const [animKey, setAnimKey] = useState<number>(0); // change key to re-trigger fade-in

  function fadeTo(next: Screen, delay = TRANSITION_MS) {
    setBusy(true);
    setTimeout(() => {
      setScreen(next);
      setAnimKey(k => k + 1);   // new key => fade-in anim runs
      setBusy(false);
    }, delay);
  }

  function soft(action: () => void, delay = TRANSITION_MS) {
    setBusy(true);
    setTimeout(() => {
      action();
      setAnimKey(k => k + 1);
      setBusy(false);
    }, delay);
  }

  if (!Array.isArray(ROUNDS) || ROUNDS.length !== 4) {
    return (
      <div className="viewport">
        <div className="wrap fade" key={`err:${animKey}`}>
          <h2>Content not loaded</h2>
          <p>Expected 4 rounds in <code>src/data.ts</code>.</p>
        </div>
      </div>
    );
  }

  // 0) Landing
  if (screen === 'landing') {
    return (
      <div className="viewport">
        <div className="wrap fade" key={`landing:${animKey}`}>
          <h1>Market Simulation — Fintech Disruption</h1>
          <p className="lead">A solo scenario about shocks and strategy.</p>
          <button className="card" onClick={() => fadeTo('intro')} disabled={busy}>Play</button>
        </div>
      </div>
    );
  }

  // 1) Intro
  if (screen === 'intro') {
    return (
      <div className="viewport">
        <div className="wrap fade" key={`intro:${animKey}`}>
          <h2>Welcome</h2>
          <p className="lead">
            You’ll play one financial role through four market shocks. For each shock,
            choose the response that would attract customers and keep the system functioning.
          </p>
          <button className="card" onClick={() => fadeTo('rules')} disabled={busy}>Continue</button>
        </div>
      </div>
    );
  }

  // 2) Rules / Scoring (only here we describe scoring)
  if (screen === 'rules') {
    return (
      <div className="viewport">
        <div className="wrap fade" key={`rules:${animKey}`}>
          <h2>How it works</h2>
          <ul className="summary" style={{ textAlign:'left', margin:'0 auto 32px auto', maxWidth:720 }}>
            <li>There are <strong>4 rounds</strong>. Each starts with a market shock.</li>
            <li>You pick <strong>one option</strong> per round for your chosen role.</li>
            <li>Depending on your role, your best option may award you more or less points than another player.</li>
          </ul>
          <button className="card" onClick={() => fadeTo('role')} disabled={busy}>Choose Role</button>
        </div>
      </div>
    );
  }

  // 3) Role select
  if (screen === 'role') {
    return (
      <div className="viewport">
        <div className="wrap fade" key={`role:${animKey}`}>
          <h2>Pick a role</h2>
          <div className="grid roles">
            {ROLES.map(r => (
              <button
                key={r.id}
                className="card"
                disabled={busy}
                onClick={() => soft(() => {
                  setRole(r.id);
                  setIdx(0);
                  setPoints(0);
                  setLastPts(null);
                  setScreen('round');
                })}
              >
                <h3>{r.name}</h3>
                <p>Play as {r.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 4) Round (options screen — 1×3 grid, no scoring/tier labels)
  if (screen === 'round' && role !== undefined) {
    if (idx >= ROUNDS.length) { fadeTo('over', 0); return null; }
    const current: Round = ROUNDS[idx];
    const myOptions: Option[] = (current.options || []).filter(o => o.role === role);
    const roleName = ROLES.find(r => r.id === role)?.name ?? role;

    function choose(option: Option) {
      if (!role) return;
      const rank = Math.max(0, current.rank_order.indexOf(role));
      const pts = pointsFor(option.tier as Tier, rank);
      // show per-round points BEFORE advancing
      soft(() => {
        setLastPts(pts);
        setScreen('result');
      }, TRANSITION_MS);
    }

    return (
      <div className="viewport">
        <div className="wrap fade" key={`round:${idx}:${animKey}`}>
          <header className="topbar">
            <div>Role: <strong>{roleName}</strong></div>
            <div>Round: <strong>{current.ordinal}/{ROUNDS.length}</strong></div>
            {/* no total points on options screen */}
          </header>

          <h2>{current.title}</h2>
          <p className="shock">{current.shock_summary}</p>

          <div className="grid options slide-stagger">
            {myOptions.map((o, i) => (
              <button
                key={o.id}
                className="card slide-item"
                style={{ animationDelay: `${150 * i}ms` }} // gentle stagger
                onClick={() => choose(o)}
                disabled={busy}
              >
                <h3>{o.label}</h3>
                {/* no tier/scoring display here */}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 4b) Round Result (shows the points you just earned)
  if (screen === 'result') {
    const current: Round = ROUNDS[Math.min(idx, ROUNDS.length - 1)];
    return (
      <div className="viewport">
        <div className="wrap fade" key={`result:${idx}:${animKey}`}>
          <h2>{current.title}</h2>
          <div className="result big">
            You scored <strong>+{lastPts ?? 0}</strong> this round.
          </div>
          <button
            className="card"
            disabled={busy}
            onClick={() =>
              soft(() => {
                // commit the points, move forward
                setPoints(p => p + (lastPts ?? 0));
                const next = idx + 1;
                setLastPts(null);
                if (next >= ROUNDS.length) {
                  setIdx(next);
                  setScreen('over');
                } else {
                  setIdx(next);
                  setScreen('round');
                }
              })
            }
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // 5) Game Over (now we show total points)
  if (screen === 'over') {
    return (
      <div className="viewport">
        <div className="wrap fade" key={`over:${animKey}`}>
          <h2>Game Over</h2>
          <p>Total Points: <strong>{points}</strong> / {MAX_SCORE}</p>
          <button
            className="card"
            onClick={() => soft(() => {
              setRole(undefined);
              setIdx(0);
              setPoints(0);
              setLastPts(null);
              setScreen('landing');
            })}
            disabled={busy}
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="viewport">
      <div className="wrap fade" key={`fallback:${animKey}`}>
        <h2>Loading…</h2>
      </div>
    </div>
  );
}
