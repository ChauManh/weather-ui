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
    <div className="bg-gradient-to-br from-blue-900/40 to-black/40 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition duration-300 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-bold">{formatDate(+data.df_date)}</p>
          <p className="text-xl font-bold text-white/70 capitalize">{data.weather_description}</p>
        </div>
        <img src={iconUrl} alt="weather icon" className="w-16 h-16" />
      </div>

      {/* Temperature Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 text-base leading-relaxed">
        <p>
          <WiDaySunny className="inline mr-2 text-yellow-300 text-xl" /> <strong>Max:</strong>{' '}
          {data.temperature_max}°C
        </p>
        <p>
          <WiDaySunny className="inline mr-2 text-blue-300 text-xl" /> <strong>Min:</strong>{' '}
          {data.temperature_min}°C
        </p>
        <p>
          <WiSunrise className="inline mr-2 text-yellow-300 text-xl" /> <strong>Morning:</strong>{' '}
          {data.temperature_morn}°C
        </p>
        <p>
          <WiDaySunny className="inline mr-2 text-orange-300 text-xl" /> <strong>Day:</strong>{' '}
          {data.temperature_day}°C
        </p>
        <p>
          <WiSunset className="inline mr-2 text-pink-300 text-xl" /> <strong>Evening:</strong>{' '}
          {data.temperature_eve}°C
        </p>
        <p>
          <WiNightClear className="inline mr-2 text-blue-200 text-xl" /> <strong>Night:</strong>{' '}
          {data.temperature_night}°C
        </p>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 text-base leading-relaxed">
        <p>
          <WiStrongWind className="inline mr-2 text-blue-400 text-xl" /> <strong>Wind:</strong>{' '}
          {data.wind_speed} m/s
        </p>
        <p>
          <WiBarometer className="inline mr-2 text-rose-400 text-xl" /> <strong>Pressure:</strong>{' '}
          {data.pressure} hPa
        </p>
        <p>
          <WiHumidity className="inline mr-2 text-cyan-400 text-xl" /> <strong>Humidity:</strong>{' '}
          {data.humidity}%
        </p>
        <p>
          <WiCloudy className="inline mr-2 text-gray-300 text-xl" /> <strong>Clouds:</strong>{' '}
          {data.clouds}%
        </p>
        <p>
          <WiRaindrop className="inline mr-2 text-indigo-300 text-xl" /> <strong>POP:</strong>{' '}
          {Math.round(data.pop * 100)}%
        </p>
        {data.uv !== 0 && (
          <p>
            <WiDaySunny className="inline mr-2 text-yellow-200 text-xl" />{' '}
            <strong>UV Index:</strong> {data.uv}
          </p>
        )}
      </div>
    </div>
  );
}
