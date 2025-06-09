import type { CurrentWeather } from '../types/weather/currentWeather';
import { formatDate } from '../utils/dateUtils';
import {
  WiStrongWind,
  WiHumidity,
  WiCloudy,
  WiBarometer,
  // WiRaindrop,
  WiDaySunny,
  WiSmoke,
} from 'react-icons/wi';
import { MdOutlineVisibility } from 'react-icons/md';
import { cssTempColor } from '../utils/cssTempColor';

export default function SummaryCurrentWeather({
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
  icon,
}: CurrentWeather) {
  return (
    <div className="flex flex-col bg-gradient-to-br from-blue-950/40 to-black/30 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {icon && (
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="weather-icon"
              className="w-20 h-20"
            />
          )}
          <div>
            <h3 className="text-white text-xl font-bold">{cityName}</h3>
            <p className="text-sm text-white/70">{formatDate(cur_timestamp)}</p>
          </div>
        </div>
        <span className="text-white/60 text-2xl">⋮</span>
      </div>

      {/* Temperature Section */}
      <div className="px-6 py-4 flex flex-col items-center">
        <span className={`text-6xl md:text-7xl font-bold ${cssTempColor(temperature)}`}>
          {Math.round(temperature)}
          <sup className="text-2xl">°C</sup>
        </span>
        <p className="mt-2 text-xl capitalize text-white/80">{weather_description}</p>
        <p className="mt-1 text-base text-white/70">
          Feels like{' '}
          <span className={`font-semibold ${cssTempColor(temperature)}`}>
            {Math.round(feels_like)}°C
          </span>
        </p>
      </div>

      {/* Detail Grid */}
      <div className="px-6 pb-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-white/80 text-sm">
        <Detail
          label="Pressure"
          value={`${pressure} hPa`}
          icon={<WiBarometer className="text-2xl" />}
        />
        <Detail
          label="Humidity"
          value={`${humidity}%`}
          icon={<WiHumidity className="text-2xl" />}
        />
        <Detail label="Clouds" value={`${clouds}%`} icon={<WiCloudy className="text-2xl" />} />
        <Detail label="UV Index" value={String(uv)} icon={<WiDaySunny className="text-2xl" />} />
        <Detail
          label="Visibility"
          value={`${(visibility / 1000).toFixed(1)} km`}
          icon={<MdOutlineVisibility className="text-2xl" />}
        />
        <Detail
          label="Wind Speed"
          value={`${wind_speed} m/s`}
          icon={<WiStrongWind className="text-2xl" />}
        />
        <Detail label="AQI" value={String(aqi)} icon={<WiSmoke className="text-2xl" />} />
      </div>
    </div>
  );
}

function Detail({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
      {icon}
      <div className="flex flex-col">
        <span className="text-xs text-white/70">{label}</span>
        <span className="font-medium text-white">{value}</span>
      </div>
    </div>
  );
}
