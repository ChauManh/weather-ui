import { WiStrongWind, WiHumidity, WiCloudy } from 'react-icons/wi';
import type { HourlyForecast } from '../types/weather/hourlyForecastWeather';
import { formatHourAndDate } from '../utils/dateUtils';

interface Props {
  data: HourlyForecast;
}

export default function HourlyWeatherCard({ data }: Props) {
  return (
    <div className="bg-gradient-to-r from-sky-800/40 to-indigo-900/40 text-white p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col md:flex-row justify-between items-center gap-6">
      {/* LEFT: Icon + Time + Description */}
      <div className="flex items-center gap-4">
        <img
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt="weather icon"
          className="w-16 h-16"
        />
        <div className="flex flex-col">
          <span className="text-white text-sm font-semibold">
            {formatHourAndDate(+data.hf_timestamp)}
          </span>
          <span className="text-sm text-white/80">{data.weather_description}</span>
        </div>
      </div>

      {/* RIGHT: Weather Info */}
      <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-6 gap-y-2 text-sm text-white/90">
        <div className="flex items-center gap-1">
          <WiStrongWind className="text-blue-200 text-xl" />
          <span>
            Wind: <strong>{data.wind_speed} m/s</strong>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <WiHumidity className="text-cyan-200 text-xl" />
          <span>
            Humidity: <strong>{data.humidity}%</strong>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <WiCloudy className="text-gray-200 text-xl" />
          <span>
            Clouds: <strong>{data.clouds}%</strong>
          </span>
        </div>
        <div className="text-2xl font-bold text-yellow-300">{Math.round(data.temperature)}°C</div>
      </div>
    </div>
  );
}
