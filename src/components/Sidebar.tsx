import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { BiBell } from 'react-icons/bi';
import { IoMdSettings } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';
// import classNames from 'classnames';

interface NavItem {
  label: string;
  path: string;
  Icon: React.ComponentType<{ className: string }>;
  isActive: boolean;
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);
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

  const handleNavigate = (to: string) => {
    navigate(to);
    setOpen(false); // đóng sidebar mobile sau khi chọn
  };

  return (
    <>
      {/* Nút mở sidebar trên mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white/10 p-2 rounded-md text-white"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`z-40 bg-black/10 backdrop-blur-lg flex flex-col items-center space-y-4 p-6 transition-all duration-300
${open ? 'fixed top-0 left-0 h-screen w-64 shadow-lg' : 'hidden'} md:static md:flex md:w-20 md:h-screen`}
      >
        {/* Close button for mobile */}
        <div className="w-full flex justify-end md:hidden">
          <button onClick={() => setOpen(false)} className="text-white text-2xl">
            <IoMdClose />
          </button>
        </div>

        {items.map(({ label, path: to, Icon, isActive }) => {
          const colorClass = isActive ? 'text-yellow-400' : 'text-white';
          return (
            <button
              key={label}
              onClick={() => handleNavigate(to)}
              className="flex flex-col items-center focus:outline-none cursor-pointer hover:opacity-80"
            >
              <Icon className={`text-3xl transition ${colorClass}`} />
              <span className={`mt-1 text-xs font-medium transition ${colorClass}`}>{label}</span>
            </button>
          );
        })}
      </aside>
    </>
  );
}
