"use client";

import * as React from "react";
import type { TvChannel } from "../_data/mockLiveEvents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tv } from "lucide-react";

type Props = {
  tvChannels: TvChannel[];
};

export function MobileTvSheet({ tvChannels }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" className="gap-2 lg:hidden">
          <Tv className="h-4 w-4" />
          TV Channels
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>TV Channels</SheetTitle>
        </SheetHeader>

        <div className="mt-4 rounded-xl border bg-card">
          <ul className="max-h-[75vh] overflow-auto p-2">
            {tvChannels.map((ch) => (
              <li key={ch.id} className="rounded-lg p-3 hover:bg-muted/50">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{ch.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {ch.region ?? "Global"} •{" "}
                      {ch.isFree ? "Free" : "Subscription"}
                    </div>
                  </div>
                  <Badge variant="outline" className="rounded-full">
                    {ch.id.toUpperCase()}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
