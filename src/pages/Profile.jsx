import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";
import SlideInModal from "../components/SlideInModal";
import {
  Pencil,
  Plus,
  MoreHorizontal,
  MapPin,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award,
  BookOpen,
  Globe,
  Briefcase,
  GraduationCap,
  Shield,
  Star,
  Users,
  MessageSquare,
  Check,
  X,
  UserPlus,
  Flag,
  Share2,
  UserCheck,
} from "lucide-react";

/* ───────────────────── helper: company logo placeholder ───────────────────── */
function CompanyLogo({ name }) {
  const colors = [
    "bg-blue-600",
    "bg-emerald-600",
    "bg-amber-600",
    "bg-violet-600",
    "bg-rose-600",
    "bg-cyan-600",
  ];
  const idx =
    name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;
  return (
    <div
      className={`w-12 h-12 ${colors[idx]} rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-sm`}
    >
      {name.charAt(0)}
    </div>
  );
}

/* ───────────────────── helper: connection degree badge ───────────────────── */
function ConnectionDegreeBadge({ userId }) {
  // Simple logic: user 2 is 2nd degree, user 3 is 3rd+
  const degree = userId === "2" ? "2nd" : "3rd+";
  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
      <Users className="w-3 h-3" />
      {degree}
    </span>
  );
}

