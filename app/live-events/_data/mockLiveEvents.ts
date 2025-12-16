// app/live-events/_data/mockLiveEvents.ts

export type LiveStatus = "live" | "upcoming" | "finished";

export type TvChannel = {
  id: string;
  name: string;
  region?: string;
  isFree?: boolean;
};

export type LiveEvent = {
  id: string;
  sport: "Football" | "Cricket" | "Basketball";
  competition: string;
  stage?: string;

  startTimeISO: string; // ISO string
  status: LiveStatus;

  venue: {
    name: string;
    city?: string;
    country?: string;
  };

  home: { name: string; short?: string; score?: number | null };
  away: { name: string; short?: string; score?: number | null };

  tvChannelIds: string[];

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
    venue: { name: "Emirates Stadium", city: "London", country: "UK" },
    home: { name: "Arsenal", short: "ARS", score: 1 },
    away: { name: "Aston Villa", short: "AVL", score: 1 },
    tvChannelIds: ["sky", "beins"],
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
    actions: { shop: true, readMore: true },
  },
];
