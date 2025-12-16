"use client";

import * as React from "react";
import type { LiveEvent } from "../_data/mockLiveEvents";
import { Ticket, MapPin, ShoppingBag, Tv, BookOpen, MessageCircle, Share, Star } from "lucide-react";

type Props = {
  evt: LiveEvent;
  onQuickAction: (eventId: string, action: "tickets" | "watch" | "share" | "favourite") => void;
};

type ActionBtnProps = {
  label: string;
  Icon: React.ElementType;
  onClick: () => void;
  variant?: "primary" | "secondary";
};

function ActionBtn({ label, Icon, onClick, variant = "secondary" }: ActionBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-9 rounded-lg px-3 text-sm font-medium inline-flex items-center gap-2 border transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-slate-400/40",
        variant === "primary"
          ? "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700"
          : "bg-white/70 text-slate-900 border-slate-200 hover:bg-white",
      ].join(" ")}
    >
      <Icon className="h-4 w-4" />
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

export function EventActionBar({ evt, onQuickAction }: Props) {
  const a = evt.actions ?? {};

  return (
    <div className="flex flex-wrap items-center gap-2">
      {a.buyTickets ? (
        <ActionBtn label="Buy tickets" Icon={Ticket} variant="primary" onClick={() => onQuickAction(evt.id, "tickets")} />
      ) : null}

      {a.planTrip ? (
        <ActionBtn label="Plan a trip" Icon={MapPin} onClick={() => onQuickAction(evt.id, "share")} />
      ) : null}

      {a.shop ? (
        <ActionBtn label="Shop" Icon={ShoppingBag} onClick={() => onQuickAction(evt.id, "share")} />
      ) : null}

      {a.engage ? (
        <ActionBtn label="Engage" Icon={MessageCircle} onClick={() => onQuickAction(evt.id, "share")} />
      ) : null}

      {a.watchOnline ? (
        <ActionBtn label="Watch online / TV" Icon={Tv} onClick={() => onQuickAction(evt.id, "watch")} />
      ) : null}

      {a.readMore ? (
        <ActionBtn label="Read & listen more" Icon={BookOpen} onClick={() => onQuickAction(evt.id, "share")} />
      ) : null}

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={() => onQuickAction(evt.id, "share")}
          className="h-9 w-9 rounded-lg border border-slate-200 bg-white/70 hover:bg-white inline-flex items-center justify-center
                     focus:outline-none focus:ring-2 focus:ring-slate-400/40"
          aria-label="Share"
        >
          <Share className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => onQuickAction(evt.id, "favourite")}
          className="h-9 w-9 rounded-lg border border-slate-200 bg-white/70 hover:bg-white inline-flex items-center justify-center
                     focus:outline-none focus:ring-2 focus:ring-slate-400/40"
          aria-label="Add to favourites"
        >
          <Star className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
