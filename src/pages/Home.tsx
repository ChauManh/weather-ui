import WeatherDetails from '../components/WeatherDetails';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import AlertHistory from '../components/AlertHistory';

export default function Home() {
  const today = 'Monday 05/13/2024';
  const city = 'Ho Chi Minh City'; // Pass down as prop if dynamic

  return (
    <div className="flex flex-col md:flex-row flex-1 overflow-auto gap-6 h-full">
      <WeatherDetails />
      <div className="w-full md:w-1/3 flex flex-col gap-6 h-full">
        <CurrentWeatherCard city={city} today={today} />
        <AlertHistory />
      </div>
    </div>
  );
}
