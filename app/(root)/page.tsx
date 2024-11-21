"use client";

import { useEffect, useState } from "react";
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
  DialogClose,
} from "@/components/ui/dialog";
import { ThumbsUp, MessageCircle, Share2, X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useUser } from "@clerk/nextjs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface Event {
  _id: string;
  title: string;
  description: string;
  department: string;
  image?: string;
  date: string;
  likes: string[];
  page: {
    _id: string;
    name: string;
    profilePhoto: string;
  };
  comments: Comment[];
}

interface Comment {
  _id: string;
  text: string;
  commenter: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePhoto: string;
  };
  createdAt: string;
}

export default function PostDirectory() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const [newComment, setNewComment] = useState<string>("");
  const [commentingEventId, setCommentingEventId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data: Event[] = await response.json();
        setEvents(data.filter((event) => event.page));

        // Fetch comments for each event
        const eventsWithComments = await Promise.all(
          data.map(async (event) => {
            const commentsResponse = await fetch(
              `/api/events/${event._id}/comments`
            );
            if (commentsResponse.ok) {
              const comments = await commentsResponse.json();
              return { ...event, comments };
            }
            return event;
          })
        );
        setEvents(eventsWithComments.filter((event) => event.page));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        toast({
          title: "Error",
          description: "Failed to load events. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleLikeUnlike = async (eventId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to like events.",
        variant: "destructive",
      });
      return;
    }

    const userId = user.id;
    const event = events.find((e) => e._id === eventId);
    const isLiked = event?.likes.includes(userId);

    try {
      const response = await fetch(
        `/api/events/${eventId}/${isLiked ? "unlike" : "like"}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to ${isLiked ? "unlike" : "like"} event`);
      }

      const { likes } = await response.json();

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId ? { ...event, likes } : event
        )
      );

      toast({
        title: isLiked ? "Event Unliked" : "Event Liked",
        description: isLiked
          ? "You have unliked this event."
          : "You have liked this event.",
      });
    } catch (err) {
      console.error(`Error ${isLiked ? "unliking" : "liking"} event:`, err);
      toast({
        title: "Error",
        description: `Failed to ${
          isLiked ? "unlike" : "like"
        } event. Please try again.`,
        variant: "destructive",
      });
    }
  };

  const handleCommentSubmit = async (eventId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to comment.",
        variant: "destructive",
      });
      return;
    }

    if (!newComment.trim()) {
      toast({
        title: "Empty Comment",
        description: "Please enter a comment before submitting.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`/api/events/${eventId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newComment,
          userId: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      const newCommentData: Comment = await response.json();
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId
            ? {
                ...event,
                comments: [newCommentData, ...(event.comments || [])],
              }
            : event
        )
      );
      setNewComment("");
      setCommentingEventId(null);
      toast({
        title: "Comment Posted",
        description: "Your comment has been successfully posted.",
      });
    } catch (err) {
      console.error("Error submitting comment:", err);
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async (event: Event) => {
    const shareData = {
      title: event.title,
      text: event.description,
      url: `${window.location.origin}/events/${event._id}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: "Shared Successfully",
          description: "The event has been shared.",
        });
      } else {
        // Fallback for browsers that don't support the Web Share API
        await navigator.clipboard.writeText(
          `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`
        );
        toast({
          title: "Link Copied",
          description: "The event link has been copied to your clipboard.",
        });
      }
    } catch (err) {
      console.error("Error sharing event:", err);
      toast({
        title: "Error",
        description: "Failed to share the event. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isEventLiked = (event: Event) => {
    return user ? event.likes.includes(user.id) : false;
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center">
        Loading events...
      </div>
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
                    src={
                      event.page?.profilePhoto ||
                      "/placeholder.svg?height=48&width=48"
                    }
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
                <p className="text-sm text-muted-foreground">
                  Department: {event.department}
                </p>
                {event.image && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer">
                        <img
                          src={event.image}
                          alt="Event Image"
                          className="w-full h-auto rounded-md object-cover max-h-96"
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-full h-full flex items-center justify-center">
                      <DialogTitle>
                        <VisuallyHidden>Event Image</VisuallyHidden>
                      </DialogTitle>
                      <DialogClose className="absolute top-2 right-2 rounded-full p-2">
                        <X className="h-4 w-4" />
                      </DialogClose>
                      <img
                        src={event.image}
                        alt="Full size event image"
                        className="max-w-full max-h-full object-contain"
                      />
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
              <CardFooter className="flex flex-col items-start border-t pt-4">
                <div className="flex justify-between w-full mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      user
                        ? handleLikeUnlike(event._id)
                        : toast({
                            title: "Authentication Required",
                            description: "Please sign in to like events.",
                            variant: "destructive",
                          })
                    }
                    className={
                      isEventLiked(event)
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "hover:bg-gray-100"
                    }
                  >
                    <ThumbsUp
                      className={`mr-2 h-4 w-4 ${
                        isEventLiked(event) ? "fill-current text-white" : ""
                      }`}
                    />
                    {isEventLiked(event) ? "Liked" : "Like"} (
                    {event.likes.length})
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Comment ({event.comments?.length || 0})
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogTitle>Comments</DialogTitle>
                      <ScrollArea className="h-[300px] pr-4">
                        {event.comments?.map((comment) => (
                          <div
                            key={comment._id}
                            className="flex items-start space-x-4 mb-4"
                          >
                            <Avatar className="w-8 h-8">
                              <AvatarImage
                                src={
                                  comment.commenter.profilePhoto ||
                                  "/placeholder.svg?height=32&width=32"
                                }
                                alt={`${comment.commenter.firstName} ${comment.commenter.lastName}`}
                              />
                              <AvatarFallback>
                                {comment.commenter.firstName[0]}
                                {comment.commenter.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {comment.commenter.firstName}{" "}
                                {comment.commenter.lastName}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {comment.text}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(comment.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </ScrollArea>
                      {user ? (
                        <div className="mt-4">
                          <Textarea
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full mb-2"
                          />
                          <Button
                            onClick={() => handleCommentSubmit(event._id)}
                          >
                            Submit Comment
                          </Button>
                        </div>
                      ) : (
                        <div className="mt-4">
                          <p className="text-sm text-muted-foreground mb-2">
                            Please sign in to comment.
                          </p>
                          <Link href="/sign-in">
                            <Button>Sign In</Button>
                          </Link>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(event)}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
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
