import { createPortal } from 'react-dom';
import type { DailyForecast } from '../types/weather/dailyForecastWeather';

export default function DailyWeatherModal({
  data,
  onClose,
}: {
  data: DailyForecast;
  onClose: () => void;
}) {
  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white max-w-md w-full p-6 rounded-xl shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-black text-xl">
          ✕
        </button>
        <h2 className="text-lg font-bold mb-2">{data.weather_description}</h2>
        {/* Hiển thị chi tiết: nhiệt độ, áp suất, độ ẩm,... */}
        <p>Max: {data.temperature_max}°C</p>
        <p>Min: {data.temperature_min}°C</p>
        <p>Humidity: {data.humidity}%</p>
        {/* ... thêm các trường khác */}
      </div>
    </div>,
    document.body
  );
}
