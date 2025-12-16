// app/live-events/page.tsx
import { LiveEventsClient } from "./_components/LiveEventsClient";
import { liveEvents, tvChannels } from "./_data/mockLiveEvents";

export default function LiveEventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <LiveEventsClient initialEvents={liveEvents} tvChannels={tvChannels} />
    </div>
  );
}
