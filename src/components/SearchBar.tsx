// src/components/SearchBar.tsx
import { useState, useRef, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import type { CitySuggestion } from '../types/city/citySuggestion';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  suggestions: CitySuggestion[];
  onSelect: (suggestion: CitySuggestion) => void;
  onSubmit?: (v: string) => void;
}

export default function SearchBar({
  value,
  onChange,
  suggestions,
  onSelect,
  onSubmit,
}: SearchBarProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input */}
      <div className="flex items-center bg-black/5 backdrop-blur-md rounded-full px-4 py-2 mb-4">
        <AiOutlineSearch
          className="text-xl text-white/90 mr-3 cursor-pointer hover:text-yellow-400 active:text-white"
          onClick={() => {
            onSubmit?.(value);
            setOpen(false);
          }}
        />

        <input
          type="text"
          value={value}
          onChange={e => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={e => {
            if (e.key === 'Enter') onSubmit?.(value);
            setOpen(false);
          }}
          placeholder="Search city"
          className="flex-1 bg-transparent placeholder-white/75 text-white py-2 focus:outline-none"
        />
      </div>

      {open && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-gray-600 backdrop-blur-md rounded-xl overflow-auto max-h-60 text-white z-100">
          <ul className="...">
            {suggestions.map(item => (
              <li
                key={item.city_id}
                className="px-4 py-2 border-b border-white last:border-b-0 hover:bg-white/20 cursor-pointer"
                onClick={() => {
                  onSelect(item);
                  setOpen(false);
                }}
              >
                {item.city_name}, {item.country_name}
              </li>
            ))}
          </ul>
        </ul>
      )}
    </div>
  );
}
