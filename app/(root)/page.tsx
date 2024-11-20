"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { ThumbsUp, MessageCircle, Share2, X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Event {
  _id: string;
  title: string;
  description: string;
  image?: string;
  date: string;
  page: {
    _id: string;
    name: string;
    profilePhoto: string;
  };
}

export default function PostDirectory() {
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
        setEvents(data.filter((event) => event.page)); // Filter out posts without a page
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
      <div className="container mx-auto py-8 text-center">Loading ...</div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event._id} className="container mx-auto py-8">
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader className="flex flex-row items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={event.page?.profilePhoto || "/default-avatar.png"}
                    alt={event.page?.name || "Unknown"}
                  />
                  <AvatarFallback>
                    {event.page?.name ? event.page.name[0]?.toUpperCase() : "?"}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="text-sm font-medium">{event.page.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(event.date).toLocaleString()}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <h4 className="text-xl font-semibold">{event.title}</h4>
                <p className="text-muted-foreground">{event.description}</p>
                {event.image && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer">
                        <img
                          src={event.image}
                          alt="Post Image"
                          className="w-full h-auto rounded-md object-cover max-h-96"
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-full h-full flex items-center justify-center">
                      <DialogTitle>
                        <VisuallyHidden>Post Image</VisuallyHidden>
                      </DialogTitle>
                      <Button
                        className="absolute top-2 right-2 rounded-full p-2"
                        variant="ghost"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <img
                        src={event.image}
                        alt="Full size post image"
                        className="max-w-full max-h-full object-contain"
                      />
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Like
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Comment
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))
      ) : (
        <div className="container mx-auto py-8">
          <p className="text-center text-muted-foreground">No Events found.</p>
        </div>
      )}
    </div>
  );
}
