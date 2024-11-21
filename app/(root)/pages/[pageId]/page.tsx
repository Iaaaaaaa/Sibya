"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  Plus,
  MoreHorizontal,
  X,
  Edit,
  Trash,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  page: {
    name: string;
    profilePhoto: string | null;
  };
}

export default function PageView() {
  const [page, setPage] = useState<Page | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  const { pageId } = useParams();
  const { user } = useUser();

  useEffect(() => {
    if (pageId) {
      fetchPage();
      fetchEvents();
    }
  }, [pageId]);

  const fetchPage = async () => {
    try {
      const response = await fetch(`/api/pages/${pageId}`);
      if (!response.ok) {
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
      }
      const data = await response.json();
      setEvents(data);
      setError(null);
    } catch (error) {}
  };

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
      const url = isEditMode
        ? `/api/pages/${pageId}/events/${editingEventId}`
        : `/api/pages/${pageId}/create-event`;
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          isEditMode ? "Failed to update event" : "Failed to create event"
        );
      }

      const updatedEvent = await response.json();

      if (isEditMode) {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === editingEventId ? updatedEvent : event
          )
        );
      } else {
        setEvents((prevEvents) => [updatedEvent, ...prevEvents]);
      }

      resetForm();
    } catch (error) {
      console.error(
        isEditMode ? "Error updating event:" : "Error creating event:",
        error
      );
      setError(
        isEditMode ? "Failed to update event." : "Failed to create event."
      );
    }
  };

  const handleEditEvent = (eventId: string) => {
    const eventToEdit = events.find((event) => event._id === eventId);
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setDescription(eventToEdit.description);
      setDate(eventToEdit.date);
      setTime(eventToEdit.time);
      setDepartment(eventToEdit.department);
      setEditingEventId(eventId);
      setIsEditMode(true);
      setIsModalOpen(true);
    }
  };

  const handleDeleteEvent = async () => {
    if (!eventToDelete) return;

    try {
      const response = await fetch(
        `/api/pages/${pageId}/events/${eventToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventToDelete)
      );
      setEventToDelete(null);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting event:", error);
      setError("Failed to delete event.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    setDepartment("");
    setImage(null);
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingEventId(null);
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

  const isPageCreator = user && user.id === page.creator;

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
              <h2 className="text-2xl font-semibold">{page.name}</h2>
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
        {isPageCreator && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setIsEditMode(false);
                  resetForm();
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {isEditMode ? "Edit Event" : "Create Event"}
                </DialogTitle>
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
                  <Select onValueChange={setDepartment} value={department}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CCIS">CCIS</SelectItem>
                      <SelectItem value="CHASS">CHASS</SelectItem>
                      <SelectItem value="CED">CED</SelectItem>
                      <SelectItem value="CMNS">CMNS</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Button type="submit">
                    {isEditMode ? "Update" : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="space-y-8">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="container mx-auto py-8">
              <Card className="w-full max-w-2xl mx-auto">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={page.profilePhoto || "/default-avatar.png"}
                        alt={page.name || "Unknown"}
                      />
                      <AvatarFallback>
                        {page.name ? page.name[0]?.toUpperCase() : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{page.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {isPageCreator && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEditEvent(event._id)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setEventToDelete(event._id);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
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
                            alt="Event Image"
                            className="w-full h-auto rounded-md object-cover max-h-96"
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full h-full flex items-center justify-center">
                        <DialogTitle>
                          <VisuallyHidden>Event Image</VisuallyHidden>
                        </DialogTitle>
                        <Button
                          className="absolute top-2 right-2 rounded-full p-2"
                          variant="ghost"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <img
                          src={event.image}
                          alt="Full size event image"
                          className="max-w-full max-h-full object-contain"
                        />
                      </DialogContent>
                    </Dialog>
                  )}
                </CardContent>
              </Card>
            </div>
          ))
        ) : (
          <div className="container mx-auto py-8">
            <p className="text-center text-muted-foreground">
              No events found.
            </p>
          </div>
        )}
      </div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this event?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              event.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteEvent}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
