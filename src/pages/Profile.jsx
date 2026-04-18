import { useState } from "react";
import { useProfile } from "../contexts/ProfileContext";
import EditModal from "../components/EditModal";
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

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                              PROFILE PAGE                                  */
/* ═══════════════════════════════════════════════════════════════════════════ */
export default function Profile() {
  const { profile, updateProfile } = useProfile();

  /* ── modal state ── */
  const [activeModal, setActiveModal] = useState(null);
  const openModal = (name) => setActiveModal(name);
  const closeModal = () => setActiveModal(null);

  /* ── about expand ── */
  const [aboutExpanded, setAboutExpanded] = useState(false);

  /* ── skills expand ── */
  const [showAllSkills, setShowAllSkills] = useState(false);

  return (
    <div className="max-w-[1128px] mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
      {/* ══════════ LEFT COLUMN ══════════ */}
      <div className="flex flex-col gap-2">
        {/* ─────── 1. COVER + AVATAR + INTRO ─────── */}
        <CoverIntroSection
          profile={profile}
          updateProfile={updateProfile}
          openModal={openModal}
          activeModal={activeModal}
          closeModal={closeModal}
        />

        {/* ─────── 3. ABOUT ─────── */}
        <AboutSection
          profile={profile}
          updateProfile={updateProfile}
          aboutExpanded={aboutExpanded}
          setAboutExpanded={setAboutExpanded}
          openModal={openModal}
          activeModal={activeModal}
          closeModal={closeModal}
        />

        {/* ─────── 4. EXPERIENCE ─────── */}
        <ExperienceSection
          profile={profile}
          updateProfile={updateProfile}
          openModal={openModal}
          activeModal={activeModal}
          closeModal={closeModal}
        />

        {/* ─────── 5. EDUCATION ─────── */}
        <EducationSection
          profile={profile}
          updateProfile={updateProfile}
          openModal={openModal}
          activeModal={activeModal}
          closeModal={closeModal}
        />

        {/* ─────── 6. SKILLS ─────── */}
        <SkillsSection
          profile={profile}
          updateProfile={updateProfile}
          showAllSkills={showAllSkills}
          setShowAllSkills={setShowAllSkills}
          openModal={openModal}
          activeModal={activeModal}
          closeModal={closeModal}
        />

        {/* ─────── 7. RECOMMENDATIONS ─────── */}
        <RecommendationsSection
          profile={profile}
          updateProfile={updateProfile}
          openModal={openModal}
          activeModal={activeModal}
          closeModal={closeModal}
        />

        {/* ─────── 8. ACCOMPLISHMENTS ─────── */}
        <AccomplishmentsSection
          profile={profile}
          updateProfile={updateProfile}
          openModal={openModal}
          activeModal={activeModal}
          closeModal={closeModal}
        />
      </div>

      {/* ══════════ RIGHT SIDEBAR ══════════ */}
      <RightSidebar profile={profile} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                         1 & 2.  COVER + INTRO                              */
/* ═══════════════════════════════════════════════════════════════════════════ */
function CoverIntroSection({
  profile,
  updateProfile,
  openModal,
  activeModal,
  closeModal,
}) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Cover */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={profile.coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Avatar + Buttons Row */}
      <div className="relative px-6 pb-4">
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
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => openModal("editIntro")}
            className="bg-white/90 hover:bg-white px-4 py-1.5 rounded-full text-sm font-semibold text-gray-700 border border-gray-300 shadow-sm transition-all hover:shadow"
          >
            <Pencil className="w-4 h-4 inline mr-1" />
            Edit profile
          </button>
          <button className="bg-white/90 hover:bg-white p-2 rounded-full border border-gray-300 shadow-sm transition-all hover:shadow">
            <MoreHorizontal className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        {/* Name, headline, location */}
        <div className="mt-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold text-gray-900">
              {profile.name}
            </h1>
            {profile.pronouns && (
              <span className="text-sm text-gray-500 font-normal">
                ({profile.pronouns})
              </span>
            )}
          </div>
          <p className="text-base text-gray-700 mt-0.5">{profile.headline}</p>
          <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
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

        {/* Open to Work toggle */}
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

        {/* CTA Buttons */}
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
  });

  const handleSave = () => {
    updateProfile("name", form.name);
    updateProfile("pronouns", form.pronouns);
    updateProfile("headline", form.headline);
    updateProfile("location", form.location);
    closeModal();
  };

  return (
    <EditModal isOpen={isOpen} onClose={closeModal} title="Edit intro">
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
        <SaveButton onClick={handleSave} />
      </div>
    </EditModal>
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
    <EditModal isOpen={isOpen} onClose={closeModal} title="Contact info">
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
    </EditModal>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                              3.  ABOUT                                     */
/* ═══════════════════════════════════════════════════════════════════════════ */
function AboutSection({
  profile,
  updateProfile,
  aboutExpanded,
  setAboutExpanded,
  openModal,
  activeModal,
  closeModal,
}) {
  const lines = profile.about.split("\n");
  const previewText = lines.slice(0, 3).join("\n");
  const needsTruncate = lines.length > 3;

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <SectionHeader
        title="About"
        onEdit={() => openModal("editAbout")}
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
      <EditModal
        isOpen={activeModal === "editAbout"}
        onClose={closeModal}
        title="Edit About"
      >
        <EditAboutForm
          profile={profile}
          updateProfile={updateProfile}
          closeModal={closeModal}
        />
      </EditModal>
    </section>
  );
}

