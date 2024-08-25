import React, { useState } from "react";
import TimeFormatToggle from "./timeFormatToggle";
import { MIN_TIME_SLOT, MAX_TIME_SLOT, TIME_INTERVAL } from "@/lib/constants";
const TimePicker: React.FC = ({}) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [is24HourFormat, setIs24HourFormat] = useState<boolean>(false);
  // Generate time slots in 30-minute intervals
  const generateTimeSlots: () => string[] = () => {
    const times = [];
    let currentTime = new Date();
    const [minHours, minMinutes] = MIN_TIME_SLOT.split(":").map(Number);
    const [maxHours, maxMinutes] = MAX_TIME_SLOT.split(":").map(Number);

    currentTime.setHours(minHours, minMinutes, 0, 0);
    const maxTime = new Date();
    maxTime.setHours(maxHours, maxMinutes, 0, 0);

    while (currentTime <= maxTime) {
      const hours = currentTime.getHours();
      const displayHour = is24HourFormat ? hours : hours % 12 || 12;
      const minutes = currentTime.getMinutes().toString().padStart(2, "0");
      const ampm = is24HourFormat ? "" : hours < 12 ? "AM" : "PM";
      times.push(
        `${displayHour.toString().padStart(2, "0")}:${minutes} ${ampm}`
      );
      currentTime.setMinutes(currentTime.getMinutes() + TIME_INTERVAL);
    }

    return times;
  };

  const timeSlots = generateTimeSlots();

  return (
    <section className="h-72 w-full max-w-80">
      <div className="flex flex-wrap gap-2 justify-center overflow-y-scroll mt-4 h-5/6 ">
        <div className="flex flex-wrap gap-2 justify-center shadow-inner p-2">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`p-2 items-center  rounded-lg border ${
                selectedTime === time
                  ? "bg-background text-foreground "
                  : "bg-foreground border-gray-300 text-background"
              } hover:bg-background/15 transition h-12 w-24 whitespace-nowrap`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      <TimeFormatToggle onToggle={setIs24HourFormat} />
    </section>
  );
};

export default TimePicker;
