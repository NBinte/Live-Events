// app/live-events/_components/QuickTiles.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Ticket, Tv, Share2, Star } from "lucide-react";

type TileKey = "tickets" | "watch" | "share" | "favourite";

type Props = {
  disabled?: boolean;
  isFavourited: boolean;
  onAction: (key: TileKey) => void;
};

export function QuickTiles({ disabled, isFavourited, onAction }: Props) {
  return (
    <div className="mt-5 flex flex-wrap justify-center gap-2" role="group" aria-label="Quick actions">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-xl bg-background/70 hover:bg-background"
        onClick={() => onAction("tickets")}
        disabled={disabled}
        aria-label="Buy tickets"
      >
        <Ticket className="h-5 w-5" />
      </Button>

      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-xl bg-background/70 hover:bg-background"
        onClick={() => onAction("watch")}
        disabled={disabled}
        aria-label="Watch online or TV"
      >
        <Tv className="h-5 w-5" />
      </Button>

      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-xl bg-background/70 hover:bg-background"
        onClick={() => onAction("share")}
        disabled={disabled}
        aria-label="Share event"
      >
        <Share2 className="h-5 w-5" />
      </Button>

      <Button
        type="button"
        variant={isFavourited ? "default" : "outline"}
        size="icon"
        className="h-10 w-10 rounded-xl"
        onClick={() => onAction("favourite")}
        disabled={disabled}
        aria-label={isFavourited ? "Remove from favourites" : "Add to favourites"}
        aria-pressed={isFavourited}
      >
        <Star className="h-5 w-5" />
      </Button>
    </div>
  );
}
