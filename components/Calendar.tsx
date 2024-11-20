"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Event {
  _id: string;
  title: string;
  date: string; // Should be in ISO format
  department: string;
}

const departmentColors: Record<string, string> = {
  CCIS: "bg-green-500",
  CHASS: "bg-blue-500",
  CED: "bg-yellow-500",
  CMNS: "bg-red-500",
};

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data: Event[] = await response.json();
        setEvents(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Group events by date
  const eventsByDate = events.reduce((acc, event) => {
    const date = new Date(event.date);
    date.setDate(date.getDate() - 1); // Adjust date by subtracting 1 day
    const dateString = date.toISOString().split("T")[0];
    if (!acc[dateString]) {
      acc[dateString] = {};
    }
    if (!acc[dateString][event.department]) {
      acc[dateString][event.department] = [];
    }
    acc[dateString][event.department].push(event);
    return acc;
  }, {} as Record<string, Record<string, Event[]>>);

  const getDayBackgroundColor = (day: Date): string => {
    const dateString = day.toISOString().split("T")[0];
    const eventsForDay = eventsByDate[dateString];

    if (!eventsForDay) return "bg-white"; // Default background for no events

    const primaryDepartment = Object.keys(eventsForDay)[0];
    return departmentColors[primaryDepartment] || "bg-gray-300";
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Events Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[350px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Events Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-500 py-5">Error: {error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <CalendarComponent
          mode="single"
          className="rounded-md mt-2 w-full"
          components={{
            DayContent: (props) => (
              <div
                className={cn(
                  "relative flex items-center justify-center w-full h-full rounded-md",
                  getDayBackgroundColor(props.date)
                )}
              >
                <span className="flex items-center justify-center w-8 h-8 text-sm">
                  {props.date.getDate()}
                </span>
              </div>
            ),
          }}
        />
        <div className="mt-4 flex flex-wrap gap-4">
          {Object.entries(departmentColors).map(([department, color]) => (
            <div key={department} className="flex items-center">
              <div className={cn("w-3 h-3 rounded-full mr-2", color)} />
              <span className="text-sm">{department}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Calendar;
