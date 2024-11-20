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
import { Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Page {
  _id: string;
  name: string;
  description: string;
  creator?: { name: string; profilePhoto?: string }; // Assuming creator data
  profilePhoto?: string;
  coverPhoto?: string;
}

export default function YourPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Replace this with the actual creatorId from user session or props
  const { creatorId } = useParams(); // Example creator ID

  // Fetch pages data when component mounts
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch(`/api/pages/user`);
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
  }, [creatorId]); // Re-fetch pages if creatorId changes

  if (loading) {
    return <div>Loading pages...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline">Back to Home</Button>
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
                  <AvatarImage
                    src={page.profilePhoto ?? "/default-avatar.png"}
                  />
                  <AvatarFallback>
                    {page.creator?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{page.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    <Users className="w-4 h-4 inline mr-1" />
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
        <p className="text-center text-muted-foreground">No pages available.</p>
      )}
    </div>
  );
}
