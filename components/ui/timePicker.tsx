import React, { useEffect, useState } from "react";
import TimeFormatToggle from "./timeFormatToggle";
import { MIN_TIME_SLOT, MAX_TIME_SLOT, TIME_INTERVAL } from "@/lib/constants";
import { DayPicker } from "react-day-picker";

function TimePicker({
  selected,
  onSelect,
}: {
  selected: Date | undefined;
  onSelect: (date: Date) => void;
}) {
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
  // TODO: FIX THE TIME PICKER SINCE YOU HAVE TO CLICK TWICE TO SELECT THE TIME
  useEffect(() => {
    if (selectedTime && selected) {
      const [time, period] = selectedTime.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      // Convert 12-hour format to 24-hour format if necessary
      if (period) {
        if (period.toUpperCase() === "PM" && hours !== 12) {
          hours += 12;
        } else if (period.toUpperCase() === "AM" && hours === 12) {
          hours = 0;
        }
      }

      // Create a new Date object with the selected date and time
      const combinedDateTime = new Date(selected);
      combinedDateTime.setHours(hours, minutes, 0, 0);
      if (combinedDateTime === null || combinedDateTime <= new Date()) {
        console.log("Please select a future date and time");
        return;
      }
      onSelect(combinedDateTime);
    } else {
      console.log("Please select time", selectedTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTime]);

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <section className="sm:h-72 sm:w-full sm:max-w-80 peer w-72">
      <div className="flex flex-wrap gap-2 justify-center overflow-y-scroll mt-4 h-5/6 scrollable-content scroll-smooth ">
        <div className="flex flex-nowrap sm:flex-wrap gap-2 justify-center shadow-inner p-2">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => handleSelectTime(time)}
              className={`p-2 items-center  rounded-lg border ${
                selectedTime === time
                  ? "bg-background text-foreground"
                  : "bg-foreground border-gray-300 text-background"
              } hover:bg-background/90 hover:text-foreground/90 transition h-12 w-24 whitespace-nowrap`}
            >
              {time}
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
