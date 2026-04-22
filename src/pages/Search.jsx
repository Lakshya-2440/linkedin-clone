import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Search as SearchIcon,
  Filter,
  ChevronRight,
  MapPin,
  Building2,
  Briefcase,
  Users,
  Clock,
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  User,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                              STATIC DATA                                     */
/* ═══════════════════════════════════════════════════════════════════════════ */

const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: "people", label: "People" },
  { id: "jobs", label: "Jobs" },
  { id: "posts", label: "Posts" },
  { id: "companies", label: "Companies" },
  { id: "groups", label: "Groups" },
  { id: "schools", label: "Schools" },
];

const PEOPLE_DATA = [
  {
    id: 1,
    name: "Shubham Kumar",
    headline: "Senior Software Engineer at Google",
    avatar: "https://i.pravatar.cc/150?img=11",
    location: "Bangalore, India",
    company: "Google",
    connections: "500+",
    connectionDegree: "2nd",
    mutualConnections: 12,
    industry: "Technology",
  },
  {
    id: 2,
    name: "Priya Sharma",
    headline: "Product Manager at Microsoft | React Enthusiast",
    avatar: "https://i.pravatar.cc/150?img=5",
    location: "Hyderabad, India",
    company: "Microsoft",
    connections: "2,400",
    connectionDegree: "2nd",
    mutualConnections: 8,
    industry: "Technology",
  },
  {
    id: 3,
    name: "Rahul Verma",
    headline: "UX Designer at Adobe | Frontend Developer",
    avatar: "https://i.pravatar.cc/150?img=3",
    location: "Mumbai, India",
    company: "Adobe",
    connections: "1,200",
    connectionDegree: "3rd+",
    mutualConnections: 3,
    industry: "Design",
  },
  {
    id: 4,
    name: "Ananya Patel",
    headline: "Frontend Developer at Flipkart",
    avatar: "https://i.pravatar.cc/150?img=1",
    location: "Bangalore, India",
    company: "Flipkart",
    connections: "800",
    connectionDegree: "1st",
    mutualConnections: 0,
    industry: "Technology",
  },
  {
    id: 5,
    name: "Vikram Singh",
    headline: "React Developer at Amazon",
    avatar: "https://i.pravatar.cc/150?img=7",
    location: "Hyderabad, India",
    company: "Amazon",
    connections: "3,400",
    connectionDegree: "2nd",
    mutualConnections: 15,
    industry: "Technology",
  },
  {
    id: 6,
    name: "Neha Gupta",
    headline: "Software Engineer at Infosys",
    avatar: "https://i.pravatar.cc/150?img=9",
    location: "Pune, India",
    company: "Infosys",
    connections: "600",
    connectionDegree: "3rd+",
    mutualConnections: 2,
    industry: "Technology",
  },
  {
    id: 7,
    name: "Karan Malhotra",
    headline: "Full Stack Developer at TechVentures",
    avatar: "https://i.pravatar.cc/150?img=15",
    location: "Bangalore, India",
    company: "TechVentures",
    connections: "900",
    connectionDegree: "2nd",
    mutualConnections: 5,
    industry: "Technology",
  },
  {
    id: 8,
    name: "Sneha Gupta",
    headline: "Engineering Manager at Netflix",
    avatar: "https://i.pravatar.cc/150?img=10",
    location: "Mumbai, India",
    company: "Netflix",
    connections: "4,500",
    connectionDegree: "2nd",
    mutualConnections: 20,
    industry: "Technology",
  },
];