function EditAboutForm({ profile, updateProfile, closeModal }) {
  const [text, setText] = useState(profile.about);
  const handleSave = () => {
    updateProfile("about", text);
    closeModal();
  };
  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-shadow"
        placeholder="Tell people about yourself..."
      />
      <SaveButton onClick={handleSave} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                            4.  EXPERIENCE                                  */
/* ═══════════════════════════════════════════════════════════════════════════ */
function ExperienceSection({
  profile,
  updateProfile,
  openModal,
  activeModal,
  closeModal,
}) {
  const [editingExp, setEditingExp] = useState(null);

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <SectionHeader
        title="Experience"
        onAdd={() => {
          setEditingExp({
            id: Date.now(),
            role: "",
            company: "",
            startDate: "",
            endDate: "",
            location: "",
            description: "",
          });
          openModal("editExperience");
        }}
        onEdit={() => openModal("editExperience")}
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
                    {exp.startDate} – {exp.endDate}
                  </p>
                  <p className="text-sm text-gray-500">{exp.location}</p>
                </div>
                <button
                  onClick={() => {
                    setEditingExp(exp);
                    openModal("editExperience");
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full hover:bg-gray-100 transition-all"
                >
                  <Pencil className="w-4 h-4 text-gray-500" />
                </button>
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
      <EditModal
        isOpen={activeModal === "editExperience"}
        onClose={() => {
          setEditingExp(null);
          closeModal();
        }}
        title="Edit Experience"
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
      </EditModal>
    </section>
  );
}

function EditExperienceForm({
  experience,
  allExperience,
  updateProfile,
  closeModal,
}) {
  const [form, setForm] = useState({ ...experience });

  const handleSave = () => {
    const exists = allExperience.find((e) => e.id === form.id);
    if (exists) {
      updateProfile(
        "experience",
        allExperience.map((e) => (e.id === form.id ? form : e))
      );
    } else {
      updateProfile("experience", [...allExperience, form]);
    }
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
        <FormField
          label="End Date"
          value={form.endDate}
          onChange={(v) => setForm({ ...form, endDate: v })}
        />
      </div>
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
      <SaveButton onClick={handleSave} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                            5.  EDUCATION                                   */
/* ═══════════════════════════════════════════════════════════════════════════ */
function EducationSection({
  profile,
  updateProfile,
  openModal,
  activeModal,
  closeModal,
}) {
  const [editingEdu, setEditingEdu] = useState(null);

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <SectionHeader
        title="Education"
        onAdd={() => {
          setEditingEdu({
            id: Date.now(),
            institution: "",
            degree: "",
            startYear: "",
            endYear: "",
          });
          openModal("editEducation");
        }}
        onEdit={() => openModal("editEducation")}
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
                  <p className="text-sm text-gray-700">{edu.degree}</p>
                  <p className="text-sm text-gray-500">
                    {edu.startYear} – {edu.endYear}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingEdu(edu);
                    openModal("editEducation");
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full hover:bg-gray-100 transition-all"
                >
                  <Pencil className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Education Modal */}
      <EditModal
        isOpen={activeModal === "editEducation"}
        onClose={() => {
          setEditingEdu(null);
          closeModal();
        }}
        title="Edit Education"
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
      </EditModal>
    </section>
  );
}

function EditEducationForm({
  education,
  allEducation,
  updateProfile,
  closeModal,
}) {
  const [form, setForm] = useState({ ...education });

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

  return (
    <div className="space-y-4">
      <FormField
        label="Institution"
        value={form.institution}
        onChange={(v) => setForm({ ...form, institution: v })}
      />
      <FormField
        label="Degree"
        value={form.degree}
        onChange={(v) => setForm({ ...form, degree: v })}
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
      <SaveButton onClick={handleSave} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                              6.  SKILLS                                    */
/* ═══════════════════════════════════════════════════════════════════════════ */
function SkillsSection({
  profile,
  updateProfile,
  showAllSkills,
  setShowAllSkills,
  openModal,
  activeModal,
  closeModal,
}) {
  const visibleSkills = showAllSkills
    ? profile.skills
    : profile.skills.slice(0, 6);

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <SectionHeader
        title="Skills"
        onAdd={() => openModal("addSkill")}
        onEdit={() => openModal("editSkills")}
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
      <EditModal
        isOpen={activeModal === "addSkill"}
        onClose={closeModal}
        title="Add Skill"
      >
        <AddSkillForm
          skills={profile.skills}
          updateProfile={updateProfile}
          closeModal={closeModal}
        />
      </EditModal>

      {/* Edit Skills Modal */}
      <EditModal
        isOpen={activeModal === "editSkills"}
        onClose={closeModal}
        title="Edit Skills"
      >
        <EditSkillsForm
          skills={profile.skills}
          updateProfile={updateProfile}
          closeModal={closeModal}
        />
      </EditModal>
    </section>
  );
}

function AddSkillForm({ skills, updateProfile, closeModal }) {
  const [name, setName] = useState("");
  const handleSave = () => {
    if (!name.trim()) return;
    updateProfile("skills", [
      ...skills,
      { id: Date.now(), name: name.trim(), endorsements: 0 },
    ]);
    closeModal();
  };
  return (
    <div className="space-y-4">
      <FormField label="Skill Name" value={name} onChange={setName} />
      <SaveButton onClick={handleSave} />
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
  updateProfile,
  openModal,
  activeModal,
  closeModal,
}) {
  const [tab, setTab] = useState("received");

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <SectionHeader title="Recommendations" />

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
      <EditModal
        isOpen={activeModal === "editRecommendations"}
        onClose={closeModal}
        title="Edit Recommendations"
      >
        <EditRecommendationsForm
          recommendations={profile.recommendations}
          updateProfile={updateProfile}
          closeModal={closeModal}
        />
      </EditModal>
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                openModal("editCertifications");
              }}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Pencil className="w-4 h-4 text-gray-500" />
            </button>
            {certExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </div>
        </div>
        {certExpanded && (
          <div className="ml-7 mt-1 space-y-3">
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                openModal("editCourses");
              }}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Pencil className="w-4 h-4 text-gray-500" />
            </button>
            {courseExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </div>
        </div>
        {courseExpanded && (
          <div className="ml-7 mt-1 space-y-3">
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
      <EditModal
        isOpen={activeModal === "editCertifications"}
        onClose={closeModal}
        title="Edit Certifications"
      >
        <EditCertificationsForm
          certifications={profile.certifications}
          updateProfile={updateProfile}
          closeModal={closeModal}
        />
      </EditModal>

      {/* Edit Courses Modal */}
      <EditModal
        isOpen={activeModal === "editCourses"}
        onClose={closeModal}
        title="Edit Courses"
      >
        <EditCoursesForm
          courses={profile.courses}
          updateProfile={updateProfile}
          closeModal={closeModal}
        />
      </EditModal>
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

function RightSidebar({ profile }) {
  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-20">
      {/* Profile Language */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-gray-900">
            Profile language
          </h3>
          <Pencil className="w-4 h-4 text-gray-400" />
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
          <ExternalLink className="w-4 h-4 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">
          linkedin.com/in/raiyankhan
        </p>
      </div>

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

function SaveButton({ onClick }) {
  return (
    <div className="flex justify-end pt-2">
      <button
        onClick={onClick}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm"
      >
        Save
      </button>
    </div>
  );
}
