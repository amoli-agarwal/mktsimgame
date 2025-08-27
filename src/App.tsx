// src/App.tsx
import { useState, useEffect, useRef } from 'react';
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

const ROLE_DESCRIPTIONS: Record<Role, { title: string; text: string }> = {
  wholesale_bank: {
    title: 'Traditional Wholesale Bank',
    text: 'You command the vaults of global finance. Massive balance sheets, deep interbank ties, and the power to calm (or rattle) entire markets. Think JP Morgan, Goldman Sachs, Citi.'
  },
  fintech: {
    title: 'Fintech',
    text: 'You reinvent finance with code. From real-time payments to app-based lending, your platforms turn data into credit and scale globally. Think Stripe, Square, Klarna.'
  },
  big_tech: {
    title: 'Big Tech',
    text: 'You wield platforms that billions use daily. With cloud infrastructure, search, and e-commerce ecosystems, you can extend effortlessly into payments, lending, and beyond. Think Google, Amazon, Microsoft, Apple.'
  },
  crypto: {
    title: 'Crypto',
    text: 'You operate outside traditional systems. Blockchains, stablecoins, and decentralized finance let you move value across borders with transparency and speed. Think Bitcoin, Ethereum, Circle.'
  }
};

const SHOCK_DETAILS: Record<Round['id'], { title: string; long: string }> = {
  liquidity_crunch: {
    title: 'Liquidity Crunch',
    long:
      'Funding markets freeze; corporates need short-term cash. Liquidity is scarce and confidence is fragile.'
  },
  household_sme_recession: {
    title: 'A Recession Hits Households and SMEs',
    long:
      'Traditional banks pull back from unsecured lending due to rising default rates. Households and small firms are squeezed.'
  },
  trade_fragmentation: {
    title: 'Cross-Border Trade Fragmentation',
    long:
      'Geopolitical tensions and sanctions make global trade settlements through SWIFT/correspondent banks costly and slow. SMEs can’t access affordable cross-border finance.'
  },
  fiat_currency_crisis: {
    title: 'Fiat Currency Crisis',
    long:
      'All transactions on public blockchains are auditable to avoid the risk of fraud and reduce information asymmetry.'
  },
};


const FACTS: Record<
  Round['id'],
  Record<Role, { title: string; text: string }>
