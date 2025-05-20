// src/components/CurrentWeatherCard.tsx
import { WiDaySunny } from 'react-icons/wi';
import type { CurrentWeather } from '../types/currentWeather';
import { formatDate } from '../utils/dateUtils';

export default function CurrentWeatherCard({
  cityName,
  temperature,
  weather_description,
  cur_timestamp,
  feels_like,
  pressure,
  humidity,
  clouds,
  uv,
  visibility,
  wind_speed,
  aqi,
}: CurrentWeather) {
  return (
    <div className="flex flex-col bg-black/10 backdrop-blur-md rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <WiDaySunny className="text-3xl text-yellow-400" />
          <div>
            <h3 className="text-white text-lg font-semibold">{cityName}</h3>
            <p className="text-sm text-white">{formatDate(cur_timestamp)}</p>
          </div>
        </div>
        <button className="text-white hover:opacity-50 cursor-pointer">⋮</button>
      </div>

      {/* Temperature & Description */}
      <div className="px-6 py-4 flex flex-col items-center">
        <span className="text-6xl md:text-7xl font-bold text-white">
          {Math.round(temperature)}
          <sup>°C</sup>
        </span>
        <p className="mt-1 text-2xl text-white/80 capitalize">{weather_description}</p>
        <p className="mt-2 text-xl text-white/80">Feels like {Math.round(feels_like)}°C</p>
      </div>

      {/* Details grid */}
      <div className="px-6 py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-white/80 text-sm">
        <Detail label="Pressure" value={`${pressure} hPa`} />
        <Detail label="Humidity" value={`${humidity}%`} />
        <Detail label="Clouds" value={`${clouds}%`} />
        <Detail label="UV Index" value={String(uv)} />
        <Detail label="Visibility" value={`${(visibility / 1000).toFixed(1)} km`} />
        <Detail label="Wind Speed" value={`${wind_speed} m/s`} />
        <Detail label="AQI" value={String(aqi)} />
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-gray-50">{label}</span>
      <span className="font-medium text-white mt-1">{value}</span>
    </div>
  );
}
