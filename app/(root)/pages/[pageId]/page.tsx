"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  Plus,
  ThumbsUp,
  MessageCircle,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Page {
  _id: string;
  creator: string;
  createdBy: string;
  name: string;
  description: string;
  profilePhoto: string | null;
  coverPhoto: string | null;
  department: string | null;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  department: string;
  image: string | null;
}

export default function PageView() {
  const [page, setPage] = useState<Page | null>(null);
  const [events, setEvent] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { pageId } = useParams();

  useEffect(() => {
    if (pageId) {
      const fetchPage = async () => {
        try {
          const response = await fetch(`/api/pages/${pageId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch page data");
          }
          const data = await response.json();
          setPage(data);
        } catch (error) {
          setError("An error occurred while fetching the page.");
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      const fetchEvents = async () => {
        try {
          const response = await fetch(`/api/pages/${pageId}/page-events`);
          if (!response.ok) {
            throw new Error("Failed to fetch posts");
          }
          const data = await response.json();
          if (data.length === 0) {
            setEvent([]);
            setError("No posts available for this page.");
          } else {
            setEvent(data);
            setError(null); // Clear any previous error
          }
        } catch (error) {}
      };

      fetchPage();
      fetchEvents();
    }
  }, [pageId]);

  const handlePostSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("department", department);
    if (image) formData.append("image", image);

    try {
      const response = await fetch(`/api/pages/${pageId}/create-event`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const newEvent = await response.json();
      console.log("Post created:", newEvent);

      setEvent((prevEvent) => [newEvent, ...prevEvent]);

      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
      setDepartment("");
      setImage(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Failed to create post.");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 space-y-4">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-24 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="container mx-auto p-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>
            The requested page could not be found.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{page.name}</CardTitle>
          {page.department && (
            <CardDescription className="text-lg">
              {page.department}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {page.coverPhoto && (
            <div className="relative h-64 w-full">
              <img
                src={page.coverPhoto}
                alt="Cover Photo"
                className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          )}
          <div className="flex items-center">
            <Avatar className="h-20 w-20 mr-4">
              <AvatarImage
                src={page.profilePhoto || undefined}
                alt={page.name}
              />
              <AvatarFallback>{page.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">{page.creator}</h2>
              <p className="text-muted-foreground">{page.createdBy}</p>
            </div>
          </div>
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold">Description</h3>
            <p>{page.description}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Events</h3>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Post</DialogTitle>
            </DialogHeader>
            <form onSubmit={handlePostSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    type="time"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input
                  type="file"
                  id="image"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {events.length > 0 ? (
        <div className="space-y-6">
          {events.map((event) => (
            <Card key={event._id}>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{event.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{event.description}</p>
                {event.image && (
                  <img
                    src={event.image}
                    alt="Event image"
                    className="mt-4 w-full h-auto object-cover rounded-md"
                  />
                )}
              </CardContent>
              <CardFooter>
                <div className="flex space-x-4">
                  <Button variant="link" size="icon">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button variant="link" size="icon">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="link" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="link" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}
