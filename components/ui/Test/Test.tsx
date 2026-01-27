"use client"
import React, { useState, useEffect } from "react";
import BookingCard from "../bookingCard";
import { CardContent, CardHeader } from "../card";

export const Test = () => {
  const [date, setDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  // const getRemainingHours = () => {
  //   const now = new Date();
  //   const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  //   const diff = endOfDay.getTime() - now.getTime();
  //   return Math.floor(diff / (1000 * 60 * 60));
  // };

  const generateHourButtons = () => {
    const buttons = [];
    const currentHour = date.getHours();

    for (let i = 0; i < 24; i++) {
      const isDisabled = i <= currentHour || i === currentHour + 1;
      const isSelected = selectedHour === i;

      buttons.push(
        <button
          key={i}
          onClick={() => setSelectedHour(i)}
          disabled={isDisabled}
          className={`m-1 p-2 rounded-md shadow-md ${
            isDisabled ? 'bg-gray-300 text-gray-500' :
            isSelected ? 'bg-blue-500 text-white' : 'bg-slate-200 text-black'
          }`}
        >
          {i.toString().padStart(2, '0')}:00
        </button>
      );
    }
    return buttons;
  };

  return (
    <BookingCard>
      <CardHeader className="bg-slate-600 border-white border-2 text-white rounded-xl font-bold w-[15dvw] mb-10 text-center text-xl">
        Test
      </CardHeader>
      <CardContent className="max-w-fit mx-auto justify-center items-center px-0 md:px-2">
        <section className="border-2 rounded-xl border-slate-200 bg-slate-600 items-center flex flex-col justify-center p-10">
          <p className="mb-2 text-white">Time: {date.toLocaleTimeString()}</p>
          <p className="mb-2 text-white">Date: {date.toLocaleDateString()}</p>
          <div className="my-4 bg-white p-4 rounded-md shadow-md">
            <p className="font-bold text-black mb-2">Select an hour:</p>
            <div className="grid grid-cols-4 justify-center">
              {generateHourButtons()}
            </div>
          </div>
          {selectedHour !== null && (
            <p className="mt-4 text-white">You selected: {selectedHour.toString().padStart(2, '0')}:00</p>
          )}
          {/* <div className="bg-white p-2 rounded-md shadow-md inline-block">
            <p className="font-bold text-black">Remaining hours in the day: {getRemainingHours()}</p>
          </div> */}
        </section>
      </CardContent>
    </BookingCard>
  );
};