"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import IncomingEvents from "@/components/IncomingEvents";

const RightSide = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <aside className="hidden lg:flex fixed top-0 right-0 w-[30%] h-screen border-l border-border bg-background flex-col p-6 shadow-lg z-40">
      <div className="flex flex-col h-full space-y-6">
        {/* Incoming Events */}
        <Card className="flex-grow overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Incoming Events</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-3.5rem)] p-0">
            <IncomingEvents />
          </CardContent>
        </Card>

        {/* Events Calendar */}
        <Card className="flex-shrink-0">
          <CardHeader className="pb-2">
            <CardTitle>Events Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>
    </aside>
  );
};

export default RightSide;