const JOBS_DATA = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Google",
    logo: "G",
    logoColor: "bg-blue-500",
    location: "Bangalore, Karnataka, India",
    type: "Full-time",
    postedTime: "2 days ago",
    easyApply: true,
    description: "We're looking for an experienced React developer to join our growing team.",
  },
  {
    id: 2,
    title: "React Developer",
    company: "Microsoft",
    logo: "M",
    logoColor: "bg-blue-600",
    location: "Hyderabad, Telangana, India",
    type: "Full-time",
    postedTime: "1 week ago",
    easyApply: false,
    description: "Build cutting-edge web applications using React and TypeScript.",
  },
  {
    id: 3,
    title: "Frontend Engineer",
    company: "Amazon",
    logo: "A",
    logoColor: "bg-orange-500",
    location: "Bangalore, Karnataka, India",
    type: "Full-time",
    postedTime: "3 days ago",
    easyApply: true,
    description: "Join our consumer team and build experiences for millions of users.",
  },
  {
    id: 4,
    title: "UI Developer",
    company: "Flipkart",
    logo: "F",
    logoColor: "bg-yellow-500",
    location: "Bangalore, Karnataka, India",
    type: "Full-time",
    postedTime: "5 days ago",
    easyApply: true,
    description: "Help build the future of e-commerce in India.",
  },
];

