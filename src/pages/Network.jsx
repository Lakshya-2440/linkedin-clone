import { useState, useMemo } from "react";
import {
  Users,
  UserPlus,
  Users2,
  Calendar,
  FileText,
  Hash,
  ChevronRight,
  X,
  MapPin,
  Building2,
  GraduationCap,
  MoreHorizontal,
  Check,
  UserCheck,
} from "lucide-react";
import { SkeletonNetworkCard, SkeletonList } from "../components/Skeleton";

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                              STATIC DATA                                     */
/* ═══════════════════════════════════════════════════════════════════════════ */

// Pending invitations data
const INITIAL_INVITATIONS = [
  {
    id: 1,
    name: "Priya Sharma",
    headline: "Product Manager at Google",
    avatar: "https://i.pravatar.cc/150?img=5",
    mutualConnections: 12,
  },
  {
    id: 2,
    name: "Arjun Mehta",
    headline: "Software Engineer at Microsoft",
    avatar: "https://i.pravatar.cc/150?img=8",
    mutualConnections: 8,
  },
  {
    id: 3,
    name: "Neha Gupta",
    headline: "UX Designer at Adobe",
    avatar: "https://i.pravatar.cc/150?img=9",
    mutualConnections: 15,
  },
];

// People you may know data (18 people)
const PEOPLE_DATA = [
  {
    id: 101,
    name: "Rohan Kumar",
    headline: "Full Stack Developer at Flipkart",
    avatar: "https://i.pravatar.cc/150?img=11",
    coverPhoto: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=100&fit=crop",
    mutualConnections: 23,
    company: "Flipkart",
    location: "Bangalore",
    school: "IIT Bombay",
  },
  {
    id: 102,
    name: "Ananya Patel",
    headline: "Data Scientist at Amazon",
    avatar: "https://i.pravatar.cc/150?img=1",
    coverPhoto: "https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=100&fit=crop",
    mutualConnections: 18,
    company: "Amazon",
    location: "Hyderabad",
    school: "IIT Delhi",
  },
  {
    id: 103,
    name: "Vikram Singh",
    headline: "iOS Developer at Apple",
    avatar: "https://i.pravatar.cc/150?img=7",
    coverPhoto: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=100&fit=crop",
    mutualConnections: 31,
    company: "Apple",
    location: "Mumbai",
    school: "BITS Pilani",
  },
  {
    id: 104,
    name: "Sneha Gupta",
    headline: "DevOps Lead at Netflix",
    avatar: "https://i.pravatar.cc/150?img=10",
    coverPhoto: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=100&fit=crop",
    mutualConnections: 27,
    company: "Netflix",
    location: "Pune",
    school: "NIT Trichy",
  },
  {
    id: 105,
    name: "Rahul Verma",
    headline: "Backend Developer at Swiggy",
    avatar: "https://i.pravatar.cc/150?img=3",
    coverPhoto: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=100&fit=crop",
    mutualConnections: 14,
    company: "Swiggy",
    location: "Bangalore",
    school: "IIT Madras",
  },
  {
    id: 106,
    name: "Kavita Reddy",
    headline: "Product Designer at Figma",
    avatar: "https://i.pravatar.cc/150?img=16",
    coverPhoto: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=400&h=100&fit=crop",
    mutualConnections: 9,
    company: "Figma",
    location: "San Francisco",
    school: "Stanford",
  },
  {
    id: 107,
    name: "Aditya Joshi",
    headline: "ML Engineer at Meta",
    avatar: "https://i.pravatar.cc/150?img=12",
    coverPhoto: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=400&h=100&fit=crop",
    mutualConnections: 42,
    company: "Meta",
    location: "Menlo Park",
    school: "MIT",
  },
  {
    id: 108,
    name: "Meera Iyer",
    headline: "Frontend Developer at Stripe",
    avatar: "https://i.pravatar.cc/150?img=20",
    coverPhoto: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=100&fit=crop",
    mutualConnections: 19,
    company: "Stripe",
    location: "Dublin",
    school: "Trinity College",
  },
  {
    id: 109,
    name: "Siddharth Rao",
    headline: "Cloud Architect at AWS",
    avatar: "https://i.pravatar.cc/150?img=13",
    coverPhoto: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?w=400&h=100&fit=crop",
    mutualConnections: 35,
    company: "AWS",
    location: "Seattle",
    school: "Georgia Tech",
  },
  {
    id: 110,
    name: "Divya Nair",
    headline: "Security Engineer at Cisco",
    avatar: "https://i.pravatar.cc/150?img=24",
    coverPhoto: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&h=100&fit=crop",
    mutualConnections: 21,
    company: "Cisco",
    location: "Bangalore",
    school: "IISc",
  },
  {
    id: 111,
    name: "Karan Malhotra",
    headline: "Android Developer at Spotify",
    avatar: "https://i.pravatar.cc/150?img=15",
    coverPhoto: "https://images.unsplash.com/photo-1557683311-eac922347aa1?w=400&h=100&fit=crop",
    mutualConnections: 16,
    company: "Spotify",
    location: "Stockholm",
    school: "KTH",
  },
  {
    id: 112,
    name: "Pooja Shah",
    headline: "Data Analyst at Uber",
    avatar: "https://i.pravatar.cc/150?img=26",
    coverPhoto: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&h=100&fit=crop",
    mutualConnections: 28,
    company: "Uber",
    location: "Bangalore",
    school: "IIM Bangalore",
  },
  {
    id: 113,
    name: "Nikhil Bansal",
    headline: "React Developer at Vercel",
    avatar: "https://i.pravatar.cc/150?img=17",
    coverPhoto: "https://images.unsplash.com/photo-1604079628040-94301bbbd135?w=400&h=100&fit=crop",
    mutualConnections: 13,
    company: "Vercel",
    location: "San Francisco",
    school: "UC Berkeley",
  },
  {
    id: 114,
    name: "Trisha Mukherjee",
    headline: "Blockchain Developer at Coinbase",
    avatar: "https://i.pravatar.cc/150?img=28",
    coverPhoto: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=100&fit=crop",
    mutualConnections: 7,
    company: "Coinbase",
    location: "Remote",
    school: "CMU",
  },
  {
    id: 115,
    name: "Amanpreet Kaur",
    headline: "Technical Writer at Notion",
    avatar: "https://i.pravatar.cc/150?img=30",
    coverPhoto: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=100&fit=crop",
    mutualConnections: 11,
    company: "Notion",
    location: "New York",
    school: "NYU",
  },
  {
    id: 116,
    name: "Deepak Menon",
    headline: "SRE at LinkedIn",
    avatar: "https://i.pravatar.cc/150?img=19",
    coverPhoto: "https://images.unsplash.com/photo-1614851099511-773084f6911d?w=400&h=100&fit=crop",
    mutualConnections: 45,
    company: "LinkedIn",
    location: "Sunnyvale",
    school: "Stanford",
  },
  {
    id: 117,
    name: "Ishaan Khanna",
    headline: "Game Developer at Unity",
    avatar: "https://i.pravatar.cc/150?img=21",
    coverPhoto: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=400&h=100&fit=crop",
    mutualConnections: 22,
    company: "Unity",
    location: "Copenhagen",
    school: "DTU",
  },
  {
    id: 118,
    name: "Riya Sen",
    headline: "AI Researcher at OpenAI",
    avatar: "https://i.pravatar.cc/150?img=32",
    coverPhoto: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=100&fit=crop",
    mutualConnections: 38,
    company: "OpenAI",
    location: "San Francisco",
    school: "Stanford",
  },
];

