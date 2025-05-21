import { WiStrongWind, WiHumidity, WiCloudy } from 'react-icons/wi';
import type { HourlyForecast } from '../types/weather/hourlyForecastWeather';
import { formatHourAndDate } from '../utils/dateUtils';

interface Props {
  data: HourlyForecast;
}

export default function WeatherCard({ data }: Props) {
  return (
    <div className="bg-white/10 text-white p-4 rounded-xl flex flex-col md:flex-row justify-between items-center shadow hover:shadow-lg transition">
      <div className="flex items-center gap-4">
        <img
          src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt="weather icon"
          className="w-14 h-14"
        />
        <div>
          <h4 className="font-semibold text-lg">{formatHourAndDate(+data.hf_timestamp)}</h4>
          <p className="text-sm text-white/80">{data.weather_description}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4 md:mt-0">
        <div className="flex items-center gap-1">
          <WiStrongWind className="text-xl" />
          <span>{data.wind_speed} m/s</span>
        </div>
        <div className="flex items-center gap-1">
          <WiHumidity className="text-xl" />
          <span>{data.humidity}%</span>
        </div>
        <div className="flex items-center gap-1">
          <WiCloudy className="text-xl" />
          <span>{data.clouds}%</span>
        </div>
        <span className="font-bold text-xl">{Math.round(data.temperature)}°C</span>
      </div>
    </div>
  );
}
