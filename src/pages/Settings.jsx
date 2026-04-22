import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  User,
  Shield,
  Eye,
  Database,
  Megaphone,
  Bell,
  ChevronRight,
  Globe,
  Check,
  AlertTriangle,
  X,
  Crown,
  Sparkles,
  Mail,
  MessageSquare,
  Briefcase,
  Users,
  AtSign,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                              PREMIUM MODAL COMPONENT                         */
/* ═══════════════════════════════════════════════════════════════════════════ */

const PREMIUM_PLANS = [
  {
    id: "career",
    name: "Career",
    price: "$29.99",
    period: "/month",
    highlight: "Get hired 2x faster",
    features: [
      "5 InMail credits per month",
      "See who viewed your profile",
      "AI writing tools",
      "Top Applicant badge on job applications",
      "Applicant insights",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: "$59.99",
    period: "/month",
    highlight: "Grow your business",
    features: [
      "15 InMail credits per month",
      "See who viewed your profile",
      "AI writing tools",
      "Unlimited people browsing",
      "Business insights",
    ],
  },
  {
    id: "sales",
    name: "Sales Navigator",
    price: "$99.99",
    period: "/month",
    highlight: "Find leads faster",
    features: [
      "50 InMail credits per month",
      "Advanced lead search",
      "Lead recommendations",
      "CRM integration",
      "Notes and tags",
    ],
  },
  {
    id: "recruiter",
    name: "Recruiter Lite",
    price: "$170.00",
    period: "/month",
    highlight: "Find top talent",
    features: [
      "30 InMail credits per month",
      "Advanced search filters",
      "Recommended matches",
      "Candidate insights",
      "Applicant tracking",
    ],
  },
];

export function PremiumModal({ isOpen, onClose }) {
  const [selectedPlan, setSelectedPlan] = useState("career");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-8 text-center border-b border-amber-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          {/* Premium Logo */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">in</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold text-gray-900">LinkedIn</span>
              <Crown className="w-6 h-6 text-amber-500 fill-amber-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                Premium
              </span>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Start your free 1-month trial
          </h2>
          <p className="text-gray-600">
            Get access to exclusive tools and insights to accelerate your career
          </p>
        </div>

        {/* Plans */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PREMIUM_PLANS.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  selectedPlan === plan.id
                    ? "border-blue-600 bg-blue-50/50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {selectedPlan === plan.id && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                    Recommended
                  </div>
                )}

                <h3 className="font-semibold text-gray-900 mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-sm text-gray-500">{plan.period}</span>
                </div>

                <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg p-2 mb-3">
                  <p className="text-sm font-medium text-amber-800 flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    {plan.highlight}
                  </p>
                </div>

                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Benefits Highlight */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Mail, label: "InMail credits", value: "Connect directly" },
              { icon: Eye, label: "Profile viewers", value: "See full list" },
              { icon: Sparkles, label: "AI tools", value: "Write smarter" },
              { icon: Crown, label: "Top Applicant", value: "Stand out" },
            ].map((benefit, idx) => (
              <div key={idx} className="text-center p-3 bg-gray-50 rounded-lg">
                <benefit.icon className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">{benefit.label}</p>
                <p className="text-xs text-gray-500">{benefit.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 text-center sm:text-left">
              Cancel anytime, no commitment required
            </p>
            <button className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors">
              Continue with {PREMIUM_PLANS.find(p => p.id === selectedPlan)?.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                              SETTINGS PAGE                                   */
/* ═══════════════════════════════════════════════════════════════════════════ */

const SETTINGS_SECTIONS = [
  { id: "account", label: "Account preferences", icon: User },
  { id: "security", label: "Sign in & security", icon: Shield },
  { id: "visibility", label: "Visibility", icon: Eye },
  { id: "privacy", label: "Data privacy", icon: Database },
  { id: "advertising", label: "Advertising", icon: Megaphone },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function Settings() {
  const { currentUser } = useAuth();
  const [activeSection, setActiveSection] = useState("account");
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Left Sidebar */}
        <aside className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Settings</h1>
            <nav className="space-y-1">
              {SETTINGS_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="flex-1">{section.label}</span>
                  <ChevronRight className={`w-4 h-4 ${activeSection === section.id ? "text-blue-600" : "text-gray-400"}`} />
                </button>
              ))}
            </nav>
          </div>

          {/* Premium Upsell Card */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="font-semibold text-gray-900">LinkedIn Premium</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Get hired 2x faster with exclusive tools and insights
            </p>
            <button
              onClick={() => setShowPremiumModal(true)}
              className="w-full py-2 bg-amber-500 text-white font-medium rounded-full hover:bg-amber-600 transition-colors text-sm"
            >
              Try Premium for free
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          {activeSection === "account" && <AccountPreferences user={currentUser} />}
          {activeSection === "security" && <SecuritySettings />}
          {activeSection === "visibility" && <VisibilitySettings />}
          {activeSection === "privacy" && <PrivacySettings />}
          {activeSection === "advertising" && <AdvertisingSettings />}
          {activeSection === "notifications" && <NotificationSettings />}
        </main>
      </div>

      {/* Premium Modal */}
      <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                              SETTINGS SECTIONS                             */
/* ═══════════════════════════════════════════════════════════════════════════ */

function AccountPreferences({ user }) {
  const [profileInfo, setProfileInfo] = useState({
    firstName: user?.name?.split(" ")[0] || "Demo",
    lastName: user?.name?.split(" ")[1] || "User",
    username: "demouser123",
    language: "English",
  });
  const [displayName, setDisplayName] = useState("Demo User");
  const [isEditing, setIsEditing] = useState(false);

  const languages = ["English", "Hindi", "Spanish", "French", "German", "Chinese"];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Account preferences</h2>

      {/* Profile Information */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Profile information
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">First name</label>
              <input
                type="text"
                value={profileInfo.firstName}
                onChange={(e) => setProfileInfo(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Last name</label>
              <input
                type="text"
                value={profileInfo.lastName}
                onChange={(e) => setProfileInfo(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">linkedin.com/in/</span>
              <input
                type="text"
                value={profileInfo.username}
                onChange={(e) => setProfileInfo(prev => ({ ...prev, username: e.target.value }))}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Language</label>
            <select
              value={profileInfo.language}
              onChange={(e) => setProfileInfo(prev => ({ ...prev, language: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Display Name */}
      <section className="mb-8 border-t border-gray-200 pt-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Display name
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          Choose how your name appears across LinkedIn
        </p>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </section>

      {/* Verifications */}
      <section className="mb-8 border-t border-gray-200 pt-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Verifications
        </h3>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Email verified</p>
              <p className="text-sm text-gray-500">{user?.email || "demo@example.com"}</p>
            </div>
          </div>
          <span className="text-sm text-green-600 font-medium">Verified</span>
        </div>
        <button className="mt-3 w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          Add phone verification
        </button>
      </section>

      {/* Account Management - Danger Zone */}
      <section className="border-t border-gray-200 pt-6">
        <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Account management
        </h3>
        <div className="space-y-3">
          <button className="w-full sm:w-auto px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
            Hibernate account
          </button>
          <button className="w-full sm:w-auto px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors ml-0 sm:ml-2">
            Close account
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          These actions are irreversible. Please proceed with caution.
        </p>
      </section>
    </div>
  );
}

function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Sign in & security</h2>

      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Password
        </h3>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          Change password
        </button>
      </section>

      <section className="mb-8 border-t border-gray-200 pt-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Two-step verification
        </h3>
        <ToggleSwitch
          label="Require a security code in addition to your password"
          checked={twoFactorEnabled}
          onChange={setTwoFactorEnabled}
        />
      </section>

      <section className="border-t border-gray-200 pt-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Security alerts
        </h3>
        <ToggleSwitch
          label="Get alerts about unrecognized logins"
          checked={loginAlerts}
          onChange={setLoginAlerts}
        />
      </section>
    </div>
  );
}

function VisibilitySettings() {
  const [profileViewing, setProfileViewing] = useState("name");
  const [connectionsVisibility, setConnectionsVisibility] = useState("everyone");
  const [activeStatus, setActiveStatus] = useState(true);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Visibility</h2>

      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Profile viewing options
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Choose how you appear when viewing others&apos; profiles
        </p>
        <div className="space-y-3">
          <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="profileViewing"
              value="name"
              checked={profileViewing === "name"}
              onChange={(e) => setProfileViewing(e.target.value)}
              className="mt-0.5 text-blue-600"
            />
            <div>
              <p className="font-medium text-gray-900">Your name and headline</p>
              <p className="text-sm text-gray-500">Your full profile will be shown to the member</p>
            </div>
          </label>
          <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="profileViewing"
              value="private"
              checked={profileViewing === "private"}
              onChange={(e) => setProfileViewing(e.target.value)}
              className="mt-0.5 text-blue-600"
            />
            <div>
              <p className="font-medium text-gray-900">Private profile characteristics</p>
              <p className="text-sm text-gray-500">Show job title, industry, and region</p>
            </div>
          </label>
          <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="profileViewing"
              value="anonymous"
              checked={profileViewing === "anonymous"}
              onChange={(e) => setProfileViewing(e.target.value)}
              className="mt-0.5 text-blue-600"
            />
            <div>
              <p className="font-medium text-gray-900">Anonymous</p>
              <p className="text-sm text-gray-500">Private mode viewing, no profile information shared</p>
            </div>
          </label>
        </div>
      </section>

      <section className="mb-8 border-t border-gray-200 pt-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Who can see your connections
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="connectionsVisibility"
              value="everyone"
              checked={connectionsVisibility === "everyone"}
              onChange={(e) => setConnectionsVisibility(e.target.value)}
              className="text-blue-600"
            />
            <span className="text-gray-700">Everyone</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="connectionsVisibility"
              value="onlyYou"
              checked={connectionsVisibility === "onlyYou"}
              onChange={(e) => setConnectionsVisibility(e.target.value)}
              className="text-blue-600"
            />
            <span className="text-gray-700">Only you</span>
          </label>
        </div>
      </section>

      <section className="border-t border-gray-200 pt-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Active status
        </h3>
        <ToggleSwitch
          label="Show when you&apos;re active on LinkedIn (green dot)"
          checked={activeStatus}
          onChange={setActiveStatus}
        />
        <p className="text-sm text-gray-500 mt-2 ml-14">
          When enabled, your connections will see a green dot when you&apos;re active
        </p>
      </section>
    </div>
  );
}

function PrivacySettings() {
  const [downloadData, setDownloadData] = useState(false);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Data privacy</h2>

      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          How LinkedIn uses your data
        </h3>
        <div className="space-y-4">
          <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Data for personalized experience</p>
              <p className="text-sm text-gray-500">We use your data to personalize content and ads</p>
            </div>
            <button className="text-blue-600 text-sm font-medium hover:underline">Manage</button>
          </div>
          <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Data for third-party research</p>
              <p className="text-sm text-gray-500">Share data for research and social impact</p>
            </div>
            <button className="text-blue-600 text-sm font-medium hover:underline">Manage</button>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 pt-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Download your data
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Get a copy of your data, including connections, posts, and profile information
        </p>
        <button
          onClick={() => setDownloadData(true)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Request archive
        </button>
        {downloadData && (
          <p className="text-sm text-green-600 mt-2">Your data download request has been submitted. You will receive an email when it&apos;s ready.</p>
        )}
      </section>
    </div>
  );
}

function AdvertisingSettings() {
  const [adSettings, setAdSettings] = useState({
    thirdParty: true,
    adInterest: true,
    socialActions: false,
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Advertising</h2>

      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Ad preferences
        </h3>
        <div className="space-y-4">
          <ToggleSwitch
            label="Allow LinkedIn to show ads on third-party sites"
            checked={adSettings.thirdParty}
            onChange={(v) => setAdSettings(prev => ({ ...prev, thirdParty: v }))}
          />
          <ToggleSwitch
            label="Use my profile information for ad targeting"
            checked={adSettings.adInterest}
            onChange={(v) => setAdSettings(prev => ({ ...prev, adInterest: v }))}
          />
          <ToggleSwitch
            label="Include my social actions in ads"
            checked={adSettings.socialActions}
            onChange={(v) => setAdSettings(prev => ({ ...prev, socialActions: v }))}
          />
        </div>
      </section>

      <section className="border-t border-gray-200 pt-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Ad interests
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Manage topics that influence the ads you see
        </p>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          Manage ad interests
        </button>
      </section>
    </div>
  );
}

function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    inApp: true,
  });

  const [categories, setCategories] = useState({
    connections: { email: true, push: true, inApp: true },
    jobs: { email: true, push: false, inApp: true },
    messages: { email: false, push: true, inApp: true },
    mentions: { email: true, push: true, inApp: true },
  });

  const updateCategory = (category, type, value) => {
    setCategories(prev => ({
      ...prev,
      [category]: { ...prev[category], [type]: value },
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Notifications</h2>

      {/* Global toggles */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Notification channels
        </h3>
        <div className="space-y-4">
          <ToggleSwitch
            label="Email notifications"
            checked={notifications.email}
            onChange={(v) => setNotifications(prev => ({ ...prev, email: v }))}
          />
          <ToggleSwitch
            label="Push notifications"
            checked={notifications.push}
            onChange={(v) => setNotifications(prev => ({ ...prev, push: v }))}
          />
          <ToggleSwitch
            label="In-app notifications"
            checked={notifications.inApp}
            onChange={(v) => setNotifications(prev => ({ ...prev, inApp: v }))}
          />
        </div>
      </section>

      {/* Categories */}
      <section className="border-t border-gray-200 pt-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Notifications by category
        </h3>
        <div className="space-y-6">
          {[
            { key: "connections", label: "Connections", icon: Users, desc: "Connection requests, accepted invites" },
            { key: "jobs", label: "Jobs", icon: Briefcase, desc: "Job recommendations, application updates" },
            { key: "messages", label: "Messages", icon: MessageSquare, desc: "New messages, message reactions" },
            { key: "mentions", label: "Mentions", icon: AtSign, desc: "When you&apos;re mentioned in posts or comments" },
          ].map((cat) => (
            <div key={cat.key} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <cat.icon className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900">{cat.label}</p>
                  <p className="text-sm text-gray-500">{cat.desc}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 ml-8">
                <ToggleSwitch
                  label="Email"
                  checked={categories[cat.key].email}
                  onChange={(v) => updateCategory(cat.key, "email", v)}
                  compact
                />
                <ToggleSwitch
                  label="Push"
                  checked={categories[cat.key].push}
                  onChange={(v) => updateCategory(cat.key, "push", v)}
                  compact
                />
                <ToggleSwitch
                  label="In-app"
                  checked={categories[cat.key].inApp}
                  onChange={(v) => updateCategory(cat.key, "inApp", v)}
                  compact
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                              REUSABLE COMPONENTS                             */
/* ═══════════════════════════════════════════════════════════════════════════ */

function ToggleSwitch({ label, checked, onChange, compact = false }) {
  return (
    <label className={`flex items-center ${compact ? "" : "justify-between"} cursor-pointer group`}>
      <span className={`text-gray-700 ${compact ? "text-sm mr-2" : ""}`}>{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          checked ? "bg-blue-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </label>
  );
}
