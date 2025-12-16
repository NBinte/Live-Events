// app/live-events/_components/MatchCenterPanels.tsx
"use client";

import * as React from "react";
import type { LiveEvent, MatchEvent, MatchOdd, MatchStat } from "../_data/mockLiveEvents";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, BarChart3, Activity, List } from "lucide-react";

type TabKey = "events" | "odds" | "stats";

function defaultTabFor(evt: LiveEvent): TabKey {
  if (evt.status === "live") return "events";
  if (evt.status === "upcoming") return "odds";
  return "stats";
}

function StatRow({ s }: { s: MatchStat }) {
  const total = (s.home ?? 0) + (s.away ?? 0);
  const homePct = total > 0 ? (s.home / total) * 100 : 50;
  const awayPct = 100 - homePct;

  return (
    <div className="rounded-xl border bg-white/60 p-3">
      <div className="flex items-center justify-between gap-3 text-sm">
        <div className="font-medium">{s.label}</div>
        <div className="text-muted-foreground">
          {s.home}
          {s.unit ?? ""} — {s.away}
          {s.unit ?? ""}
        </div>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div className="flex h-full w-full">
          <div className="h-full bg-slate-900/80" style={{ width: `${homePct}%` }} />
          <div className="h-full bg-slate-500/50" style={{ width: `${awayPct}%` }} />
        </div>
      </div>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border bg-muted/20 p-4 text-sm text-muted-foreground">
      <AlertTriangle className="h-4 w-4" />
      {label}
    </div>
  );
}

function EventsPanel({ events }: { events?: MatchEvent[] }) {
  if (!events?.length) return <EmptyState label="No match events available." />;

  const sorted = [...events].sort((a, b) => a.minute - b.minute);

  return (
    <div className="space-y-2">
      {sorted.map((e, idx) => (
        <div key={`${e.minute}-${idx}`} className="flex items-start gap-3 rounded-xl border bg-white/60 p-3">
          <Badge variant="secondary" className="rounded-full">
            {e.minute}'
          </Badge>
          <div className="min-w-0">
            <div className="text-sm font-medium capitalize">{e.type}</div>
            <div className="text-sm text-muted-foreground">{e.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function OddsPanel({ odds }: { odds?: MatchOdd[] }) {
  if (!odds?.length) return <EmptyState label="No odds available." />;

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {odds.map((o) => (
        <div key={o.label} className="rounded-xl border bg-white/60 p-3">
          <div className="text-sm font-medium">{o.label}</div>
          <div className="mt-1 text-2xl font-semibold tracking-tight">{o.value}</div>
          <div className="text-xs text-muted-foreground">Mock odds</div>
        </div>
      ))}
    </div>
  );
}

function StatsPanel({ stats }: { stats?: MatchStat[] }) {
  if (!stats?.length) return <EmptyState label="No stats available." />;

  return (
    <div className="space-y-2">
      {stats.map((s) => (
        <StatRow key={s.label} s={s} />
      ))}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-10 w-full rounded-xl border px-3 text-sm font-medium inline-flex items-center justify-center gap-2",
        "transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400/50",
        active
          ? "bg-slate-900 text-white border-slate-900"
          : "bg-white/60 text-slate-900 hover:bg-white border-slate-200",
      ].join(" ")}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

export function MatchCenterPanels({ evt }: { evt: LiveEvent }) {
  const [tab, setTab] = React.useState<TabKey>(() => defaultTabFor(evt));

  React.useEffect(() => {
    setTab(defaultTabFor(evt));
  }, [evt.id, evt.status]);

  return (
    <div className="rounded-2xl border bg-white/70 p-4 shadow-sm backdrop-blur">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="text-sm font-semibold tracking-tight">Live Match Center</div>
        <div className="text-xs text-muted-foreground">
          {evt.status === "live" && typeof evt.matchMinute === "number" ? (
            <span>
              LIVE • <span className="font-medium">{evt.matchMinute}'</span>
            </span>
          ) : (
            <span className="capitalize">{evt.status}</span>
          )}
        </div>
      </div>

      <Separator className="mb-4" />

      <div className="grid grid-cols-3 gap-2">
        <TabButton active={tab === "events"} onClick={() => setTab("events")} icon={List} label="Events" />
        <TabButton active={tab === "odds"} onClick={() => setTab("odds")} icon={Activity} label="Odds" />
        <TabButton active={tab === "stats"} onClick={() => setTab("stats")} icon={BarChart3} label="Stats" />
      </div>

      <div className="mt-4">
        {tab === "events" ? <EventsPanel events={evt.matchEvents} /> : null}
        {tab === "odds" ? <OddsPanel odds={evt.odds} /> : null}
        {tab === "stats" ? <StatsPanel stats={evt.stats} /> : null}
      </div>
    </div>
  );
}
