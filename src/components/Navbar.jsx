import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useNotification } from "../contexts/NotificationContext";
import { useAuth } from "../contexts/AuthContext";
import { useDarkMode } from "../contexts/DarkModeContext.jsx";
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Briefcase,
  Building2,
  Clock,
  Crown,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Plus,
  Search,
  Settings,
  Sun,
  User,
  Users,
  X,
} from "lucide-react";
import { PremiumModal } from "../pages/Settings";

// Static data for search suggestions
const SUGGESTIONS_DATA = {
  people: [
    { id: 1, name: "Shubham Kumar", headline: "Senior Software Engineer at Google", avatar: "https://i.pravatar.cc/150?img=11" },
    { id: 2, name: "Priya Sharma", headline: "Product Manager at Microsoft", avatar: "https://i.pravatar.cc/150?img=5" },
    { id: 3, name: "Rahul Verma", headline: "UX Designer at Adobe", avatar: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "Ananya Patel", headline: "Marketing Director at Flipkart", avatar: "https://i.pravatar.cc/150?img=1" },
  ],
  jobs: [
    { id: 1, title: "Senior Frontend Developer", company: "Google", location: "Bangalore" },
    { id: 2, title: "Full Stack Engineer", company: "Microsoft", location: "Hyderabad" },
    { id: 3, title: "Product Designer", company: "Figma", location: "Remote" },
  ],
  companies: [
    { id: 1, name: "Google", industry: "Technology", followers: "15M" },
    { id: 2, name: "Microsoft", industry: "Technology", followers: "12M" },
    { id: 3, name: "Amazon", industry: "Technology", followers: "10M" },
  ],
};

