import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Play,
  Search,
  X,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import LinkedInLogo from "../components/LinkedInLogo";

const HEADER_LINKS = [
  "Top Content",
  "People",
  "Learning",
  "Jobs",
  "Games",
];

const JOB_TOPICS = [
  "Engineering",
  "Business Development",
  "Finance",
  "Administrative Assistant",
  "Retail Associate",
  "Customer Service",
  "Operations",
  "Information Technology",
  "Marketing",
  "Human Resources",
];

const SOFTWARE_TOPICS = [
  "E-Commerce Platforms",
  "CRM Software",
  "Human Resources Management Systems",
  "Recruiting Software",
  "Sales Intelligence Software",
  "Project Management Software",
  "Help Desk Software",
  "Social Networking Software",
  "Desktop Publishing Software",
];

const GAME_TOPICS = ["Pinpoint", "Queens", "Crossclimb", "Tango", "Zip"];

const LEARNING_TOPICS = [
  "Business Analysis and Strategy",
  "Business Software and Tools",
  "Career Development",
  "Customer Service",
  "Diversity, Equity, and Inclusion (DEI)",
  "Finance and Accounting",
  "Human Resources",
  "Leadership and Management",
  "Marketing",
  "Professional Development",
  "Project Management",
  "Sales",
  "Small Business and Entrepreneurship",
  "Training and Education",
  "Aerospace, Transportation, and Maritime",
];

const AUDIENCE_OPTIONS = [
  "Find a coworker or classmate",
  "Find a new job",
  "Find a course or training",
  "Find your people",
];

const FOOTER_COLUMNS = [
  {
    title: "General",
    links: ["Sign Up", "Help Center", "About", "Press", "Blog", "Careers"],
  },
  {
    title: "Browse LinkedIn",
    links: ["Learning", "Jobs", "Games", "Salary", "Mobile", "Services"],
  },
  {
    title: "Business Solutions",
    links: [
      "Talent",
      "Marketing",
      "Sales",
      "Learning",
      "Talent Insights",
    ],
  },
  {
    title: "Directories",
    links: ["Members", "Jobs", "Companies", "Featured", "Learning", "Posts"],
  },
];

const HERO_AVATARS = [
  "https://i.pravatar.cc/150?img=11",
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=15",
  "https://i.pravatar.cc/150?img=32",
];

