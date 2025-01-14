export const convertISOTime = (isoString) => {
  if (isoString === null) return "Not Updated Yet!";
  const date = new Date(isoString);

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const ampm = hours === 0 || hours <= 11 ? "AM" : "PM";

  // Convert hours to 12-hour format
  // hours = hours % 12 || 12; // Converts 0 to 12 for 12-hour clock

  // Format time as hh:mm:ss AM/PM
  const formattedTime = `${hours.toString().padStart(2, "0")}h :${minutes
    .toString()
    .padStart(2, "0")}m  ${ampm}`;
  return formattedTime;
};

export const convertToPakTime = (timeString) => {
  if (timeString === null) return "Not Updated Yet!";

  const dateInUTC = new Date(timeString);

  // Define the options for formatting the date in local time (Asia/Karachi)
  const options = {
    timeZone: "Asia/Karachi",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Set to true for AM/PM format
  };

  const dateInPakistanTime = new Intl.DateTimeFormat("en-GB", options).format(
    dateInUTC
  );

  return dateInPakistanTime;
};

// Example usage
const sampleTime = "2024-12-27T19:26:51.757Z";
console.log(convertToPakTime(sampleTime)); // Output will be in PKT with AM/PM
