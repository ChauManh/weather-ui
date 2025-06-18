import type { CurrentWeather } from '../types/weather/currentWeather';
import { formatDate } from '../utils/dateUtils';
import {
  WiStrongWind,
  WiHumidity,
  WiCloudy,
  WiBarometer,
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
    <div className="flex flex-col bg-gradient-to-br from-sky-800/40 to-black/30 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-2">
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
            <p className="text-sm text-white/80">Current, {formatDate(cur_timestamp)}</p>
          </div>
        </div>
        <button className="text-white/60 text-2xl hover:text-white transition cursor-pointer">
          ⋮
        </button>
      </div>

      {/* Nhiệt độ hiện tại */}
      <div className="px-6 pb-0.5 flex flex-col items-center text-white text-center">
        <span className={`text-6xl md:text-7xl font-bold ${cssTempColor(temperature)}`}>
          {Math.round(temperature)}
          <sup className="text-2xl">°C</sup>
        </span>
        <p className="mt-2 text-xl capitalize text-white/80">{weather_description}</p>
        <p className="mt-1 text-base text-white/70">
          Feels like{' '}
          <span className={`font-semibold ${cssTempColor(feels_like)}`}>
            {Math.round(feels_like)}°C
          </span>
        </p>
      </div>

      {/* Thông tin chi tiết */}
      <div className="px-6 pb-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-white/80 text-sm">
        <Detail
          label="Pressure"
          value={`${pressure} hPa`}
          icon={<WiBarometer className="text-2xl text-rose-300" />}
        />
        <Detail
          label="Humidity"
          value={`${humidity}%`}
          icon={<WiHumidity className="text-2xl text-cyan-300" />}
        />
        <Detail
          label="Clouds"
          value={`${clouds}%`}
          icon={<WiCloudy className="text-2xl text-gray-300" />}
        />
        <Detail
          label="UV Index"
          value={String(uv)}
          icon={<WiDaySunny className="text-2xl text-yellow-300" />}
        />
        <Detail
          label="Visibility"
          value={`${(visibility / 1000).toFixed(1)} km`}
          icon={<MdOutlineVisibility className="text-2xl text-blue-200" />}
        />
        <Detail
          label="Wind Speed"
          value={`${wind_speed} m/s`}
          icon={<WiStrongWind className="text-2xl text-blue-300" />}
        />
        <Detail
          label="AQI"
          value={String(aqi)}
          icon={<WiSmoke className="text-2xl text-indigo-300" />}
        />
      </div>
    </div>
  );
}

function Detail({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200">
      {icon}
      <div className="flex flex-col">
        <span className="text-xs text-white/80">{label}</span>
        <span className="font-semibold text-white">{value}</span>
      </div>
    </div>
  );
}
