// src/utils/dateUtils.ts

/**
 * Chuyển timestamp (giây) sang chuỗi "Weekday MM/DD/YYYY"
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  // Lấy weekday bằng Intl API
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
  // Lấy month/day/year
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${weekday} ${mm}/${dd}/${yyyy}`;
}

export function formatHourAndDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString('en-US', {
    weekday: 'short', // ví dụ: Mon, Tue
    year: 'numeric', // 2025
    month: '2-digit', // 05
    day: '2-digit', // 19
    hour: '2-digit', // 08 PM
    minute: '2-digit',
    hour12: true, // 12-hour format với AM/PM
  });
}
