"use client";

import React, { useState, useEffect } from "react";
import { UserButton, useUser, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flag, User, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Sidebar() {
  const router = useRouter();
  const { isSignedIn, user, isLoaded } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClick = async () => {
    await router.push("/");
    window.location.assign("/");
  };

  const handleSignOut = () => {
    router.push("/sign-in");
  };

  if (!isLoaded || !isClient) {
    return (
      <aside className="fixed top-0 left-0 z-40 hidden w-80 h-full bg-white shadow-md lg:block">
        <nav className="p-4">
          <div className="flex justify-center pb-5 mt-32 mb-4 border-b">
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
          <ul className="flex flex-col h-full gap-4">
            <li>
              <Skeleton className="h-12 w-full" />
            </li>
            <li>
              <Skeleton className="h-12 w-full" />
            </li>
          </ul>
        </nav>
      </aside>
    );
  }

  return (
    <aside className="fixed top-0 left-0 z-40 hidden w-80 h-full bg-white shadow-md lg:block">
      <nav className="p-4">
        {/* User Button or Guest Profile */}
        <div className="flex justify-center pb-5 mt-32 mb-4 border-b">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/sign-in" />
          ) : (
            <Button variant="ghost" className="w-10 h-10 rounded-full">
              <User className="w-6 h-6" />
            </Button>
          )}
        </div>

        <ul className="flex flex-col h-full gap-4">
          {/* News Feed Button */}
          <li>
            <button
              className="flex justify-center w-full p-3 text-gray-700 rounded hover:bg-[#CCECCC] focus:outline-none"
              onClick={handleClick}
            >
              <Home className="w-6 h-6 mr-3" />
              <span className="text-black">News Feed</span>
            </button>
          </li>

          {/* Pages Link */}
          <li>
            <Link
              href="/pages"
              className="flex justify-center w-full p-3 text-gray-700 rounded hover:bg-[#CCECCC] focus:outline-none"
            >
              <Flag className="w-6 h-6 mr-3" />
              <span className="text-black">Pages</span>
            </Link>
          </li>

          {/* Sign In Link for Guests */}
          {!isSignedIn && (
            <li>
              <Link
                href="/sign-in"
                className="flex justify-center w-full p-3 text-gray-700 rounded hover:bg-[#CCECCC] focus:outline-none"
              >
                <User className="w-6 h-6 mr-3" />
                <span className="text-black">Sign In</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
}
