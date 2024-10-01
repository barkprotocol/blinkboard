/**
 * Formats a Date object into a string with the format MM.DD.YYYY
 * @param date - The Date object to format
 * @returns A string representing the formatted date
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).replace(/\//g, '.');
}
