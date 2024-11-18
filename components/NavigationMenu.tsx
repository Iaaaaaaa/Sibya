"use client";

import React from "react";

interface MenuItem {
  icon: string;
  label: string;
  isActive?: boolean;
}

const menuItems: MenuItem[] = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/69d26e7d3134467f9c216eb5f38b89f7/1cf0f32e184318d171aa267e2584cde40e92d4cbce73bfd82cc19ea5f49841c3?apiKey=69d26e7d3134467f9c216eb5f38b89f7&",
    label: "News Feed",
    isActive: true,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/69d26e7d3134467f9c216eb5f38b89f7/433c9caf26e447836939d394221a2013758e1b3d4b53ce79f1e16cb909ae5d49?apiKey=69d26e7d3134467f9c216eb5f38b89f7&",
    label: "Calendar",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/69d26e7d3134467f9c216eb5f38b89f7/01e338e68bb9f5a7ed94f1b4a9a40274d348a6046ae9677c4a55fcf110d1bb99?apiKey=69d26e7d3134467f9c216eb5f38b89f7&",
    label: "Website",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/69d26e7d3134467f9c216eb5f38b89f7/1993485997bf3aedf93d1f98c46b749724d6817a24dc2048310f7283cda99a53?apiKey=69d26e7d3134467f9c216eb5f38b89f7&",
    label: "Settings",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/69d26e7d3134467f9c216eb5f38b89f7/db6bb4dcbee25dc6ea33d209ecd92d743fb69dcede0c3bff7da12f89c9a4de13?apiKey=69d26e7d3134467f9c216eb5f38b89f7&",
    label: "Log out",
  },
];

const NavigationMenu: React.FC = () => {
  return (
    <nav className="w-full mt-20">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`flex gap-5 px-14 py-4 mt-5 text-base font-semibold text-black ${
            item.isActive ? "bg-green-200 rounded-xl" : ""
          } max-md:px-5`}
        >
          <img
            loading="lazy"
            src={item.icon}
            alt=""
            className="object-contain shrink-0 aspect-square w-[18px]"
          />
          <div className="basis-auto">{item.label}</div>
        </div>
      ))}
    </nav>
  );
};

export default NavigationMenu;
