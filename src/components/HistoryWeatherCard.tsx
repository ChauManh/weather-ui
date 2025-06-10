import type { HistoryWeather } from '../types/weather/historyWeather';
import { formatHourAndDate } from '../utils/dateUtils';
import { WiHumidity, WiStrongWind, WiCloudy, WiThermometer } from 'react-icons/wi';

interface Props {
  data: HistoryWeather;
}

export default function HistoryWeatherCard({ data }: Props) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

  return (
    <div className="bg-gradient-to-r from-sky-800/40 to-indigo-900/40 rounded-2xl text-white p-5 shadow-md hover:shadow-xl transition duration-300">
      {/* Top: Thời gian + mô tả + icon */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <p className="font-semibold text-lg">{formatHourAndDate(+data.hw_timestamp)}</p>
          <p className="text-sm text-white/70 capitalize">{data.weather_description}</p>
        </div>
        <img src={iconUrl} alt="weather icon" className="w-14 h-14" />
      </div>

      {/* Thông tin chi tiết */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mt-2">
        <div className="flex items-center gap-2">
          <WiThermometer className="text-red-300 text-xl" />
          <span>
            Temp: <strong>{Math.round(data.temperature)}°C</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <WiHumidity className="text-cyan-300 text-xl" />
          <span>
            Humidity: <strong>{data.humidity}%</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <WiStrongWind className="text-blue-300 text-xl" />
          <span>
            Wind: <strong>{data.wind_speed} m/s</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <WiCloudy className="text-gray-300 text-xl" />
          <span>
            Clouds: <strong>{data.clouds}%</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
