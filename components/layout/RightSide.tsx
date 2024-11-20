"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Calendar from "@/components/Calendar";
import UpcomingEvents from "@/components/UpcomingEvents";

const RightSide = () => {
  return (
    <aside className="hidden lg:flex fixed top-0 right-0 w-[30%] h-screen border-l border-border bg-background flex-col p-6 shadow-lg z-40 overflow-hidden">
      <div className="flex flex-col justify-between h-full space-y-4">
        {/* Incoming Events */}
        <Card className="overflow-hidden flex flex-col h-[calc(65vh-2rem)] mt-24">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <UpcomingEvents />
          </CardContent>
        </Card>
        {/* Events Calendar */}
        <div className="flex-grow">
          <Calendar />
        </div>
      </div>
    </aside>
  );
};

export default RightSide;
