import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { BiBell } from 'react-icons/bi';
import { IoMdSettings } from 'react-icons/io';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.toLowerCase();

  const isProfile = path.startsWith('/profile');
  const isWeather = path === '/';
  const isAlert = path.startsWith('/alert');
  const isSettings = path.startsWith('/setting');

  const baseClass = 'text-3xl cursor-pointer transition';
  const activeClass = 'text-yellow-400';
  const inactiveClass = 'text-white';

  return (
    <aside className="w-16 flex flex-col items-center py-6 space-y-6 bg-black/10 backdrop-blur-lg">
      <AiOutlineUser
        className={`${baseClass} ${isProfile ? activeClass : inactiveClass}`}
        onClick={() => navigate('/profile')}
      />
      <TiWeatherPartlySunny
        className={`${baseClass} ${isWeather ? activeClass : inactiveClass}`}
        onClick={() => navigate('/')}
      />
      <BiBell
        className={`${baseClass} ${isAlert ? activeClass : inactiveClass}`}
        onClick={() => navigate('/alert')}
      />
      <IoMdSettings
        className={`${baseClass} ${isSettings ? activeClass : inactiveClass}`}
        onClick={() => navigate('/setting')}
      />
    </aside>
  );
}
