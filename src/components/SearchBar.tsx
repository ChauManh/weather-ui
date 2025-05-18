import { AiOutlineSearch } from 'react-icons/ai';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex items-center mb-4">
      <AiOutlineSearch className="text-xl text-white/90 mr-3 cursor-pointer hover:text-yellow-400 active:text-white" />
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search city"
        className="flex-1 bg-white/30 placeholder-white/75 text-white py-2 px-4 rounded-full focus:outline-none"
      />
    </div>
  );
}
