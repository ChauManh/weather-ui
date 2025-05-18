import { WiDaySunny } from 'react-icons/wi';

interface CurrentWeatherCardProps {
  city: string;
  today: string;
}

export default function CurrentWeatherCard({ city, today }: CurrentWeatherCardProps) {
  return (
    <div className="flex flex-col flex-[2] bg-black/10 backdrop-blur-md rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <WiDaySunny className="text-2xl text-yellow-400" />
          <div>
            <h3 className="text-white font-semibold">{city}</h3>
            <p className="text-sm text-white/80">{today}</p>
          </div>
        </div>
        <div className="text-white cursor-pointer">⋮</div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <span className="text-6xl md:text-7xl text-white">
          34<sup>°C</sup>
        </span>
        <p className="text-white/80 mt-1">Really hot</p>
      </div>
      <div className="mt-4 border-t border-white/30 pt-4 grid grid-cols-2 gap-y-2 text-white/80 text-sm">
        <div>
          Visibility <span className="float-right">10km</span>
        </div>
        <div>
          Feels like <span className="float-right">10km</span>
        </div>
        <div>
          Wind <span className="float-right">10km</span>
        </div>
        <div>
          Humidity <span className="float-right">10km</span>
        </div>
      </div>
    </div>
  );
}
