"use client";

import * as React from "react";
import type { LiveEvent, TvChannel, LiveStatus } from "../_data/mockLiveEvents";
import { EventsList } from "./EventsList";
import { MobileTvSheet } from "./MobileTvSheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RefreshCw, Search } from "lucide-react";

type Props = {
  initialEvents: LiveEvent[];
  tvChannels: TvChannel[] | unknown; // <- tolerate bad input
};

const STATUS_OPTIONS: Array<{ label: string; value: "all" | LiveStatus }> = [
  { label: "All", value: "all" },
  { label: "Live", value: "live" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Finished", value: "finished" },
];

type QuickAction = "tickets" | "watch" | "share" | "favourite";

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}

export function LiveEventsClient({ initialEvents, tvChannels }: Props) {
  const safeTvChannels = React.useMemo<TvChannel[]>(() => {
    return Array.isArray(tvChannels) ? (tvChannels as TvChannel[]) : [];
  }, [tvChannels]);

  const [lastUpdated, setLastUpdated] = React.useState<Date>(() => new Date());
  const [query, setQuery] = React.useState("");
  const debouncedQuery = useDebouncedValue(query, 180);
  const [status, setStatus] = React.useState<"all" | LiveStatus>("all");

  const [tilesEnabledByEventId, setTilesEnabledByEventId] = React.useState<Record<string, boolean>>({});
  const [isFavouritedByEventId, setIsFavouritedByEventId] = React.useState<Record<string, boolean>>({});

  const channelsById = React.useMemo(() => {
    const map: Record<string, TvChannel> = {};
    for (const ch of safeTvChannels) map[ch.id] = ch;
    return map;
  }, [safeTvChannels]);

  const filtered = React.useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return initialEvents.filter((e) => {
      if (status !== "all" && e.status !== status) return false;
      if (!q) return true;

      const hay = [
        e.sport,
        e.competition,
        e.stage ?? "",
        e.home.name,
        e.away.name,
        e.venue.name,
        e.venue.city ?? "",
        e.venue.country ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return hay.includes(q);
    });
  }, [initialEvents, debouncedQuery, status]);

  const onRefresh = React.useCallback(() => setLastUpdated(new Date()), []);
  const onToggleTiles = React.useCallback((eventId: string) => {
    setTilesEnabledByEventId((prev) => ({ ...prev, [eventId]: !(prev[eventId] ?? true) }));
  }, []);
  const onClearEventUi = React.useCallback((eventId: string) => {
    setTilesEnabledByEventId((prev) => {
      const copy = { ...prev };
      delete copy[eventId];
      return copy;
    });
    setIsFavouritedByEventId((prev) => {
      const copy = { ...prev };
      delete copy[eventId];
      return copy;
    });
  }, []);
  const onQuickAction = React.useCallback(async (eventId: string, action: QuickAction) => {
    if (action === "favourite") {
      setIsFavouritedByEventId((prev) => ({ ...prev, [eventId]: !(prev[eventId] ?? false) }));
      return;
    }
    if (action === "share") {
      const url = `${window.location.origin}/live-events#${eventId}`;
      try {
        if (navigator.share) await navigator.share({ title: "Live Event", url });
        else {
          await navigator.clipboard.writeText(url);
          setLastUpdated(new Date());
        }
      } catch {}
      return;
    }
    setLastUpdated(new Date());
  }, []);

  return (
    <div className="mx-auto max-w-7xl text-[15px] leading-relaxed">
      {/* header */}
      <header className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-tight">Live Events</h1>
              <Badge variant="secondary" className="rounded-full text-sm">
                Updated {lastUpdated.toLocaleTimeString()}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              FixtureCalendar-style list + per-event match center + right-rail TV channels.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onRefresh} className="h-10 gap-2 rounded-xl">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <MobileTvSheet tvChannels={safeTvChannels} />
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search team, league, venue…"
              className="h-11 rounded-xl pl-10 text-[15px]"
              aria-label="Search live events"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {STATUS_OPTIONS.map((opt) => {
              const active = status === opt.value;
              return (
                <Button
                  key={opt.value}
                  type="button"
                  variant={active ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatus(opt.value)}
                  className="h-10 rounded-full px-4 text-sm"
                >
                  {opt.label}
                </Button>
              );
            })}
          </div>
        </div>
      </header>

      {/* layout */}
      <main className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
        <section aria-label="Live events list">
          <EventsList
            events={filtered}
            channelsById={channelsById}
            tilesEnabledByEventId={tilesEnabledByEventId}
            isFavouritedByEventId={isFavouritedByEventId}
            onToggleTiles={onToggleTiles}
            onClearEventUi={onClearEventUi}
            onQuickAction={onQuickAction}
          />
        </section>

        <aside className="hidden lg:block" aria-label="TV channels">
          <div className="sticky top-6 overflow-hidden rounded-2xl border bg-white/70 shadow-sm backdrop-blur">
            <div className="border-b bg-muted/20 p-5">
              <h2 className="text-base font-semibold">TV Channels</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Desktop right rail. Mobile uses the TV Channels drawer.
              </p>
            </div>

            <ul className="max-h-[70vh] overflow-auto p-2">
              {safeTvChannels.map((ch) => (
                <li key={ch.id} className="rounded-xl p-3 hover:bg-muted/40">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{ch.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {ch.region ?? "Global"} • {ch.isFree ? "Free" : "Subscription"}
                      </div>
                    </div>
                    <Badge variant="outline" className="rounded-full text-xs">
                      {ch.id.toUpperCase()}
                    </Badge>
                  </div>
                </li>
              ))}

              {!safeTvChannels.length ? (
                <li className="p-4 text-sm text-muted-foreground">
                  No TV channels loaded (check mock export/import).
                </li>
              ) : null}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