const POSTS_DATA = [
  {
    id: 1,
    author: "Shubham Kumar",
    avatar: "https://i.pravatar.cc/150?img=11",
    headline: "Senior Software Engineer at Google",
    content: "Just published a new article on React performance optimization techniques. React developers should definitely check this out! 🚀 #react #javascript #webdev",
    likes: 245,
    comments: 32,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 2,
    author: "Priya Sharma",
    avatar: "https://i.pravatar.cc/150?img=5",
    headline: "Product Manager at Microsoft",
    content: "Looking for talented React developers to join our team! We're working on exciting projects that will impact millions of users. DM me if interested. #hiring #react #microsoft",
    likes: 189,
    comments: 45,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: 3,
    author: "Rahul Verma",
    avatar: "https://i.pravatar.cc/150?img=3",
    headline: "UX Designer at Adobe",
    content: "React + Design Systems = 🔥 Just released our component library. Check it out and let me know your thoughts! #react #design #frontend",
    likes: 567,
    comments: 78,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: 4,
    author: "Vikram Singh",
    avatar: "https://i.pravatar.cc/150?img=7",
    headline: "Data Scientist at Amazon",
    content: "Interesting article on how React is being used in data visualization. Worth a read for frontend developers! #react #dataviz",
    likes: 123,
    comments: 15,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 5,
    author: "Ananya Patel",
    avatar: "https://i.pravatar.cc/150?img=1",
    headline: "Frontend Developer at Flipkart",
    content: "Completed my React certification today! Hard work pays off. 📚✅ #react #learning #career",
    likes: 432,
    comments: 56,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 6,
    author: "Neha Gupta",
    avatar: "https://i.pravatar.cc/150?img=9",
    headline: "Software Engineer at Infosys",
    content: "Sharing my experience migrating from Angular to React. It's been a journey! Thread below 👇 #react #angular #migration",
    likes: 234,
    comments: 41,
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
];

const COMPANIES_DATA = [
  {
    id: 1,
    name: "Google",
    logo: "G",
    logoColor: "bg-blue-500",
    industry: "Technology",
    followers: "15M",
    employees: "100,000+",
    description: "Google's mission is to organize the world's information and make it universally accessible and useful.",
  },
  {
    id: 2,
    name: "Microsoft",
    logo: "M",
    logoColor: "bg-blue-600",
    industry: "Technology",
    followers: "12M",
    employees: "180,000+",
    description: "Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge.",
  },
  {
    id: 3,
    name: "Amazon",
    logo: "A",
    logoColor: "bg-orange-500",
    industry: "Technology",
    followers: "10M",
    employees: "1,500,000+",
    description: "Amazon strives to be Earth's most customer-centric company.",
  },
  {
    id: 4,
    name: "Flipkart",
    logo: "F",
    logoColor: "bg-yellow-500",
    industry: "E-commerce",
    followers: "2M",
    employees: "30,000+",
    description: "Flipkart is India's leading e-commerce marketplace.",
  },
];

// Highlight matching text utility
function highlightText(text, query) {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-200 px-0.5 rounded">{part}</mark>
    ) : (
      part
    )
  );
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                              MAIN COMPONENT                                  */
/* ═══════════════════════════════════════════════════════════════════════════ */
export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [activeTab, setActiveTab] = useState("all");
  
  // People filters
  const [peopleFilters, setPeopleFilters] = useState({
    connections: "any",
    location: "any",
    currentCompany: "any",
    pastCompany: "any",
    industry: "any",
  });
  
  // Posts date filter
  const [postsDateFilter, setPostsDateFilter] = useState("any");

  // Filter people based on query and filters
  const filteredPeople = useMemo(() => {
    let filtered = PEOPLE_DATA.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.headline.toLowerCase().includes(query.toLowerCase()) ||
      p.company.toLowerCase().includes(query.toLowerCase())
    );
    
    // Apply secondary filters
    if (peopleFilters.connections !== "any") {
      filtered = filtered.filter((p) => p.connectionDegree === peopleFilters.connections);
    }
    if (peopleFilters.location !== "any") {
      filtered = filtered.filter((p) => p.location.includes(peopleFilters.location));
    }
    if (peopleFilters.currentCompany !== "any") {
      filtered = filtered.filter((p) => p.company === peopleFilters.currentCompany);
    }
    if (peopleFilters.industry !== "any") {
      filtered = filtered.filter((p) => p.industry === peopleFilters.industry);
    }
    
    return filtered;
  }, [query, peopleFilters]);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter((j) =>
      j.title.toLowerCase().includes(query.toLowerCase()) ||
      j.company.toLowerCase().includes(query.toLowerCase()) ||
      j.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  // Filter posts based on query and date
  const filteredPosts = useMemo(() => {
    let filtered = POSTS_DATA.filter((p) =>
      p.content.toLowerCase().includes(query.toLowerCase()) ||
      p.author.toLowerCase().includes(query.toLowerCase())
    );
    
    // Apply date filter
    if (postsDateFilter !== "any") {
      const now = new Date();
      filtered = filtered.filter((p) => {
        const diff = now - p.timestamp;
        if (postsDateFilter === "24h") return diff < 24 * 60 * 60 * 1000;
        if (postsDateFilter === "week") return diff < 7 * 24 * 60 * 60 * 1000;
        if (postsDateFilter === "month") return diff < 30 * 24 * 60 * 60 * 1000;
        return true;
      });
    }
    
    return filtered;
  }, [query, postsDateFilter]);

  // Filter companies
  const filteredCompanies = useMemo(() => {
    return COMPANIES_DATA.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.industry.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  // Format timestamp for posts
  const formatPostTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h`;
    if (days === 1) return "1d";
    return `${days}d`;
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-4">
      {/* Top Bar */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-4">
          Results for &ldquo;{query}&rdquo;
        </h1>
        
        {/* Filter Tabs */}
        <div className="flex items-center gap-1 border-b border-gray-200 overflow-x-auto">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        {/* Left Sidebar Filters */}
        {(activeTab === "people" || activeTab === "posts") && (
          <aside className="hidden lg:block">
            {activeTab === "people" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-20">
                <h3 className="font-semibold text-gray-900 mb-4">Filter by</h3>
                
                <div className="space-y-4">
                  <FilterSelect
                    label="Connections"
                    value={peopleFilters.connections}
                    options={[
                      { value: "any", label: "All connections" },
                      { value: "1st", label: "1st" },
                      { value: "2nd", label: "2nd" },
                      { value: "3rd+", label: "3rd+" },
                    ]}
                    onChange={(v) => setPeopleFilters((prev) => ({ ...prev, connections: v }))}
                  />
                  
                  <FilterSelect
                    label="Location"
                    value={peopleFilters.location}
                    options={[
                      { value: "any", label: "All locations" },
                      { value: "Bangalore", label: "Bangalore" },
                      { value: "Hyderabad", label: "Hyderabad" },
                      { value: "Mumbai", label: "Mumbai" },
                      { value: "Pune", label: "Pune" },
                    ]}
                    onChange={(v) => setPeopleFilters((prev) => ({ ...prev, location: v }))}
                  />
                  
                  <FilterSelect
                    label="Current company"
                    value={peopleFilters.currentCompany}
                    options={[
                      { value: "any", label: "All companies" },
                      { value: "Google", label: "Google" },
                      { value: "Microsoft", label: "Microsoft" },
                      { value: "Amazon", label: "Amazon" },
                      { value: "Flipkart", label: "Flipkart" },
                      { value: "Adobe", label: "Adobe" },
                    ]}
                    onChange={(v) => setPeopleFilters((prev) => ({ ...prev, currentCompany: v }))}
                  />
                  
                  <FilterSelect
                    label="Industry"
                    value={peopleFilters.industry}
                    options={[
                      { value: "any", label: "All industries" },
                      { value: "Technology", label: "Technology" },
                      { value: "Design", label: "Design" },
                    ]}
                    onChange={(v) => setPeopleFilters((prev) => ({ ...prev, industry: v }))}
                  />
                </div>
              </div>
            )}
            
            {activeTab === "posts" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-20">
                <h3 className="font-semibold text-gray-900 mb-4">Date posted</h3>
                <div className="space-y-2">
                  {[
                    { value: "any", label: "Any time" },
                    { value: "24h", label: "Past 24 hours" },
                    { value: "week", label: "Past week" },
                    { value: "month", label: "Past month" },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="dateFilter"
                        value={option.value}
                        checked={postsDateFilter === option.value}
                        onChange={(e) => setPostsDateFilter(e.target.value)}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </aside>
        )}

        {/* Main Results */}
        <main>
          {/* ALL TAB */}
          {activeTab === "all" && (
            <div className="space-y-6">
              {/* People Section */}
              {filteredPeople.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    People
                  </h2>
                  <div className="space-y-3">
                    {filteredPeople.slice(0, 3).map((person) => (
                      <PersonCard key={person.id} person={person} query={query} />
                    ))}
                  </div>
                  {filteredPeople.length > 3 && (
                    <button
                      onClick={() => setActiveTab("people")}
                      className="mt-3 flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      See all people results
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </section>
              )}

              {/* Jobs Section */}
              {filteredJobs.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Jobs
                  </h2>
                  <div className="space-y-3">
                    {filteredJobs.slice(0, 2).map((job) => (
                      <JobCard key={job.id} job={job} query={query} />
                    ))}
                  </div>
                  {filteredJobs.length > 2 && (
                    <button
                      onClick={() => setActiveTab("jobs")}
                      className="mt-3 flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      See all job results
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </section>
              )}

              {/* Posts Section */}
              {filteredPosts.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Posts
                  </h2>
                  <div className="space-y-3">
                    {filteredPosts.slice(0, 3).map((post) => (
                      <PostCard key={post.id} post={post} query={query} formatTime={formatPostTime} />
                    ))}
                  </div>
                  {filteredPosts.length > 3 && (
                    <button
                      onClick={() => setActiveTab("posts")}
                      className="mt-3 flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      See all post results
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </section>
              )}

              {/* Companies Section */}
              {filteredCompanies.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Companies
                  </h2>
                  <div className="space-y-3">
                    {filteredCompanies.slice(0, 2).map((company) => (
                      <CompanyCard key={company.id} company={company} query={query} />
                    ))}
                  </div>
                  {filteredCompanies.length > 2 && (
                    <button
                      onClick={() => setActiveTab("companies")}
                      className="mt-3 flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      See all company results
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </section>
              )}
            </div>
          )}

          {/* PEOPLE TAB */}
          {activeTab === "people" && (
            <div className="space-y-3">
              {filteredPeople.map((person) => (
                <PersonCard key={person.id} person={person} query={query} />
              ))}
              {filteredPeople.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No people found matching &ldquo;{query}&rdquo;</p>
                </div>
              )}
            </div>
          )}

          {/* JOBS TAB */}
          {activeTab === "jobs" && (
            <div className="space-y-3">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} query={query} />
              ))}
              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No jobs found matching &ldquo;{query}&rdquo;</p>
                </div>
              )}
            </div>
          )}

          {/* POSTS TAB */}
          {activeTab === "posts" && (
            <div className="space-y-3">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} query={query} formatTime={formatPostTime} />
              ))}
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No posts found matching &ldquo;{query}&rdquo;</p>
                </div>
              )}
            </div>
          )}

          {/* COMPANIES TAB */}
          {activeTab === "companies" && (
            <div className="space-y-3">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} query={query} />
              ))}
              {filteredCompanies.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No companies found matching &ldquo;{query}&rdquo;</p>
                </div>
              )}
            </div>
          )}

          {/* Other tabs placeholder */}
          {activeTab === "groups" && (
            <div className="text-center py-12">
              <p className="text-gray-500">No groups found matching &ldquo;{query}&rdquo;</p>
            </div>
          )}
          {activeTab === "schools" && (
            <div className="text-center py-12">
              <p className="text-gray-500">No schools found matching &ldquo;{query}&rdquo;</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                              SUB COMPONENTS                                  */
/* ═══════════════════════════════════════════════════════════════════════════ */

function FilterSelect({ label, value, options, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

function PersonCard({ person, query }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-start gap-4">
        <Link to={`/profile/${person.id}`}>
          <img
            src={person.avatar}
            alt={person.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <Link to={`/profile/${person.id}`}>
            <h3 className="font-semibold text-gray-900 hover:text-blue-600 hover:underline">
              {highlightText(person.name, query)}
            </h3>
          </Link>
          <p className="text-sm text-gray-700">{highlightText(person.headline, query)}</p>
          <p className="text-sm text-gray-500 mt-1">{highlightText(person.location, query)}</p>
          
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-gray-500">
              <span className="font-medium text-gray-700">{person.connectionDegree}</span> connection
            </span>
            {person.mutualConnections > 0 && (
              <span className="text-xs text-gray-500">
                {person.mutualConnections} mutual connections
              </span>
            )}
          </div>
        </div>
        <button className="px-4 py-1.5 border border-blue-600 text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-colors text-sm">
          Connect
        </button>
      </div>
    </div>
  );
}

function JobCard({ job, query }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 ${job.logoColor} rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0`}>
          {job.logo}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer">
            {highlightText(job.title, query)}
          </h3>
          <p className="text-sm text-gray-700">{highlightText(job.company, query)}</p>
          <p className="text-sm text-gray-500">{highlightText(job.location, query)}</p>
          
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-gray-500">{job.postedTime}</span>
            {job.easyApply && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-md font-medium">
                Easy Apply
              </span>
            )}
          </div>
          
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{highlightText(job.description, query)}</p>
        </div>
      </div>
    </div>
  );
}

