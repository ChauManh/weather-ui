// src/components/Sidebar.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { BiBell } from 'react-icons/bi';
import { IoMdSettings } from 'react-icons/io';

interface NavItem {
  label: string;
  path: string;
  Icon: React.ComponentType<{ className: string }>;
  isActive: boolean;
}

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.toLowerCase();

  const items: NavItem[] = [
    {
      label: 'Profile',
      path: '/profile',
      Icon: AiOutlineUser,
      isActive: path.startsWith('/profile'),
    },
    {
      label: 'Weather',
      path: '/',
      Icon: TiWeatherPartlySunny,
      isActive: path === '/',
    },
    {
      label: 'Alert',
      path: '/alert',
      Icon: BiBell,
      isActive: path.startsWith('/alert'),
    },
    {
      label: 'Setting',
      path: '/setting',
      Icon: IoMdSettings,
      isActive: path.startsWith('/setting'),
    },
  ];

  return (
    <aside className="w-20 flex flex-col items-center py-6 space-y-4 bg-black/10 backdrop-blur-lg">
      {items.map(({ label, path: to, Icon, isActive }) => {
        const colorClass = isActive ? 'text-yellow-400' : 'text-white';
        return (
          <button
            key={label}
            onClick={() => navigate(to)}
            className="flex flex-col items-center focus:outline-none cursor-pointer hover:opacity-80"
          >
            <Icon className={`text-3xl transition ${colorClass}`} />
            <span className={`mt-1 text-xs font-medium transition ${colorClass}`}>{label}</span>
          </button>
        );
      })}
    </aside>
  );
}
