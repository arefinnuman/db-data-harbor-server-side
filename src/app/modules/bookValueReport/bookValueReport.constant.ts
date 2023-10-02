export const BookValueReportFilterableFields = ['searchTerm', 'id', 'terminal'];

export const BookValueReportSearchableFields = [];

export function daysToYearsMonthsDays(days: number): string {
  const daysInYear = 365.25;
  const daysInMonth = 30.44;

  const years = Math.floor(days / daysInYear);
  days -= years * daysInYear;

  const months = Math.floor(days / daysInMonth);
  days -= months * daysInMonth;

  return `${years} years, ${months} months, and ${Math.round(days)} days`;
}
