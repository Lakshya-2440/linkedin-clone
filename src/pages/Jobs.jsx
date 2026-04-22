import { useState, useMemo } from "react";
import {
  Bell,
  Bookmark,
  FileText,
  Settings,
  Search,
  MapPin,
  Clock,
  CheckCircle,
  Briefcase,
  ChevronDown,
  X,
  Building2,
  Upload,
  ChevronRight,
  Users,
  Zap,
} from "lucide-react";
import useMediaQuery from "../hooks/useMediaQuery.js";

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                              STATIC DATA                                     */
/* ═══════════════════════════════════════════════════════════════════════════ */

const JOBS_DATA = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Google",
    logo: "G",
    logoColor: "bg-blue-500",
    location: "Bangalore, Karnataka, India",
    type: "Full-time",
    experience: "3-5 years",
    postedTime: "2 days ago",
    applicants: 45,
    easyApply: true,
    activelyRecruiting: true,
    promoted: true,
    description: `We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining user interfaces for our flagship products.

In this role, you will collaborate with designers, product managers, and backend engineers to deliver exceptional user experiences. You will architect and implement complex frontend solutions using modern technologies.

Responsibilities:
• Develop new user-facing features using React and TypeScript
• Build reusable components and frontend libraries for future use
• Optimize applications for maximum speed and scalability
• Collaborate with cross-functional teams to define, design, and ship new features
• Mentor junior developers and contribute to code reviews

Requirements:
• 3+ years of experience with React and modern JavaScript
• Strong understanding of web performance optimization
• Experience with state management (Redux, Zustand, or similar)
• Familiarity with testing frameworks (Jest, React Testing Library)
• Excellent problem-solving and communication skills`,
    skills: ["React", "TypeScript", "JavaScript", "CSS", "HTML", "Redux"],
    recruiter: {
      name: "Priya Sharma",
      role: "Technical Recruiter",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "Microsoft",
    logo: "M",
    logoColor: "bg-blue-600",
    location: "Hyderabad, Telangana, India",
    type: "Full-time",
    experience: "2-4 years",
    postedTime: "1 week ago",
    applicants: 128,
    easyApply: true,
    activelyRecruiting: true,
    promoted: false,
    description: `Join Microsoft's Azure team as a Full Stack Engineer. You will work on cutting-edge cloud technologies that power millions of businesses worldwide.

This role offers the opportunity to work on scalable distributed systems while building intuitive user interfaces. You'll be part of a team that values innovation, collaboration, and technical excellence.

Responsibilities:
• Design and implement scalable backend services using Node.js and Azure
• Build responsive frontend applications with React
• Work with databases (SQL and NoSQL) and caching layers
• Implement CI/CD pipelines and infrastructure as code
• Participate in architectural decisions and code reviews

Requirements:
• 2+ years of full stack development experience
• Proficiency in Node.js and React
• Experience with cloud platforms (Azure, AWS, or GCP)
• Knowledge of database design and optimization
• Bachelor's degree in Computer Science or equivalent`,
    skills: ["Node.js", "React", "Azure", "SQL", "MongoDB", "Docker"],
    recruiter: {
      name: "Rahul Verma",
      role: "Senior Recruiter",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  },
  {
    id: 3,
    title: "Product Designer",
    company: "Figma",
    logo: "F",
    logoColor: "bg-purple-500",
    location: "Remote (India)",
    type: "Full-time",
    experience: "2-6 years",
    postedTime: "3 days ago",
    applicants: 89,
    easyApply: false,
    activelyRecruiting: true,
    promoted: true,
    description: `Figma is looking for a talented Product Designer to help shape the future of collaborative design tools. You'll work on features that millions of designers use daily.

As a Product Designer, you'll be involved in every stage of the design process—from research and ideation to prototyping and final visual design. You'll collaborate closely with engineers and product managers.

Responsibilities:
• Design intuitive user interfaces for complex features
• Create wireframes, prototypes, and high-fidelity designs
• Conduct user research and usability testing
• Contribute to and help maintain our design system
• Present design work to stakeholders and iterate based on feedback

Requirements:
• Portfolio demonstrating strong product design skills
• 2+ years of experience in product/UI/UX design
• Proficiency in Figma (of course!)
• Understanding of design systems and component libraries
• Excellent communication and collaboration abilities`,
    skills: ["Figma", "UI Design", "UX Research", "Prototyping", "Design Systems"],
    recruiter: {
      name: "Ananya Patel",
      role: "Design Recruiter",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "Flipkart",
    logo: "F",
    logoColor: "bg-yellow-500",
    location: "Bangalore, Karnataka, India",
    type: "Full-time",
    experience: "1-3 years",
    postedTime: "5 days ago",
    applicants: 67,
    easyApply: true,
    activelyRecruiting: false,
    promoted: false,
    description: `Join India's leading e-commerce platform as a Backend Developer. You'll build the systems that handle millions of requests during our biggest sale events.

Flipkart's engineering team is known for tackling some of the most challenging problems in e-commerce at scale. You'll work on distributed systems, microservices, and high-performance databases.

Responsibilities:
• Design and develop scalable microservices
• Optimize database queries and caching strategies
• Build APIs that serve millions of requests
• Work with Kafka, Redis, and other data streaming technologies
• Participate in on-call rotations and incident response

Requirements:
• 1+ years of backend development experience
• Strong proficiency in Java or Go
• Experience with distributed systems and microservices
• Knowledge of message queues and event-driven architecture
• Familiarity with Kubernetes and containerization`,
    skills: ["Java", "Spring Boot", "Microservices", "Kafka", "Redis", "PostgreSQL"],
    recruiter: {
      name: "Karan Malhotra",
      role: "Tech Recruiter",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "Amazon",
    logo: "A",
    logoColor: "bg-orange-500",
    location: "Hyderabad, Telangana, India",
    type: "Full-time",
    experience: "2-5 years",
    postedTime: "1 day ago",
    applicants: 234,
    easyApply: false,
    activelyRecruiting: true,
    promoted: true,
    description: `Amazon is seeking a Data Scientist to join our Consumer Payments team. You'll use machine learning and statistical analysis to improve customer experiences.

In this role, you'll work with massive datasets to extract insights that drive business decisions. You'll build models that predict customer behavior and optimize payment flows.

Responsibilities:
• Develop machine learning models for prediction and classification
• Analyze large datasets using SQL, Python, and Spark
• Design and evaluate A/B tests
• Communicate findings to technical and non-technical stakeholders
• Collaborate with engineers to deploy models to production

Requirements:
• 2+ years of experience in data science or ML engineering
• Strong proficiency in Python, SQL, and machine learning frameworks
• Experience with deep learning (TensorFlow or PyTorch)
• Master's degree in Computer Science, Statistics, or related field
• Excellent analytical and problem-solving skills`,
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Spark", "Statistics"],
    recruiter: {
      name: "Neha Gupta",
      role: "Data Science Recruiter",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "Netflix",
    logo: "N",
    logoColor: "bg-red-600",
    location: "Pune, Maharashtra, India",
    type: "Full-time",
    experience: "3-6 years",
    postedTime: "4 days ago",
    applicants: 56,
    easyApply: true,
    activelyRecruiting: true,
    promoted: false,
    description: `Netflix is looking for a DevOps Engineer to help us deliver streaming entertainment to over 200 million members worldwide. You'll work on infrastructure that handles billions of requests daily.

Our DevOps team is responsible for the reliability, scalability, and security of our streaming platform. You'll use cutting-edge tools and practices to automate and optimize our infrastructure.

Responsibilities:
• Build and maintain CI/CD pipelines for microservices
• Manage infrastructure using Terraform and Kubernetes
• Monitor system health and respond to incidents
• Optimize cloud costs and resource utilization
• Develop tools to improve developer productivity

Requirements:
• 3+ years of DevOps or SRE experience
• Strong expertise in AWS or GCP
• Proficiency in Kubernetes and container orchestration
• Experience with infrastructure as code (Terraform, CloudFormation)
• Scripting skills in Python or Bash`,
    skills: ["AWS", "Kubernetes", "Terraform", "Docker", "Python", "Jenkins"],
    recruiter: {
      name: "Sneha Gupta",
      role: "Infrastructure Recruiter",
      avatar: "https://i.pravatar.cc/150?img=10",
    },
  },
  {
    id: 7,
    title: "Mobile Developer (iOS)",
    company: "Apple",
    logo: "A",
    logoColor: "bg-gray-800",
    location: "Mumbai, Maharashtra, India",
    type: "Full-time",
    experience: "2-4 years",
    postedTime: "6 days ago",
    applicants: 34,
    easyApply: false,
    activelyRecruiting: true,
    promoted: false,
    description: `Join Apple and help build the next generation of iOS apps that enrich people's lives. You'll work on products used by hundreds of millions of people worldwide.

At Apple, we believe in crafting software that is both powerful and delightful to use. As an iOS Developer, you'll have the opportunity to work on features that impact users globally.

Responsibilities:
• Develop new features for iOS applications using Swift
• Collaborate with design and product teams on user experiences
• Optimize app performance and memory usage
• Write unit tests and participate in code reviews
• Stay current with iOS development best practices

Requirements:
• 2+ years of iOS development experience
• Proficiency in Swift and iOS SDK
• Experience with SwiftUI and/or UIKit
• Understanding of iOS memory management and performance optimization
• Bachelor's degree in Computer Science or equivalent`,
    skills: ["Swift", "iOS", "SwiftUI", "UIKit", "Core Data", "Xcode"],
    recruiter: {
      name: "Vikram Singh",
      role: "Apple Recruiter",
      avatar: "https://i.pravatar.cc/150?img=7",
    },
  },
  {
    id: 8,
    title: "Engineering Manager",
    company: "Uber",
    logo: "U",
    logoColor: "bg-black",
    location: "Bangalore, Karnataka, India",
    type: "Full-time",
    experience: "5+ years",
    postedTime: "1 week ago",
    applicants: 23,
    easyApply: true,
    activelyRecruiting: true,
    promoted: true,
    description: `Uber is seeking an Engineering Manager to lead a team building the future of mobility. You'll manage a team of talented engineers working on high-impact projects.

As an Engineering Manager, you'll balance technical leadership with people management. You'll be responsible for delivering projects while growing and developing your team members.

Responsibilities:
• Lead and mentor a team of 8-10 engineers
• Drive technical decisions and architecture discussions
• Collaborate with product and design on roadmap prioritization
• Conduct performance reviews and support career development
• Recruit top engineering talent

Requirements:
• 5+ years of software engineering experience
• 2+ years of engineering management experience
• Strong technical background in backend or full-stack development
• Excellent communication and leadership skills
• Experience with agile development methodologies`,
    skills: ["Leadership", "Java", "Python", "System Design", "Agile", "People Management"],
    recruiter: {
      name: "Pooja Shah",
      role: "Leadership Recruiter",
      avatar: "https://i.pravatar.cc/150?img=26",
    },
  },
];

const USER_PREFERENCES = {
  jobTitles: ["Frontend Developer", "Full Stack Engineer", "UI Designer"],
  locations: ["Bangalore", "Pune", "Remote"],
  jobTypes: ["Full-time", "Contract"],
};

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                              MAIN COMPONENT                                  */
/* ═══════════════════════════════════════════════════════════════════════════ */
export default function Jobs() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  // State management
  const [selectedJob, setSelectedJob] = useState(JOBS_DATA[0]);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set([3, 6]));
  const [appliedJobs, setAppliedJobs] = useState(new Set([2]));
  const [jobAlerts, setJobAlerts] = useState({
    email: true,
    push: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("Pune, India");
  const [showEasyApply, setShowEasyApply] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [skillsExpanded, setSkillsExpanded] = useState(false);

  // Easy Apply form state
  const [easyApplyStep, setEasyApplyStep] = useState(1);
  const [contactInfo, setContactInfo] = useState({
    firstName: "Demo",
    lastName: "User",
    email: "demo@example.com",
    phone: "+91 98765 43210",
  });
  const [screeningAnswers, setScreeningAnswers] = useState({
    experience: "3",
    notice: "30 days",
    relocate: "yes",
  });

  // Filter states
  const [filters, setFilters] = useState({
    datePosted: "any",
    experience: "any",
    company: "any",
    jobType: "any",
    remote: "any",
  });

  // Toggle save job
  const toggleSaveJob = (jobId) => {
    setSavedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) {
        next.delete(jobId);
      } else {
        next.add(jobId);
      }
      return next;
    });
  };

  // Handle Easy Apply submit
  const handleSubmitApplication = () => {
    setAppliedJobs((prev) => new Set([...prev, selectedJob.id]));
    setShowEasyApply(false);
    setEasyApplyStep(1);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Calculate match percentage
  const matchPercentage = useMemo(() => {
    const userSkills = ["React", "JavaScript", "Node.js", "TypeScript"];
    const jobSkills = selectedJob.skills;
    const matchedSkills = jobSkills.filter((skill) =>
      userSkills.some((us) => us.toLowerCase() === skill.toLowerCase())
    );
    return Math.round((matchedSkills.length / jobSkills.length) * 100);
  }, [selectedJob]);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      {/* LEFT SIDEBAR */}
      <aside className="lg:sticky lg:top-20 h-fit space-y-4">
        {/* Job Alerts */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Job alerts
              </h2>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <ToggleRow
              label="Email notifications"
              checked={jobAlerts.email}
              onChange={() =>
                setJobAlerts((prev) => ({ ...prev, email: !prev.email }))
              }
            />
            <ToggleRow
              label="Push notifications"
              checked={jobAlerts.push}
              onChange={() =>
                setJobAlerts((prev) => ({ ...prev, push: !prev.push }))
              }
            />
          </div>
        </div>

        {/* Saved & Applied Jobs */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <nav className="p-2">
            <SidebarRow
              icon={Bookmark}
              label="Saved jobs"
              count={savedJobs.size}
              active={false}
            />
            <SidebarRow
              icon={FileText}
              label="Applied jobs"
              count={appliedJobs.size}
              active={false}
            />
          </nav>
        </div>

        {/* My Preferences */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                My preferences
              </h2>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Job titles
              </h3>
              <div className="flex flex-wrap gap-1">
                {USER_PREFERENCES.jobTitles.map((title) => (
                  <span
                    key={title}
                    className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-200 text-xs rounded-md"
                  >
                    {title}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Locations
              </h3>
              <div className="flex flex-wrap gap-1">
                {USER_PREFERENCES.locations.map((loc) => (
                  <span
                    key={loc}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 text-xs rounded-md"
                  >
                    {loc}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Job type
              </h3>
              <div className="flex flex-wrap gap-1">
                {USER_PREFERENCES.jobTypes.map((type) => (
                  <span
                    key={type}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 text-xs rounded-md"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex flex-col gap-4">
        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs or companies"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
              Search
            </button>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            <FilterChip
              label="Date posted"
              value={filters.datePosted}
              options={["Any time", "Past 24 hours", "Past week", "Past month"]}
              onChange={(v) => setFilters((prev) => ({ ...prev, datePosted: v }))}
            />
            <FilterChip
              label="Experience level"
              value={filters.experience}
              options={["Any", "Entry level", "Mid level", "Senior level"]}
              onChange={(v) => setFilters((prev) => ({ ...prev, experience: v }))}
            />
            <FilterChip
              label="Company"
              value={filters.company}
              options={["Any", "Google", "Microsoft", "Amazon", "Meta"]}
              onChange={(v) => setFilters((prev) => ({ ...prev, company: v }))}
            />
            <FilterChip
              label="Job type"
              value={filters.jobType}
              options={["Any", "Full-time", "Part-time", "Contract", "Internship"]}
              onChange={(v) => setFilters((prev) => ({ ...prev, jobType: v }))}
            />
            <FilterChip
              label="Remote"
              value={filters.remote}
              options={["Any", "On-site", "Hybrid", "Remote"]}
              onChange={(v) => setFilters((prev) => ({ ...prev, remote: v }))}
            />
          </div>
        </div>

        {/* Job Listings Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Top job picks for you
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-300">
            {JOBS_DATA.length} results
          </span>
        </div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-4">
          {/* Job Cards List */}
          <div className="space-y-3">
            {JOBS_DATA.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSelected={selectedJob.id === job.id}
                isSaved={savedJobs.has(job.id)}
                isApplied={appliedJobs.has(job.id)}
                onClick={() => {
                  setSelectedJob(job);
                  if (!isDesktop) setMobileDetailOpen(true);
                }}
                onToggleSave={() => toggleSaveJob(job.id)}
              />
            ))}
          </div>

          {/* Job Detail Panel */}
          <div className="hidden lg:block">
            <div className="sticky top-20">
              <JobDetailPanel
                job={selectedJob}
                isSaved={savedJobs.has(selectedJob.id)}
                isApplied={appliedJobs.has(selectedJob.id)}
                matchPercentage={matchPercentage}
                skillsExpanded={skillsExpanded}
                onToggleSkills={() => setSkillsExpanded(!skillsExpanded)}
                onToggleSave={() => toggleSaveJob(selectedJob.id)}
                onEasyApply={() => setShowEasyApply(true)}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Job Detail Overlay */}
      {!isDesktop && mobileDetailOpen && selectedJob && (
        <div className="fixed inset-0 z-[90] bg-gray-50 dark:bg-gray-900">
          <div className="sticky top-0 z-[95] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setMobileDetailOpen(false)}
              className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
              aria-label="Back"
            >
              <ChevronRight className="w-5 h-5 rotate-180 text-gray-700 dark:text-gray-100" />
            </button>
            <div className="font-semibold text-gray-900 dark:text-gray-100 truncate">
              {selectedJob.title}
            </div>
            <div className="w-10 h-10" />
          </div>
          <div className="px-4 py-4 overflow-y-auto h-[calc(100vh-56px)]">
            <JobDetailPanel
              job={selectedJob}
              isSaved={savedJobs.has(selectedJob.id)}
              isApplied={appliedJobs.has(selectedJob.id)}
              matchPercentage={matchPercentage}
              skillsExpanded={skillsExpanded}
              onToggleSkills={() => setSkillsExpanded(!skillsExpanded)}
              onToggleSave={() => toggleSaveJob(selectedJob.id)}
              onEasyApply={() => setShowEasyApply(true)}
            />
          </div>
        </div>
      )}

      {/* Easy Apply Modal */}
      {showEasyApply && (
        <EasyApplyModal
          job={selectedJob}
          step={easyApplyStep}
          totalSteps={3}
          contactInfo={contactInfo}
          onContactChange={setContactInfo}
          screeningAnswers={screeningAnswers}
          onScreeningChange={setScreeningAnswers}
          onNext={() => setEasyApplyStep((s) => Math.min(s + 1, 3))}
          onBack={() => setEasyApplyStep((s) => Math.max(s - 1, 1))}
          onClose={() => {
            setShowEasyApply(false);
            setEasyApplyStep(1);
          }}
          onSubmit={handleSubmitApplication}
        />
      )}

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fadeIn">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="font-medium">Application submitted!</span>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                              SUB COMPONENTS                                  */
/* ═══════════════════════════════════════════════════════════════════════════ */

function ToggleRow({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700 dark:text-gray-100">{label}</span>
      <button
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? "bg-blue-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

function SidebarRow({ icon: Icon, label, count, active }) {
  return (
    <button
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
        active
          ? "bg-blue-50 text-blue-700"
          : "text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" />
        <span>{label}</span>
      </div>
      <span className="text-gray-400 dark:text-gray-400">{count}</span>
    </button>
  );
}

function FilterChip({ label, value, options, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        {label}
        <ChevronDown className="w-4 h-4" />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 min-w-[150px] z-20">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option.toLowerCase());
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                  value === option.toLowerCase()
                    ? "text-blue-600 font-medium"
                    : "text-gray-700 dark:text-gray-100"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function JobCard({ job, isSelected, isSaved, isApplied, onClick, onToggleSave }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl p-4 cursor-pointer transition-all ${
        isSelected
          ? "border-blue-500 ring-2 ring-blue-100"
          : "border-gray-200 hover:border-gray-300 dark:hover:border-gray-600"
      }`}
    >
      <div className="flex gap-4">
        {/* Company Logo */}
        <div
          className={`w-14 h-14 ${job.logoColor} rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0`}
        >
          {job.logo}
        </div>

        <div className="flex-1 min-w-0">
          {/* Job Title */}
          <h3
            className={`font-semibold text-base mb-1 ${
              isApplied ? "text-gray-500 dark:text-gray-300" : "text-blue-600"
            }`}
          >
            {job.title}
            {job.promoted && (
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-300">Promoted</span>
            )}
          </h3>

          {/* Company & Location */}
          <p className="text-sm text-gray-700 dark:text-gray-100">{job.company}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">{job.location}</p>

          {/* Posted Time & Applicants */}
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{job.postedTime}</span>
            <span>•</span>
            <span>{job.applicants} applicants</span>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2 mt-3">
            {job.easyApply && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-md font-medium">
                <Zap className="w-3 h-3" />
                Easy Apply
              </span>
            )}
            {!job.easyApply && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-md font-medium">
                <Briefcase className="w-3 h-3" />
                Apply
              </span>
            )}
            {job.activelyRecruiting && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded-md">
                <Users className="w-3 h-3" />
                Actively recruiting
              </span>
            )}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave();
          }}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
        >
          <Bookmark
            className={`w-5 h-5 ${
              isSaved ? "fill-blue-600 text-blue-600" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {isApplied && (
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 text-sm text-green-600">
          <CheckCircle className="w-4 h-4" />
          <span>Applied</span>
        </div>
      )}
    </div>
  );
}

function JobDetailPanel({
  job,
  isSaved,
  isApplied,
  matchPercentage,
  skillsExpanded,
  onToggleSkills,
  onToggleSave,
  onEasyApply,
}) {
  const visibleSkills = skillsExpanded ? job.skills : job.skills.slice(0, 4);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-4">
          <div
            className={`w-16 h-16 ${job.logoColor} rounded-xl flex items-center justify-center text-white font-bold text-2xl shrink-0`}
          >
            {job.logo}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{job.title}</h2>
            <p className="text-gray-700 dark:text-gray-100">{job.company}</p>
            <p className="text-gray-500 dark:text-gray-300 text-sm">{job.location}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          {job.easyApply && !isApplied ? (
            <button
              onClick={onEasyApply}
              className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Easy Apply
            </button>
          ) : (
            <button
              disabled={isApplied}
              className={`flex-1 py-2.5 px-4 font-semibold rounded-full transition-colors flex items-center justify-center gap-2 ${
                isApplied
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              {isApplied ? "Applied" : "Apply"}
            </button>
          )}
          <button
            onClick={onToggleSave}
            className={`px-4 py-2.5 border rounded-full transition-colors flex items-center gap-2 ${
              isSaved
                ? "border-blue-600 text-blue-600 bg-blue-50"
                : "border-blue-600 text-blue-600 hover:bg-blue-50"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      {/* Match Percentage */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              See how you compare
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {matchPercentage}% skills match
            </p>
          </div>
          <div className="w-16 h-16 relative">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className={`${
                  matchPercentage >= 70 ? "text-green-500" : "text-yellow-500"
                }`}
                strokeDasharray={`${matchPercentage}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-900 dark:text-gray-100">
              {matchPercentage}%
            </span>
          </div>
        </div>
      </div>

      {/* About the Job */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">About the job</h3>
        <div className="text-sm text-gray-600 dark:text-gray-200 leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto">
          {job.description}
        </div>
      </div>

      {/* Skills */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {visibleSkills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
        {job.skills.length > 4 && (
          <button
            onClick={onToggleSkills}
            className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Show {skillsExpanded ? "fewer" : "all"} skills
          </button>
        )}
      </div>

      {/* Meet the Hiring Team */}
      <div className="px-6 py-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Meet the hiring team
        </h3>
        <div className="flex items-center gap-3">
          <img
            src={job.recruiter.avatar}
            alt={job.recruiter.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">{job.recruiter.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">{job.recruiter.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EasyApplyModal({
  job,
  step,
  totalSteps,
  contactInfo,
  onContactChange,
  screeningAnswers,
  onScreeningChange,
  onNext,
  onBack,
  onClose,
  onSubmit,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slideUp border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Apply to {job.company}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">{job.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-gray-700 dark:text-gray-100">
              Step {step} of {totalSteps}
            </span>
            <span className="text-gray-500 dark:text-gray-300">
              {step === 1 && "Contact info"}
              {step === 2 && "Resume"}
              {step === 3 && "Screening questions"}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="px-6 py-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">Contact info</h3>
              <FormInput
                label="First name"
                value={contactInfo.firstName}
                onChange={(v) =>
                  onContactChange({ ...contactInfo, firstName: v })
                }
              />
              <FormInput
                label="Last name"
                value={contactInfo.lastName}
                onChange={(v) =>
                  onContactChange({ ...contactInfo, lastName: v })
                }
              />
              <FormInput
                label="Email"
                type="email"
                value={contactInfo.email}
                onChange={(v) =>
                  onContactChange({ ...contactInfo, email: v })
                }
              />
              <FormInput
                label="Phone number"
                value={contactInfo.phone}
                onChange={(v) =>
                  onContactChange({ ...contactInfo, phone: v })
                }
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">Resume</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700">
                  Upload your resume
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PDF or DOCX up to 5MB
                </p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="w-8 h-8 text-red-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">
                    Resume_Final.pdf
                  </p>
                  <p className="text-xs text-gray-500">2.4 MB</p>
                </div>
                <button className="text-red-500 hover:text-red-700 text-sm font-medium">
                  Remove
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Screening questions
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How many years of relevant experience do you have?
                </label>
                <select
                  value={screeningAnswers.experience}
                  onChange={(e) =>
                    onScreeningChange({
                      ...screeningAnswers,
                      experience: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="0">Less than 1 year</option>
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                  <option value="4">4+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What is your notice period?
                </label>
                <select
                  value={screeningAnswers.notice}
                  onChange={(e) =>
                    onScreeningChange({
                      ...screeningAnswers,
                      notice: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="immediate">Immediate</option>
                  <option value="15 days">15 days</option>
                  <option value="30 days">30 days</option>
                  <option value="60 days">60 days</option>
                  <option value="90 days">90 days</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Are you willing to relocate?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="relocate"
                      checked={screeningAnswers.relocate === "yes"}
                      onChange={() =>
                        onScreeningChange({ ...screeningAnswers, relocate: "yes" })
                      }
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="relocate"
                      checked={screeningAnswers.relocate === "no"}
                      onChange={() =>
                        onScreeningChange({ ...screeningAnswers, relocate: "no" })
                      }
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            disabled={step === 1}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
              step === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            Back
          </button>
          {step < totalSteps ? (
            <button
              onClick={onNext}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-colors"
            >
              Submit application
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function FormInput({ label, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
      />
    </div>
  );
}

