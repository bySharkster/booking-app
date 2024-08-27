import React, { ReactNode, useState } from "react";
import TimeFormatToggle from "./timeFormatToggle";
import { MIN_TIME_SLOT, MAX_TIME_SLOT, TIME_INTERVAL } from "@/lib/constants";
function TimePicker({
  onTimeSelect,
}: {
  onTimeSelect?: (time: Date | undefined) => void;
}) {
  const [selectedTime, setSelectedTime] = useState<Date | undefined>(undefined);

  const [is24HourFormat, setIs24HourFormat] = useState<boolean>(false);
  // Generate time slots in 30-minute intervals
  const generateTimeSlots: () => Date[] = () => {
    const times: Date[] = [];
    let currentTime = new Date();
    const [minHours, minMinutes] = MIN_TIME_SLOT.split(":").map(Number);
    const [maxHours, maxMinutes] = MAX_TIME_SLOT.split(":").map(Number);

    currentTime.setHours(minHours, minMinutes, 0, 0);
    const maxTime = new Date();
    maxTime.setHours(maxHours, maxMinutes, 0, 0);

    while (currentTime <= maxTime) {
      const hours: number = currentTime.getHours();
      const displayHour: number = is24HourFormat ? hours : hours % 12 || 12;
      const minutes = currentTime.getMinutes().toString().padStart(2, "0");
      const ampm = is24HourFormat ? "" : hours < 12 ? "AM" : "PM";
      times.push(
        new Date(
          `${displayHour.toString().padStart(2, "0")}:${minutes} ${ampm}`
        )
      );
      currentTime.setMinutes(currentTime.getMinutes() + TIME_INTERVAL);
    }

    return times;
  };

  const timeSlots = generateTimeSlots();

  const handleTimeSelect = (time: Date | null) => {
    if (time !== null) {
      setSelectedTime(new Date(time));
      if (onTimeSelect) {
        onTimeSelect(new Date(time)); // Pass the selected time to the parent component
      } else {
        console.log("Time selected: ", new Date(time));
        console.log(typeof new Date(time));
      }
    }
  };
  return (
    <section className="sm:h-72 sm:w-full sm:max-w-80 peer w-72">
      <div className="flex flex-wrap gap-2 justify-center overflow-y-scroll mt-4 h-5/6 scrollable-content scroll-smooth ">
        <div className="flex flex-nowrap sm:flex-wrap gap-2 justify-center shadow-inner p-2">
          {timeSlots.map((time) => (
            <button
              key={time.toLocaleTimeString()}
              onClick={() => handleTimeSelect(new Date(time))}
              className={`p-2 items-center  rounded-lg border ${
                selectedTime === time
                  ? "bg-background text-foreground"
                  : "bg-foreground border-gray-300 text-background"
              } hover:bg-background/90 hover:text-foreground/90 transition h-12 w-24 whitespace-nowrap`}
            >
              {time.toLocaleTimeString()}
            </button>
          ))}
        </div>
      </div>
      <TimeFormatToggle onToggle={setIs24HourFormat} />
    </section>
  );
}
TimePicker.displayName = "TimePicker";
export { TimePicker };
