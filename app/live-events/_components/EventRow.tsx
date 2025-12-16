// app/live-events/_components/EventRow.tsx
import * as React from "react";
import type { LiveEvent, TvChannel } from "../_data/mockLiveEvents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  MapPin,
  Ticket,
  Plane,
  ShoppingBag,
  MessageCircle,
  Globe,
  BookOpen,
  Tv,
} from "lucide-react";
import { EventTopBar } from "./EventTopBar";
import { QuickTiles } from "./QuickTiles";

type Props = {
  evt: LiveEvent;
  channelsById: Record<string, TvChannel>;

  tilesEnabled: boolean;
  isFavourited: boolean;

  onToggleTiles: (eventId: string) => void;
  onClearEventUi: (eventId: string) => void;
  onQuickAction: (eventId: string, action: "tickets" | "watch" | "share" | "favourite") => void;
};

function statusPill(status: LiveEvent["status"]) {
  if (status === "live") return "bg-emerald-500/15 text-emerald-700 border-emerald-200";
  if (status === "upcoming") return "bg-sky-500/15 text-sky-700 border-sky-200";
  return "bg-slate-500/10 text-slate-700 border-slate-200";
}

function leftTint(status: LiveEvent["status"]) {
  if (status === "live") return "bg-emerald-500/10";
  if (status === "upcoming") return "bg-sky-500/10";
  return "bg-slate-500/10";
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" });
}

function scorePill(score: number | null | undefined) {
  if (score === null || score === undefined) return null;
  return <span className="rounded-lg border bg-background px-2.5 py-1 text-sm font-semibold">{score}</span>;
}

