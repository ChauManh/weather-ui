// src/pages/Home.tsx
import { useState } from 'react';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import AlertHistory from '../components/AlertHistory';
import SearchBar from '../components/SearchBar';

export default function Home() {
  // Mock data cho CurrentWeatherCard
  const mockWeather = {
    cur_timestamp: Math.floor(Date.now() / 1000),
    temperature: 34,
    description: 'Really hot',
    feels_like: 32,
    pressure: 1013,
    humidity: 60,
    clouds: 20,
    uv: 7,
    visibility: 10000, // đơn vị mét
    wind_speed: 5,
    aqi: 42,
  };

  // Mock data cho AlertHistory

  // Tạm thời để SearchBar không thực pull API
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([
    'Ho Chi Minh City',
    'Ha Noi',
    'Da Nang',
    'Can Tho',
  ]);

  const handleSelect = (val: string) => {
    setCity(val);
    // TODO: gọi lại API fetch dữ liệu mới và set vào mockWeather
  };

  return (
    <div className="flex flex-col md:flex-row flex-1 overflow-auto gap-6 h-full p-6">
      {/* Search + (có thể thêm phần chi tiết khác) */}
      <section className="flex-1 bg-black/10 backdrop-blur-md rounded-2xl p-6 flex flex-col">
        <SearchBar
          value={city}
          onChange={setCity}
          suggestions={suggestions}
          onSelect={handleSelect}
        />
        {/* Có thể hiển thị thêm phần WeatherDetails nếu cần */}
      </section>

      {/* Cột phải */}
      <div className="w-full md:w-1/3 flex flex-col gap-6 h-full">
        {/* Gọi component với mock data */}
        <CurrentWeatherCard {...mockWeather} />

        <AlertHistory />
      </div>
    </div>
  );
}