function chipClassName(kind = "neutral") {
  const styles = {
    neutral:
      "border border-[#d0d0cc] bg-white text-[#191919] hover:bg-[#f3f2ef]",
    muted:
      "border border-[#d0d0cc] bg-[#e8e5df] text-[#191919] hover:bg-[#ddd9d2]",
    brand:
      "border border-[#0a66c2] bg-white text-[#0a66c2] hover:bg-[#edf3f8]",
  };

  return styles[kind] || styles.neutral;
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [showAllLearning, setShowAllLearning] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState(AUDIENCE_OPTIONS[0]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!formData.password.trim()) {
      nextErrors.password = "Please enter your password.";
    } else if (formData.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const storedSignupUser = localStorage.getItem("linkedin-clone-signup-user");
    const parsedSignupUser = storedSignupUser ? JSON.parse(storedSignupUser) : null;

    login({
      firstName: parsedSignupUser?.firstName ?? "Demo",
      lastName: parsedSignupUser?.lastName ?? "User",
      email: formData.email,
      headline: "Welcome back to your network",
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        parsedSignupUser?.firstName ?? "Demo User"
      )}&background=0A66C2&color=fff`,
    });

    setShowAuthModal(false);
    navigate("/feed");
  };

  return (
    <div className="min-h-screen bg-white text-[#191919]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex w-full max-w-[1128px] items-center justify-between gap-4 px-4 py-5">
          <LinkedInLogo size="md" />

          <div className="hidden items-center gap-6 lg:flex">
            <nav className="flex items-center gap-1">
              {HEADER_LINKS.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="rounded-full px-4 py-2 text-sm text-[#666666] transition-colors hover:bg-[#f3f2ef] hover:text-[#191919]"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="h-9 border-l border-black/10" />

            <Link
              to="/signup"
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#666666] transition-colors hover:bg-[#f3f2ef] hover:text-[#191919]"
            >
              Join now
            </Link>
            <button
              type="button"
              onClick={() => setShowAuthModal(true)}
              className="rounded-full border border-[#0a66c2] px-6 py-2 text-sm font-semibold text-[#0a66c2] transition hover:bg-[#edf3f8]"
            >
              Sign in
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/signup"
              className="rounded-full px-3 py-2 text-sm font-semibold text-[#666666] transition-colors hover:bg-[#f3f2ef] hover:text-[#191919]"
            >
              Join now
            </Link>
            <button
              type="button"
              onClick={() => setShowAuthModal(true)}
              className="rounded-full border border-[#0a66c2] px-4 py-2 text-sm font-semibold text-[#0a66c2] transition hover:bg-[#edf3f8]"
            >
              Sign in
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-black/6">
          <div className="mx-auto grid w-full max-w-[1128px] items-center gap-10 px-4 py-10 lg:grid-cols-[1fr_470px] lg:py-16">
            <div>
              <h1 className="max-w-[560px] text-[42px] font-light leading-[1.15] text-[#8f5849] sm:text-[56px]">
                Welcome to your professional community
              </h1>

              <div className="mt-8 max-w-[408px] space-y-3">
                <button
                  type="button"
                  className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-[#d0d0cc] bg-white px-5 text-base font-semibold text-[#3c4043] transition hover:bg-[#f3f2ef]"
                >
                  <span className="text-lg font-bold text-[#4285f4]">G</span>
                  Continue with Google
                </button>
                <button
                  type="button"
                  onClick={() => setShowAuthModal(true)}
                  className="flex h-14 w-full items-center justify-center rounded-full bg-[#0a66c2] px-5 text-base font-semibold text-white transition hover:bg-[#004182]"
                >
                  Sign in with email
                </button>
                <p className="px-2 text-center text-xs leading-5 text-[#666666]">
                  By clicking Continue to join or sign in, you agree to LinkedIn's User
                  Agreement, Privacy Policy, and Cookie Policy.
                </p>
                <p className="text-center text-sm text-[#666666]">
                  New to LinkedIn?{" "}
                  <Link to="/signup" className="font-semibold text-[#0a66c2] hover:underline">
                    Join now
                  </Link>
                </p>
              </div>
            </div>

            <HeroIllustration />
          </div>
        </section>

        <SplitChipSection
          background="bg-[#f3f2ef]"
          title="Find the right job or internship for you"
          chips={JOB_TOPICS}
          actionLabel={showAllJobs ? "Show less" : "Show more"}
          onAction={() => setShowAllJobs((current) => !current)}
          visibleCount={showAllJobs ? JOB_TOPICS.length : 8}
        />

        <section className="border-b border-black/6 bg-white">
          <div className="mx-auto flex w-full max-w-[1128px] flex-col items-start justify-between gap-6 px-4 py-16 md:flex-row md:items-center">
            <div className="max-w-[520px]">
              <h2 className="text-[32px] font-light leading-tight text-[#b24020]">
                Post your job for millions of people to see
              </h2>
            </div>
            <button
              type="button"
              className="rounded-full border border-[#0a66c2] px-6 py-3 text-base font-semibold text-[#0a66c2] transition hover:bg-[#edf3f8]"
            >
              Post a job
            </button>
          </div>
        </section>

        <SplitChipSection
          background="bg-[#f3f2ef]"
          title="Discover the best software tools"
          chips={SOFTWARE_TOPICS}
          label="SUGGESTED SEARCHES"
          chipTone="muted"
        />

        <SplitChipSection
          background="bg-white"
          title="Keep your mind sharp with games"
          chips={GAME_TOPICS}
          label="TAKE A BREAK AND RECHARGE"
          chipTone="muted"
        />

        <FeatureSection
          title="Let the right people know you're open to work"
          body="With the Open To Work feature, you can privately tell recruiters or publicly share with the LinkedIn community that you're looking for new job opportunities."
          cta="Add Open To Work"
          background="bg-white"
        >
          <OpenToWorkArt />
        </FeatureSection>

        <FeatureSection
          title="Conversations today could lead to opportunity tomorrow"
          body="Sending messages to people you know is a great way to strengthen relationships as you take the next step in your career."
          cta="Start a conversation"
          background="bg-[#f3f2ef]"
          reverse
        >
          <MessagingArt />
        </FeatureSection>

        <FeatureSection
          title="Stay up to date on your industry"
          body="From live videos, to stories, to newsletters, LinkedIn is full of ways to stay up to date on the latest discussions in your industry."
          cta="Read industry news"
          background="bg-white"
        >
          <NewsArt />
        </FeatureSection>

        <FeatureSection
          title="Connect with people who can help"
          body="Find colleagues, classmates, and collaborators who can unlock your next opportunity."
          cta="Find your people"
          background="bg-[#f3f2ef]"
        >
          <ConnectionsArt />
        </FeatureSection>

        <SplitChipSection
          background="bg-white"
          title="Learn the skills you need to succeed"
          description="Choose from hundreds of courses, videos, and guided paths."
          chips={LEARNING_TOPICS}
          actionLabel={showAllLearning ? "Show less" : "Show more"}
          onAction={() => setShowAllLearning((current) => !current)}
          visibleCount={showAllLearning ? LEARNING_TOPICS.length : 10}
          chipTone="muted"
        />

        <section className="border-b border-black/6 bg-[#f3f2ef]">
          <div className="mx-auto grid w-full max-w-[1128px] items-center gap-10 px-4 py-16 lg:grid-cols-[1fr_430px]">
            <div>
              <h2 className="max-w-[500px] text-[32px] font-light leading-tight text-[#b24020]">
                Who is LinkedIn for?
              </h2>
              <p className="mt-2 text-lg text-[#666666]">
                Anyone looking to navigate their professional life.
              </p>

              <div className="mt-8 max-w-[408px] space-y-3">
                {AUDIENCE_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedAudience(option)}
                    className={`flex w-full items-center justify-between rounded-md px-5 py-4 text-left text-base transition ${
                      selectedAudience === option
                        ? "bg-[#e6dfd1] text-[#191919]"
                        : "bg-[#ffffffb3] text-[#444444] hover:bg-white"
                    }`}
                  >
                    <span>{option}</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>

            <AudienceArt title={selectedAudience} />
          </div>
        </section>

        <section className="overflow-hidden bg-[#f3f2ef]">
          <div className="mx-auto grid w-full max-w-[1128px] items-center gap-8 px-4 py-16 lg:grid-cols-[1fr_460px]">
            <div>
              <h2 className="max-w-[560px] text-[40px] font-light leading-[1.1] text-[#8f5849] sm:text-[48px]">
                Join your colleagues, classmates, and friends on LinkedIn.
              </h2>
              <button
                type="button"
                onClick={() => setShowAuthModal(true)}
                className="mt-8 rounded-full bg-[#0a66c2] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#004182]"
              >
                Get started
              </button>
            </div>

            <FinalCtaArt />
          </div>
        </section>
      </main>

      <footer className="border-t border-black/6 bg-white">
        <div className="mx-auto grid w-full max-w-[1128px] gap-10 px-4 py-10 md:grid-cols-[180px_repeat(4,1fr)]">
          <div>
            <LinkedInLogo size="sm" className="scale-[0.9] origin-left" />
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-base font-semibold text-[#191919]">{column.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-[#666666]">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-[#191919] hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-black/6">
          <div className="mx-auto flex w-full max-w-[1128px] flex-wrap items-center gap-x-4 gap-y-2 px-4 py-4 text-xs text-[#666666]">
            <span className="font-semibold text-[#191919]">LinkedIn</span>
            <span>&copy; 2026</span>
            <a href="#" className="hover:text-[#191919] hover:underline">
              About
            </a>
            <a href="#" className="hover:text-[#191919] hover:underline">
              Accessibility
            </a>
            <a href="#" className="hover:text-[#191919] hover:underline">
              User Agreement
            </a>
            <a href="#" className="hover:text-[#191919] hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#191919] hover:underline">
              Cookie Policy
            </a>
            <button
              type="button"
              className="inline-flex items-center gap-1 hover:text-[#191919]"
            >
              Language
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {showAuthModal && (
        <SignInModal
          errors={errors}
          formData={formData}
          onChange={handleChange}
          onClose={() => setShowAuthModal(false)}
          onSubmit={handleSubmit}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
        />
      )}
    </div>
  );
}

function SplitChipSection({
  background,
  title,
  description,
  label = "EXPLORE TOPICS",
  chips,
  chipTone = "neutral",
  actionLabel,
  onAction,
  visibleCount = 999,
}) {
  const visibleChips = chips.slice(0, visibleCount);

  return (
    <section className={`border-b border-black/6 ${background}`}>
      <div className="mx-auto grid w-full max-w-[1128px] gap-8 px-4 py-16 lg:grid-cols-[420px_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#666666]">
            {label}
          </p>
          <h2 className="mt-3 text-[32px] font-light leading-tight text-[#191919]">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 max-w-[340px] text-lg leading-8 text-[#666666]">
              {description}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-3">
          {visibleChips.map((chip) => (
            <button
              key={chip}
              type="button"
              className={`rounded-full px-4 py-3 text-base font-semibold transition ${chipClassName(
                chipTone
              )}`}
            >
              {chip}
            </button>
          ))}
          {actionLabel ? (
            <button
              type="button"
              onClick={onAction}
              className="inline-flex rounded-full border border-[#666666] px-4 py-3 text-base font-semibold text-[#444444] transition hover:bg-[#f3f2ef]"
            >
              {actionLabel}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function FeatureSection({
  title,
  body,
  cta,
  background,
  reverse = false,
  children,
}) {
  return (
    <section className={`border-b border-black/6 ${background}`}>
      <div
        className={`mx-auto grid w-full max-w-[1128px] items-center gap-12 px-4 py-16 lg:grid-cols-[1fr_420px] ${
          reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
        }`}
      >
        <div>
          <h2 className="max-w-[520px] text-[32px] font-light leading-tight text-[#191919]">
            {title}
          </h2>
          <p className="mt-4 max-w-[520px] text-lg leading-8 text-[#666666]">{body}</p>
          <button
            type="button"
            className="mt-8 rounded-full border border-[#0a66c2] px-6 py-3 text-base font-semibold text-[#0a66c2] transition hover:bg-[#edf3f8]"
          >
            {cta}
          </button>
        </div>
        {children}
      </div>
    </section>
  );
}

function HeroIllustration() {
  return (
    <div className="relative mx-auto aspect-[1.08] w-full max-w-[470px] rounded-[40px] bg-[#f3f2ef] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
      <div className="absolute -left-6 top-10 hidden rounded-2xl bg-white p-4 shadow-[0_14px_30px_rgba(0,0,0,0.08)] md:block">
        <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#666666]">
          Find people
        </div>
        <div className="mt-3 flex -space-x-2">
          {HERO_AVATARS.slice(0, 3).map((avatar) => (
            <img
              key={avatar}
              src={avatar}
              alt=""
              className="h-10 w-10 rounded-full border-2 border-white object-cover"
            />
          ))}
        </div>
      </div>

      <div className="absolute right-5 top-6 rounded-2xl bg-white px-4 py-3 shadow-[0_14px_30px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#191919]">
          <Search className="h-4 w-4 text-[#0a66c2]" />
          Software Engineer
        </div>
      </div>

      <div className="flex h-full items-center justify-center">
        <div className="relative h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle_at_top,#ffffff_0%,#f8f7f4_46%,#e7e2d8_100%)]">
          <img
            src="https://i.pravatar.cc/240?img=14"
            alt="Professional member"
            className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[8px] border-white object-cover shadow-lg"
          />
          <div className="absolute bottom-3 left-1/2 w-[220px] -translate-x-1/2 rounded-2xl bg-white p-4 shadow-[0_18px_40px_rgba(0,0,0,0.1)]">
            <div className="text-sm font-semibold text-[#191919]">Senior Product Designer</div>
            <div className="mt-1 text-sm text-[#666666]">Bengaluru, Karnataka</div>
            <div className="mt-3 flex items-center justify-between rounded-xl bg-[#edf3f8] px-3 py-2 text-sm">
              <span className="font-semibold text-[#0a66c2]">312 connections</span>
              <span className="text-[#666666]">Hiring insights</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 right-4 rounded-2xl bg-white p-4 shadow-[0_14px_30px_rgba(0,0,0,0.08)]">
        <div className="text-sm font-semibold text-[#191919]">Messaging</div>
        <div className="mt-2 flex items-start gap-3">
          <img
            src="https://i.pravatar.cc/120?img=5"
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <div className="text-sm font-semibold text-[#191919]">Priya Sharma</div>
            <div className="mt-1 text-sm text-[#666666]">Let's connect this week.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OpenToWorkArt() {
  return (
    <CircleFrame accent="from-[#f7ebd6] to-[#eee3cb]">
      <img
        src="https://i.pravatar.cc/240?img=44"
        alt="Open to work member"
        className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px] border-white object-cover shadow-lg"
      />
      <div className="absolute bottom-10 left-1/2 w-[220px] -translate-x-1/2 rounded-full bg-[#057642] px-5 py-3 text-center text-base font-semibold text-white">
        #OpenToWork
      </div>
      <div className="absolute right-6 top-10 rounded-2xl bg-white px-4 py-3 shadow-lg">
        <div className="text-xs uppercase tracking-[0.12em] text-[#666666]">Recruiter only</div>
        <div className="mt-2 text-sm font-semibold text-[#191919]">Private signal enabled</div>
      </div>
    </CircleFrame>
  );
}

function MessagingArt() {
  return (
    <CircleFrame accent="from-[#e9f3f8] to-[#dbe8ef]">
      <img
        src="https://i.pravatar.cc/220?img=52"
        alt="Messaging contact"
        className="absolute left-[23%] top-[34%] h-20 w-20 rounded-full border-4 border-white object-cover shadow-md"
      />
      <img
        src="https://i.pravatar.cc/220?img=13"
        alt="Messaging contact"
        className="absolute right-[21%] top-[48%] h-20 w-20 rounded-full border-4 border-white object-cover shadow-md"
      />
      <div className="absolute left-[22%] top-[48%] max-w-[170px] rounded-2xl bg-white px-4 py-3 text-sm text-[#191919] shadow-lg">
        Thanks for reaching out. Would love to chat.
      </div>
      <div className="absolute right-[18%] top-[28%] max-w-[170px] rounded-2xl bg-[#0a66c2] px-4 py-3 text-sm text-white shadow-lg">
        Let's find time this week.
      </div>
    </CircleFrame>
  );
}

function NewsArt() {
  return (
    <CircleFrame accent="from-[#f6ebe5] to-[#e7ddd7]">
      <div className="absolute left-1/2 top-1/2 w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-[28px] bg-white p-5 shadow-[0_18px_40px_rgba(0,0,0,0.1)]">
        <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#666666]">
          LinkedIn News
        </div>
        <div className="mt-4 space-y-4">
          {[
            "Tech hiring picks up in Bengaluru",
            "AI skills surge across product teams",
            "Portfolio storytelling keeps growing",
          ].map((item) => (
            <div key={item}>
              <div className="text-sm font-semibold text-[#191919]">{item}</div>
              <div className="mt-1 text-xs text-[#666666]">Trending in India</div>
            </div>
          ))}
        </div>
      </div>
    </CircleFrame>
  );
}

function ConnectionsArt() {
  return (
    <CircleFrame accent="from-[#f5efe8] to-[#ece2d8]">
      <div className="absolute inset-0">
        {[
          { src: "https://i.pravatar.cc/160?img=3", x: "left-[16%]", y: "top-[18%]" },
          { src: "https://i.pravatar.cc/160?img=7", x: "right-[14%]", y: "top-[24%]" },
          { src: "https://i.pravatar.cc/160?img=21", x: "left-[24%]", y: "bottom-[20%]" },
          { src: "https://i.pravatar.cc/160?img=48", x: "right-[20%]", y: "bottom-[18%]" },
          { src: "https://i.pravatar.cc/160?img=12", x: "left-1/2", y: "top-1/2 -translate-x-1/2 -translate-y-1/2" },
        ].map((item) => (
          <img
            key={item.src}
            src={item.src}
            alt=""
            className={`absolute ${item.x} ${item.y} h-16 w-16 rounded-full border-4 border-white object-cover shadow-md`}
          />
        ))}
      </div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-1/2 top-[32%] h-[1px] w-[120px] -translate-x-1/2 rotate-[22deg] bg-[#0a66c2]" />
        <div className="absolute left-1/2 top-[54%] h-[1px] w-[148px] -translate-x-1/2 -rotate-[18deg] bg-[#0a66c2]" />
        <div className="absolute left-1/2 top-1/2 h-[140px] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-[#0a66c2]" />
      </div>
    </CircleFrame>
  );
}

function AudienceArt({ title }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[430px] rounded-full bg-[radial-gradient(circle_at_top,#ffffff_0%,#f4efe7_42%,#e7ded2_100%)]">
      <img
        src="https://i.pravatar.cc/260?img=60"
        alt="LinkedIn member"
        className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px] border-white object-cover shadow-lg"
      />
      <div className="absolute left-6 top-10 rounded-2xl bg-white px-4 py-3 shadow-lg">
        <div className="text-xs uppercase tracking-[0.12em] text-[#666666]">Today</div>
        <div className="mt-2 text-sm font-semibold text-[#191919]">{title}</div>
      </div>
      <div className="absolute bottom-8 right-6 rounded-2xl bg-white px-4 py-3 shadow-lg">
        <div className="text-sm font-semibold text-[#191919]">500+ communities</div>
        <div className="mt-1 text-xs text-[#666666]">Courses, jobs, and people</div>
      </div>
    </div>
  );
}

function FinalCtaArt() {
  return (
    <div className="relative mx-auto aspect-[1.05] w-full max-w-[460px] overflow-hidden rounded-[40px] bg-[linear-gradient(180deg,#e9f3f8_0%,#d8e8f2_100%)] shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
      <div className="absolute inset-x-0 bottom-0 h-[58%] bg-[linear-gradient(180deg,#c7dae8_0%,#9bb9cf_100%)]" />
      <div className="absolute left-8 top-10 rounded-2xl bg-white px-4 py-3 shadow-lg">
        <div className="text-sm font-semibold text-[#191919]">Build your network</div>
        <div className="mt-1 text-xs text-[#666666]">Reconnect with people you know</div>
      </div>
      <div className="absolute bottom-10 left-10 flex -space-x-3">
        {[
          "https://i.pravatar.cc/150?img=11",
          "https://i.pravatar.cc/150?img=22",
          "https://i.pravatar.cc/150?img=33",
          "https://i.pravatar.cc/150?img=44",
        ].map((avatar) => (
          <img
            key={avatar}
            src={avatar}
            alt=""
            className="h-16 w-16 rounded-full border-4 border-white object-cover shadow-md"
          />
        ))}
      </div>
      <div className="absolute right-8 top-24 rounded-2xl bg-white px-4 py-3 shadow-lg">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#191919]">
          <Play className="h-4 w-4 text-[#0a66c2]" />
          Learn something new
        </div>
      </div>
    </div>
  );
}

function CircleFrame({ accent, children }) {
  return (
    <div
      className={`relative mx-auto aspect-square w-full max-w-[420px] rounded-full bg-[radial-gradient(circle_at_top,#ffffff_0%,#f8f5ef_38%,#ece4d8_100%)]`}
    >
      <div className={`absolute inset-5 rounded-full bg-gradient-to-br ${accent} opacity-80`} />
      {children}
    </div>
  );
}

function SignInModal({
  errors,
  formData,
  onChange,
  onClose,
  onSubmit,
  setShowPassword,
  showPassword,
}) {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
        aria-label="Close sign in modal"
      />

      <div className="relative w-full max-w-[400px] rounded-2xl bg-white p-8 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#666666] hover:bg-[#f3f2ef]"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-[32px] font-semibold leading-tight text-[#191919]">Sign in</h2>
        <p className="mt-2 text-sm text-[#666666]">
          Stay updated on your professional world.
        </p>

        <form className="mt-6 space-y-3" onSubmit={onSubmit} noValidate>
          <div>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
              placeholder="Email or phone"
              className={`h-14 w-full rounded-md border bg-white px-4 text-base outline-none transition focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] ${
                errors.email ? "border-red-500" : "border-gray-400"
              }`}
            />
            {errors.email ? (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            ) : null}
          </div>

          <div>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={onChange}
                placeholder="Password"
                className={`h-14 w-full rounded-md border bg-white px-4 pr-20 text-base outline-none transition focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] ${
                  errors.password ? "border-red-500" : "border-gray-400"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-sm font-semibold text-[#0a66c2] hover:bg-[#edf3f8]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password ? (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            ) : null}
          </div>

          <a href="#" className="inline-block text-sm font-semibold text-[#0a66c2] hover:underline">
            Forgot password?
          </a>

          <button
            type="submit"
            className="w-full rounded-full bg-[#0a66c2] px-4 py-3 text-base font-semibold text-white transition hover:bg-[#004182]"
          >
            Sign in
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-[#666666]">or</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-[#d0d0cc] bg-white px-4 text-sm font-semibold text-[#3c4043] transition hover:bg-[#f3f2ef]"
        >
          <span className="text-lg font-bold text-[#4285f4]">G</span>
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-[#666666]">
          New to LinkedIn?{" "}
          <Link to="/signup" className="font-semibold text-[#0a66c2] hover:underline">
            Join now
          </Link>
        </p>
      </div>
    </div>
  );
}
