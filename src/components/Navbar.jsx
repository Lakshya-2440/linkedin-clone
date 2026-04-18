import { Link, NavLink, useLocation } from "react-router-dom";
import { useNotification } from "../contexts/NotificationContext";
import { FaBell } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const navItems = [
  { to: "/feed", label: "Home", icon: "home" },
  { to: "/network", label: "My Network", icon: "users" },
  { to: "/jobs", label: "Jobs", icon: "briefcase" },
  { to: "/messaging", label: "Messaging", icon: "message" },
  { to: "/notifications", label: "Notifications", icon: "bell" },
];

export default function Navbar() {
  const { currentUser } = useAuth();
  const { unreadCount } = useNotification ? useNotification() : { unreadCount: 0 };
  const location = useLocation();

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-2 sm:px-6 py-2 flex items-center justify-between sticky top-0 z-50 dark:bg-gray-900 dark:border-gray-700">
      {/* Logo */}
      <Link to="/feed" className="flex items-center gap-2 text-blue-700 font-bold text-xl">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="6" fill="#0A66C2"/>
          <text x="7" y="23" fontSize="18" fill="white" fontFamily="Arial" fontWeight="bold">in</text>
        </svg>
        <span className="hidden sm:inline">LinkedIn</span>
      </Link>

      {/* Search Bar */}
      <form className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <span className="absolute pl-3 text-gray-400">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        </span>
        <input type="text" placeholder="Search" className="pl-10 pr-4 py-1.5 rounded bg-gray-100 dark:bg-gray-800 focus:outline-none w-full" />
      </form>

      {/* Nav Icons */}
      <ul className="flex flex-1 justify-center md:justify-end items-center gap-2 md:gap-4">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center px-2 py-1 group ${isActive ? "text-blue-700" : "text-gray-500 dark:text-gray-300"}`
              }
            >
              <span className="text-xl">
                {/* Replace with icons as needed */}
                <i className={`icon-${item.icon}`}></i>
              </span>
              <span className="hidden md:block text-xs font-medium">
                {item.label}
              </span>
              {location.pathname.startsWith(item.to) && (
                <span className="block w-full h-1 bg-blue-700 rounded-t mt-1"></span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Me & Work */}
      <div className="flex items-center gap-2 md:gap-4 ml-2">
        {/* Me dropdown */}
        <div className="relative group">
          <img src={currentUser?.avatar || 'https://i.pravatar.cc/150?img=12'} alt="Me" className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-700" />
          <span className="hidden md:inline ml-1 text-xs font-medium">Me</span>
          {/* Dropdown placeholder */}
          <div className="hidden group-hover:block absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10">
            <div className="p-3 border-b border-gray-100 dark:border-gray-700">
              <div className="font-semibold">{currentUser?.name}</div>
              <div className="text-xs text-gray-500">{currentUser?.headline}</div>
            </div>
            <ul>
              <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">View Profile</button></li>
              <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Sign Out</button></li>
            </ul>
            <Link to="/notifications" className="relative text-gray-700 hover:text-blue-600 font-medium flex items-center">
              <FaBell className="text-lg" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                  {unreadCount}
                </span>
              )}
              <span className="ml-1">Notifications</span>
            </Link>
          </div>
        </div>
        {/* Work grid icon */}
        <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          <span className="hidden md:inline ml-1 text-xs font-medium">Work</span>
        </button>
      </div>
    </nav>
  );
}