> = {
  liquidity_crunch: {
    wholesale_bank: {
      title: 'Liquidity Crunch - Wholesale Bank',
      text:
        'Wholesale banks have reduced their reliance on volatile wholesale funding (interbank loans, repos, commercial paper) over time and have built more stable retail deposit bases. For example, after the 2008 financial crisis, many large European banks pivoted away from wholesale funding toward deposits, reflecting Basel III’s Net Stable Funding Ratio (NSFR) requirements. This improved resilience but compressed margins since retail deposits are more expensive to gather.'
    },
    fintech: {
      title: 'Liquidity Crunch — Fintech',
      text:
        'In tight venture capital markets, fintechs raise warehouse lines, securitize receivables, or issue bonds instead of relying only on equity funding. For example, BNPL firms (Affirm, Klarna) used securitizations of consumer loans to raise liquidity during the 2022 funding squeeze. LendingClub and Prosper, during the 2016–2017 liquidity freeze in marketplace lending, relied heavily on institutional investors for debt funding.'
    },
    big_tech: {
      title: 'Liquidity Crunch — Big Tech',
      text:
        'Big tech has built up giant resources of liquid assets to help self-insure against market freezes. After the 2008 financial crisis, Apple, Microsoft, and Google aggressively accumulated cash reserves. By the mid-2010s, Apple alone had over $200B in cash and marketable securities. This allowed them to keep investing in R&D and acquisitions even when external financing was tight.'

    },
    crypto: {
      title: 'Liquidity Crunch — Crypto',
      text:
        'Crypto has strengthened collateral requirements, reduced leverage, and published reserve audits. For example, after 2018 “Crypto Winter”, exchanges like Binance and Coinbase introduced stricter margin rules and proof-of-reserves initiatives. After the 2022 Terra/Luna & FTX collapses, Circle (USDC issuer) and Coinbase emphasized transparency, regulatory compliance, and independent audits to distinguish themselves from failed players.'
    },
  },

  household_sme_recession: {
    wholesale_bank: {
      title: 'Recession — Wholesale Banks',
      text:
        'Banks often face credit losses, compressed margins, and bailouts during recessions. For example, during the 2008 recession, wholesale bank bailouts exceeded $600 billion dollars. Capital buffers and stress testing requirements introduced afterward (Basel III, CCAR in the U.S.) were designed to restore public trust and reduce systemic bailout risk.'

    },
    fintech: {
      title: 'Recession — Fintech',
      text:
        'Recessions test fintech funding models and consumer trust. Unlike wholesale banks, consumer adoption often continues rising during downturns. For example, during the COVID-19 downturn, fintech adoption increased: RFI Global found consumer comfort with fintech rose from 68% (2019) to 77% (2022).'

    },
    big_tech: {
      title: 'Recession — Big Tech',
      text:
        'Large technology firms use recessions to consolidate market share by deploying cash reserves into acquisitions. For example, between 2008 and 2010, Apple, Microsoft, and Google collectively acquired over 150 companies, strengthening their ecosystems at bargain prices while weaker firms retrenched.'
    },
    crypto: {
      title: 'Recession — Crypto',
      text:
        'Cryptocurrencies often benefit from reduced trust in traditional finance during recessions. For example, after the COVID-19 shock, Bitcoin surged over 900% (2020-2021), as some investors viewed it as a hedge against monetary expansion. This contrasted with lingering skepticism toward banks, which were seen as slow to restore lending to households and small businesses.'
    },
  },

  trade_fragmentation: {
    wholesale_bank: {
      title: 'Trade Fragmentation — Wholesale Banks',
      text:
        'Global banks are highly exposed to fragmentation in trade and payments. They have expanded compliance, FX settlement, and regional risk management systems as cross-border flows grow. For example, cross-border payments are projected by the Bank of England to reach $250 trillion by 2027 (up from $150 trillion in 2017), creating both opportunities and regulatory complexity.'
    },
    fintech: {
      title: 'Trade Fragmentation — Fintech',
      text:
        ' Fintechs play a more uneven role in fragmented trade. Their value proposition of low-cost, borderless payments thrives where regulations remain open, but slows where local rules are restrictive. For example, Wise and Revolut rapidly expanded in Europe and North America but faced higher barriers in markets like India and China, where compliance requirements are stringent. This creates an interesting contrast: fintech growth (~5% annually in cross-border payments) is strong globally, yet highly uneven depending on regulatory openness.'
    },
    big_tech: {
      title: 'Trade Fragmentation — Big Tech',
      text:
        'Big Tech firms are best positioned to navigate fragmentation because they combine platform dominance with regulatory leverage. For example, Apple Pay operates in ~100 countries, while Alipay and WeChat Pay dominate Asian cross-border e-commerce flows. Their ability to negotiate directly with regulators and governments lets them adapt pricing, compliance, and infrastructure at a scale smaller players can’t match.'
    },
    crypto: {
      title: 'Trade Fragmentation — Crypto',
      text:
        'Cryptocurrencies and stablecoins offer parallel payment rails when fragmentation blocks traditional systems. For instance, stablecoins like USDT and USDC are widely used for remittances and trade settlement in countries facing sanctions or FX shortages (e.g., Turkey, Lebanon, Venezuela). In 2024, stablecoin-based cross-border payments exceeded $30B, showing how crypto can bypass traditional rails, but mostly as a workaround rather than a primary system.'

    },
  },

  fiat_currency_crisis: {
    wholesale_bank: {
      title: 'Fiat Currency Crisis — Wholesale Banks',
      text:
        'Wholesale banks have built stronger foreign exchange (FX) risk management, shifted toward hedging instruments, and reduced mismatched currency exposures. For example, during the Latin American Debt Crisis in the 1980s, U.S. and European wholesale banks learned to limit long-term lending in local currencies, moving instead to dollar-denominated loans. During the Asian Financial Crisis between 1997 and 1998, banks introduced tighter FX hedging requirements for corporate borrowers after sharp currency devaluations (e.g., Thai baht, Indonesian rupiah).'
    },
    fintech: {
      title: 'Fiat Currency Crisis — Fintech',
      text:
        'Fintech offers consumers and businesses alternatives to unstable local currencies through digital wallets and cross-border payment rails. For example, During the Argentinian peso crises, MercadoPago and Ualá allowed people to store value digitally and access USD-linked stable assets, reducing reliance on cash. During the Nigerian naira crisis, fintechs like Flutterwave and Paystack focused on cross-border payments in USD to bypass FX shortages.'
    },
    big_tech: {
      title: 'Fiat Currency Crisis — Big Tech',
      text:
        'Big tech has expanded the use of financial hedging (FX swaps, options) to stabilize revenues across volatile currencies. For example, during the lira crisis in Turkey, Apple temporarily suspended iPhone sales, then relaunched with adjusted lira pricing. Netflix in Argentina & Turkey, rolled out cheaper, localized subscription tiers when devaluation reduced consumer spending power.'
    },
    crypto: {
      title: 'Fiat Currency Crisis — Crypto',
      text:
        'Crypto solutions include the promotion of stablecoins (USDT, USDC, DAI) rather than volatile tokens like BTC or ETH. For example, Turkey (lira crisis, 2018 - present), Binance and Tether saw surging demand for USDT - TRY pairs. During the Lebanon 2020 crisis, many locals relied on USDT/USDC for cross-border trade and remittances. And in Venezuela, Circle’s USDC partnered with Airtm and NGOs to distribute aid in dollars rather than bolívars.'
    },
  },
};


