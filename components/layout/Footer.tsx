"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white shadow-[0px_-4px_15px_rgba(0,0,0,0.25)] max-md:block hidden px-4 py-2">
      <nav className="p-4">
        <ul className="flex justify-between w-full">
          {/* News Feed Button */}
          <li>
            <button className="flex justify-center p-3 text-gray-700 rounded focus:outline-none">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/69d26e7d3134467f9c216eb5f38b89f7/1cf0f32e184318d171aa267e2584cde40e92d4cbce73bfd82cc19ea5f49841c3?apiKey=69d26e7d3134467f9c216eb5f38b89f7&"
                alt="News Feed"
                className="w-6 h-6 mr-3"
              />
            </button>
          </li>

          {/* Website Button */}
          <li>
            <button className="flex justify-center p-3 text-gray-700 rounded focus:outline-none">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/69d26e7d3134467f9c216eb5f38b89f7/01e338e68bb9f5a7ed94f1b4a9a40274d348a6046ae9677c4a55fcf110d1bb99?apiKey=69d26e7d3134467f9c216eb5f38b89f7&"
                alt="Website"
                className="w-6 h-6 mr-3"
              />
            </button>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
