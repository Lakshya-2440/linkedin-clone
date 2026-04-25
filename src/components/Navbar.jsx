import { createElement, useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  Briefcase,
  Building2,
  ChevronDown,
  Clock,
  Crown,
  Grid3X3,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  User,
  Users,
  X,
} from "lucide-react";
import { useNotification } from "../contexts/NotificationContext";
import { useAuth } from "../contexts/AuthContext";
import { PremiumModal } from "../pages/Settings";
import LinkedInLogo from "./LinkedInLogo";

const SUGGESTIONS_DATA = {
  people: [
    {
      id: 2,
      name: "Shubham Kumar",
      headline: "Senior Software Engineer at Google",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    {
      id: 3,
      name: "Priya Sharma",
      headline: "Product Manager at Microsoft",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 4,
      name: "Rahul Verma",
      headline: "UX Designer at Adobe",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
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
  "software engineer",
  "product manager",
  "react developer",
  "ux designer",
];

const PRIMARY_NAV = [
  { to: "/feed", label: "Home", icon: Home },
  { to: "/network", label: "My Network", icon: Users },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/messaging", label: "Messaging", icon: MessageSquare },
  { to: "/notifications", label: "Notifications", icon: Bell },
];

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { unreadCount } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();

  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState(RECENT_SEARCHES);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  const filteredSuggestions = useMemo(() => {
    if (!searchQuery.trim()) {
      return { people: [], jobs: [], companies: [] };
    }

    const query = searchQuery.toLowerCase();

    return {
      people: SUGGESTIONS_DATA.people.filter(
        (person) =>
          person.name.toLowerCase().includes(query) ||
          person.headline.toLowerCase().includes(query)
      ).slice(0, 3),
      jobs: SUGGESTIONS_DATA.jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query)
      ).slice(0, 2),
      companies: SUGGESTIONS_DATA.companies.filter((company) =>
        company.name.toLowerCase().includes(query)
      ).slice(0, 2),
    };
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDrawerOpen(false);
      setMobileSearchOpen(false);
      setShowSearchDropdown(false);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [location.pathname]);

  const submitSearch = (value = searchQuery) => {
    const term = value.trim();
    if (!term) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item !== term);
      return [term, ...filtered].slice(0, 5);
    });

    navigate(`/search?q=${encodeURIComponent(term)}`);
    setShowSearchDropdown(false);
    setMobileSearchOpen(false);
  };

  const handleSearch = (event) => {
    event?.preventDefault();
    submitSearch();
  };

  const handleRecentSearchClick = (term) => {
    setSearchQuery(term);
    submitSearch(term);
  };

  const removeRecentSearch = (term, event) => {
    event.stopPropagation();
    setRecentSearches((prev) => prev.filter((item) => item !== term));
  };

  return (
    <>
      <nav className="linkedin-nav sticky top-0 z-[70]">
        <div className="mx-auto flex h-14 max-w-[1128px] items-center gap-2 px-3 md:px-4">
          <div className="flex items-center gap-2 md:flex-1 md:max-w-[320px]">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link to="/feed" className="shrink-0" aria-label="LinkedIn Home">
              <LinkedInLogo showWordmark={false} size="sm" />
            </Link>

            <div ref={searchContainerRef} className="relative hidden flex-1 md:block">
              <form onSubmit={handleSearch} className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#526a6e]" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onFocus={() => setShowSearchDropdown(true)}
                  className="linkedin-input h-9 w-full rounded-md pl-11 pr-10 text-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      searchInputRef.current?.focus();
                    }}
                    className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-gray-500 hover:bg-white"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </form>

              <SearchDropdown
                searchQuery={searchQuery}
                filteredSuggestions={filteredSuggestions}
                recentSearches={recentSearches}
                onClearRecent={() => setRecentSearches([])}
                onHandleSearch={handleSearch}
                onRecentClick={handleRecentSearchClick}
                onRemoveRecent={removeRecentSearch}
                onHide={() => setShowSearchDropdown(false)}
                show={showSearchDropdown}
                navigate={navigate}
                setSearchQuery={setSearchQuery}
                setMobileSearchOpen={setMobileSearchOpen}
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-1 md:hidden">
            <button
              type="button"
              onClick={() => {
                setMobileSearchOpen((prev) => !prev);
                window.setTimeout(() => searchInputRef.current?.focus(), 0);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link to={`/profile/${currentUser?.id || "1"}`} className="shrink-0">
              <img
                src={currentUser?.avatar || "https://i.pravatar.cc/150?img=12"}
                alt={currentUser?.name || "Profile"}
                className="h-8 w-8 rounded-full border border-gray-200 object-cover"
              />
            </Link>
          </div>

          <div className="ml-auto hidden h-full items-stretch md:flex">
            {PRIMARY_NAV.map((item) => (
              <DesktopNavItem
                key={item.to}
                to={item.to}
                label={item.label}
                icon={item.icon}
                badge={item.to === "/notifications" ? unreadCount : 0}
              />
            ))}

            <Link
              to={`/profile/${currentUser?.id || "1"}`}
              className={cx(
                "flex min-w-[72px] flex-col items-center justify-center border-b-2 px-3 text-xs transition-colors",
                location.pathname.startsWith("/profile/")
                  ? "border-black text-[#191919]"
                  : "border-transparent text-[#666666] hover:text-[#191919]"
              )}
            >
              <img
                src={currentUser?.avatar || "https://i.pravatar.cc/150?img=12"}
                alt={currentUser?.name || "Profile"}
                className="mb-0.5 h-6 w-6 rounded-full object-cover"
              />
              <span className="flex items-center gap-0.5">
                Me
                <ChevronDown className="h-3.5 w-3.5" />
              </span>
            </Link>

            <button
              type="button"
              onClick={() => navigate("/settings")}
              className="flex min-w-[72px] flex-col items-center justify-center border-b-2 border-transparent px-3 text-xs text-[#666666] transition-colors hover:text-[#191919]"
            >
              <Grid3X3 className="mb-0.5 h-5 w-5" />
              <span className="flex items-center gap-0.5">
                For Business
                <ChevronDown className="h-3.5 w-3.5" />
              </span>
            </button>

            <div className="mx-2 my-2 h-10 border-l border-gray-200" />

            <button
              type="button"
              onClick={() => setShowPremiumModal(true)}
              className="w-[112px] text-left text-[12px] leading-4 text-[#915907] hover:underline"
            >
              Try Premium for Rs0
            </button>
          </div>
        </div>

        {mobileSearchOpen && (
          <div className="border-t border-gray-200 bg-white px-3 py-2 md:hidden">
            <div ref={searchContainerRef} className="relative">
              <form onSubmit={handleSearch} className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#526a6e]" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onFocus={() => setShowSearchDropdown(true)}
                  className="linkedin-input h-11 w-full rounded-md pl-11 pr-10 text-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setMobileSearchOpen(false);
                    setShowSearchDropdown(false);
                  }}
                  className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-gray-500"
                  aria-label="Close search"
                >
                  <X className="h-4 w-4" />
                </button>
              </form>

              <SearchDropdown
                searchQuery={searchQuery}
                filteredSuggestions={filteredSuggestions}
                recentSearches={recentSearches}
                onClearRecent={() => setRecentSearches([])}
                onHandleSearch={handleSearch}
                onRecentClick={handleRecentSearchClick}
                onRemoveRecent={removeRecentSearch}
                onHide={() => setShowSearchDropdown(false)}
                show={showSearchDropdown}
                navigate={navigate}
                setSearchQuery={setSearchQuery}
                setMobileSearchOpen={setMobileSearchOpen}
              />
            </div>
          </div>
        )}
      </nav>

      <MobileDrawer
        currentUser={currentUser}
        drawerOpen={drawerOpen}
        navigate={navigate}
        onClose={() => setDrawerOpen(false)}
        onOpenPremium={() => setShowPremiumModal(true)}
        onSignOut={() => {
          logout?.();
          navigate("/");
        }}
      />

      <MobileBottomTabs unreadCount={unreadCount} />

      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />
    </>
  );
}

