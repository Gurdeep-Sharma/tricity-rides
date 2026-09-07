/** Shared display formatting. Kept out of components so wording stays consistent. */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-09-15" -> "15 September 2026". Falls back to the input when unparseable. */
export function formatDisplayDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const [, year, month, day] = match;
  const monthName = MONTHS[Number(month) - 1];
  if (!monthName) return iso;
  return `${Number(day)} ${monthName} ${year}`;
}

/** "06:00" -> "6:00 AM". */
export function formatDisplayTime(value: string): string {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value);
  if (!match) return value;
  const hours = Number(match[1]);
  const minutes = match[2];
  const suffix = hours < 12 ? "AM" : "PM";
  const display = hours % 12 === 0 ? 12 : hours % 12;
  return `${display}:${minutes} ${suffix}`;
}

export function formatTripType(value: string): string {
  switch (value) {
    case "ONE_WAY":
      return "One-way";
    case "ROUND_TRIP":
      return "Round-trip";
    case "AIRPORT":
      return "Airport transfer";
    default:
      return value;
  }
}

/** Local ISO date (YYYY-MM-DD) for a Date, avoiding UTC shifting the day. */
export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}
