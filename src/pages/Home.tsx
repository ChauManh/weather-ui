import { useState, useMemo, useEffect, useRef, useCallback, useTransition } from 'react';
import React from 'react';
import SummaryCurrentWeather from '../components/SummaryCurrentWeather';
import AlertHistory from '../components/AlertHistory';
import SearchBar from '../components/SearchBar';
import HourlyWeatherCard from '../components/HourlyWeatherCard';
import DailyWeatherCard from '../components/DailyWeatherCard';
import HistoryWeatherCard from '../components/HistoryWeatherCard';
import { useAlert } from '../contexts/AlertContext';
import {
  getCurrentWeatherById,
  getHourlyForecastWeatherById,
  getDailyForecastWeatherById,
  getHistoryWeatherById,
} from '../services/weatherApi';
import { suggestCity } from '../services/cityApi';
import { removeVietnameseTones } from '../utils/textUtils';
import { debounce } from 'lodash';

import type { CitySuggestion } from '../types/city/citySuggestion';
import type { CurrentWeather } from '../types/weather/currentWeather';
import type { HourlyForecast } from '../types/weather/hourlyForecastWeather';
import type { DailyForecast } from '../types/weather/dailyForecastWeather';
import type { HistoryWeather } from '../types/weather/historyWeather';

const MemoizedSearchBar = React.memo(SearchBar);
const MemoizedHourlyCard = React.memo(HourlyWeatherCard);
const MemoizedDailyCard = React.memo(DailyWeatherCard);
const MemoizedHistoryCard = React.memo(HistoryWeatherCard);

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

  const [activeTab, setActiveTab] = useState<'History' | 'Hourly' | 'Daily'>();
  const [city, setCity] = useState('');
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>(defaultWeather);
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [hourlyForecasts, setHourlyForecasts] = useState<HourlyForecast[]>([]);
  const [dailyForecasts, setDailyForecasts] = useState<DailyForecast[]>([]);
  const [historyWeathers, setHistoryWeathers] = useState<HistoryWeather[]>([]);

  const [page, setPage] = useState(1);
  const limit = 6;
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [, startTransition] = useTransition();

  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const debouncedFetch = useMemo(
    () =>
      debounce(async (cleaned: string) => {
        try {
          const res = await suggestCity(cleaned);
          if (res.statusCode === 200 && res.result) {
            setSuggestions(res.result);
          } else {
            showAlert('error', res.message);
          }
        } catch (error) {
          // console.error('Error fetching city suggestions:', error);
          showAlert('error', (error as Error)?.message || 'An error occurred');
        }
      }, 500),
    []
  );

  const handleSearchChange = (val: string) => {
    setCity(val);
    const cleaned = removeVietnameseTones(val.trim());
    if (cleaned.length < 2) return;
    startTransition(() => debouncedFetch(cleaned));
  };

  const handleSelect = useCallback(
    async (selected: CitySuggestion) => {
      if (selected.city_id === selectedCityId) {
        setCity(`${selected.city_name}, ${selected.country_name}`);
        return;
      }

      setCity(`${selected.city_name}, ${selected.country_name}`);
      setSelectedCityId(selected.city_id);
      setHourlyForecasts([]);
      setDailyForecasts([]);
      setPage(1);
      setHasMore(true);

      const res = await getCurrentWeatherById(selected.city_id);
      if (res.statusCode === 200 && res.result) {
        setCurrentWeather(res.result);
        showAlert('info', res.message);
        setActiveTab('Hourly');
      } else {
        showAlert('error', 'Please select a valid city in suggestion list');
      }
    },
    [selectedCityId, showAlert]
  );

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

  const fetchDaily = useCallback(async () => {
    if (!selectedCityId) return;
    setIsLoading(true);
    const res = await getDailyForecastWeatherById(selectedCityId);
    if (res.statusCode === 200 && res.result) {
      setDailyForecasts(res.result);
    } else {
      showAlert('error', res.message);
    }
    setIsLoading(false);
  }, [selectedCityId, showAlert]);

  const fetchHistory = useCallback(async () => {
    if (!selectedCityId) return;
    setIsLoading(true);
    const res = await getHistoryWeatherById(selectedCityId);
    if (res.statusCode === 200 && res.result) {
      setHistoryWeathers(res.result);
    } else {
      showAlert('error', res.message);
    }
    setIsLoading(false);
  }, [selectedCityId, showAlert]);

  useEffect(() => {
    if (activeTab === 'Hourly' && selectedCityId && hourlyForecasts.length === 0) {
      fetchHourly(1);
    }
    if (activeTab === 'Daily' && selectedCityId && dailyForecasts.length === 0) {
      fetchDaily();
    }
    if (activeTab === 'History' && selectedCityId && dailyForecasts.length === 0) {
      fetchHistory();
    }
  }, [activeTab, selectedCityId]);

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

  useEffect(() => () => debouncedFetch.cancel(), [debouncedFetch]);

  const renderContent = () => {
    const baseClass = 'h-full overflow-y-auto pr-2 custom-scroll space-y-4';

    if (activeTab === 'Hourly') {
      return (
        <div ref={scrollRef} className={baseClass}>
          {hourlyForecasts.map((item, i) => (
            <MemoizedHourlyCard key={i} data={item} />
          ))}

          {isLoading && <p className="text-center text-white">Loading...</p>}

          {hourlyForecasts.length === 0 && !isLoading && (
            <p className="text-center text-white/70 text-sm">No data available.</p>
          )}

          <div ref={bottomRef} />
        </div>
      );
    }

    if (activeTab === 'Daily') {
      return (
        <div className={baseClass}>
          {dailyForecasts.map((item, i) => (
            <MemoizedDailyCard key={i} data={item} />
          ))}

          {isLoading && <p className="text-center text-white">Loading...</p>}

          {dailyForecasts.length === 0 && (
            <p className="text-center text-white/70 text-sm">No data available.</p>
          )}
        </div>
      );
    }

    if (activeTab === 'History') {
      return (
        <div className={baseClass}>
          {historyWeathers.map((item, i) => (
            <MemoizedHistoryCard key={i} data={item} />
          ))}

          {isLoading && <p className="text-center text-white">Loading...</p>}

          {historyWeathers.length === 0 && (
            <p className="text-center text-white/70 text-sm">No data available.</p>
          )}
        </div>
      );
    }

    return null;
  };

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
            {['History', 'Hourly', 'Daily'].map(tab => (
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

        <div className="mt-6 h-[480px]">{renderContent()}</div>
      </section>

      <div className="w-full md:w-1/3 flex flex-col gap-6 h-full">
        <SummaryCurrentWeather {...currentWeather} />
        <AlertHistory />
      </div>
    </div>
  );
}
