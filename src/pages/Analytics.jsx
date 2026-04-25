import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";
import { Eye, FileText, Search, Crown, TrendingUp, Users } from "lucide-react";

const VIEW_DATA = [
  { day: "Mon", views: 32 },
  { day: "Tue", views: 45 },
  { day: "Wed", views: 38 },
  { day: "Thu", views: 52 },
  { day: "Fri", views: 48 },
  { day: "Sat", views: 28 },
  { day: "Sun", views: 35 },
];

const RECENT_VIEWERS = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Product Manager at TechCorp",
    location: "San Francisco Bay Area",
    industry: "Technology",
    blurred: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Software Engineer at StartupX",
    location: "New York City",
    industry: "Software Development",
    blurred: true,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "HR Director at GlobalTech",
    location: "Austin, Texas",
    industry: "Human Resources",
    blurred: true,
  },
  {
    id: 4,
    name: "David Kim",
    title: "Founder at Innovation Labs",
    location: "Seattle, Washington",
    industry: "Entrepreneurship",
    blurred: true,
  },
  {
    id: 5,
    name: "Lisa Thompson",
    title: "Marketing Lead at GrowthCo",
    location: "Los Angeles, California",
    industry: "Marketing",
    blurred: true,
  },
];

const STAT_CARDS = [
  {
    label: "Views this week",
    value: 48,
    change: "+12%",
    icon: Eye,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    label: "Post impressions",
    value: 1204,
    change: "+28%",
    icon: FileText,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    label: "Search appearances",
    value: 12,
    change: "+3",
    icon: Search,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
];

function StatCard({ stat }) {
  const Icon = stat.icon;
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
            {stat.value.toLocaleString()}
          </p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-600 font-medium">{stat.change}</span>
            <span className="text-sm text-gray-400">vs last week</span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${stat.color}`} />
        </div>
      </div>
    </div>
  );
}

function BlurredViewerCard({ viewer }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center blur-[2px]">
        <Users className="w-6 h-6 text-gray-500" />
      </div>
      <div className="flex-1">
        <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded blur-[2px]" />
        <div className="mt-2 h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded blur-[2px]" />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {viewer.industry} • {viewer.location}
        </p>
      </div>
    </div>
  );
}

function PremiumCTA() {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shrink-0">
          <Crown className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Unlock all viewers with Premium
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            See exactly who viewed your profile and get insights into their background,
            mutual connections, and more.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-sm font-medium transition-colors">
              Try Premium free
            </button>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              1-month free trial
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Analytics() {
  const totalViews = useMemo(() => VIEW_DATA.reduce((sum, d) => sum + d.views, 0), []);

  return (
    <div className="linkedin-page">
      <div className="linkedin-surface mb-6 p-5">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Who viewed your profile
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Insights and analytics for the last 90 days
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {STAT_CARDS.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                Profile views
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {totalViews} views in the last 7 days
              </p>
            </div>
            <select className="text-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-3 py-1.5 text-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={VIEW_DATA}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A66C2" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0A66C2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#0A66C2"
                  fillOpacity={1}
                  fill="url(#colorViews)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#0A66C2"
                  strokeWidth={3}
                  dot={{ fill: "#0A66C2", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#0A66C2" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Viewers */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Recent viewers ({RECENT_VIEWERS.length})
            </h2>
            <div className="space-y-3">
              {RECENT_VIEWERS.map((viewer) => (
                <BlurredViewerCard key={viewer.id} viewer={viewer} />
              ))}
            </div>
          </div>

          <PremiumCTA />
        </div>
      </div>
    </div>
  );
}