function DesktopNavItem({ to, label, icon, badge }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cx(
          "relative flex min-w-[72px] flex-col items-center justify-center border-b-2 px-3 text-xs transition-colors",
          isActive
            ? "border-black text-[#191919]"
            : "border-transparent text-[#666666] hover:text-[#191919]"
        )
      }
    >
      {createElement(icon, { className: "mb-0.5 h-5 w-5" })}
      {badge > 0 && (
        <span className="absolute left-1/2 top-[6px] min-w-[16px] rounded-full bg-[#cc1016] px-1 text-center text-[10px] font-semibold text-white">
          {badge}
        </span>
      )}
      <span className="whitespace-nowrap">{label}</span>
    </NavLink>
  );
}

function MobileBottomTabs({ unreadCount }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[80] border-t border-gray-200 bg-white md:hidden">
      <div className="mx-auto grid max-w-[1128px] grid-cols-5 px-2 py-1">
        <BottomTab to="/feed" label="Home" icon={Home} />
        <BottomTab to="/network" label="My Network" icon={Users} />
        <BottomTab to="/jobs" label="Jobs" icon={Briefcase} />
        <BottomTab to="/messaging" label="Messaging" icon={MessageSquare} />
        <BottomTab
          to="/notifications"
          label="Notifications"
          icon={Bell}
          badge={unreadCount}
        />
      </div>
    </div>
  );
}

