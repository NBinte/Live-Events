import { LiveEvents } from "@/components/live-events"; // adjust path if different

export default function LiveEventsPage() {
  return (
    <main className="min-h-screen p-6">
      <LiveEvents layout="single" title="Live Events" />
    </main>
  );
}
