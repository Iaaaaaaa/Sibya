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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PlusCircle,
  Users,
  ThumbsUp,
  MessageCircle,
  Share2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Page {
  _id: string;
  name: string;
  description: string;
  followers?: number;
  profilePhoto?: string;
  coverPhoto?: string;
}

export default function PageDirectory() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    profilePhoto: null as File | null,
    coverPhoto: null as File | null,
    department: "",
  });

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch("/api/pages");
        if (!response.ok) {
          throw new Error("Failed to fetch pages");
        }
        const data: Page[] = await response.json();
        setPages(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "profilePhoto" | "coverPhoto"
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setForm((prev) => ({ ...prev, [field]: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    if (form.profilePhoto) formData.append("profilePhoto", form.profilePhoto);
    if (form.coverPhoto) formData.append("coverPhoto", form.coverPhoto);
    formData.append("department", form.department);

    try {
      const response = await fetch("/api/pages/create-page", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const page = await response.json();
        setPages((prevPages) => [...prevPages, page]);
        setIsModalOpen(false);
        setForm({
          name: "",
          description: "",
          profilePhoto: null,
          coverPhoto: null,
          department: "",
        });
        toast({
          title: "Success",
          description: "Page created successfully",
        });
      } else {
        const errorText = await response.text();
        toast({
          title: "Error",
          description: `Failed to create page: ${errorText}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center">Loading pages...</div>
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
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="space-x-4">
          <Link className="ml-3" href="/yourpages" passHref>
            <Button variant="outline"> Your Pages</Button>
          </Link>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="justify-end">
                <PlusCircle className="w-4 h-4 mr-2" /> Create Page
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Page</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Page Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="profilePhoto">Profile Photo</Label>
                  <Input
                    id="profilePhoto"
                    name="profilePhoto"
                    type="file"
                    onChange={(e) => handleFileChange(e, "profilePhoto")}
                  />
                </div>
                <div>
                  <Label htmlFor="coverPhoto">Cover Photo</Label>
                  <Input
                    id="coverPhoto"
                    name="coverPhoto"
                    type="file"
                    onChange={(e) => handleFileChange(e, "coverPhoto")}
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department (optional)</Label>
                  <Input
                    id="department"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit">Create Page</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {pages.length > 0 ? (
        <div className="space-y-6">
          {pages.map((page) => (
            <Card key={page._id} className="overflow-hidden">
              {page.coverPhoto && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={page.coverPhoto}
                    alt={`${page.name} cover`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader className="flex flex-row items-center space-x-4">
                <Avatar className="w-16 h-16 border-4 border-background -mt-8">
                  <AvatarImage src={page.profilePhoto} />
                  <AvatarFallback>{page.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{page.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    <Users className="w-4 h-4 inline mr-1" />
                    {page.followers?.toLocaleString() ?? "0"} followers
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{page.description}</p>
              </CardContent>

              <CardFooter className="pt-0">
                <Link href={`/pages/${page._id}`} passHref className="w-full">
                  <Button variant="outline" className="w-full">
                    View Page
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No pages found.</p>
      )}
    </div>
  );
}
