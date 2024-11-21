"use client";

import { Flag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Footer() {
  const router = useRouter();

  const handleClick = async () => {
    // Navigate to the root path or the desired destination
    await router.push("/"); // Adjust the path if needed

    // Reload the page once the navigation is complete
    window.location.assign("/");
  };
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white shadow-[0px_-4px_15px_rgba(0,0,0,0.25)] max-md:block hidden px-4 py-2">
      <nav className="p-4">
        <ul className="flex justify-between w-full">
          {/* News Feed Button */}
          <li>
            <button
              onClick={handleClick}
              className="flex justify-center p-3 text-gray-700 rounded focus:outline-none"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/69d26e7d3134467f9c216eb5f38b89f7/1cf0f32e184318d171aa267e2584cde40e92d4cbce73bfd82cc19ea5f49841c3?apiKey=69d26e7d3134467f9c216eb5f38b89f7&"
                alt="News Feed"
                className="w-6 h-6 mr-3"
              />
            </button>
          </li>

          <li>
            <Link
              href={"/pages"}
              className="flex justify-center p-3 text-gray-700 rounded focus:outline-none"
            >
              <Flag />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
