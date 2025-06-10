import {
  WiHumidity,
  WiStrongWind,
  WiDaySunny,
  WiCloudy,
  WiBarometer,
  WiRaindrop,
  WiSunrise,
  WiSunset,
  WiNightClear,
} from 'react-icons/wi';
import type { DailyForecast } from '../types/weather/dailyForecastWeather';
import { formatDate } from '../utils/dateUtils';

export default function DailyWeatherCard({ data }: { data: DailyForecast }) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

  return (
    <div className="bg-gradient-to-br from-sky-800/40 to-indigo-900/40 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-bold text-white/90">{formatDate(+data.df_date)}</p>
          <p className="text-base text-white/70 capitalize">{data.weather_description}</p>
        </div>
        <img src={iconUrl} alt="weather icon" className="w-16 h-16" />
      </div>

      {/* Nhiệt độ */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-sm md:text-base text-white/90">
        <InfoItem
          icon={<WiDaySunny className="text-yellow-300 text-xl" />}
          label="Max"
          value={`${data.temperature_max}°C`}
        />
        <InfoItem
          icon={<WiDaySunny className="text-blue-300 text-xl" />}
          label="Min"
          value={`${data.temperature_min}°C`}
        />
        <InfoItem
          icon={<WiSunrise className="text-yellow-300 text-xl" />}
          label="Morning"
          value={`${data.temperature_morn}°C`}
        />
        <InfoItem
          icon={<WiDaySunny className="text-orange-300 text-xl" />}
          label="Day"
          value={`${data.temperature_day}°C`}
        />
        <InfoItem
          icon={<WiSunset className="text-pink-300 text-xl" />}
          label="Evening"
          value={`${data.temperature_eve}°C`}
        />
        <InfoItem
          icon={<WiNightClear className="text-blue-200 text-xl" />}
          label="Night"
          value={`${data.temperature_night}°C`}
        />
      </div>

      {/* Thông số khác */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-sm md:text-base text-white/90">
        <InfoItem
          icon={<WiStrongWind className="text-blue-300 text-xl" />}
          label="Wind"
          value={`${data.wind_speed} m/s`}
        />
        <InfoItem
          icon={<WiBarometer className="text-rose-400 text-xl" />}
          label="Pressure"
          value={`${data.pressure} hPa`}
        />
        <InfoItem
          icon={<WiHumidity className="text-cyan-300 text-xl" />}
          label="Humidity"
          value={`${data.humidity}%`}
        />
        <InfoItem
          icon={<WiCloudy className="text-gray-300 text-xl" />}
          label="Clouds"
          value={`${data.clouds}%`}
        />
        <InfoItem
          icon={<WiRaindrop className="text-indigo-300 text-xl" />}
          label="POP"
          value={`${Math.round(data.pop * 100)}%`}
        />
        <InfoItem
          icon={<WiDaySunny className="text-yellow-200 text-xl" />}
          label="UV Index"
          value={`${data.uv}`}
        />
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div className="flex flex-col leading-tight">
        <span className="text-xs text-white/80">{label}</span>
        <span className="font-semibold text-white">{value}</span>
      </div>
    </div>
  );
}
