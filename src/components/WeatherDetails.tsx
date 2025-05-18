import SearchBar from './SearchBar';
import { useState } from 'react';

export default function WeatherDetails() {
  const [city, setCity] = useState('Ho Chi Minh City');

  return (
    <section className="flex-1 bg-black/5 backdrop-blur-md rounded-2xl p-6 flex flex-col">
      <SearchBar value={city} onChange={setCity} />
      <h2 className="text-white text-lg font-semibold mb-2">Weather information details</h2>
      <div className="flex-1 bg-black/10 rounded-xl" />
    </section>
  );
}
