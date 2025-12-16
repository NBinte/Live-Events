// app/live-events/_components/EventsList.tsx
import * as React from "react";
import type { LiveEvent, TvChannel } from "../_data/mockLiveEvents";
import { CompetitionSection } from "./CompetitionSection";

type Props = {
  events: LiveEvent[];
  channelsById: Record<string, TvChannel>;

  tilesEnabledByEventId: Record<string, boolean>;
  isFavouritedByEventId: Record<string, boolean>;

  onToggleTiles: (eventId: string) => void;
  onClearEventUi: (eventId: string) => void;
  onQuickAction: (eventId: string, action: "tickets" | "watch" | "share" | "favourite") => void;
};

function formatDayHeading(d: Date) {
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function dayKey(iso: string) {
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
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
    const byDay = new Map<string, LiveEvent[]>();

    for (const e of events) {
      const key = dayKey(e.startTimeISO);
      const arr = byDay.get(key) ?? [];
      arr.push(e);
      byDay.set(key, arr);
    }

    const statusRank: Record<string, number> = { live: 0, upcoming: 1, finished: 2 };

    const days = Array.from(byDay.entries()).sort(([a], [b]) => (a < b ? -1 : 1));

    return days.map(([day, items]) => {
      const sorted = [...items].sort((x, y) => {
        const sr = statusRank[x.status] - statusRank[y.status];
        if (sr !== 0) return sr;
        return new Date(x.startTimeISO).getTime() - new Date(y.startTimeISO).getTime();
      });

      const byComp = new Map<string, LiveEvent[]>();
      for (const e of sorted) {
        const k = e.competition;
        const arr = byComp.get(k) ?? [];
        arr.push(e);
        byComp.set(k, arr);
      }

      const comps = Array.from(byComp.entries()).sort(([a], [b]) => a.localeCompare(b));
      return { day, comps };
    });
  }, [events]);

  return (
    <div className="rounded-xl border bg-card">
      {grouped.map((g, idx) => {
        const dayDate = new Date(`${g.day}T00:00:00`);
        const count = g.comps.reduce((sum, [, arr]) => sum + arr.length, 0);

        return (
          <section key={g.day} className={idx === 0 ? "" : "border-t"}>
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <h2 className="text-sm font-semibold">{formatDayHeading(dayDate)}</h2>
              <span className="text-xs text-muted-foreground">{count} events</span>
            </div>

            <div className="pb-2">
              {g.comps.map(([title, items]) => (
                <CompetitionSection
                  key={`${g.day}:${title}`}
                  title={title}
                  items={items}
                  channelsById={channelsById}
                  tilesEnabledByEventId={tilesEnabledByEventId}
                  isFavouritedByEventId={isFavouritedByEventId}
                  onToggleTiles={onToggleTiles}
                  onClearEventUi={onClearEventUi}
                  onQuickAction={onQuickAction}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
