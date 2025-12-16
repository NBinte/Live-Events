// app/live-events/_components/CompetitionSection.tsx
import * as React from "react";
import type { LiveEvent, TvChannel } from "../_data/mockLiveEvents";
import { EventRow } from "./EventRow";

type Props = {
  title: string;
  items: LiveEvent[];
  channelsById: Record<string, TvChannel>;

  tilesEnabledByEventId: Record<string, boolean>;
  isFavouritedByEventId: Record<string, boolean>;

  onToggleTiles: (eventId: string) => void;
  onClearEventUi: (eventId: string) => void;
  onQuickAction: (eventId: string, action: "tickets" | "watch" | "share" | "favourite") => void;
};

export function CompetitionSection({
  title,
  items,
  channelsById,
  tilesEnabledByEventId,
  isFavouritedByEventId,
  onToggleTiles,
  onClearEventUi,
  onQuickAction,
}: Props) {
  return (
    <div className="border-t first:border-t-0">
      <div className="flex items-center justify-between gap-3 px-4 py-2">
        <h3 className="text-xs font-semibold text-muted-foreground">{title}</h3>
        <span className="text-xs text-muted-foreground">{items.length}</span>
      </div>

      <ul className="divide-y">
        {items.map((evt) => (
          <li key={evt.id}>
            <EventRow
              evt={evt}
              channelsById={channelsById}
              tilesEnabled={tilesEnabledByEventId[evt.id] ?? true}
              isFavourited={isFavouritedByEventId[evt.id] ?? false}
              onToggleTiles={onToggleTiles}
              onClearEventUi={onClearEventUi}
              onQuickAction={onQuickAction}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
