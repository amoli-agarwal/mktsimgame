// src/data.ts
export const ROUNDS = [
    // Round 1 — Liquidity Crunch (Traditional Wholesale Bank wins)
    {
      id: 'liquidity_crunch',
      ordinal: 1,
      title: 'Liquidity Crunch',
      shock_summary:
        'Funding markets freeze; corporates need short-term cash. Liquidity is scarce and confidence is fragile.',
      rank_order: ['wholesale_bank', 'big_tech', 'fintech', 'crypto'],
      options: [
        // Wholesale Bank
        {
          id: 'r1_wb_best',
          role: 'wholesale_bank',
          tier: 'best',
          label: 'Provide emergency liquidity to corporates via repo lending and short-term loans',
        },
        {
          id: 'r1_wb_b',
          role: 'wholesale_bank',
          tier: 'b',
          label: 'Acquire distressed smaller banks to consolidate the market',
        },
        {
          id: 'r1_wb_c',
          role: 'wholesale_bank',
          tier: 'c',
          label: 'Negotiate regulatory relief to lend more',
        },
  
        // Big Tech
        {
          id: 'r1_bt_best',
          role: 'big_tech',
          tier: 'best',
          label:
            'Keep consumer payments flowing via digital wallets to prevent economy freeze while banks are under stress',
        },
        {
          id: 'r1_bt_b',
          role: 'big_tech',
          tier: 'b',
          label: 'Use cloud tools (AWS, Google Cloud, Azure) to stabilize fintech infrastructure',
        },
        {
          id: 'r1_bt_c',
          role: 'big_tech',
          tier: 'c',
          label: 'Offer small credit lines to merchants to provide short-term relief',
        },
  
        // Fintech
        {
          id: 'r1_ft_best',
          role: 'fintech',
          tier: 'best',
          label: 'Partner with banks to offer digital lending to SMEs',
        },
        {
          id: 'r1_ft_b',
          role: 'fintech',
          tier: 'b',
          label: 'Focus on transaction/fee-based services rather than loans to reduce risk',
        },
        {
          id: 'r1_ft_c',
          role: 'fintech',
          tier: 'c',
          label: 'Raise rates on retail credit to reduce losses, making borrowing more expensive',
        },
  
        // Crypto
        {
          id: 'r1_cr_best',
          role: 'crypto',
          tier: 'best',
          label: 'Market stablecoins as “safe haven” for businesses',
        },
        {
          id: 'r1_cr_b',
          role: 'crypto',
          tier: 'b',
          label: 'Push decentralized lending protocols (DeFi)',
        },
        {
          id: 'r1_cr_c',
          role: 'crypto',
          tier: 'c',
          label: 'Promote Bitcoin/Ether as hedges',
        },
      ],
    },
  
    // Round 2 — Recession hits households & SMEs (Fintech wins)
    {
      id: 'household_sme_recession',
      ordinal: 2,
      title: 'A Recession Hits Households and SMEs',
      shock_summary:
        'Traditional banks pull back from unsecured lending due to rising default rates. Households and small firms are squeezed.',
      rank_order: ['fintech', 'crypto', 'big_tech', 'wholesale_bank'],
      options: [
        // Fintech
        {
          id: 'r2_ft_best',
          role: 'fintech',
          tier: 'best',
          label:
            'Use alternative data to expand lending to SMEs/consumers, serving riskier borrowers that banks avoid',
        },
        {
          id: 'r2_ft_b',
          role: 'fintech',
          tier: 'b',
          label: 'Launch “Buy Now Pay Later” (BNPL) to sustain demand',
        },
        {
          id: 'r2_ft_c',
          role: 'fintech',
          tier: 'c',
          label: 'Earn fees from payments while banks retreat',
        },
  
        // Crypto
        {
          id: 'r2_cr_best',
          role: 'crypto',
          tier: 'best',
          label: 'Build stablecoin systems for lending/remittances',
        },
        {
          id: 'r2_cr_b',
          role: 'crypto',
          tier: 'b',
          label: 'Offer DeFi microloans with collateral',
        },
        {
          id: 'r2_cr_c',
          role: 'crypto',
          tier: 'c',
          label: 'Enable cross-border crypto remittances',
        },
  
        // Big Tech
        {
          id: 'r2_bt_best',
          role: 'big_tech',
          tier: 'best',
          label: 'Offer merchant loans through platforms',
        },
        {
          id: 'r2_bt_b',
          role: 'big_tech',
          tier: 'b',
          label: 'Embed insurance/guarantees for sellers',
        },
        {
          id: 'r2_bt_c',
          role: 'big_tech',
          tier: 'c',
          label: 'Give e-wallet users more incentives',
        },
  
        // Wholesale Bank
        {
          id: 'r2_wb_best',
          role: 'wholesale_bank',
          tier: 'best',
          label: 'Stick with safe big corporations; avoid retail',
        },
        {
          id: 'r2_wb_b',
          role: 'wholesale_bank',
          tier: 'b',
          label: 'Lobby for partial government loan guarantees',
        },
        {
          id: 'r2_wb_c',
          role: 'wholesale_bank',
          tier: 'c',
          label: 'Return to risky retail lending',
        },
      ],
    },
  
    // Round 3 — Cross-Border Trade Fragmentation (Big Tech wins)
    {
      id: 'trade_fragmentation',
      ordinal: 3,
      title: 'Cross-Border Trade Fragmentation',
      shock_summary:
        'Geopolitical tensions and sanctions make global trade settlements through SWIFT/correspondent banks costly and slow. SMEs can’t access affordable cross-border finance.',
      rank_order: ['big_tech', 'wholesale_bank', 'crypto', 'fintech'],
      options: [
        // Big Tech
        {
          id: 'r3_bt_best',
          role: 'big_tech',
          tier: 'best',
          label: 'Build your own closed-loop cross-border payment rail',
        },
        {
          id: 'r3_bt_b',
          role: 'big_tech',
          tier: 'b',
          label: 'Offer supplier credit within marketplaces',
        },
        {
          id: 'r3_bt_c',
          role: 'big_tech',
          tier: 'c',
          label: 'Combine logistics and finance services',
        },
  
        // Wholesale Bank
        {
          id: 'r3_wb_best',
          role: 'wholesale_bank',
          tier: 'best',
          label: 'Keep correspondent banking alive with select partners',
        },
        {
          id: 'r3_wb_b',
          role: 'wholesale_bank',
          tier: 'b',
          label: 'Issue trade-finance guarantees, helping companies trade safely',
        },
        {
          id: 'r3_wb_c',
          role: 'wholesale_bank',
          tier: 'c',
          label: 'Seek sanctions exemptions for clients',
        },
  
        // Crypto
        {
          id: 'r3_cr_best',
          role: 'crypto',
          tier: 'best',
          label: 'Use stablecoins for cross-border settlement',
        },
        {
          id: 'r3_cr_b',
          role: 'crypto',
          tier: 'b',
          label: 'DeFi lending pools for global trade',
        },
        {
          id: 'r3_cr_c',
          role: 'crypto',
          tier: 'c',
          label: 'Encourage peer-to-peer (P2P) commerce in crypto',
        },
  
        // Fintech
        {
          id: 'r3_ft_best',
          role: 'fintech',
          tier: 'best',
          label: 'Offer cheaper digital FX + hedging tools',
        },
        {
          id: 'r3_ft_b',
          role: 'fintech',
          tier: 'b',
          label: 'Partner with other lenders to provide international loans for SMEs',
        },
        {
          id: 'r3_ft_c',
          role: 'fintech',
          tier: 'c',
          label: 'Sell or license technology to banks, allowing banks to white-label your payments systems',
        },
      ],
    },
  
    // Round 4 — Fiat Currency Crisis (Crypto wins)
    {
      id: 'fiat_currency_crisis',
      ordinal: 4,
      title: 'Fiat Currency Crisis',
      shock_summary:
        'All transactions on public blockchains are auditable to avoid the risk of fraud and reduce information asymmetry.',
      rank_order: ['crypto', 'fintech', 'wholesale_bank', 'big_tech'],
      options: [
        // Crypto
        {
          id: 'r4_cr_best',
          role: 'crypto',
          tier: 'best',
          label: 'Push stablecoins as currency replacement',
        },
        {
          id: 'r4_cr_b',
          role: 'crypto',
          tier: 'b',
          label: 'Enable local P2P commerce in crypto',
        },
        {
          id: 'r4_cr_c',
          role: 'crypto',
          tier: 'c',
          label: 'Market BTC/ETH as inflation hedges',
        },
  
        // Fintech
        {
          id: 'r4_ft_best',
          role: 'fintech',
          tier: 'best',
          label: 'Launch USD/EUR mobile wallets with banks',
        },
        {
          id: 'r4_ft_b',
          role: 'fintech',
          tier: 'b',
          label: 'Provide inflation-indexed microcredit',
        },
        {
          id: 'r4_ft_c',
          role: 'fintech',
          tier: 'c',
          label: 'Shift to fee-based services',
        },
  
        // Wholesale Bank
        {
          id: 'r4_wb_best',
          role: 'wholesale_bank',
          tier: 'best',
          label: 'Focus on multinationals with strong currencies',
        },
        {
          id: 'r4_wb_b',
          role: 'wholesale_bank',
          tier: 'b',
          label: 'Issue foreign-currency loans selectively',
        },
        {
          id: 'r4_wb_c',
          role: 'wholesale_bank',
          tier: 'c',
          label: 'Pull back from risky sovereign borrowers',
        },
  
        // Big Tech
        {
          id: 'r4_bt_best',
          role: 'big_tech',
          tier: 'best',
          label: 'Tokenize payments inside ecosystems',
        },
        {
          id: 'r4_bt_b',
          role: 'big_tech',
          tier: 'b',
          label: 'Expand global e-wallet adoption',
        },
        {
          id: 'r4_bt_c',
          role: 'big_tech',
          tier: 'c',
          label: 'Cloud-based financial data security',
        },
      ],
    },
  ];
  
  