const MAX_SCORE = 18;
const TRANSITION_MS = 500; // fade duration & delay

type Screen = 'landing' | 'intro' | 'rules' | 'role' | 'role_info' | 'shock' | 'round' | 'result' | 'fact' | 'over';

function pointsFor(tier: Tier, roleRankIndex: number): number {
  if (tier === 'best') return [6, 5, 4, 3][Math.max(0, Math.min(3, roleRankIndex))];
  return tier === 'b' ? 2 : 1;
}

function qualitativeOutcome(score: number) {
  if (score === 18) {
    return {
      title: 'Flawless Strategist',
      text:
        'Congratulations! You consistently chose the optimal response for each shock. You maximized resilience, kept customers, and set your franchise up for outperformance.'
    };
  }
  if (score >= 15) {
    return {
      title: 'Strong Navigator',
      text:
        'Excellent decisions overall. A couple of near-misses, but you protected liquidity, maintained trust, and captured opportunities under stress.'
    };
  }
  if (score >= 10) {
    return {
      title: 'Mixed Execution',
      text:
        'You weathered parts of the storm, but left value on the table. With sharper alignment between your role’s advantages and chosen tactics, you’d do much better.'
    };
  }
  if (score >= 7) {
    return {
      title: 'Strained Outcome',
      text:
        'You survived, but key weaknesses remained. Customers churned or funding risk lingered. Revisit playbooks for liquidity, credit discipline, and rails.'
    };
  }
  return {
    title: 'Critical Failure',
    text:
      'Decisions undermined trust and stability. In future runs, focus on your role’s core strengths and pick “best” moves in the rounds where you rank highest.'
  };
}

function roundDescriptor(option: Option | null, rank: number) {
  if (!option) return { title: '', text: '' };

  if (option.tier === 'best') {
    if (rank === 0) {
      return {
        title: 'Decisive Advantage',
        text: 'Your move aligned perfectly with your role’s strengths. You gained credibility and positioned yourself ahead of rivals in this shock.'
      };
    } else {
      return {
        title: 'Effective Response',
        text: 'You chose the strongest response available to your role. It stabilized your footing, though the top-ranked players extracted more benefit.'
      };
    }
  }

  if (option.tier === 'b') {
    return {
      title: 'Adequate Response',
      text: 'This path kept you afloat but did not shift momentum. Competitors with sharper strategies pressed their advantage while you managed risk.'
    };
  }

  return {
    title: 'Limited Impact',
    text: 'The decision left you exposed. It failed to address the core pressure of the shock, and competitors tightened their grip on customers and funding.'
  };
}



