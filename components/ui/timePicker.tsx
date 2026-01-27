import React, { useState, useEffect } from "react";
import TimeFormatToggle from "./timeFormatToggle";
import { MIN_TIME_SLOT, MAX_TIME_SLOT, TIME_INTERVAL } from "@/lib/constants";

function TimePicker({
  selected,
  onSelect,
  onSelectTime,
}: {
  selected: Date | undefined;
  onSelect: (date: Date) => void;
  onSelectTime: (time: string) => void;
}) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [is24HourFormat, setIs24HourFormat] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  const generateTimeSlots = () => {
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
      const timeString = `${displayHour.toString().padStart(2, "0")}:${minutes} ${ampm}`;

      const isDisabled = currentTime <= currentDate || (currentTime.getHours() === currentDate.getHours() + 1 && currentTime.getMinutes() === 0);

      times.push({ time: timeString, disabled: isDisabled });
      currentTime.setMinutes(currentTime.getMinutes() + TIME_INTERVAL);
    }

    return times;
  };

  const timeSlots = generateTimeSlots();

  useEffect(() => {
    if (selectedTime && selected) {
      const [time, period] = selectedTime.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (period) {
        if (period.toUpperCase() === "PM" && hours !== 12) {
          hours += 12;
        } else if (period.toUpperCase() === "AM" && hours === 12) {
          hours = 0;
        }
      }

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
  }, [selectedTime, selected, onSelect]);

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    onSelectTime(time);
  };

  return (
    <section className="sm:h-72 sm:w-full sm:max-w-80 peer w-72">
      <div className="flex flex-wrap gap-2 justify-center overflow-y-scroll mt-4 h-5/6 scrollable-content scroll-smooth">
        <div className="flex flex-nowrap sm:flex-wrap gap-2 justify-center shadow-inner p-2">
          {timeSlots.map(({ time, disabled }) => (
            <button
              key={time}
              onClick={() => handleSelectTime(time)}
              disabled={disabled}
              className={`p-2 items-center rounded-lg border ${
                selectedTime === time
                  ? "bg-background text-foreground"
                  : disabled
                  ? "bg-gray-300 text-gray-500 border-white"
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