function PostCard({ post, query, formatTime }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-start gap-3">
        <img
          src={post.avatar}
          alt={post.author}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 hover:text-blue-600 hover:underline cursor-pointer">
                {post.author}
              </h3>
              <p className="text-xs text-gray-500">{post.headline}</p>
            </div>
            <span className="text-xs text-gray-500">{formatTime(post.timestamp)}</span>
          </div>
          
          <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">
            {highlightText(post.content, query)}
          </p>
          
          {/* Engagement */}
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
            <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm">
              <ThumbsUp className="w-4 h-4" />
              {post.likes}
            </button>
            <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm">
              <MessageCircle className="w-4 h-4" />
              {post.comments}
            </button>
            <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompanyCard({ company, query }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 ${company.logoColor} rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0`}>
          {company.logo}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 hover:text-blue-600 hover:underline cursor-pointer">
            {highlightText(company.name, query)}
          </h3>
          <p className="text-sm text-gray-500">{highlightText(company.industry, query)} • {company.followers} followers</p>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{highlightText(company.description, query)}</p>
          
          <div className="flex items-center gap-3 mt-3">
            <button className="px-4 py-1.5 border border-blue-600 text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-colors text-sm">
              Follow
            </button>
            <span className="text-xs text-gray-500">{company.employees} employees</span>
          </div>
        </div>
      </div>
    </div>
  );
}

