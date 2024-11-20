"use client";

import React from "react";

const Calendar: React.FC = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <section className="flex flex-col px-14 py-10 mt-7 w-full text-base bg-white rounded-xl shadow-[0px_4px_15px_rgba(0,0,0,0.1)] max-md:px-5 max-md:mr-2 max-md:max-w-full">
      <div className="flex gap-10 items-center self-center max-w-full text-xl font-medium text-zinc-800 w-[277px]">
        <button aria-label="Previous month">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/69d26e7d3134467f9c216eb5f38b89f7/8bfe3a00ec32bc2799fac66dedddf3668bdd39c5460ecf477a963405a8ab97bf?apiKey=69d26e7d3134467f9c216eb5f38b89f7&"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto aspect-[0.65] w-[11px]"
          />
        </button>
        <div className="grow shrink self-stretch w-[158px]">December 2024</div>
        <button aria-label="Next month">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/69d26e7d3134467f9c216eb5f38b89f7/d0fc01ff1c8a06bb633d7620ee897c73b06dadac3436dd54a53121400a65c6bd?apiKey=69d26e7d3134467f9c216eb5f38b89f7&"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-2.5 aspect-[0.59]"
          />
        </button>
      </div>
      Continuing from where we left off:
      <div className="flex gap-4 mt-8 whitespace-nowrap text-zinc-800 max-md:mr-0.5">
        {days.map((day, index) => (
          <div key={index} className="grow">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-4">
        {dates.map((date, index) => {
          let className =
            "flex items-center justify-center h-[35px] w-[35px] uppercase";
          if (date === 7) className += " text-white bg-green-300 rounded-full";
          if (date === 11) className += " text-white bg-green-300 rounded-full";
          if (date === 20) className += " text-white bg-lime-700 rounded-full";
          if (date === 21) className += " text-white bg-red-700 rounded-full";
          if (date === 22)
            className += " text-white bg-yellow-400 rounded-full";
          if (date === 24 || date === 25)
            className += " text-white bg-green-300 rounded-full";
          if (date === 31) className += " text-white bg-green-300 rounded-full";

          return (
            <div key={index} className={className}>
              {date}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Calendar;
