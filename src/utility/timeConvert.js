function convertISOTime(isoString) {
  if (isoString === null) return "Not Updated Yet!";
  const date = new Date(isoString);

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = (hours + 5) % 12 || 12; // Converts 0 to 12 for 12-hour clock

  // Format time as hh:mm:ss AM/PM
  const formattedTime = `${hours.toString().padStart(2, "0")}h :${minutes
    .toString()
    .padStart(2, "0")}m  ${ampm}`;
  return formattedTime;
}
export default convertISOTime;
