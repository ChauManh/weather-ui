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