function EventRowInner({
  evt,
  channelsById,
  tilesEnabled,
  isFavourited,
  onToggleTiles,
  onClearEventUi,
  onQuickAction,
}: Props) {
  const channelNames = React.useMemo(
    () => evt.tvChannelIds.map((id) => channelsById[id]?.name).filter(Boolean) as string[],
    [evt.tvChannelIds, channelsById]
  );

  const shown = channelNames.slice(0, 3);
  const moreCount = Math.max(0, channelNames.length - shown.length);

  return (
    <article id={evt.id} className="px-4 py-4">
      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        {/* Header strip */}
        <div className="flex flex-col gap-2 border-b bg-muted/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="rounded-full text-sm">
              {evt.sport}
            </Badge>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base font-semibold">{evt.competition}</span>
              {evt.stage ? <span className="text-sm text-muted-foreground">• {evt.stage}</span> : null}
            </div>

            <span className={`rounded-full border px-3 py-1 text-sm font-semibold ${statusPill(evt.status)}`}>
              {evt.status.toUpperCase()}
            </span>

            {isFavourited ? (
              <Badge className="rounded-full text-sm">Favourite</Badge>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-5 w-5" />
              <span>
                {formatDateShort(evt.startTimeISO)} • {formatTime(evt.startTimeISO)}
              </span>
            </div>

            <EventTopBar
              eventId={evt.id}
              tilesEnabled={tilesEnabled}
              onToggleTiles={() => onToggleTiles(evt.id)}
              onClear={() => onClearEventUi(evt.id)}
              compact
            />
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_300px]">
          {/* Left panel (now light + readable) */}
          <div className={`border-b p-5 lg:border-b-0 lg:border-r ${leftTint(evt.status)}`}>
            <div className="rounded-2xl border bg-background/70 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-muted-foreground">
                  {evt.status === "live" ? "Live" : evt.status === "upcoming" ? "Upcoming" : "Finished"}
                </div>
                <Badge variant="outline" className="rounded-full text-xs">
                  {evt.sport}
                </Badge>
              </div>

              <div className="mt-4 space-y-3">
                <div className="rounded-xl bg-muted/30 p-3">
                  <div className="text-xs text-muted-foreground">Home</div>
                  <div className="mt-1 text-base font-semibold">{evt.home.name}</div>
                  <div className="mt-2">{scorePill(evt.home.score) ?? <span className="text-sm text-muted-foreground">—</span>}</div>
                </div>

                <div className="text-center text-xs font-semibold text-muted-foreground">VS</div>

                <div className="rounded-xl bg-muted/30 p-3">
                  <div className="text-xs text-muted-foreground">Away</div>
                  <div className="mt-1 text-base font-semibold">{evt.away.name}</div>
                  <div className="mt-2">{scorePill(evt.away.score) ?? <span className="text-sm text-muted-foreground">—</span>}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Center */}
          <div className="p-5">
            <div className="rounded-2xl border bg-background p-5">
              <div className="text-center">
                <div className="text-sm font-semibold text-muted-foreground">Live Match Center</div>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                  <span className="text-lg font-semibold">{evt.home.name}</span>
                  {evt.home.score !== null && evt.home.score !== undefined ? scorePill(evt.home.score) : null}
                  <span className="text-sm text-muted-foreground">vs</span>
                  {evt.away.score !== null && evt.away.score !== undefined ? scorePill(evt.away.score) : null}
                  <span className="text-lg font-semibold">{evt.away.name}</span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border bg-muted/10 p-4">
                  <div className="text-sm font-semibold text-muted-foreground">Match time</div>
                  <div className="mt-1 text-lg font-semibold">{formatTime(evt.startTimeISO)}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{formatDateShort(evt.startTimeISO)}</div>
                </div>

                <div className="rounded-xl border bg-muted/10 p-4">
                  <div className="text-sm font-semibold text-muted-foreground">Venue</div>
                  <div className="mt-1 flex items-start gap-2 text-base">
                    <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <span className="min-w-0 truncate font-semibold">
                      {evt.venue.name}
                      {evt.venue.city ? `, ${evt.venue.city}` : ""}
                      {evt.venue.country ? `, ${evt.venue.country}` : ""}
                    </span>
                  </div>
                </div>
              </div>

              <QuickTiles
                disabled={!tilesEnabled}
                isFavourited={isFavourited}
                onAction={(k) => onQuickAction(evt.id, k)}
              />

              {/* Actions */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {evt.actions.buyTickets ? (
                  <Button variant="default" size="sm" className="h-10 gap-2 rounded-xl px-4 text-sm">
                    <Ticket className="h-5 w-5" />
                    Buy tickets
                  </Button>
                ) : null}

                {evt.actions.planTrip ? (
                  <Button variant="outline" size="sm" className="h-10 gap-2 rounded-xl px-4 text-sm">
                    <Plane className="h-5 w-5" />
                    Plan a trip
                  </Button>
                ) : null}

                {evt.actions.shop ? (
                  <Button variant="outline" size="sm" className="h-10 gap-2 rounded-xl px-4 text-sm">
                    <ShoppingBag className="h-5 w-5" />
                    Shop
                  </Button>
                ) : null}

                {evt.actions.engage ? (
                  <Button variant="outline" size="sm" className="h-10 gap-2 rounded-xl px-4 text-sm">
                    <MessageCircle className="h-5 w-5" />
                    Engage
                  </Button>
                ) : null}

                {evt.actions.watchOnline ? (
                  <Button variant="outline" size="sm" className="h-10 gap-2 rounded-xl px-4 text-sm">
                    <Globe className="h-5 w-5" />
                    Watch online / TV
                  </Button>
                ) : null}

                {evt.actions.readMore ? (
                  <Button variant="outline" size="sm" className="h-10 gap-2 rounded-xl px-4 text-sm">
                    <BookOpen className="h-5 w-5" />
                    Read & listen more
                  </Button>
                ) : null}
              </div>
            </div>
          </div>

          {/* Right: per-event TV block */}
          <div className="border-t p-5 lg:border-l lg:border-t-0">
            <div className="rounded-2xl border bg-muted/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-base font-semibold">
                  <Tv className="h-5 w-5" />
                  TV Channels
                </div>
                <Badge variant="outline" className="rounded-full text-sm">
                  {evt.tvChannelIds.length}
                </Badge>
              </div>

              <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                {shown.length ? (
                  <>
                    {shown.map((n) => (
                      <div key={n} className="truncate">
                        {n}
                      </div>
                    ))}
                    {moreCount ? <div>+ {moreCount} more</div> : null}
                  </>
                ) : (
                  <div>No broadcaster listed</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export const EventRow = React.memo(EventRowInner);
