import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useNotification } from "../contexts/NotificationContext";
import { FaBell } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useState, useRef, useEffect } from "react";
import { Search, X, Clock, User, Briefcase, Building2, FileText } from "lucide-react";

const navItems = [
  { to: "/feed", label: "Home", icon: "home" },
  { to: "/network", label: "My Network", icon: "users" },
  { to: "/jobs", label: "Jobs", icon: "briefcase" },
  { to: "/messaging", label: "Messaging", icon: "message" },
  { to: "/notifications", label: "Notifications", icon: "bell" },
];

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
  const { currentUser } = useAuth();
  const { unreadCount } = useNotification ? useNotification() : { unreadCount: 0 };
  const location = useLocation();
  const navigate = useNavigate();
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState(RECENT_SEARCHES);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

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
            className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white w-full transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                searchInputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Search Dropdown */}
        {showSearchDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden">
            {/* Recent Searches */}
            {recentSearches.length > 0 && !searchQuery.trim() && (
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent</span>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear
                  </button>
                </div>
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleRecentSearchClick(term)}
                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{term}</span>
                    </div>
                    <button
                      onClick={(e) => removeRecentSearch(term, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded"
                    >
                      <X className="w-3 h-3 text-gray-500" />
                    </button>
                  </button>
                ))}
              </div>
            )}

            {/* Search Suggestions */}
            {searchQuery.trim() && (
              <div className="p-3">
                {/* People Suggestions */}
                {filteredSuggestions.people.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2 px-3">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">People</span>
                    </div>
                    {filteredSuggestions.people.map((person) => (
                      <button
                        key={person.id}
                        onClick={() => {
                          navigate(`/profile/${person.id}`);
                          setShowSearchDropdown(false);
                          setSearchQuery("");
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-left"
                      >
                        <img src={person.avatar} alt={person.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{person.name}</p>
                          <p className="text-xs text-gray-500">{person.headline}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Jobs Suggestions */}
                {filteredSuggestions.jobs.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2 px-3">
                      <Briefcase className="w-4 h-4 text-gray-500" />
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Jobs</span>
                    </div>
                    {filteredSuggestions.jobs.map((job) => (
                      <button
                        key={job.id}
                        onClick={() => {
                          navigate("/jobs");
                          setShowSearchDropdown(false);
                          setSearchQuery("");
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-left"
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{job.title}</p>
                          <p className="text-xs text-gray-500">{job.company} • {job.location}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Companies Suggestions */}
                {filteredSuggestions.companies.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2 px-3">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Companies</span>
                    </div>
                    {filteredSuggestions.companies.map((company) => (
                      <button
                        key={company.id}
                        onClick={() => {
                          navigate(`/search?q=${encodeURIComponent(company.name)}`);
                          setShowSearchDropdown(false);
                          setSearchQuery(company.name);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-left"
                      >
                        <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center text-sm font-bold text-gray-600">
                          {company.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{company.name}</p>
                          <p className="text-xs text-gray-500">{company.industry} • {company.followers} followers</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* See all results */}
                <button
                  onClick={handleSearch}
                  className="w-full flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-left text-sm font-medium"
                >
                  <Search className="w-4 h-4" />
                  Search for "{searchQuery}"
                </button>
              </div>
            )}

            {/* Empty state when no suggestions */}
            {searchQuery.trim() && 
              filteredSuggestions.people.length === 0 && 
              filteredSuggestions.jobs.length === 0 && 
              filteredSuggestions.companies.length === 0 && (
              <div className="p-4 text-center">
                <p className="text-sm text-gray-500">No suggestions found</p>
                <button
                  onClick={handleSearch}
                  className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Search for "{searchQuery}"
                </button>
              </div>
            )}
          </div>
        )}
      </div>

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
