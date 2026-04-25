import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import LinkedInLogo from "../components/LinkedInLogo";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

function getPasswordStrength(password) {
  if (password.length < 6) {
    return { label: "Weak", color: "bg-red-500", width: "w-1/3" };
  }

  const hasLetters = /[A-Za-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSymbols = /[^A-Za-z0-9]/.test(password);

  if (password.length >= 10 && hasLetters && hasNumbers && hasSymbols) {
    return { label: "Strong", color: "bg-emerald-500", width: "w-full" };
  }

  return { label: "Medium", color: "bg-amber-500", width: "w-2/3" };
}

export default function Signup() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const passwordStrength = useMemo(
    () => getPasswordStrength(formData.password),
    [formData.password]
  );

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.firstName.trim()) {
      nextErrors.firstName = "Please enter your first name.";
    }
    if (!formData.lastName.trim()) {
      nextErrors.lastName = "Please enter your last name.";
    }
    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!formData.password.trim()) {
      nextErrors.password = "Please enter a password.";
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

    localStorage.setItem("linkedin-clone-signup-user", JSON.stringify(formData));
    setFormData(initialFormState);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-[#f3f2ef] px-4 py-8 text-[#191919]">
      <div className="mx-auto flex w-full max-w-[1128px] justify-center md:justify-start">
        <Link to="/" className="mb-6 inline-flex">
          <LinkedInLogo size="md" />
        </Link>
      </div>

      <div className="mx-auto w-full max-w-[400px]">
        <div className="mb-5 text-center">
          <h1 className="text-[31px] font-normal leading-tight text-[#191919]">
            Make most of your professional life
          </h1>
        </div>

        <div className="linkedin-surface rounded-lg bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
              <Field
                label="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
            </div>

            <Field
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <div>
              <label className="mb-1 block text-sm text-[#666666]">Password (6+ characters)</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`h-12 w-full rounded-md border bg-white px-3 pr-16 text-base outline-none transition focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] ${
                    errors.password ? "border-red-500" : "border-gray-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#0a66c2]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password ? (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              ) : null}

              <div className="mt-3">
                <div className="mb-2 flex items-center justify-between text-xs text-[#666666]">
                  <span>Password strength</span>
                  <span className="font-semibold text-[#191919]">
                    {formData.password ? passwordStrength.label : "Not set"}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={`h-full rounded-full transition-all ${passwordStrength.color} ${
                      formData.password ? passwordStrength.width : "w-0"
                    }`}
                  />
                </div>
              </div>
            </div>

            <p className="text-center text-xs leading-5 text-[#666666]">
              By clicking Agree &amp; Join, you agree to LinkedIn&apos;s User Agreement,
              Privacy Policy, and Cookie Policy.
            </p>

            <button
              type="submit"
              className="w-full rounded-full bg-[#0a66c2] px-4 py-3 text-base font-semibold text-white transition hover:bg-[#004182]"
            >
              Agree &amp; Join
            </button>
          </form>

          <div className="my-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-[#666666]">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <button
            type="button"
            className="mb-4 flex h-12 w-full items-center justify-center gap-3 rounded-full border border-gray-400 text-sm font-semibold text-[#3c4043] transition hover:bg-gray-50"
          >
            <span className="text-base font-bold text-[#4285f4]">G</span>
            Continue with Google
          </button>

          <p className="text-center text-sm text-[#666666]">
            Already on LinkedIn?{" "}
            <Link to="/" className="linkedin-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-sm text-[#666666]">{label}</label>
      <input
        {...props}
        className={`h-12 w-full rounded-md border bg-white px-3 text-base outline-none transition focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] ${
          error ? "border-red-500" : "border-gray-400"
        }`}
      />
      {error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
