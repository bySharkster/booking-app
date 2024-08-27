export default function convertTimeStringToDate(timeString: string): Date {
  const now = new Date();
  let hours: number;
  let minutes: number;
  let ampm: string | undefined;

  if (timeString.includes("AM") || timeString.includes("PM")) {
    // 12-hour format
    const [time, period] = timeString.split(" ");
    [hours, minutes] = time.split(":").map(Number);
    ampm = period;
    if (ampm === "PM" && hours !== 12) {
      hours += 12;
    } else if (ampm === "AM" && hours === 12) {
      hours = 0;
    }
  } else {
    // 24-hour format
    [hours, minutes] = timeString.split(":").map(Number);
  }

  now.setHours(hours, minutes, 0, 0);
  return now;
}
convertTimeStringToDate.displayName = "convertTimeStringToDate";

// Example usage
const timeString12h = "10:15 AM";
const timeString24h = "14:30";

const timeValue12h = convertTimeStringToDate(timeString12h);
const timeValue24h = convertTimeStringToDate(timeString24h);

console.log(timeValue12h); // Outputs a Date object with the specified 12-hour time
console.log(timeValue24h); // Outputs a Date object with the specified 24-hour time
