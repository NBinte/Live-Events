// app/live-events/_components/EventRow.tsx
import * as React from "react";
import type { LiveEvent, TvChannel } from "../_data/mockLiveEvents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  Settings,
  Trash2,
  Zap,
  Ticket,
  Tv2,
  Share2,
  Star,
} from "lucide-react";
import { MatchCenterPanels } from "./MatchCenterPanels";
import { EventActionBar } from "./EventActionBar";

type Props = {
  evt: LiveEvent;
  channelsById: Record<string, TvChannel>;
  tilesEnabled: boolean;
  isFavourited: boolean;
  onToggleTiles: (eventId: string) => void;
  onClearEventUi: (eventId: string) => void;
  onQuickAction: (eventId: string, action: "tickets" | "watch" | "share" | "favourite") => void;
};

function statusChip(status: LiveEvent["status"]) {
  if (status === "live") return { label: "LIVE", className: "bg-emerald-600 text-white" };
  if (status === "upcoming") return { label: "UPCOMING", className: "bg-sky-600 text-white" };
  return { label: "FINISHED", className: "bg-slate-700 text-white" };
}

function fmtDateTime(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" });
  const time = d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  return `${date} • ${time}`;
}

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  const a = parts[0]?.[0] ?? "";
  const b = parts[1]?.[0] ?? parts[0]?.[1] ?? "";
  return (a + b).toUpperCase();
}

export function EventRow({
  evt,
  channelsById,
  tilesEnabled,
  isFavourited,
  onToggleTiles,
  onClearEventUi,
  onQuickAction,
}: Props) {
  const chip = statusChip(evt.status);
  const tv = evt.tvChannelIds.map((id) => channelsById[id]).filter(Boolean);

  return (
    <div id={evt.id} className="p-5">
      {/* top meta row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="rounded-full">{evt.sport}</Badge>
          <div className="text-sm font-semibold">{evt.competition}</div>
          {evt.stage ? <div className="text-sm text-muted-foreground">• {evt.stage}</div> : null}
          <Badge className={`rounded-full ${chip.className}`}>{chip.label}</Badge>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="rounded-full">
            ID: {evt.id}
          </Badge>
          <Button variant="outline" size="sm" className="rounded-full gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full gap-2"
            onClick={() => onClearEventUi(evt.id)}
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
          <Button
            variant={tilesEnabled ? "default" : "outline"}
            size="sm"
            className="rounded-full gap-2"
            onClick={() => onToggleTiles(evt.id)}
          >
            <Zap className="h-4 w-4" />
            Tiles: {tilesEnabled ? "On" : "Off"}
          </Button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>{fmtDateTime(evt.startTimeISO)}</span>
          <span className="text-muted-foreground">•</span>
          <span className="truncate">{evt.venue.name}</span>
        </div>

        {/* quick icons row (keep your feature) */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl"
            onClick={() => onQuickAction(evt.id, "tickets")}
            aria-label="Tickets"
          >
            <Ticket className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl"
            onClick={() => onQuickAction(evt.id, "watch")}
            aria-label="Watch"
          >
            <Tv2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl"
            onClick={() => onQuickAction(evt.id, "share")}
            aria-label="Share"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant={isFavourited ? "default" : "outline"}
            size="icon"
            className="rounded-xl"
            onClick={() => onQuickAction(evt.id, "favourite")}
            aria-label="Favourite"
          >
            <Star className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      {/* main event grid (best-of-breed merge) */}
      <div className="grid gap-4 lg:grid-cols-[260px_1fr_280px]">
        {/* Left: team slab (Layout 1/2 “visual”) */}
        <div className="rounded-2xl border bg-gradient-to-b from-slate-50 to-white p-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="rounded-full capitalize">{evt.status}</Badge>
            <Badge variant="outline" className="rounded-full">{evt.sport}</Badge>
          </div>

          <div className="mt-4 rounded-2xl bg-white/70 p-4 shadow-sm">
            <div className="text-xs text-muted-foreground">Home</div>
            <div className="mt-2 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl border bg-white font-semibold">
                {initials(evt.home.name)}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{evt.home.name}</div>
                {typeof evt.home.score === "number" ? (
                  <div className="text-sm text-muted-foreground">Score: {evt.home.score}</div>
                ) : (
                  <div className="text-sm text-muted-foreground">—</div>
                )}
              </div>
            </div>

            <div className="my-3 text-center text-xs text-muted-foreground">VS</div>

            <div className="text-xs text-muted-foreground">Away</div>
            <div className="mt-2 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl border bg-white font-semibold">
                {initials(evt.away.name)}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{evt.away.name}</div>
                {typeof evt.away.score === "number" ? (
                  <div className="text-sm text-muted-foreground">Score: {evt.away.score}</div>
                ) : (
                  <div className="text-sm text-muted-foreground">—</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Center: Match Center panels (Layout 2 missing blocks) + bottom action bar */}
        <div>
          <MatchCenterPanels evt={evt} />
          <EventActionBar evt={evt} onQuickAction={onQuickAction} />
        </div>

        {/* Right: TV channels mini-card per event (keeps your feature; matches Layout 2 “TV inside row”) */}
        <div className="rounded-2xl border bg-white/70 p-4 shadow-sm backdrop-blur">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold">TV Channels</div>
            <Badge variant="secondary" className="rounded-full">{tv.length}</Badge>
          </div>

          <div className="grid gap-2">
            {tv.length ? (
              tv.map((c) => (
                <div key={c.id} className="flex items-center justify-between rounded-xl border bg-white/60 p-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{c.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {c.region ?? "Global"} • {c.isFree ? "Free" : "Subscription"}
                    </div>
                  </div>
                  <Badge variant="outline" className="rounded-full text-xs">
                    {c.id.toUpperCase()}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="rounded-xl border bg-muted/20 p-4 text-sm text-muted-foreground">
                TV info not available.
              </div>
            )}
          </div>

          {/* Optional promos (Layout 1/2 tiles) */}
          {tilesEnabled && evt.promos?.length ? (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {evt.promos.slice(0, 3).map((p) => (
                <div key={p.id} className="rounded-xl border bg-gradient-to-b from-slate-50 to-white p-3 text-center">
                  <div className="text-xs font-semibold">{p.label}</div>
                  {p.sublabel ? <div className="mt-1 text-xs text-muted-foreground">{p.sublabel}</div> : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
