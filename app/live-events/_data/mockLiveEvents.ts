// app/live-events/_data/mockLiveEvents.ts

export type LiveStatus = "live" | "upcoming" | "finished";

export type TvChannel = {
  id: string;
  name: string;
  region?: string;
  isFree?: boolean;
};

export type MatchEventType = "goal" | "card" | "sub" | "info";

export type MatchEvent = {
  minute: number;
  type: MatchEventType;
  text: string;
};

export type MatchOdd = {
  label: string;
  value: string;
};

export type MatchStat = {
  label: string;
  home: number;
  away: number;
  unit?: "%" | "" | "xG";
};

export type PromoTile = {
  id: string;
  label: string;
  sublabel?: string;
};

export type LiveEvent = {
  id: string;
  sport: "Football" | "Cricket" | "Basketball";
  competition: string;
  stage?: string;

  startTimeISO: string; // ISO string
  status: LiveStatus;

  matchMinute?: number; // Layout-2 (LIVE clock)

  venue: {
    name: string;
    city?: string;
    country?: string;
  };

  home: { name: string; short?: string; score?: number | null };
  away: { name: string; short?: string; score?: number | null };

  tvChannelIds: string[];

  matchEvents?: MatchEvent[]; // Layout-2 (Match Events)
  odds?: MatchOdd[]; // Layout-2 (Live Odds)
  stats?: MatchStat[]; // Layout-2 (Match Stats)

  promos?: PromoTile[]; // Layout-1/2 promo tiles (optional)

  actions: {
    buyTickets?: boolean;
    planTrip?: boolean;
    shop?: boolean;
    engage?: boolean;
    watchOnline?: boolean;
    readMore?: boolean;
  };
};

export const tvChannels: TvChannel[] = [
  { id: "tsn", name: "TSN", region: "CA", isFree: false },
  { id: "sky", name: "Sky Sports", region: "UK", isFree: false },
  { id: "espn", name: "ESPN", region: "US", isFree: false },
  { id: "ten", name: "Ten Sports", region: "PK", isFree: true },
  { id: "star", name: "Star Sports", region: "IN", isFree: false },
  { id: "beins", name: "beIN SPORTS", region: "MENA", isFree: false },
];

export const liveEvents: LiveEvent[] = [
  {
    id: "evt_001",
    sport: "Football",
    competition: "Premier League",
    stage: "Matchday 17",
    startTimeISO: "2025-12-16T18:45:00Z",
    status: "live",
    matchMinute: 76,
    venue: { name: "Emirates Stadium", city: "London", country: "UK" },
    home: { name: "Arsenal", short: "ARS", score: 1 },
    away: { name: "Aston Villa", short: "AVL", score: 1 },
    tvChannelIds: ["sky", "beins"],
    matchEvents: [
      { minute: 12, type: "goal", text: "ARS Goal — Saka" },
      { minute: 38, type: "card", text: "AVL Yellow Card — McGinn" },
      { minute: 61, type: "sub", text: "ARS Sub — Trossard ↔ Martinelli" },
      { minute: 73, type: "goal", text: "AVL Goal — Watkins" },
    ],
    odds: [
      { label: "Match Winner (ARS)", value: "2.10" },
      { label: "Draw", value: "3.25" },
      { label: "Match Winner (AVL)", value: "3.60" },
    ],
    stats: [
      { label: "Possession", home: 54, away: 46, unit: "%" },
      { label: "Shots", home: 11, away: 8, unit: "" },
      { label: "Shots on Target", home: 5, away: 3, unit: "" },
      { label: "xG", home: 1.42, away: 1.01, unit: "xG" },
    ],
    promos: [
      { id: "bet", label: "BETTING", sublabel: "50% Bonus" },
      { id: "gear", label: "GEAR", sublabel: "30% Off" },
      { id: "travel", label: "TRAVEL", sublabel: "Book Now" },
    ],
    actions: {
      buyTickets: true,
      planTrip: true,
      shop: true,
      engage: true,
      watchOnline: true,
      readMore: true,
    },
  },
  {
    id: "evt_002",
    sport: "Cricket",
    competition: "Big Bash League",
    stage: "League",
    startTimeISO: "2025-12-16T09:15:00Z",
    status: "upcoming",
    venue: { name: "Bellerive Oval", city: "Hobart", country: "AU" },
    home: { name: "Hobart Hurricanes", short: "HUR", score: null },
    away: { name: "Sydney Thunder", short: "THU", score: null },
    tvChannelIds: ["star", "ten"],
    odds: [
      { label: "Winner (HUR)", value: "1.85" },
      { label: "Winner (THU)", value: "2.05" },
    ],
    promos: [
      { id: "bet", label: "BETTING", sublabel: "Boosts" },
      { id: "travel", label: "TRAVEL", sublabel: "Deals" },
    ],
    actions: { buyTickets: true, watchOnline: true, readMore: true },
  },
  {
    id: "evt_003",
    sport: "Basketball",
    competition: "EuroLeague",
    stage: "Regular Season",
    startTimeISO: "2025-12-16T20:00:00Z",
    status: "finished",
    venue: { name: "Coca-Cola Arena", city: "Dubai", country: "AE" },
    home: { name: "Dubai Basketball", short: "DUB", score: 88 },
    away: { name: "Maccabi Tel Aviv", short: "MTA", score: 84 },
    tvChannelIds: ["espn", "tsn"],
    matchEvents: [
      { minute: 10, type: "info", text: "Q1 — DUB started strong" },
      { minute: 20, type: "info", text: "Halftime — DUB +6" },
      { minute: 35, type: "info", text: "Q4 — MTA cut to 2" },
      { minute: 40, type: "info", text: "Final — DUB win" },
    ],
    stats: [
      { label: "Rebounds", home: 36, away: 33, unit: "" },
      { label: "Assists", home: 21, away: 18, unit: "" },
      { label: "Turnovers", home: 11, away: 14, unit: "" },
    ],
    promos: [{ id: "gear", label: "GEAR", sublabel: "New Drop" }],
    actions: { shop: true, readMore: true },
  },
];