// Network counts for sidebar
const NETWORK_COUNTS = {
  connections: 248,
  following: 156,
  groups: 3,
  events: 1,
  pages: 5,
  newsletters: 2,
  hashtags: 7,
};

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                              MAIN COMPONENT                                  */
/* ═══════════════════════════════════════════════════════════════════════════ */
export default function Network() {
  const [activeTab, setActiveTab] = useState("invitations");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(12);

  // Invitations state
  const [invitations, setInvitations] = useState(INITIAL_INVITATIONS);

  // Connection states for people you may know
  const [connectionStates, setConnectionStates] = useState({});
  // Format: { userId: "connect" | "pending" | "connected" }

  // Follow states
  const [followStates, setFollowStates] = useState({});
  // Format: { userId: boolean }

  // Dismissed people
  const [dismissedPeople, setDismissedPeople] = useState(new Set());

  // Filter states
  const [locationFilter, setLocationFilter] = useState("all");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [schoolFilter, setSchoolFilter] = useState("all");

  // Handle invitation actions
  const handleAccept = (id) => {
    setInvitations((prev) => prev.filter((inv) => inv.id !== id));
    // In a real app, this would add to connections
  };

  const handleIgnore = (id) => {
    setInvitations((prev) => prev.filter((inv) => inv.id !== id));
  };

  // Handle connect actions
  const handleConnect = (id) => {
    setConnectionStates((prev) => ({ ...prev, [id]: "pending" }));
  };

  const handleCancelRequest = (id) => {
    setConnectionStates((prev) => ({ ...prev, [id]: "connect" }));
  };

  const handleFollow = (id) => {
    setFollowStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDismiss = (id) => {
    setDismissedPeople((prev) => new Set([...prev, id]));
  };

  // Filter people list
  const filteredPeople = useMemo(() => {
    return PEOPLE_DATA.filter((person) => {
      if (dismissedPeople.has(person.id)) return false;
      if (locationFilter !== "all" && person.location !== locationFilter)
        return false;
      if (companyFilter !== "all" && person.company !== companyFilter)
        return false;
      if (schoolFilter !== "all" && person.school !== schoolFilter)
        return false;
      return true;
    });
  }, [dismissedPeople, locationFilter, companyFilter, schoolFilter]);

  const visiblePeople = filteredPeople.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPeople.length;

  // Unique filter options
  const locations = [...new Set(PEOPLE_DATA.map((p) => p.location))];
  const companies = [...new Set(PEOPLE_DATA.map((p) => p.company))];
  const schools = [...new Set(PEOPLE_DATA.map((p) => p.school))];

  return (
    <div className="linkedin-page-wide grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
      {/* LEFT SIDEBAR */}
      <aside className="lg:sticky lg:top-[72px] h-fit">
        <NetworkSidebar
          counts={NETWORK_COUNTS}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex flex-col gap-4">
        <div className="linkedin-surface p-4">
          <h1 className="text-2xl font-semibold text-[#191919]">My Network</h1>
          <p className="mt-1 text-sm text-[#666666]">
            Track invitations, grow connections, and discover people you may know.
          </p>
        </div>

        {/* Tabs */}
        <div className="linkedin-surface">
          <div className="flex border-b border-gray-200">
            <TabButton
              active={activeTab === "invitations"}
              onClick={() => setActiveTab("invitations")}
              count={invitations.length}
            >
              Invitations
            </TabButton>
            <TabButton
              active={activeTab === "people"}
              onClick={() => setActiveTab("people")}
            >
              People you may know
            </TabButton>
          </div>

          {/* Invitations Section */}
          {activeTab === "invitations" && (
            <div className="p-6">
              {invitations.length === 0 ? (
                <div className="text-center py-12">
                  <UserCheck className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No pending invitations</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {invitations.map((invitation) => (
                    <InvitationCard
                      key={invitation.id}
                      invitation={invitation}
                      onAccept={() => handleAccept(invitation.id)}
                      onIgnore={() => handleIgnore(invitation.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* People You May Know Section */}
          {activeTab === "people" && (
            <div className="p-6">
              {/* Filters */}
              <div className="flex flex-wrap gap-3 mb-6 bg-white dark:bg-gray-900">
                <FilterDropdown
                  label="Location"
                  value={locationFilter}
                  onChange={setLocationFilter}
                  options={["all", ...locations]}
                />
                <FilterDropdown
                  label="Company"
                  value={companyFilter}
                  onChange={setCompanyFilter}
                  options={["all", ...companies]}
                />
                <FilterDropdown
                  label="School"
                  value={schoolFilter}
                  onChange={setSchoolFilter}
                  options={["all", ...schools]}
                />
              </div>

              {/* Grid */}
              {visiblePeople.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No more suggestions</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {visiblePeople.map((person) => (
                      <PersonCard
                        key={person.id}
                        person={person}
                        connectionState={connectionStates[person.id] || "connect"}
                        isFollowing={followStates[person.id] || false}
                        onConnect={() => handleConnect(person.id)}
                        onCancelRequest={() => handleCancelRequest(person.id)}
                        onFollow={() => handleFollow(person.id)}
                        onDismiss={() => handleDismiss(person.id)}
                      />
                    ))}
                  </div>

                  {/* Show More */}
                  {hasMore && (
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="mt-6 w-full py-3 text-center text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
                    >
                      Show more
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                              SUB COMPONENTS                                  */
/* ═══════════════════════════════════════════════════════════════════════════ */

function NetworkSidebar({ counts, selectedFilter, onFilterChange }) {
  const menuItems = [
    { id: "connections", label: "Connections", count: counts.connections, icon: Users },
    { id: "following", label: "Following & Followers", count: counts.following, icon: UserPlus },
    { id: "groups", label: "Groups", count: counts.groups, icon: Users2 },
    { id: "events", label: "Events", count: counts.events, icon: Calendar },
    { id: "pages", label: "Pages", count: counts.pages, icon: FileText },
    { id: "newsletters", label: "Newsletters", count: counts.newsletters, icon: FileText },
    { id: "hashtags", label: "Hashtags", count: counts.hashtags, icon: Hash },
  ];

  return (
    <div className="linkedin-surface overflow-hidden">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-base font-semibold text-[#191919]">
          Manage my network
        </h2>
      </div>
      <nav className="p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onFilterChange(item.id)}
              className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                selectedFilter === item.id
                  ? "bg-[#edf3f8] text-[#0a66c2]"
                  : "text-[#191919] hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#666666]">{item.count}</span>
                <ChevronRight className="w-4 h-4 text-[#666666]" />
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function TabButton({ children, active, onClick, count }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors relative ${
        active ? "text-[#057642]" : "text-[#666666] hover:text-[#191919]"
      }`}
    >
      <span className="flex items-center justify-center gap-2">
        {children}
        {count > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[20px]">
            {count}
          </span>
        )}
      </span>
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#057642]" />
      )}
    </button>
  );
}

function InvitationCard({ invitation, onAccept, onIgnore }) {
  return (
    <div className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors bg-white dark:bg-gray-900">
      <img
        src={invitation.avatar}
        alt={invitation.name}
        className="w-16 h-16 rounded-full object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {invitation.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{invitation.headline}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {invitation.mutualConnections} mutual connections
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onIgnore}
              className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              Ignore
            </button>
            <button
              onClick={onAccept}
              className="px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PersonCard({
  person,
  connectionState,
  isFollowing,
  onConnect,
  onCancelRequest,
  onFollow,
  onDismiss,
}) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md transition-shadow relative">
      {/* Dismiss button */}
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/20 text-white z-10"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Cover photo */}
      <div className="h-16 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 overflow-hidden">
        {person.coverPhoto && (
          <img
            src={person.coverPhoto}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        {/* Avatar */}
        <div className="relative -mt-8 mb-3">
          <img
            src={person.avatar}
            alt={person.name}
            className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-900 shadow-sm"
          />
        </div>

        {/* Info */}
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer line-clamp-1">
          {person.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">{person.headline}</p>

        {/* Mutual connections */}
        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500 dark:text-gray-500">
          <Users className="w-3 h-3" />
          <span>{person.mutualConnections} mutual connections</span>
        </div>

        {/* Meta info */}
        <div className="mt-3 space-y-1">
          {person.location && (
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
              <MapPin className="w-3 h-3" />
              <span>{person.location}</span>
            </div>
          )}
          {person.company && (
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
              <Building2 className="w-3 h-3" />
              <span>{person.company}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 space-y-2">
          {connectionState === "connect" && (
            <>
              <button
                onClick={onConnect}
                className="w-full py-2 px-4 text-sm font-semibold text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Connect
              </button>
              <button
                onClick={onFollow}
                className={`w-full py-2 px-4 text-sm font-semibold rounded-full transition-colors flex items-center justify-center gap-2 ${
                  isFollowing
                    ? "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800"
                    : "text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {isFollowing ? (
                  <>
                    <Check className="w-4 h-4" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Follow
                  </>
                )}
              </button>
            </>
          )}

          {connectionState === "pending" && (
            <>
              <button
                disabled
                className="w-full py-2 px-4 text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Pending
              </button>
              <button
                onClick={onCancelRequest}
                className="w-full py-2 px-4 text-sm font-semibold text-red-600 dark:text-red-400 border border-red-600 dark:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors"
              >
                Cancel request
              </button>
            </>
          )}

          {connectionState === "connected" && (
            <button
              disabled
              className="w-full py-2 px-4 text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              Connected
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterDropdown({ label, value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer dark:focus:ring-blue-600 dark:focus:border-blue-600"
      >
        <option value="all">{label}: All</option>
        {options
          .filter((opt) => opt !== "all")
          .map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
      </select>
      <MoreHorizontal className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}