function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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

  // holds the randomized options for the current round/role
  const [shuffledOptions, setShuffledOptions] = useState<Option[]>([]);

  const [typed, setTyped] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const typeTimerRef = useRef<number | null>(null);

  const [lastChoice, setLastChoice] = useState<Option | null>(null);




  useEffect(() => {
    if (role !== undefined && idx < ROUNDS.length) {
      const current: Round = ROUNDS[idx];
      const myOptions: Option[] = (current.options || []).filter(o => o.role === role);
      setShuffledOptions(shuffle(myOptions));
    } else {
      setShuffledOptions([]);
    }
  }, [role, idx]);


  // Typewriter for shock screen (slower, with jitter + punctuation pauses)
  useEffect(() => {
    if (screen !== 'shock') return;

    const current: Round = ROUNDS[Math.min(idx, ROUNDS.length - 1)];
    const full = SHOCK_DETAILS[current.id]?.long ?? '';

    setTyped('');
    setIsTyping(true);

    let i = 0;
    let cancelled = false;

    const BASE = 26;      // base delay per char (ms) – slower than before
    const JITTER = 18;    // random jitter (ms)

    const punctPause = (ch: string) => {
      if ('.!?'.includes(ch)) return 280;   // hard stop punctuation
      if (',;:'.includes(ch)) return 140;   // soft stop punctuation
      if (ch === '—') return 160;           // em dash pause
      return 0;
      };

    const schedule = (fn: () => void, delay: number) => {
      const id = window.setTimeout(fn, delay);
      typeTimerRef.current = id;
    };

    const tick = () => {
      if (cancelled) return;
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        setIsTyping(false);
        return;
      }
      const ch = full[i - 1];
      const delay = BASE + Math.floor(Math.random() * JITTER) + punctPause(ch);
      schedule(tick, delay);
    };

    // small initial delay for dramatic effect
    schedule(tick, 350);

    return () => {
      cancelled = true;
      if (typeTimerRef.current !== null) {
        clearTimeout(typeTimerRef.current);
        typeTimerRef.current = null;
      }
    };
  }, [screen, idx]);



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
          <h1>Market Simulation Game: Fintech Disruption</h1>
          <p className="lead">Discover the shock responses and strategy of different financial entities.</p>
          <button className="nav-button" onClick={() => fadeTo('intro')} disabled={busy}>Play</button>
        </div>
      </div>
    );
  }

  // 1) Intro (compact, no wide gaps)
