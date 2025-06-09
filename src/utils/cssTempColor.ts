export function cssTempColor(temp: number): string {
  if (temp >= 35) return 'text-red-500'; // Rất nóng
  if (temp >= 30) return 'text-orange-400'; // Nóng
  if (temp >= 20) return 'text-yellow-300'; // Ấm
  if (temp >= 10) return 'text-blue-300'; // Mát
  return 'text-cyan-200'; // Lạnh
}