function BottomTab({ to, label, icon, badge }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cx(
          "relative flex flex-col items-center justify-center gap-0.5 py-1 text-[10px]",
          isActive ? "text-[#191919]" : "text-[#666666]"
        )
      }
    >
      {createElement(icon, { className: "h-5 w-5" })}
      {badge > 0 && (
        <span className="absolute right-4 top-0 min-w-[16px] rounded-full bg-[#cc1016] px-1 text-center text-[10px] font-semibold text-white">
          {badge}
        </span>
      )}
      <span className="line-clamp-2 text-center leading-3">{label}</span>
    </NavLink>
  );
}

function MobileDrawer({
  currentUser,
  drawerOpen,
  navigate,
  onClose,
  onOpenPremium,
  onSignOut,
}) {
  const menuLinks = [
    { to: "/feed", label: "Home", icon: Home },
    { to: "/network", label: "My network", icon: Users },
    { to: "/jobs", label: "Jobs", icon: Briefcase },
    { to: "/messaging", label: "Messaging", icon: MessageSquare },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className={cx(
          "fixed inset-0 z-[90] bg-black/40 transition-opacity",
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-label="Close menu overlay"
      />

      <aside
        className={cx(
          "fixed left-0 top-0 bottom-0 z-[95] w-[88%] max-w-[360px] overflow-y-auto bg-white shadow-2xl transition-transform",
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="border-b border-gray-200 p-4">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={currentUser?.avatar || "https://i.pravatar.cc/150?img=12"}
                alt={currentUser?.name || "Profile"}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="min-w-0">
                <div className="truncate text-base font-semibold text-[#191919]">
                  {currentUser?.name || "LinkedIn Member"}
                </div>
                <div className="line-clamp-2 text-sm text-[#666666]">
                  {currentUser?.headline || "Building a professional network"}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              navigate(`/profile/${currentUser?.id || "1"}`);
              onClose();
            }}
            className="rounded-full border border-[#0a66c2] px-4 py-2 text-sm font-semibold text-[#0a66c2]"
          >
            View profile
          </button>
        </div>

        <div className="border-b border-gray-200 px-4 py-4">
          <button
            type="button"
            onClick={() => {
              onOpenPremium();
              onClose();
            }}
            className="flex items-center gap-3 text-left"
          >
            <Crown className="h-5 w-5 text-[#915907]" />
            <span>
              <div className="text-sm font-semibold text-[#191919]">Try Premium for Rs0</div>
              <div className="text-xs text-[#666666]">See who viewed your profile</div>
            </span>
          </button>
        </div>

        <nav className="px-2 py-2">
          {menuLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#191919] hover:bg-gray-100"
            >
              <item.icon className="h-5 w-5 text-gray-600" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-gray-200 px-2 py-2">
          <button
            type="button"
            onClick={() => {
              onSignOut();
              onClose();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#191919] hover:bg-gray-100"
          >
            <LogOut className="h-5 w-5 text-gray-600" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function SearchDropdown({
  searchQuery,
  filteredSuggestions,
  recentSearches,
  onClearRecent,
  onHandleSearch,
  onRecentClick,
  onRemoveRecent,
  onHide,
  show,
  navigate,
  setSearchQuery,
  setMobileSearchOpen,
}) {
  if (!show) return null;

  return (
    <div className="absolute left-0 right-0 top-full z-[100] mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
      {!searchQuery.trim() && recentSearches.length > 0 && (
        <div className="p-3">
          <div className="mb-2 flex items-center justify-between px-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
              Recent
            </span>
            <button
              type="button"
              onClick={onClearRecent}
              className="text-xs font-semibold text-[#0a66c2]"
            >
              Clear
            </button>
          </div>

          {recentSearches.map((term) => (
            <div
              key={term}
              className="group flex w-full items-center justify-between rounded-lg px-2 py-2 hover:bg-gray-50"
            >
              <button
                type="button"
                onClick={() => onRecentClick(term)}
                className="flex min-w-0 flex-1 items-center gap-3 text-left"
              >
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-[#191919]">{term}</span>
              </button>
              <button
                type="button"
                onClick={(event) => onRemoveRecent(term, event)}
                className="rounded-full p-1 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100"
                aria-label={`Remove ${term}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {searchQuery.trim() && (
        <div className="p-3">
          <ResultSection icon={User} label="People">
            {filteredSuggestions.people.map((person) => (
              <button
                key={person.id}
                type="button"
                onClick={() => {
                  navigate(`/profile/${person.id}`);
                  setSearchQuery("");
                  setMobileSearchOpen(false);
                  onHide();
                }}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-gray-50"
              >
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-[#191919]">
                    {person.name}
                  </span>
                  <span className="block truncate text-xs text-[#666666]">
                    {person.headline}
                  </span>
                </span>
              </button>
            ))}
          </ResultSection>

          <ResultSection icon={Briefcase} label="Jobs">
            {filteredSuggestions.jobs.map((job) => (
              <button
                key={job.id}
                type="button"
                onClick={() => {
                  navigate("/jobs");
                  setSearchQuery(job.title);
                  setMobileSearchOpen(false);
                  onHide();
                }}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-gray-50"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#edf3f8] text-[#0a66c2]">
                  <Briefcase className="h-4 w-4" />
                </div>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-[#191919]">
                    {job.title}
                  </span>
                  <span className="block truncate text-xs text-[#666666]">
                    {job.company} • {job.location}
                  </span>
                </span>
              </button>
            ))}
          </ResultSection>

          <ResultSection icon={Building2} label="Companies">
            {filteredSuggestions.companies.map((company) => (
              <button
                key={company.id}
                type="button"
                onClick={() => {
                  navigate(`/search?q=${encodeURIComponent(company.name)}`);
                  setSearchQuery(company.name);
                  setMobileSearchOpen(false);
                  onHide();
                }}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-gray-50"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-sm font-semibold text-[#191919]">
                  {company.name[0]}
                </div>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-[#191919]">
                    {company.name}
                  </span>
                  <span className="block truncate text-xs text-[#666666]">
                    {company.industry} • {company.followers} followers
                  </span>
                </span>
              </button>
            ))}
          </ResultSection>

          {filteredSuggestions.people.length === 0 &&
            filteredSuggestions.jobs.length === 0 &&
            filteredSuggestions.companies.length === 0 && (
              <div className="px-2 py-8 text-center text-sm text-[#666666]">
                No suggestions found
              </div>
            )}

          <button
            type="button"
            onClick={onHandleSearch}
            className="mt-2 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold text-[#0a66c2] hover:bg-[#edf3f8]"
          >
            <Search className="h-4 w-4" />
            Search for "{searchQuery}"
          </button>
        </div>
      )}
    </div>
  );
}

function ResultSection({ icon, label, children }) {
  if (!children || children.length === 0) return null;

  return (
    <div className="mb-3">
      <div className="mb-1 flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
        {createElement(icon, { className: "h-3.5 w-3.5" })}
        <span>{label}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}