if (screen === 'intro') {
  return (
    <div className="viewport">
      <div className="wrap fade" key={`intro:${animKey}`}>
        <div className="info-panel tight">
          <h2>Welcome</h2>
          <p className="lead">
            Play one role through four market shocks. For each shock, choose the move that best fits your role’s strengths.
          </p>
        </div>
        <div className="panel-actions">
          <button className="nav-button" onClick={() => fadeTo('rules')} disabled={busy}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}


  // 2) Rules / Scoring (only here we describe scoring)
if (screen === 'rules') {
  return (
    <div className="viewport">
      <div className="wrap fade" key={`rules:${animKey}`}>
        <div className="info-panel tight">
          <h2>How it works</h2>

            <p className="lead">There are four rounds. Each begins with a market shock. Choose one option per round. Depending on the role you choose, you may earn more or less points than another player in a given role. Your score reflects how well your choice aligns with the round’s conditions. Aim high; you can receive up to 18 points total in the game.</p>
        </div>
        <div className="panel-actions">
          <button className="nav-button" onClick={() => fadeTo('role')} disabled={busy}>
            Choose Role
          </button>
        </div>
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
                className={`role-circle ${
                  r.id === 'wholesale_bank' ? 'bank' :
                  r.id === 'fintech'        ? 'fintech' :
                  r.id === 'big_tech'       ? 'bigtech' : 'crypto'
                }`}
                disabled={busy}
                onClick={() => soft(() => {
                  setRole(r.id);
                  setIdx(0);
                  setPoints(0);
                  setLastPts(null);
                  setScreen('role_info'); // keep if you use the role info screen
                })}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 3b) Role info screen (after selecting a role)
  if (screen === 'role_info' && role !== undefined) {
    const info = ROLE_DESCRIPTIONS[role];
    return (
      <div className="viewport">
        <div className="wrap fade" key={`roleinfo:${animKey}`}>
          <div className="scenario-box">
            <h2>{info.title}</h2>
            <p>{info.text}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <button
              className="nav-button"
              disabled={busy}
              onClick={() => fadeTo('shock')}
            >
              Start Round 1
            </button>

            <button
              className="nav-button"
              disabled={busy}
              onClick={() => soft(() => {
                setRole(undefined);
                setScreen('role');  // go back to role selection
              })}
            >
              Back to Role Selection
            </button>
          </div>
        </div>

      </div>
    );
  }

  // 4a) Shock screen — typewriter intro for the round
if (screen === 'shock' && role !== undefined) {
  if (idx >= ROUNDS.length) { fadeTo('over', 0); return null; }
  const current: Round = ROUNDS[idx];
  const title = SHOCK_DETAILS[current.id]?.title ?? current.title;

  const skipTyping = () => {
    const full = SHOCK_DETAILS[current.id]?.long ?? '';
    if (typeTimerRef.current !== null) {
      clearTimeout(typeTimerRef.current);
      typeTimerRef.current = null;
    }
    setTyped(full);
    setIsTyping(false);
  };
  

  return (
    <div className="viewport">
      <div className="wrap fade" key={`shock:${idx}:${animKey}`}>
        <div className="scenario-box" style={{ maxWidth: 860 }}>
          <h2>{title}</h2>

          <p className="typing">
            {typed}
            {isTyping && <span className="caret"/>}
          </p>
        </div>

        <div className="panel-actions" style={{ gap: 12 }}>
          {isTyping ? (
            <button className="nav-button" onClick={skipTyping} disabled={busy}>Skip</button>
          ) : null}
          <button
            className="nav-button"
            onClick={() => fadeTo('round')}
            disabled={busy}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}


 // 4b) Round (options screen — 1×3 grid, no scoring/tier labels)
if (screen === 'round' && role !== undefined) {
  if (idx >= ROUNDS.length) { fadeTo('over', 0); return null; }

  const current: Round = ROUNDS[idx];
  const roleName = ROLES.find(r => r.id === role)?.name ?? role;

  function choose(option: Option) {
    if (!role) return;
    const rank = Math.max(0, current.rank_order.indexOf(role));
    const pts = pointsFor(option.tier as Tier, rank);
    // show per-round points BEFORE advancing
    soft(() => {
      setLastPts(pts);
      setLastChoice(option);
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

        <div className="scenario-box">
          <h2>{current.title}</h2>
          <p className="shock">{current.shock_summary}</p>
        </div>

        <div className="grid options slide-stagger">
          {shuffledOptions.map((o, i) => (
            <button
              key={o.id}
              className="card slide-item"
              style={{ animationDelay: `${150 * i}ms` }}
              onClick={() => choose(o)}
              disabled={busy}
            >
              <h3>{o.label}</h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


  // 4c) Round Result (shows the points you just earned)
if (screen === 'result' && role !== undefined) {
  const current: Round = ROUNDS[Math.min(idx, ROUNDS.length - 1)];
  const rank = Math.max(0, current.rank_order.indexOf(role));
  const desc = roundDescriptor(lastChoice, rank);

  return (
    <div className="viewport">
      <div className="wrap fade" key={`result:${idx}:${animKey}`}>
        <h2>{current.title}</h2>

        <div className="result big">
          You scored <strong>+{lastPts ?? 0}</strong> this round.
        </div>

        {desc.title && (
          <div className="result">
            <strong>{desc.title}</strong>
            <div style={{ marginTop: 6 }}>{desc.text}</div>
          </div>
        )}

        <button
          className="nav-button"
          disabled={busy}
          onClick={() =>
            soft(() => {
              setPoints(p => p + (lastPts ?? 0));
              setLastPts(null);
              setLastChoice(null);
              setScreen('fact');
            })
          }
        >
          Continue
        </button>
      </div>
    </div>
  );
}


  // 4d) Fact screen
  if (screen === 'fact' && role !== undefined) {
    const current: Round = ROUNDS[Math.min(idx, ROUNDS.length - 1)];
    const fact = FACTS[current.id]?.[role];
  
    return (
      <div className="viewport">
        <div className="wrap fade" key={`fact:${idx}:${animKey}`}>
          <div className="fact-wrap">
            <div className="fact-circle">
              <div className="fact-heading">Did you know?</div>
              <div className="fact-content">
                <p>{fact?.text ?? 'No fact available for this combination.'}</p>
              </div>
            </div>
  
            <button
              className="nav-button"
              disabled={busy}
              onClick={() =>
                soft(() => {
                  const next = idx + 1;
                  if (next >= ROUNDS.length) {
                    setIdx(next);
                    setScreen('over');
                  } else {
                    setIdx(next);
                    setScreen('shock');
                  }
                })
              }
            >
              Next Round
            </button>
          </div>
        </div>
      </div>
    );
  }
  



  // 5) Game Over (now we show total points)
  if (screen === 'over') {
    const outcome = qualitativeOutcome(points);
    return (
      <div className="viewport">
        <div className="wrap fade" key={`over:${animKey}`}>
          <h2>Game Over</h2>
          <p>Total Points: <strong>{points}</strong> / {MAX_SCORE}</p>

          <div className="result">
            <strong>{outcome.title}</strong>
            <div style={{ marginTop: 6 }}>{outcome.text}</div>
          </div>

          <button
            className="nav-button"
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
