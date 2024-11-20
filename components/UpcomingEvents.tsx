"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Event {
  _id: string;
  image: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  time?: string;
  isActive?: boolean;
}

export default function UpcomingEvents() {
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

        // Sort events by the date field in ascending order (earliest first)
        const sortedEvents = data.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        const updatedEvents = sortedEvents.map((event) => {
          const daysToGo = Math.ceil(
            (new Date(event.date).getTime() - Date.now()) /
              (1000 * 60 * 60 * 24)
          );
          return {
            ...event,
            status: daysToGo > 0 ? `${daysToGo} days to go` : "Event passed",
            isActive: daysToGo > 0,
          };
        });

        setEvents(updatedEvents);
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

  if (loading) {
    return (
      <ScrollArea className="h-full w-full">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center space-x-4 mb-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[160px]" />
            </div>
          </div>
        ))}
      </ScrollArea>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full w-full pr-4">
      {events.map((event) => (
        <div
          key={event._id}
          className={`flex items-center space-x-4 p-4 rounded-lg mb-4 ${
            event.isActive ? "bg-green-100 dark:bg-green-900" : "bg-muted"
          }`}
        >
          <img
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            className="h-16 w-16 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {event.title}
            </p>
            <p className="text-sm text-muted-foreground">
              <CalendarIcon className="inline-block w-4 h-4 mr-1" />
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1 truncate">
              {event.description}
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant={event.isActive ? "default" : "secondary"}
              >
                View
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{event.title}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="col-span-4 w-full h-48 object-contain rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h1>DATE:</h1>
                  <div className="flex col-span-3">
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                </div>

                <div className="grid grid-cols-4  items-center gap-4">
                  <span>Description:</span>
                  <div className="flex col-span-2">{event.description}</div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </ScrollArea>
  );
}
