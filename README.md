# Live Events – Merged Layout Assessment

A responsive **Live Events** page built with **Next.js (App Router)** and **Tailwind CSS**, merging two provided layouts into a single, feature-complete implementation.

All required elements from both layouts are included, even if visually reorganized for usability.

---

## Features

### Event Listing
- FixtureCalendar-style grouped list
- Events grouped by date and sorted by kickoff time
- Status filters: **All / Live / Upcoming / Finished**
- Debounced search (teams, league, venue)

### Match Center (Per Event)
- Tabbed panels:
  - **Events**
  - **Odds**
  - **Stats**
- Smart default tab:
  - Live → Events
  - Upcoming → Odds
  - Finished → Stats
- Live match minute indicator
- Graceful empty states when data is missing

### Event Actions
- Buy tickets
- Watch online / TV
- Share (Web Share API with clipboard fallback)
- Favourite / unfavourite
- Per-event UI state (tiles on/off, favourite)

### TV Channels
- Desktop right-rail TV Channels list
- Per-event TV Channels card
- Mobile TV Channels drawer
- Free vs Subscription indicators

### Responsive Design
- Desktop: event list + right rail
- Tablet: stacked layout
- Mobile: simplified UI with drawer-based TV channels

---

## Tech Stack

- Next.js 13+ (App Router)
- React 18
- Tailwind CSS
- shadcn/ui
- Lucide Icons
- Mock data (no external APIs)

---

## Project Structure

app/
  live-events/
  page.tsx
  _data/
    mockLiveEvents.ts
  _components/
    LiveEventsClient.tsx
    EventsList.tsx
    EventRow.tsx
    MatchCenterPanels.tsx
    EventActionBar.tsx
    EventTopBar.tsx
    MobileTvSheet.tsx
    QuickTiles.tsx

---

## Running Locally

```bash
npm install
npm run dev

Open: 
http://localhost:3000/live-events

```

---

## Accessibility

- Semantic HTML
- Keyboard-accessible controls
- ARIA labels and roles
- Screen-reader friendly empty states
- Performance Notes
- App Router with server/client separation
- Memoized filtering and grouping
- Debounced search input
- Minimal re-renders
- No unsafe HTML or inline scripts

---

## Design Decisions

- Tabs are used instead of stacked panels to prevent excessive vertical height
- All layout requirements are included, even if visually rearranged
- UI state is client-side only (assessment scope)
- Design favors clarity and real-world sports usage patterns

## Assumptions

- Data is mocked and trusted
- Authentication and persistence are out of scope
- Share and favourite actions are UI-level only
