import { useState, useMemo, useEffect, useRef, useCallback, useTransition } from 'react';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import AlertHistory from '../components/AlertHistory';
import SearchBar from '../components/SearchBar';
import type { CurrentWeather } from '../types/weather/currentWeather';
import { getCurrentWeatherById, getHourlyForecastWeatherById } from '../services/weatherApi';
import { useAlert } from '../contexts/AlertContext';
import { suggestCity } from '../services/cityApi';
import { debounce } from 'lodash';
import { removeVietnameseTones } from '../utils/textUtils';
import type { CitySuggestion } from '../types/city/citySuggestion';
import WeatherCard from '../components/WeatherCard';
import type { HourlyForecast } from '../types/weather/hourlyForecastWeather';
import React from 'react';

// Memoize heavy components to prevent unnecessary re-renders
const MemoizedSearchBar = React.memo(SearchBar);
const MemoizedWeatherCard = React.memo(WeatherCard);

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

  const [activeTab, setActiveTab] = useState<'History' | 'Current' | 'Hourly' | 'Daily'>('Current');
  const { showAlert } = useAlert();
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>(defaultWeather);
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [hourlyForecasts, setHourlyForecasts] = useState<HourlyForecast[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const limit = 12;
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(
    async (selected: CitySuggestion) => {
      if (selected.city_id === selectedCityId) return;
      setCity(`${selected.city_name}, ${selected.country_name}`);
      setSelectedCityId(selected.city_id);
      setHourlyForecasts([]);
      setPage(1);
      setHasMore(true);
      const res = await getCurrentWeatherById(selected.city_id);
      if (res.statusCode === 200 && res.result) {
        showAlert('info', res.message);
        setCurrentWeather(res.result);
        setActiveTab('Current');
      } else {
        showAlert('error', res.message);
      }
    },
    [selectedCityId, showAlert]
  );

  // Debounced suggestion fetch; heavy text transform separated
  const debouncedFetch = useMemo(
    () =>
      debounce(async (cleaned: string) => {
        const res = await suggestCity(cleaned);
        if (res.statusCode === 200 && res.result) setSuggestions(res.result);
      }, 500),
    []
  );

  const handleSearchChange = (val: string) => {
    setCity(val);
    const cleaned = removeVietnameseTones(val.trim());
    if (cleaned.length < 2) return;
    startTransition(() => debouncedFetch(cleaned));
  };

  const fetchHourly = useCallback(
    async (pageToFetch: number) => {
      if (!selectedCityId) return;
      setIsLoading(true);
      const res = await getHourlyForecastWeatherById(selectedCityId, pageToFetch, limit);
      if (res.statusCode === 200 && res.result) {
        const { data, total } = res.result;
        setHourlyForecasts(prev => [...prev, ...data]);
        setHasMore((pageToFetch - 1) * limit + data.length < total);
        setPage(pageToFetch);
      } else {
        showAlert('error', res.message);
      }
      setIsLoading(false);
    },
    [selectedCityId, showAlert]
  );

  // Load first page when switching to Hourly
  useEffect(() => {
    if (activeTab === 'Hourly' && selectedCityId && hourlyForecasts.length === 0) fetchHourly(1);
  }, [activeTab, selectedCityId, fetchHourly, hourlyForecasts.length]);

  // Infinite scroll with IntersectionObserver
  useEffect(() => {
    if (activeTab !== 'Hourly') return;
    const container = scrollRef.current;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchHourly(page + 1);
        }
      },
      { root: container, rootMargin: '100px' }
    );
    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [activeTab, hasMore, isLoading, page, fetchHourly]);

  // Clean up debounce on unmount
  useEffect(() => () => debouncedFetch.cancel(), [debouncedFetch]);

  return (
    <div className="flex flex-col md:flex-row flex-1 gap-6 h-full p-6">
      <section className="flex-1 bg-black/10 backdrop-blur-md rounded-2xl p-6 flex flex-col">
        <MemoizedSearchBar
          value={city}
          onChange={handleSearchChange}
          suggestions={suggestions}
          onSelect={handleSelect}
          onSubmit={() => {
            if (suggestions.length === 1) handleSelect(suggestions[0]);
            else showAlert('error', 'Please select a valid city in suggestion list');
          }}
        />

        {currentWeather.cityName && (
          <div className="mt-4 flex gap-4 justify-center">
            {['History', 'Current', 'Hourly', 'Daily'].map(tab => (
              <button
                key={tab}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  activeTab === tab
                    ? 'bg-yellow-400 text-black shadow'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        <div className="mt-6 h-[450px]">
          {activeTab === 'Hourly' && (
            <div ref={scrollRef} className="h-full overflow-y-auto pr-2 custom-scroll space-y-4">
              {hourlyForecasts.map((item, i) => (
                <MemoizedWeatherCard key={i} data={item} />
              ))}
              {isLoading && <p className="text-center text-white">Loading...</p>}
              {!hasMore && hourlyForecasts.length > 0 && (
                <p className="text-center text-white/70 text-sm">No more data.</p>
              )}
              <div ref={bottomRef} />
            </div>
          )}
          {/* xử lý các tab khác */}
        </div>
      </section>

      <div className="w-full md:w-1/3 flex flex-col gap-6 h-full">
        <CurrentWeatherCard {...currentWeather} />
        <AlertHistory />
      </div>
    </div>
  );
}
