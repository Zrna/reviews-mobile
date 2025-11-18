/**
 * To avoid unnecessary adding the date-fns dependency, we'll implement a simple date formatter.
 * At the moment, we only need this simple formatting and in only in one place.
 * If more complex date manipulations are needed in the future, consider using date-fns.
 * Format a date to "DD MMM YYYY" format (e.g., "09 Oct 2024")
 */
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);

  const day = d.getDate().toString().padStart(2, "0");

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[d.getMonth()];

  const year = d.getFullYear();

  return `${day} ${month} ${year}`;
};
