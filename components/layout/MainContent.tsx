"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "../SearchBar";
import FeedItem from "../FeedItem";
import PageView from "../../app/(root)/pages/[pageId]/page"; // Import the PageView component
import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isPageDirectory, setIsPageDirectory] = useState(false);
  const [isPosts, setIsPosts] = useState(false);
  const [isPageView, setIsPageView] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the current route is '/pages'
    setIsPageDirectory(pathname === "/pages");
    setIsPosts(pathname === "/");

    // Check if the pathname matches a specific page (e.g., '/pages/[pageId]')
    if (pathname.includes("/pages/")) {
      setIsPageView(true);
    } else if (pathname === "/") {
      setIsPosts(true);
    } else {
      setIsPageView(false);
      setIsPosts(false);
    }
  }, [pathname]);

  return (
    <main className="flex flex-col ml-24 w-[52%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col w-full h-full mt-24 max-md:mt-10 max-md:max-w-full">
        <SearchBar />
        <h1 className="self-start text-3xl font-extrabold leading-none text-lime-950 max-md:mt-10">
          {isPageDirectory
            ? "Pages"
            : isPageView
            ? "Page View"
            : isPosts
            ? "Feed"
            : "No Content"}
        </h1>
        <div className="flex flex-col mt-7 bg-grey-500 rounded-xl shadow-[0px_4px_15px_rgba(0,0,0,0.1)]  max-md:max-w-full ">
          {isPageView ? (
            <PageView />
          ) : children ? (
            children
          ) : (
            <p>No content available</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default MainContent;