/* ───────────────────── helper: dropdown menu ───────────────────── */
function DropdownMenu({ trigger, items }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                              PROFILE PAGE                                  */
/* ═══════════════════════════════════════════════════════════════════════════ */
export default function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const {
    profile: currentUserProfile,
    updateProfile,
    getProfileById,
    sendConnectionRequest,
    withdrawConnectionRequest,
    getConnectionStatus,
  } = useProfile();

  // Get the profile being viewed (current user or other user)
  const profile = getProfileById(userId) || currentUserProfile;
  const isOwnProfile = profile.isOwnProfile ?? true;
  const connectionStatus = getConnectionStatus(userId);

  /* ── modal state ── */
  const [activeModal, setActiveModal] = useState(null);
  const openModal = (name) => setActiveModal(name);
  const closeModal = () => setActiveModal(null);

  /* ── about expand ── */
  const [aboutExpanded, setAboutExpanded] = useState(false);

  /* ── skills expand ── */
  const [showAllSkills, setShowAllSkills] = useState(false);

  const handleConnect = () => {
    sendConnectionRequest(userId);
  };

  const handleWithdraw = () => {
    withdrawConnectionRequest(userId);
  };

  const handleMessage = () => {
    navigate("/messaging");
  };

  return (
    <div className="max-w-[1128px] mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
      {/* ══════════ LEFT COLUMN ══════════ */}
      <div className="flex flex-col gap-2">
        {/* ─────── 1. COVER + AVATAR + INTRO ─────── */}
        <CoverIntroSection
          profile={profile}
          isOwnProfile={isOwnProfile}
          connectionStatus={connectionStatus}
          onConnect={handleConnect}
          onWithdraw={handleWithdraw}
          onMessage={handleMessage}
          updateProfile={updateProfile}
          openModal={openModal}
          activeModal={activeModal}
          closeModal={closeModal}
          userId={userId}
        />

        {/* ─────── 3. ABOUT ─────── */}
        <AboutSection
          profile={profile}
          isOwnProfile={isOwnProfile}
          aboutExpanded={aboutExpanded}
          setAboutExpanded={setAboutExpanded}
          openModal={openModal}
          activeModal={activeModal}
          closeModal={closeModal}
          updateProfile={updateProfile}
        />

        {/* ─────── 4. EXPERIENCE ─────── */}
        <ExperienceSection
          profile={profile}
          isOwnProfile={isOwnProfile}
          openModal={openModal}
          activeModal={activeModal}
          closeModal={closeModal}
          updateProfile={updateProfile}
        />

        {/* ─────── 5. EDUCATION ─────── */}
        <EducationSection
          profile={profile}
          isOwnProfile={isOwnProfile}
          openModal={openModal}
          activeModal={activeModal}
          closeModal={closeModal}
          updateProfile={updateProfile}
        />

        {/* ─────── 6. SKILLS ─────── */}
        <SkillsSection
          profile={profile}
          isOwnProfile={isOwnProfile}
          showAllSkills={showAllSkills}
          setShowAllSkills={setShowAllSkills}
          openModal={openModal}
          activeModal={activeModal}
          closeModal={closeModal}
          updateProfile={updateProfile}
        />

        {/* ─────── 7. RECOMMENDATIONS ─────── */}
        <RecommendationsSection
          profile={profile}
          isOwnProfile={isOwnProfile}
          openModal={openModal}
          activeModal={activeModal}
          closeModal={closeModal}
          updateProfile={updateProfile}
        />

        {/* ─────── 8. ACCOMPLISHMENTS ─────── */}
        <AccomplishmentsSection
          profile={profile}
          isOwnProfile={isOwnProfile}
          openModal={openModal}
          activeModal={activeModal}
          closeModal={closeModal}
          updateProfile={updateProfile}
        />
      </div>

      {/* ══════════ RIGHT SIDEBAR ══════════ */}
      <RightSidebar
        profile={profile}
        isOwnProfile={isOwnProfile}
        userId={userId}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                         1 & 2.  COVER + INTRO                              */
/* ═══════════════════════════════════════════════════════════════════════════ */
function CoverIntroSection({
  profile,
  isOwnProfile,
  connectionStatus,
  onConnect,
  onWithdraw,
  onMessage,
  updateProfile,
  openModal,
  activeModal,
  closeModal,
  userId,
}) {
  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Cover */}
      <div className="relative h-36 sm:h-56 overflow-hidden">
        <img
          src={profile.coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Avatar + Buttons Row */}
      <div className="relative px-4 sm:px-6 pb-4">
        {/* Avatar */}
        <div className="-mt-16 sm:-mt-20 mb-3 relative inline-block">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-lg object-cover"
          />
          {profile.openToWork && (
            <div className="absolute bottom-1 left-0 right-0 mx-auto w-fit">
              <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wide shadow">
                #OpenToWork
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons (top right, relative to card) */}
        <div className="mt-3 sm:mt-0 sm:absolute sm:top-4 sm:right-4 flex gap-2 overflow-x-auto pb-1">
          {isOwnProfile ? (
            <>
              <button
                onClick={() => openModal("editIntro")}
                className="shrink-0 bg-white/90 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 px-4 py-1.5 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-700 shadow-sm transition-all hover:shadow"
              >
                <Pencil className="w-4 h-4 inline mr-1" />
                Edit profile
              </button>
              <button className="shrink-0 bg-white/90 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 p-2 rounded-full border border-gray-300 dark:border-gray-700 shadow-sm transition-all hover:shadow">
                <MoreHorizontal className="w-4 h-4 text-gray-700 dark:text-gray-100" />
              </button>
            </>
          ) : (
            <>
              {/* Visitor View Buttons */}
              {connectionStatus === "pending" ? (
                <button
                  onClick={onWithdraw}
                  className="shrink-0 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-100 px-4 py-1.5 rounded-full text-sm font-semibold border border-gray-300 dark:border-gray-700 transition-colors flex items-center gap-1"
                >
                  <Check className="w-4 h-4" />
                  Pending
                </button>
              ) : (
                <button
                  onClick={onConnect}
                  className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-1"
                >
                  <UserPlus className="w-4 h-4" />
                  Connect
                </button>
              )}
              <button
                onClick={onMessage}
                className="shrink-0 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-1"
              >
                <MessageSquare className="w-4 h-4" />
                Message
              </button>
              <DropdownMenu
                trigger={
                  <button className="shrink-0 border border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-full transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                }
                items={[
                  { label: "Follow", icon: <UserCheck className="w-4 h-4" />, onClick: () => {} },
                  { label: "Share profile", icon: <Share2 className="w-4 h-4" />, onClick: () => {} },
                  { label: "Report/Block", icon: <Flag className="w-4 h-4" />, onClick: () => {} },
                ]}
              />
            </>
          )}
        </div>

        {/* Name, headline, location */}
        <div className="mt-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {profile.name}
            </h1>
            {!isOwnProfile && userId && <ConnectionDegreeBadge userId={userId} />}
            {profile.pronouns && (
              <span className="text-sm text-gray-500 font-normal">
                ({profile.pronouns})
              </span>
            )}
          </div>
          <p className="text-base text-gray-700 dark:text-gray-200 mt-0.5">{profile.headline}</p>
          <div className="flex items-center gap-1 mt-1 text-sm text-gray-500 dark:text-gray-300">
            <MapPin className="w-3.5 h-3.5" />
            <span>{profile.location}</span>
            <span className="mx-1">·</span>
            <button
              onClick={() => openModal("contactInfo")}
              className="text-blue-600 hover:underline font-semibold"
            >
              Contact info
            </button>
          </div>
          <button className="text-sm text-blue-600 hover:underline font-semibold mt-1">
            {profile.connections} connections
          </button>
        </div>

        {/* Open to Work toggle - only for own profile */}
        {isOwnProfile && (
          <div className="mt-3 flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={profile.openToWork}
                  onChange={() =>
                    updateProfile("openToWork", !profile.openToWork)
                  }
                  className="sr-only"
                />
                <div
                  className={`w-9 h-5 rounded-full transition-colors ${
                    profile.openToWork ? "bg-emerald-500" : "bg-gray-300"
                  }`}
                />
                <div
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    profile.openToWork ? "translate-x-4" : ""
                  }`}
                />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Open to Work
              </span>
            </label>
          </div>
        )}

        {/* CTA Buttons - only for own profile */}
        {isOwnProfile && (
          <div className="flex flex-wrap gap-2 mt-4">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-1.5 rounded-full text-sm font-semibold transition-colors shadow-sm">
              Open to
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-5 py-1.5 rounded-full text-sm font-semibold transition-colors">
              Add section
            </button>
            <button className="border border-gray-400 text-gray-600 hover:bg-gray-50 px-5 py-1.5 rounded-full text-sm font-semibold transition-colors">
              More
            </button>
          </div>
        )}
      </div>

      {/* Edit Intro Modal */}
      <EditIntroModal
        profile={profile}
        updateProfile={updateProfile}
        isOpen={activeModal === "editIntro"}
        closeModal={closeModal}
      />

      {/* Contact Info Modal */}
      <ContactInfoModal
        profile={profile}
        updateProfile={updateProfile}
        isOpen={activeModal === "contactInfo"}
        closeModal={closeModal}
      />
    </section>
  );
}

/* ─── Edit Intro Modal ─── */
function EditIntroModal({ profile, updateProfile, isOpen, closeModal }) {
  const [form, setForm] = useState({
    name: profile.name,
    pronouns: profile.pronouns,
    headline: profile.headline,
    location: profile.location,
    website: profile.website || "",
    customUrl: profile.customUrl || "",
  });

  const handleSave = () => {
    updateProfile("name", form.name);
    updateProfile("pronouns", form.pronouns);
    updateProfile("headline", form.headline);
    updateProfile("location", form.location);
    updateProfile("website", form.website);
    updateProfile("customUrl", form.customUrl);
    closeModal();
  };

  return (
    <SlideInModal isOpen={isOpen} onClose={closeModal} title="Edit intro">
      <div className="space-y-4">
        <FormField
          label="Name"
          value={form.name}
          onChange={(v) => setForm({ ...form, name: v })}
        />
        <FormField
          label="Pronouns"
          value={form.pronouns}
          onChange={(v) => setForm({ ...form, pronouns: v })}
        />
        <FormField
          label="Headline"
          value={form.headline}
          onChange={(v) => setForm({ ...form, headline: v })}
        />
        <FormField
          label="Location"
          value={form.location}
          onChange={(v) => setForm({ ...form, location: v })}
        />
        <FormField
          label="Website URL"
          value={form.website}
          onChange={(v) => setForm({ ...form, website: v })}
        />
        <FormField
          label="Custom URL"
          value={form.customUrl}
          onChange={(v) => setForm({ ...form, customUrl: v })}
        />
        <SaveButton onClick={handleSave} />
      </div>
    </SlideInModal>
  );
}

/* ─── Contact Info Modal ─── */
function ContactInfoModal({ profile, updateProfile, isOpen, closeModal }) {
  const [form, setForm] = useState({ ...profile.contactInfo });

  const handleSave = () => {
    updateProfile("contactInfo", form);
    closeModal();
  };

  return (
    <SlideInModal isOpen={isOpen} onClose={closeModal} title="Contact info">
      <div className="space-y-4">
        <FormField
          label="Email"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
        />
        <FormField
          label="Phone"
          value={form.phone}
          onChange={(v) => setForm({ ...form, phone: v })}
        />
        <FormField
          label="Website"
          value={form.website}
          onChange={(v) => setForm({ ...form, website: v })}
        />
        <FormField
          label="LinkedIn URL"
          value={form.linkedin}
          onChange={(v) => setForm({ ...form, linkedin: v })}
        />
        <SaveButton onClick={handleSave} />
      </div>
    </SlideInModal>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                              3.  ABOUT                                     */
/* ═══════════════════════════════════════════════════════════════════════════ */
function AboutSection({
  profile,
  isOwnProfile,
  aboutExpanded,
  setAboutExpanded,
  openModal,
  activeModal,
  closeModal,
  updateProfile,
}) {
  const lines = profile.about.split("\n");
  const previewText = lines.slice(0, 3).join("\n");
  const needsTruncate = lines.length > 3;

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <SectionHeader
        title="About"
        onEdit={isOwnProfile ? () => openModal("editAbout") : null}
      />
      <div className="mt-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
        {aboutExpanded || !needsTruncate ? profile.about : previewText + "…"}
      </div>
      {needsTruncate && (
        <button
          onClick={() => setAboutExpanded(!aboutExpanded)}
          className="mt-2 text-sm font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors"
        >
          {aboutExpanded ? (
            <>
              show less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              ...see more <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}

      {/* Edit About Modal */}
      <SlideInModal isOpen={activeModal === "editAbout"} onClose={closeModal} title="Edit About">
        <EditAboutForm
          profile={profile}
          updateProfile={updateProfile}
          closeModal={closeModal}
        />
      </SlideInModal>
    </section>
  );
}

function EditAboutForm({ profile, updateProfile, closeModal }) {
  const [text, setText] = useState(profile.about);
  const MAX_CHARS = 2600;
  const charCount = text.length;

  const handleSave = () => {
    if (charCount <= MAX_CHARS) {
      updateProfile("about", text);
      closeModal();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-shadow"
          placeholder="Tell people about yourself..."
        />
        <div className="flex justify-end mt-1">
          <span className={`text-xs ${charCount > MAX_CHARS ? 'text-red-500' : 'text-gray-500'}`}>
            {charCount}/{MAX_CHARS}
          </span>
        </div>
      </div>
      <SaveButton onClick={handleSave} disabled={charCount > MAX_CHARS} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                            4.  EXPERIENCE                                  */
/* ═══════════════════════════════════════════════════════════════════════════ */
function ExperienceSection({
  profile,
  isOwnProfile,
  openModal,
  activeModal,
  closeModal,
  updateProfile,
}) {
  const [editingExp, setEditingExp] = useState(null);

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <SectionHeader
        title="Experience"
        onAdd={isOwnProfile ? () => {
          setEditingExp({
            id: Date.now(),
            role: "",
            company: "",
            startDate: "",
            endDate: "",
            location: "",
            description: "",
            current: false,
          });
          openModal("editExperience");
        } : null}
        onEdit={isOwnProfile ? () => openModal("editExperience") : null}
      />

      <div className="mt-4 divide-y divide-gray-100">
        {profile.experience.map((exp) => (
          <div
            key={exp.id}
            className="py-4 first:pt-0 last:pb-0 flex gap-4 group"
          >
            <CompanyLogo name={exp.company} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-gray-700">{exp.company}</p>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </p>
                  <p className="text-sm text-gray-500">{exp.location}</p>
                </div>
                {isOwnProfile && (
                  <button
                    onClick={() => {
                      setEditingExp(exp);
                      openModal("editExperience");
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full hover:bg-gray-100 transition-all"
                  >
                    <Pencil className="w-4 h-4 text-gray-500" />
                  </button>
                )}
              </div>
              {exp.description && (
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Experience Modal */}
      <SlideInModal
        isOpen={activeModal === "editExperience"}
        onClose={() => {
          setEditingExp(null);
          closeModal();
        }}
        title={editingExp?.role ? "Edit Experience" : "Add Experience"}
      >
        {editingExp && (
          <EditExperienceForm
            experience={editingExp}
            allExperience={profile.experience}
            updateProfile={updateProfile}
            closeModal={() => {
              setEditingExp(null);
              closeModal();
            }}
          />
        )}
      </SlideInModal>
    </section>
  );
}

function EditExperienceForm({
  experience,
  allExperience,
  updateProfile,
  closeModal,
}) {
  const [form, setForm] = useState({ ...experience, current: experience.current || false });

  const handleSave = () => {
    const exists = allExperience.find((e) => e.id === form.id);
    const dataToSave = {
      ...form,
      endDate: form.current ? "" : form.endDate,
    };
    if (exists) {
      updateProfile(
        "experience",
        allExperience.map((e) => (e.id === form.id ? dataToSave : e))
      );
    } else {
      updateProfile("experience", [...allExperience, dataToSave]);
    }
    closeModal();
  };

  const handleDelete = () => {
    updateProfile(
      "experience",
      allExperience.filter((e) => e.id !== form.id)
    );
    closeModal();
  };

  return (
    <div className="space-y-4">
      <FormField
        label="Role"
        value={form.role}
        onChange={(v) => setForm({ ...form, role: v })}
      />
      <FormField
        label="Company"
        value={form.company}
        onChange={(v) => setForm({ ...form, company: v })}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          label="Start Date"
          value={form.startDate}
          onChange={(v) => setForm({ ...form, startDate: v })}
        />
        {!form.current && (
          <FormField
            label="End Date"
            value={form.endDate}
            onChange={(v) => setForm({ ...form, endDate: v })}
          />
        )}
      </div>
      {/* Currently working checkbox */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={form.current}
          onChange={(e) => setForm({ ...form, current: e.target.checked })}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">I currently work here</span>
      </label>
      <FormField
        label="Location"
        value={form.location}
        onChange={(v) => setForm({ ...form, location: v })}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-shadow"
        />
      </div>
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-700 text-sm font-semibold px-4 py-2 rounded-full hover:bg-red-50 transition-colors"
        >
          Delete this experience
        </button>
        <SaveButton onClick={handleSave} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                            5.  EDUCATION                                   */
/* ═══════════════════════════════════════════════════════════════════════════ */
function EducationSection({
  profile,
  isOwnProfile,
  openModal,
  activeModal,
  closeModal,
  updateProfile,
}) {
  const [editingEdu, setEditingEdu] = useState(null);

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <SectionHeader
        title="Education"
        onAdd={isOwnProfile ? () => {
          setEditingEdu({
            id: Date.now(),
            institution: "",
            degree: "",
            fieldOfStudy: "",
            startYear: "",
            endYear: "",
          });
          openModal("editEducation");
        } : null}
        onEdit={isOwnProfile ? () => openModal("editEducation") : null}
      />

      <div className="mt-4 divide-y divide-gray-100">
        {profile.education.map((edu) => (
          <div
            key={edu.id}
            className="py-4 first:pt-0 last:pb-0 flex gap-4 group"
          >
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
              <GraduationCap className="w-6 h-6 text-amber-700" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {edu.institution}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {edu.degree}
                    {edu.fieldOfStudy && `, ${edu.fieldOfStudy}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {edu.startYear} – {edu.endYear}
                  </p>
                </div>
                {isOwnProfile && (
                  <button
                    onClick={() => {
                      setEditingEdu(edu);
                      openModal("editEducation");
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full hover:bg-gray-100 transition-all"
                  >
                    <Pencil className="w-4 h-4 text-gray-500" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Education Modal */}
      <SlideInModal
        isOpen={activeModal === "editEducation"}
        onClose={() => {
          setEditingEdu(null);
          closeModal();
        }}
        title={editingEdu?.institution ? "Edit Education" : "Add Education"}
      >
        {editingEdu && (
          <EditEducationForm
            education={editingEdu}
            allEducation={profile.education}
            updateProfile={updateProfile}
            closeModal={() => {
              setEditingEdu(null);
              closeModal();
            }}
          />
        )}
      </SlideInModal>
    </section>
  );
}

function EditEducationForm({
  education,
  allEducation,
  updateProfile,
  closeModal,
}) {
  const [form, setForm] = useState({ ...education, fieldOfStudy: education.fieldOfStudy || "" });

  const handleSave = () => {
    const exists = allEducation.find((e) => e.id === form.id);
    if (exists) {
      updateProfile(
        "education",
        allEducation.map((e) => (e.id === form.id ? form : e))
      );
    } else {
      updateProfile("education", [...allEducation, form]);
    }
    closeModal();
  };

  const handleDelete = () => {
    updateProfile(
      "education",
      allEducation.filter((e) => e.id !== form.id)
    );
    closeModal();
  };

  return (
    <div className="space-y-4">
      <FormField
        label="School"
        value={form.institution}
        onChange={(v) => setForm({ ...form, institution: v })}
      />
      <FormField
        label="Degree"
        value={form.degree}
        onChange={(v) => setForm({ ...form, degree: v })}
      />
      <FormField
        label="Field of study"
        value={form.fieldOfStudy}
        onChange={(v) => setForm({ ...form, fieldOfStudy: v })}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          label="Start Year"
          value={form.startYear}
          onChange={(v) => setForm({ ...form, startYear: v })}
        />
        <FormField
          label="End Year"
          value={form.endYear}
          onChange={(v) => setForm({ ...form, endYear: v })}
        />
      </div>
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-700 text-sm font-semibold px-4 py-2 rounded-full hover:bg-red-50 transition-colors"
        >
          Delete
        </button>
        <SaveButton onClick={handleSave} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                              6.  SKILLS                                    */
/* ═══════════════════════════════════════════════════════════════════════════ */
// Popular skills for suggestions
const POPULAR_SKILLS = [
  "React", "JavaScript", "TypeScript", "Node.js", "Python", "Java", "C++",
  "HTML", "CSS", "SQL", "MongoDB", "PostgreSQL", "AWS", "Docker", "Kubernetes",
  "Git", "GitHub", "Figma", "Adobe XD", "Sketch", "UI Design", "UX Design",
  "Product Management", "Agile", "Scrum", "Data Analysis", "Machine Learning",
  "TensorFlow", "PyTorch", "Tableau", "Power BI", "Excel", "Project Management",
  "Leadership", "Communication", "Problem Solving", "Critical Thinking",
];

function SkillsSection({
  profile,
  isOwnProfile,
  showAllSkills,
  setShowAllSkills,
  openModal,
  activeModal,
  closeModal,
  updateProfile,
}) {
  const visibleSkills = showAllSkills
    ? profile.skills
    : profile.skills.slice(0, 6);

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <SectionHeader
        title="Skills"
        onAdd={isOwnProfile ? () => openModal("addSkill") : null}
        onEdit={isOwnProfile ? () => openModal("editSkills") : null}
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {visibleSkills.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 hover:bg-blue-100 transition-colors cursor-default group"
          >
            <span className="text-sm font-medium text-blue-800">
              {skill.name}
            </span>
            <span className="bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[24px] text-center">
              {skill.endorsements}
            </span>
          </div>
        ))}
      </div>

      {profile.skills.length > 6 && (
        <button
          onClick={() => setShowAllSkills(!showAllSkills)}
          className="mt-4 w-full py-2.5 text-center text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors flex items-center justify-center gap-1"
        >
          {showAllSkills
            ? "Show fewer skills"
            : `Show all ${profile.skills.length} skills`}
          {showAllSkills ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      )}

      {/* Add Skill Modal */}
      <SlideInModal
        isOpen={activeModal === "addSkill"}
        onClose={closeModal}
        title="Add Skill"
      >
        <AddSkillForm
          skills={profile.skills}
          updateProfile={updateProfile}
          closeModal={closeModal}
        />
      </SlideInModal>

      {/* Edit Skills Modal */}
      <SlideInModal
        isOpen={activeModal === "editSkills"}
        onClose={closeModal}
        title="Edit Skills"
      >
        <EditSkillsForm
          skills={profile.skills}
          updateProfile={updateProfile}
          closeModal={closeModal}
        />
      </SlideInModal>
    </section>
  );
}

function AddSkillForm({ skills, updateProfile, closeModal }) {
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const existingSkillNames = skills.map((s) => s.name.toLowerCase());
  const filteredSuggestions = POPULAR_SKILLS.filter(
    (skill) =>
      skill.toLowerCase().includes(search.toLowerCase()) &&
      !existingSkillNames.includes(skill.toLowerCase())
  ).slice(0, 6);

  const handleSave = (skillName = search) => {
    if (!skillName.trim()) return;
    if (existingSkillNames.includes(skillName.toLowerCase())) {
      alert("You already have this skill!");
      return;
    }
    updateProfile("skills", [
      ...skills,
      { id: Date.now(), name: skillName.trim(), endorsements: 0 },
    ]);
    closeModal();
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <FormField
          label="Skill"
          value={search}
          onChange={(v) => {
            setSearch(v);
            setShowSuggestions(true);
          }}
        />
        {showSuggestions && search && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {filteredSuggestions.map((skill) => (
              <button
                key={skill}
                onClick={() => handleSave(skill)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              >
                {skill}
              </button>
            ))}
          </div>
        )}
      </div>
      <SaveButton onClick={() => handleSave()} />
    </div>
  );
}

function EditSkillsForm({ skills, updateProfile, closeModal }) {
  const [items, setItems] = useState([...skills]);
  const removeSkill = (id) => setItems(items.filter((s) => s.id !== id));
  const handleSave = () => {
    updateProfile("skills", items);
    closeModal();
  };
  return (
    <div className="space-y-4">
      {items.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-4">No skills added yet.</p>
      )}
      {items.map((skill) => (
        <div key={skill.id} className="flex items-center gap-3">
          <span className="flex-1 text-sm">{skill.name}</span>
          <span className="text-xs text-gray-500">
            {skill.endorsements} endorsements
          </span>
          <button
            onClick={() => removeSkill(skill.id)}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Remove
          </button>
        </div>
      ))}
      <SaveButton onClick={handleSave} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                          7.  RECOMMENDATIONS                               */
/* ═══════════════════════════════════════════════════════════════════════════ */
function RecommendationsSection({
  profile,
  isOwnProfile,
  updateProfile,
  openModal,
  activeModal,
  closeModal,
}) {
  const [tab, setTab] = useState("received");

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <SectionHeader
        title="Recommendations"
        onEdit={isOwnProfile && profile.recommendations.length > 0 ? () => openModal("editRecommendations") : null}
      />

      {/* Tabs */}
      <div className="flex gap-4 mt-3 border-b border-gray-200">
        <button
          onClick={() => setTab("received")}
          className={`pb-2 text-sm font-semibold transition-colors ${
            tab === "received"
              ? "text-emerald-700 border-b-2 border-emerald-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Received ({profile.recommendations.length})
        </button>
        <button
          onClick={() => setTab("given")}
          className={`pb-2 text-sm font-semibold transition-colors ${
            tab === "given"
              ? "text-emerald-700 border-b-2 border-emerald-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Given
        </button>
      </div>

      {tab === "received" && (
        <div className="mt-4 divide-y divide-gray-100">
          {profile.recommendations.length === 0 && (
            <div className="py-8 text-center text-sm text-gray-400">
              No recommendations received yet.
            </div>
          )}
          {profile.recommendations.map((rec) => (
            <div key={rec.id} className="py-4 first:pt-2 last:pb-0 flex gap-4">
              <img
                src={rec.avatar}
                alt={rec.name}
                className="w-12 h-12 rounded-full object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900">
                  {rec.name}
                </h4>
                <p className="text-xs text-gray-500">{rec.relationship}</p>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                  "{rec.text}"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "given" && (
        <div className="py-8 text-center text-sm text-gray-400">
          No recommendations given yet.
        </div>
      )}

      {/* Edit Recommendations Modal */}
      <SlideInModal
        isOpen={activeModal === "editRecommendations"}
        onClose={closeModal}
        title="Edit Recommendations"
      >
        <EditRecommendationsForm
          recommendations={profile.recommendations}
          updateProfile={updateProfile}
          closeModal={closeModal}
        />
      </SlideInModal>
    </section>
  );
}

function EditRecommendationsForm({
  recommendations,
  updateProfile,
  closeModal,
}) {
  const [items, setItems] = useState([...recommendations]);

  const updateItem = (id, field, value) => {
    setItems(
      items.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handleSave = () => {
    updateProfile("recommendations", items);
    closeModal();
  };

  return (
    <div className="space-y-6">
      {items.map((rec) => (
        <div key={rec.id} className="space-y-3 pb-4 border-b border-gray-100">
          <FormField
            label="Name"
            value={rec.name}
            onChange={(v) => updateItem(rec.id, "name", v)}
          />
          <FormField
            label="Relationship"
            value={rec.relationship}
            onChange={(v) => updateItem(rec.id, "relationship", v)}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text
            </label>
            <textarea
              value={rec.text}
              onChange={(e) => updateItem(rec.id, "text", e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-shadow"
            />
          </div>
        </div>
      ))}
      <SaveButton onClick={handleSave} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                         8.  ACCOMPLISHMENTS                                */
/* ═══════════════════════════════════════════════════════════════════════════ */
function AccomplishmentsSection({
  profile,
  isOwnProfile,
  updateProfile,
  openModal,
  activeModal,
  closeModal,
}) {
  const [certExpanded, setCertExpanded] = useState(true);
  const [courseExpanded, setCourseExpanded] = useState(true);

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900">Accomplishments</h2>

      {/* Certifications */}
      <div className="mt-4">
        <div
          onClick={() => setCertExpanded(!certExpanded)}
          className="w-full flex items-center justify-between py-2 cursor-pointer"
          role="button"
          tabIndex={0}
        >
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-gray-600" />
            <span className="text-base font-semibold text-gray-800">
              Certifications
            </span>
            <span className="text-sm text-gray-500">
              ({profile.certifications.length})
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isOwnProfile && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openModal("editCertifications");
                }}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Pencil className="w-4 h-4 text-gray-500" />
              </button>
            )}
            {certExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </div>
        </div>
        {certExpanded && (
          <div className="ml-7 mt-1 space-y-3">
            {profile.certifications.length === 0 && (
              <p className="text-sm text-gray-400">No certifications added yet.</p>
            )}
            {profile.certifications.map((cert) => (
              <div key={cert.id} className="flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {cert.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {cert.issuer} · {cert.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Courses */}
      <div className="mt-4 border-t border-gray-100 pt-4">
        <div
          onClick={() => setCourseExpanded(!courseExpanded)}
          className="w-full flex items-center justify-between py-2 cursor-pointer"
          role="button"
          tabIndex={0}
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-gray-600" />
            <span className="text-base font-semibold text-gray-800">
              Courses
            </span>
            <span className="text-sm text-gray-500">
              ({profile.courses.length})
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isOwnProfile && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openModal("editCourses");
                }}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Pencil className="w-4 h-4 text-gray-500" />
              </button>
            )}
            {courseExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </div>
        </div>
        {courseExpanded && (
          <div className="ml-7 mt-1 space-y-3">
            {profile.courses.length === 0 && (
              <p className="text-sm text-gray-400">No courses added yet.</p>
            )}
            {profile.courses.map((course) => (
              <div key={course.id} className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {course.name}
                  </p>
                  <p className="text-xs text-gray-500">{course.provider}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Certifications Modal */}
      <SlideInModal
        isOpen={activeModal === "editCertifications"}
        onClose={closeModal}
        title="Edit Certifications"
      >
        <EditCertificationsForm
          certifications={profile.certifications}
          updateProfile={updateProfile}
          closeModal={closeModal}
        />
      </SlideInModal>

      {/* Edit Courses Modal */}
      <SlideInModal
        isOpen={activeModal === "editCourses"}
        onClose={closeModal}
        title="Edit Courses"
      >
        <EditCoursesForm
          courses={profile.courses}
          updateProfile={updateProfile}
          closeModal={closeModal}
        />
      </SlideInModal>
    </section>
  );
}

function EditCertificationsForm({
  certifications,
  updateProfile,
  closeModal,
}) {
  const [items, setItems] = useState([...certifications]);

  const updateItem = (id, field, value) => {
    setItems(
      items.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleSave = () => {
    updateProfile("certifications", items);
    closeModal();
  };

  return (
    <div className="space-y-5">
      {items.map((cert) => (
        <div key={cert.id} className="space-y-3 pb-4 border-b border-gray-100">
          <FormField
            label="Certification Name"
            value={cert.name}
            onChange={(v) => updateItem(cert.id, "name", v)}
          />
          <FormField
            label="Issuer"
            value={cert.issuer}
            onChange={(v) => updateItem(cert.id, "issuer", v)}
          />
          <FormField
            label="Date"
            value={cert.date}
            onChange={(v) => updateItem(cert.id, "date", v)}
          />
        </div>
      ))}
      <SaveButton onClick={handleSave} />
    </div>
  );
}

function EditCoursesForm({ courses, updateProfile, closeModal }) {
  const [items, setItems] = useState([...courses]);

  const updateItem = (id, field, value) => {
    setItems(
      items.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleSave = () => {
    updateProfile("courses", items);
    closeModal();
  };

  return (
    <div className="space-y-5">
      {items.map((course) => (
        <div
          key={course.id}
          className="space-y-3 pb-4 border-b border-gray-100"
        >
          <FormField
            label="Course Name"
            value={course.name}
            onChange={(v) => updateItem(course.id, "name", v)}
          />
          <FormField
            label="Provider"
            value={course.provider}
            onChange={(v) => updateItem(course.id, "provider", v)}
          />
        </div>
      ))}
      <SaveButton onClick={handleSave} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                           RIGHT SIDEBAR                                    */
/* ═══════════════════════════════════════════════════════════════════════════ */
const peopleAlsoViewed = [
  {
    name: "Ananya Patel",
    avatar: "https://i.pravatar.cc/100?img=1",
    headline: "ML Engineer at Meta",
  },
  {
    name: "Rahul Verma",
    avatar: "https://i.pravatar.cc/100?img=3",
    headline: "Backend Dev at Amazon",
  },
  {
    name: "Sneha Gupta",
    avatar: "https://i.pravatar.cc/100?img=9",
    headline: "DevOps Lead at Netflix",
  },
  {
    name: "Vikram Singh",
    avatar: "https://i.pravatar.cc/100?img=7",
    headline: "iOS Developer at Apple",
  },
];

// Mock mutual connections data
const mutualConnections = [
  { name: "Priya Sharma", avatar: "https://i.pravatar.cc/100?img=5" },
  { name: "Arjun Mehta", avatar: "https://i.pravatar.cc/100?img=8" },
];

function RightSidebar({ profile, isOwnProfile, userId }) {
  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-20">
      {/* Profile Language */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-gray-900">
            Profile language
          </h3>
          {isOwnProfile && <Pencil className="w-4 h-4 text-gray-400 cursor-pointer" />}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Globe className="w-4 h-4" />
          <span>English</span>
        </div>
      </div>

      {/* Public profile URL */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-gray-900">
            Public profile & URL
          </h3>
          <ExternalLink className="w-4 h-4 text-gray-400 cursor-pointer" />
        </div>
        <p className="text-sm text-gray-500">
          {profile.customUrl || "linkedin.com/in/raiyankhan"}
        </p>
      </div>

      {/* How you're connected - only for visitor view */}
      {!isOwnProfile && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            How you&apos;re connected
          </h3>
          <div className="space-y-3">
            {mutualConnections.map((person, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {person.name}
                  </p>
                  <p className="text-xs text-gray-500">1st connection</p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 text-sm text-gray-600 pt-2 border-t border-gray-100">
              <Users className="w-4 h-4" />
              <span>2 mutual connections</span>
            </div>
          </div>
        </div>
      )}

      {/* People Also Viewed */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          People also viewed
        </h3>
        <div className="space-y-4">
          {peopleAlsoViewed.map((person, idx) => (
            <div
              key={idx}
              className="flex gap-3 items-center group cursor-pointer"
            >
              <img
                src={person.avatar}
                alt={person.name}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                  {person.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {person.headline}
                </p>
              </div>
              <button className="shrink-0 border border-gray-300 text-gray-600 hover:bg-gray-50 px-3 py-1 rounded-full text-xs font-semibold transition-colors">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="text-center text-xs text-gray-400 space-y-1 px-4 pb-4">
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
          <span className="hover:text-blue-600 cursor-pointer">About</span>
          <span className="hover:text-blue-600 cursor-pointer">Accessibility</span>
          <span className="hover:text-blue-600 cursor-pointer">Help Center</span>
          <span className="hover:text-blue-600 cursor-pointer">Privacy & Terms</span>
        </div>
        <p className="mt-2">LinkedIn Clone © 2026</p>
      </div>
    </aside>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                         SHARED UI COMPONENTS                               */
/* ═══════════════════════════════════════════════════════════════════════════ */
function SectionHeader({ title, onEdit, onAdd }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <div className="flex items-center gap-1">
        {onAdd && (
          <button
            onClick={onAdd}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={`Add ${title}`}
          >
            <Plus className="w-5 h-5 text-gray-600" />
          </button>
        )}
        {onEdit && (
          <button
            onClick={onEdit}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={`Edit ${title}`}
          >
            <Pencil className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
}

function FormField({ label, value, onChange, type = "text" }) {
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

function SaveButton({ onClick, disabled }) {
  return (
    <div className="flex justify-end pt-2">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`px-8 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        Save
      </button>
    </div>
  );
}
