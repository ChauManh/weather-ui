import { WiStrongWind, WiHumidity, WiCloudy } from 'react-icons/wi';
import type { HourlyForecast } from '../types/weather/hourlyForecastWeather';
import { formatHourAndDate } from '../utils/dateUtils';

interface Props {
  data: HourlyForecast;
}

export default function HourlyWeatherCard({ data }: Props) {
  return (
    <div className="bg-gradient-to-br from-blue-900/30 to-black/30 text-white p-5 rounded-2xl flex flex-col md:flex-row justify-between items-center shadow hover:shadow-xl transition duration-300">
      {/* Left: Time + Description */}
      <div className="flex items-center gap-4">
        <img
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt="weather icon"
          className="w-16 h-16"
        />
        <div>
          <h4 className="font-semibold text-lg">{formatHourAndDate(+data.hf_timestamp)}</h4>
          <p className="text-sm text-white/70 capitalize">{data.weather_description}</p>
        </div>
      </div>

      {/* Right: Info */}
      <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0 text-sm items-center">
        <div className="flex items-center gap-1 text-white/80">
          <WiStrongWind className="text-xl text-blue-400" />
          <span>{data.wind_speed} m/s</span>
        </div>
        <div className="flex items-center gap-1 text-white/80">
          <WiHumidity className="text-xl text-cyan-300" />
          <span>{data.humidity}%</span>
        </div>
        <div className="flex items-center gap-1 text-white/80">
          <WiCloudy className="text-xl text-gray-300" />
          <span>{data.clouds}%</span>
        </div>
        <span className="font-bold text-2xl text-yellow-300">{Math.round(data.temperature)}°C</span>
      </div>
    </div>
  );
}