/*
import type { Round } from './types';

export const ROUNDS: Round[] = [
  // Round 1 — Liquidity Crunch (Wholesale Bank wins)
  {
    id: 'liquidity_crunch',
    ordinal: 1,
    title: 'Liquidity Crunch',
    shock_summary:
      'Funding markets freeze; corporates need short-term cash. Liquidity is scarce and confidence is fragile.', //CHANGE THIS SHIT
    rank_order: ['wholesale_bank', 'big_tech', 'fintech', 'crypto'],
    options: [
      // Wholesale Bank
      { id: 'r1_wb_best', role: 'wholesale_bank', tier: 'best',
        label: 'Provide emergency liquidity via repo & short-term loans' },
      { id: 'r1_wb_b', role: 'wholesale_bank', tier: 'b',
        label: 'Acquire distressed smaller banks to consolidate the market' },
      { id: 'r1_wb_c', role: 'wholesale_bank', tier: 'c',
        label: 'Negotiate regulatory relief to lend more' },

      // Big Tech
      { id: 'r1_bt_best', role: 'big_tech', tier: 'best',
        label: 'Keep consumer payments flowing via digital wallets' },
      { id: 'r1_bt_b', role: 'big_tech', tier: 'b',
        label: 'Use cloud tools to stabilize fintech infrastructure' },
      { id: 'r1_bt_c', role: 'big_tech', tier: 'c',
        label: 'Offer small credit lines to merchants for relief' },

      // Fintech
      { id: 'r1_ft_best', role: 'fintech', tier: 'best',
        label: 'Partner with banks to offer digital lending to SMEs' },
      { id: 'r1_ft_b', role: 'fintech', tier: 'b',
        label: 'Focus on transaction/fee-based services to reduce risk' },
      { id: 'r1_ft_c', role: 'fintech', tier: 'c',
        label: 'Raise rates on retail credit to reduce losses' },

      // Crypto
      { id: 'r1_cr_best', role: 'crypto', tier: 'best',
        label: 'Market stablecoins as a “safe haven” for businesses' },
      { id: 'r1_cr_b', role: 'crypto', tier: 'b',
        label: 'Push decentralized lending protocols (DeFi)' },
      { id: 'r1_cr_c', role: 'crypto', tier: 'c',
        label: 'Promote Bitcoin/Ether as hedges' },
    ],
  },

  // Round 2 — Recession hits households & SMEs (Fintech wins)
  {
    id: 'household_sme_recession',
    ordinal: 2,
    title: 'Household & SME Recession',
    shock_summary:
      'Defaults rise; traditional banks pull back from unsecured lending. Households and small firms are squeezed.', //CHANGE THIS SHIT
    rank_order: ['fintech', 'crypto', 'big_tech', 'wholesale_bank'],
    options: [
      // Fintech
      { id: 'r2_ft_best', role: 'fintech', tier: 'best',
        label: 'Use alternative data to expand lending to riskier borrowers' },
      { id: 'r2_ft_b', role: 'fintech', tier: 'b',
        label: 'Launch Buy Now Pay Later (BNPL) to sustain demand' },
      { id: 'r2_ft_c', role: 'fintech', tier: 'c',
        label: 'Earn fees from payments while banks retreat' },

      // Crypto
      { id: 'r2_cr_best', role: 'crypto', tier: 'best',
        label: 'Build stablecoin systems for lending and remittances' },
      { id: 'r2_cr_b', role: 'crypto', tier: 'b',
        label: 'Offer DeFi microloans with collateral' },
      { id: 'r2_cr_c', role: 'crypto', tier: 'c',
        label: 'Enable cross-border crypto remittances' },

      // Big Tech
      { id: 'r2_bt_best', role: 'big_tech', tier: 'best',
        label: 'Offer merchant loans through platforms' },
      { id: 'r2_bt_b', role: 'big_tech', tier: 'b',
        label: 'Embed insurance/guarantees for sellers' },
      { id: 'r2_bt_c', role: 'big_tech', tier: 'c',
        label: 'Give e-wallet users more incentives' },

      // Wholesale Bank
      { id: 'r2_wb_best', role: 'wholesale_bank', tier: 'best',
        label: 'Stick with safe big corporations; avoid retail' },
      { id: 'r2_wb_b', role: 'wholesale_bank', tier: 'b',
        label: 'Lobby for partial government loan guarantees' },
      { id: 'r2_wb_c', role: 'wholesale_bank', tier: 'c',
        label: 'Return to risky retail lending' },
    ],
  },

  // Round 3 — Cross-border trade fragmentation (Big Tech wins)
  {
    id: 'trade_fragmentation',
    ordinal: 3,
    title: 'Cross-Border Trade Fragmentation',
    shock_summary:
      'Sanctions and geopolitics raise costs; SWIFT/correspondent banking slows. SMEs struggle to pay/settle.',  //CHANGE THIS SHIT
    rank_order: ['big_tech', 'wholesale_bank', 'crypto', 'fintech'],
    options: [
      // Big Tech
      { id: 'r3_bt_best', role: 'big_tech', tier: 'best',
        label: 'Build your own closed-loop cross-border payment rail' },
      { id: 'r3_bt_b', role: 'big_tech', tier: 'b',
        label: 'Offer supplier credit within marketplaces' },
      { id: 'r3_bt_c', role: 'big_tech', tier: 'c',
        label: 'Combine logistics and finance services' },

      // Wholesale Bank
      { id: 'r3_wb_best', role: 'wholesale_bank', tier: 'best',
        label: 'Keep correspondent banking alive with select partners' },
      { id: 'r3_wb_b', role: 'wholesale_bank', tier: 'b',
        label: 'Issue trade-finance guarantees to help firms trade safely' },
      { id: 'r3_wb_c', role: 'wholesale_bank', tier: 'c',
        label: 'Seek sanctions exemptions for clients' },

      // Crypto
      { id: 'r3_cr_best', role: 'crypto', tier: 'best',
        label: 'Use stablecoins for cross-border settlement' },
      { id: 'r3_cr_b', role: 'crypto', tier: 'b',
        label: 'DeFi lending pools for global trade' },
      { id: 'r3_cr_c', role: 'crypto', tier: 'c',
        label: 'Encourage peer-to-peer commerce in crypto' },

      // Fintech
      { id: 'r3_ft_best', role: 'fintech', tier: 'best',
        label: 'Offer cheaper digital FX + hedging tools' },
      { id: 'r3_ft_b', role: 'fintech', tier: 'b',
        label: 'Partner for international SME loans' },
      { id: 'r3_ft_c', role: 'fintech', tier: 'c',
        label: 'Sell/license tech so banks can white-label payments' },
    ],
  },

  // Round 4 — Fiat Currency Crisis (Crypto wins)
  {
    id: 'fiat_currency_crisis',
    ordinal: 4,
    title: 'Fiat Currency Crisis',
    shock_summary:
      'Local currency loses credibility; people seek stable value and auditable transactions.', //CHANGE THIS SHIT
    rank_order: ['crypto', 'fintech', 'wholesale_bank', 'big_tech'],
    options: [
      // Crypto
      { id: 'r4_cr_best', role: 'crypto', tier: 'best',
        label: 'Push stablecoins as currency replacement' },
      { id: 'r4_cr_b', role: 'crypto', tier: 'b',
        label: 'Enable local P2P commerce in crypto' },
      { id: 'r4_cr_c', role: 'crypto', tier: 'c',
        label: 'Market BTC/ETH as inflation hedges' },

      // Fintech
      { id: 'r4_ft_best', role: 'fintech', tier: 'best',
        label: 'Launch USD/EUR mobile wallets with banks' },
      { id: 'r4_ft_b', role: 'fintech', tier: 'b',
        label: 'Provide inflation-indexed microcredit' },
      { id: 'r4_ft_c', role: 'fintech', tier: 'c',
        label: 'Shift to fee-based services' },

      // Wholesale Bank
      { id: 'r4_wb_best', role: 'wholesale_bank', tier: 'best',
        label: 'Focus on multinationals with strong currencies' },
      { id: 'r4_wb_b', role: 'wholesale_bank', tier: 'b',
        label: 'Issue foreign-currency loans selectively' },
      { id: 'r4_wb_c', role: 'wholesale_bank', tier: 'c',
        label: 'Pull back from risky sovereign borrowers' },

      // Big Tech
      { id: 'r4_bt_best', role: 'big_tech', tier: 'best',
        label: 'Tokenize payments inside platform ecosystems' },
      { id: 'r4_bt_b', role: 'big_tech', tier: 'b',
        label: 'Expand global e-wallet adoption' },
      { id: 'r4_bt_c', role: 'big_tech', tier: 'c',
        label: 'Cloud-based financial data security' },
    ],
  },
];
*/
