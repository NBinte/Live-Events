// app/live-events/_components/EventTopBar.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Eraser, Zap, MoreVertical } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  eventId: string;
  tilesEnabled: boolean;
  onToggleTiles: () => void;
  onClear: () => void;
  compact?: boolean;
};

function SettingsPanel({
  tilesEnabled,
  onToggleTiles,
  onClear,
}: {
  tilesEnabled: boolean;
  onToggleTiles: () => void;
  onClear: () => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm font-semibold">Event settings</div>
        <div className="text-xs text-muted-foreground">
          Mock controls for assessment completeness.
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <Label className="text-sm">Quick tiles</Label>
          <div className="text-xs text-muted-foreground">
            Enable/disable quick action tiles.
          </div>
        </div>
        <Switch checked={tilesEnabled} onCheckedChange={() => onToggleTiles()} />
      </div>

      <div className="flex justify-end">
        <Button variant="outline" size="sm" className="gap-2" onClick={onClear}>
          <Eraser className="h-4 w-4" />
          Clear event UI state
        </Button>
      </div>
    </div>
  );
}

export function EventTopBar({
  eventId,
  tilesEnabled,
  onToggleTiles,
  onClear,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Badge variant="outline" className="rounded-full text-[11px]">
        ID: {eventId}
      </Badge>

      {/* Desktop / tablet buttons */}
      <div className="hidden sm:flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-2 px-3 text-xs"
              aria-label="Event settings"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-72">
            <SettingsPanel
              tilesEnabled={tilesEnabled}
              onToggleTiles={onToggleTiles}
              onClear={onClear}
            />
          </PopoverContent>
        </Popover>

        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 px-3 text-xs"
          onClick={onClear}
        >
          <Eraser className="h-4 w-4" />
          Clear
        </Button>

        <Button
          variant={tilesEnabled ? "default" : "outline"}
          size="sm"
          className="h-8 gap-2 px-3 text-xs"
          onClick={onToggleTiles}
          aria-pressed={tilesEnabled}
        >
          <Zap className="h-4 w-4" />
          {tilesEnabled ? "Tiles: On" : "Tiles: Off"}
        </Button>
      </div>

      {/* Mobile “⋯” */}
      <div className="sm:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8" aria-label="Event options">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-72">
            <div className="space-y-3">
              <div className="text-sm font-semibold">Options</div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4" />
                  Quick tiles
                </div>
                <Switch checked={tilesEnabled} onCheckedChange={() => onToggleTiles()} />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={onClear}>
                  <Eraser className="h-4 w-4" />
                  Clear
                </Button>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-72">
                    <SettingsPanel
                      tilesEnabled={tilesEnabled}
                      onToggleTiles={onToggleTiles}
                      onClear={onClear}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="text-xs text-muted-foreground">
                Compact menu on mobile for cleaner layout.
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
