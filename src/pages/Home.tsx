import { useState, useMemo, useEffect } from 'react';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import AlertHistory from '../components/AlertHistory';
import SearchBar from '../components/SearchBar';
import type { CurrentWeather } from '../types/currentWeather';
import { getCurrentWeatherById } from '../services/weatherApi';
import { useAlert } from '../contexts/AlertContext';
import { suggestCity } from '../services/cityApi';
import { debounce } from 'lodash';
import { removeVietnameseTones } from '../utils/textUtils';
import type { CitySuggestion } from '../types/city/citySuggestion';

export default function Home() {
  const defaultWeather: CurrentWeather = {
    cityName: '',
    temperature: 0,
    weather_description: '',
    cur_timestamp: 0,
    feels_like: 0,
    pressure: 0,
    humidity: 0,
    clouds: 0,
    uv: 0,
    visibility: 0,
    wind_speed: 0,
    aqi: 0,
    icon: '',
  };
  const { showAlert } = useAlert();
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>(defaultWeather);
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);

  const handleSelect = async (selected: CitySuggestion) => {
    setCity(`${selected.city_name}, ${selected.country_name}`);
    const result = await getCurrentWeatherById(selected.city_id);
    if (result.statusCode === 200 && result.result) {
      showAlert('info', result.message);
      setCurrentWeather(result.result);
    } else showAlert('error', result.message);
  };

  const handleSearchChange = useMemo(
    () =>
      debounce(async (val: string) => {
        const cleaned = removeVietnameseTones(val.trim());
        if (cleaned.length < 2) return;
        const res = await suggestCity(cleaned);
        if (res.statusCode === 200 && res.result) {
          setSuggestions(res.result);
        }
      }, 500),
    []
  );

  useEffect(() => {
    return () => {
      handleSearchChange.cancel(); // Hủy debounce nếu component bị huỷ
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row flex-1 overflow-auto gap-6 h-full p-6">
      <section className="flex-1 bg-black/10 backdrop-blur-md rounded-2xl p-6 flex flex-col">
        <SearchBar
          value={city}
          onChange={val => {
            setCity(val);
            handleSearchChange(val);
          }}
          suggestions={suggestions}
          onSelect={handleSelect}
          onSubmit={() => {
            if (suggestions.length === 1) {
              handleSelect(suggestions[0]);
            } else {
              showAlert('error', 'Please select a valid city from the suggestion list.');
            }
          }}
        />
        {/* Có thể hiển thị thêm phần WeatherDetails nếu cần */}
      </section>

      {/* Cột phải */}
      <div className="w-full md:w-1/3 flex flex-col gap-6 h-full">
        {currentWeather && <CurrentWeatherCard {...currentWeather} />}
        <AlertHistory />
      </div>
    </div>
  );
}
