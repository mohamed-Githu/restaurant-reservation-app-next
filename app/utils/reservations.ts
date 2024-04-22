const allTimes: Array<string> = [];
for (let hour = 0; hour <= 23; hour++) {
  for (let minute = 0; minute <= 30; minute += 30) {
    const time = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
    allTimes.push(time);
  }
}

export function formatTime(time: string): string {
  return time.substring(0, time.lastIndexOf(":"));
}

export function getTimeOptions(
  openTime: string,
  closeTime: string
): Array<string> {
  const startStr = formatTime(openTime);
  const endStr = formatTime(closeTime);

  const startTimeIndex = allTimes.indexOf(startStr);
  const endTimeIndex = allTimes.indexOf(endStr);

  const timeOptions = allTimes.slice(startTimeIndex, endTimeIndex + 1);

  return timeOptions;
}
