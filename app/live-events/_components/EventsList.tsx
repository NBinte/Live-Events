// app/live-events/_components/EventsList.tsx
import * as React from "react";
import type { LiveEvent, TvChannel } from "../_data/mockLiveEvents";
import { Card } from "@/components/ui/card";
import { EventRow } from "./EventRow";

type Props = {
  events: LiveEvent[];
  channelsById: Record<string, TvChannel>;
  tilesEnabledByEventId: Record<string, boolean>;
  isFavouritedByEventId: Record<string, boolean>;
  onToggleTiles: (eventId: string) => void;
  onClearEventUi: (eventId: string) => void;
  onQuickAction: (eventId: string, action: "tickets" | "watch" | "share" | "favourite") => void;
};

function dayKey(iso: string) {
  const d = new Date(iso);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function EventsList({
  events,
  channelsById,
  tilesEnabledByEventId,
  isFavouritedByEventId,
  onToggleTiles,
  onClearEventUi,
  onQuickAction,
}: Props) {
  const grouped = React.useMemo(() => {
    const map = new Map<number, LiveEvent[]>();
    for (const e of events) {
      const k = dayKey(e.startTimeISO);
      const arr = map.get(k) ?? [];
      arr.push(e);
      map.set(k, arr);
    }
    const ordered = Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
    for (const [, arr] of ordered) {
      arr.sort((a, b) => new Date(a.startTimeISO).getTime() - new Date(b.startTimeISO).getTime());
    }
    return ordered;
  }, [events]);

  if (!events.length) {
    return (
      <Card className="rounded-2xl border bg-white/70 p-8 text-center shadow-sm backdrop-blur">
        <div className="text-lg font-semibold">No events found</div>
        <div className="mt-1 text-sm text-muted-foreground">Try adjusting filters or search terms.</div>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      {grouped.map(([k, dayEvents]) => {
        const label = formatDay(new Date(k).toISOString());
        return (
          <div key={k} className="overflow-hidden rounded-2xl border bg-white/70 shadow-sm backdrop-blur">
            <div className="flex items-end justify-between gap-3 border-b bg-gradient-to-r from-slate-50 to-white px-5 py-4">
              <div>
                <div className="text-lg font-semibold tracking-tight">{label}</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {dayEvents.length} event{dayEvents.length === 1 ? "" : "s"}
                </div>
              </div>

              <div className="hidden sm:block text-sm text-muted-foreground">
                Sorted by kickoff time
              </div>
            </div>

            <div className="divide-y">
              {dayEvents.map((evt) => (
                <EventRow
                  key={evt.id}
                  evt={evt}
                  channelsById={channelsById}
                  tilesEnabled={tilesEnabledByEventId[evt.id] ?? true}
                  isFavourited={isFavouritedByEventId[evt.id] ?? false}
                  onToggleTiles={onToggleTiles}
                  onClearEventUi={onClearEventUi}
                  onQuickAction={onQuickAction}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