const RECENT_SEARCHES = [
  "react developer",
  "software engineer",
  "product manager",
  "ux designer",
];

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { unreadCount } = useNotification ? useNotification() : { unreadCount: 0 };
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggle: toggleDarkMode } = useDarkMode();
  
  // Premium modal state
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState(RECENT_SEARCHES);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Filter suggestions based on query
  const filteredSuggestions = useState(() => {
    if (!searchQuery.trim()) return { people: [], jobs: [], companies: [] };
    const query = searchQuery.toLowerCase();
    return {
      people: SUGGESTIONS_DATA.people.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.headline.toLowerCase().includes(query)
      ).slice(0, 3),
      jobs: SUGGESTIONS_DATA.jobs.filter(j => 
        j.title.toLowerCase().includes(query) || 
        j.company.toLowerCase().includes(query)
      ).slice(0, 2),
      companies: SUGGESTIONS_DATA.companies.filter(c => 
        c.name.toLowerCase().includes(query)
      ).slice(0, 2),
    };
  })[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close transient UI on navigation
  useEffect(() => {
    setDrawerOpen(false);
    setMobileSearchOpen(false);
    setShowSearchDropdown(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Add to recent searches
      setRecentSearches(prev => {
        const filtered = prev.filter(s => s !== searchQuery.trim());
        return [searchQuery.trim(), ...filtered].slice(0, 5);
      });
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchDropdown(false);
    }
  };

  // Handle recent search click
  const handleRecentSearchClick = (term) => {
    setSearchQuery(term);
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setShowSearchDropdown(false);
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  // Remove single recent search
  const removeRecentSearch = (term, e) => {
    e.stopPropagation();
    setRecentSearches(prev => prev.filter(s => s !== term));
  };

  const onPressPlus = () => {
    navigate("/feed", { state: { compose: true } });
  };

  return (
    <>
      <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-6 py-2 flex items-center justify-between sticky top-0 z-[70]">
        {/* Mobile: hamburger + logo */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-100"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/feed" className="flex items-center gap-2 text-blue-700 font-bold text-lg">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="6" fill="#0A66C2"/>
              <text x="7" y="23" fontSize="18" fill="white" fontFamily="Arial" fontWeight="bold">in</text>
            </svg>
          </Link>
        </div>

        {/* Desktop: logo */}
        <Link to="/feed" className="hidden md:flex items-center gap-2 text-blue-700 font-bold text-xl">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="6" fill="#0A66C2"/>
            <text x="7" y="23" fontSize="18" fill="white" fontFamily="Arial" fontWeight="bold">in</text>
          </svg>
          <span className="hidden sm:inline">LinkedIn</span>
        </Link>

        {/* Search (desktop) */}
        <div ref={searchContainerRef} className="hidden md:flex items-center flex-1 max-w-md mx-6 relative">
          <form onSubmit={handleSearch} className="w-full relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchDropdown(true)}
              className="pl-10 pr-10 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-800 w-full transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  searchInputRef.current?.focus();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full hover:bg-gray-200/70 dark:hover:bg-gray-700 flex items-center justify-center text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          <SearchDropdown />
        </div>

        {/* Mobile: search icon */}
        <div className="md:hidden flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setMobileSearchOpen((s) => !s);
              setTimeout(() => searchInputRef.current?.focus(), 0);
            }}
            className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-100"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <img
            src={currentUser?.avatar || "https://i.pravatar.cc/150?img=12"}
            alt="Me"
            className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700"
          />
        </div>

        {/* Desktop: nav + actions */}
        <div className="hidden md:flex items-center gap-3">
          <ul className="flex items-center gap-2">
            <DesktopIconLink to="/feed" label="Home" icon={Home} />
            <DesktopIconLink to="/network" label="My Network" icon={Users} />
            <DesktopIconLink to="/jobs" label="Jobs" icon={Briefcase} />
            <DesktopIconLink to="/messaging" label="Messaging" icon={MessageSquare} />
            <DesktopIconLink to="/notifications" label="Notifications" icon={Bell} badge={unreadCount} />
          </ul>

          <button
            type="button"
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-100"
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setShowPremiumModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 rounded-full text-xs font-medium hover:from-amber-200 hover:to-yellow-200 transition-colors"
          >
            <Crown className="w-3.5 h-3.5" />
            Try Premium
          </button>

          <Link to={`/profile/${currentUser?.id || "1"}`} className="flex items-center gap-2">
            <img
              src={currentUser?.avatar || "https://i.pravatar.cc/150?img=12"}
              alt="Me"
              className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700"
            />
          </Link>
        </div>
      </nav>

      {/* Mobile: expanded search */}
      {mobileSearchOpen && (
        <div className="md:hidden sticky top-[56px] z-[60] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-3 py-2">
          <div ref={searchContainerRef} className="relative">
            <form onSubmit={handleSearch} className="w-full relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="w-5 h-5" />
              </span>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchDropdown(true)}
                className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setMobileSearchOpen(false);
                  setShowSearchDropdown(false);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full hover:bg-gray-200/60 dark:hover:bg-gray-700 flex items-center justify-center text-gray-500"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </form>

            <SearchDropdown />
          </div>
        </div>
      )}

      <MobileDrawer />
      <MobileBottomTabs />

      <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
    </>
  );

  function DesktopIconLink({ to, label, icon: Icon, badge }) {
    return (
      <li>
        <NavLink
          to={to}
          className={({ isActive }) =>
            `relative flex flex-col items-center px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
              isActive ? "text-blue-700" : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <Icon className="w-6 h-6" />
          {badge > 0 && (
            <span className="absolute top-1 right-3 bg-blue-600 text-white text-[10px] rounded-full px-1.5 py-0.5 min-w-[16px] text-center">
              {badge}
            </span>
          )}
          <span className="text-[11px] font-medium">{label}</span>
        </NavLink>
      </li>
    );
  }

  function MobileBottomTabs() {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-[80] bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 md:hidden">
        <div className="mx-auto max-w-3xl px-3 py-2 grid grid-cols-5 items-center">
          <BottomTab to="/feed" label="Home" icon={Home} />
          <BottomTab to="/network" label="Network" icon={Users} />
          <button
            type="button"
            onClick={onPressPlus}
            className="mx-auto w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg -mt-6 border-4 border-white dark:border-gray-900"
            aria-label="Create post"
          >
            <Plus className="w-6 h-6" />
          </button>
          <BottomTab to="/notifications" label="Alerts" icon={Bell} badge={unreadCount} />
          <BottomTab to="/jobs" label="Jobs" icon={Briefcase} />
        </div>
      </div>
    );
  }

  function BottomTab({ to, label, icon: Icon, badge }) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `relative flex flex-col items-center justify-center gap-0.5 py-1 ${
            isActive ? "text-blue-700" : "text-gray-600 dark:text-gray-300"
          }`
        }
      >
        <Icon className="w-6 h-6" />
        {badge > 0 && (
          <span className="absolute top-0 right-5 bg-blue-600 text-white text-[10px] rounded-full px-1.5 py-0.5 min-w-[16px] text-center">
            {badge}
          </span>
        )}
        <span className="text-[10px] font-medium">{label}</span>
      </NavLink>
    );
  }

  function MobileDrawer() {
    return (
      <>
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setDrawerOpen(false)}
          className={`fixed inset-0 z-[90] bg-black/40 transition-opacity ${
            drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
        <div
          className={`fixed left-0 top-0 bottom-0 z-[95] w-[86%] max-w-[360px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-2xl transform transition-transform ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={currentUser?.avatar || "https://i.pravatar.cc/150?img=12"}
                alt="Me"
                className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700"
              />
              <div className="min-w-0">
                <div className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {currentUser?.name || "LinkedIn Member"}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-300 truncate">
                  {currentUser?.headline || "Building a professional network"}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-3">
            <Link
              to={`/profile/${currentUser?.id || "1"}`}
              className="block rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4"
            >
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">View profile</div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-300">
                {currentUser?.connections ?? 312} connections
              </div>
            </Link>

            <div className="space-y-1">
              <DrawerLink icon={MessageSquare} label="Messaging" to="/messaging" />
              <DrawerLink icon={Settings} label="Settings" to="/settings" />
              <DrawerLink icon={HelpCircle} label="Help" to="/settings" />
            </div>

            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={toggleDarkMode}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-100"
              >
                <span className="flex items-center gap-3">
                  {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  Dark mode
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-300">{isDark ? "On" : "Off"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  logout?.();
                  navigate("/");
                }}
                className="mt-2 w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-100"
              >
                <LogOut className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                <span className="text-sm font-medium">Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  function DrawerLink({ icon: Icon, label, to }) {
    return (
      <Link
        to={to}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-100"
      >
        <Icon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
        <span className="text-sm font-medium">{label}</span>
      </Link>
    );
  }

  function SearchDropdown() {
    if (!showSearchDropdown) return null;

    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-[100] overflow-hidden">
        {recentSearches.length > 0 && !searchQuery.trim() && (
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent</span>
              <button
                type="button"
                onClick={clearRecentSearches}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear
              </button>
            </div>
            {recentSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => handleRecentSearchClick(term)}
                className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-left group"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{term}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => removeRecentSearch(term, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                >
                  <X className="w-3 h-3 text-gray-500 dark:text-gray-300" />
                </button>
              </button>
            ))}
          </div>
        )}

        {searchQuery.trim() && (
          <div className="p-3">
            {filteredSuggestions.people.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2 px-3">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">People</span>
                </div>
                {filteredSuggestions.people.map((person) => (
                  <button
                    key={person.id}
                    type="button"
                    onClick={() => {
                      navigate(`/profile/${person.id}`);
                      setShowSearchDropdown(false);
                      setSearchQuery("");
                      setMobileSearchOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-left"
                  >
                    <img src={person.avatar} alt={person.name} className="w-8 h-8 rounded-full object-cover" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{person.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-300 truncate">{person.headline}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {filteredSuggestions.jobs.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2 px-3">
                  <Briefcase className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Jobs</span>
                </div>
                {filteredSuggestions.jobs.map((job) => (
                  <button
                    key={job.id}
                    type="button"
                    onClick={() => {
                      navigate("/jobs");
                      setShowSearchDropdown(false);
                      setSearchQuery("");
                      setMobileSearchOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-left"
                  >
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{job.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-300 truncate">
                        {job.company} • {job.location}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {filteredSuggestions.companies.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2 px-3">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Companies</span>
                </div>
                {filteredSuggestions.companies.map((company) => (
                  <button
                    key={company.id}
                    type="button"
                    onClick={() => {
                      navigate(`/search?q=${encodeURIComponent(company.name)}`);
                      setShowSearchDropdown(false);
                      setSearchQuery(company.name);
                      setMobileSearchOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-left"
                  >
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-200">
                      {company.name[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{company.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-300 truncate">
                        {company.industry} • {company.followers} followers
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={handleSearch}
              className="w-full flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-left text-sm font-medium"
            >
              <Search className="w-4 h-4" />
              Search for "{searchQuery}"
            </button>
          </div>
        )}

        {searchQuery.trim() &&
          filteredSuggestions.people.length === 0 &&
          filteredSuggestions.jobs.length === 0 &&
          filteredSuggestions.companies.length === 0 && (
            <div className="p-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-300">No suggestions found</p>
              <button
                type="button"
                onClick={handleSearch}
                className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Search for "{searchQuery}"
              </button>
            </div>
          )}
      </div>
    );
  }
}
