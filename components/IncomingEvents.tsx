"use client";

import React from "react";
import IncomingEvents from "./IncomingEvents";
import Calendar from "./Calendar";

const EventsCalendar: React.FC = () => {
  return (
    <aside className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col self-stretch my-auto max-md:mt-10 max-md:max-w-full">
        <IncomingEvents />
        <Calendar />
      </div>
    </aside>
  );
};

export default EventsCalendar;
