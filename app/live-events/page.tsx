// app/live-events/page.tsx
import { LiveEventsClient } from "./_components/LiveEventsClient";
import { liveEvents, tvChannels } from "./_data/mockLiveEvents";

export default function LiveEventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 antialiased">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-3xl border bg-white/70 p-4 shadow-sm backdrop-blur sm:p-6">
          <LiveEventsClient initialEvents={liveEvents} tvChannels={tvChannels} />
        </div>
      </div>
    </div>
  );
}
