import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function LinkedInLogo() {
  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-1 text-3xl font-bold text-[#0A66C2]">
        <span>Linked</span>
        <span className="rounded bg-[#0A66C2] px-1.5 py-0.5 text-2xl leading-none text-white">
          in
        </span>
      </div>
    </div>
  );
}

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
    return { label: "Strong", color: "bg-green-500", width: "w-full" };
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.08)] sm:p-10">
        <div className="space-y-6">
          <LinkedInLogo />

          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
              Make the most of your professional life
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Start building your presence and growing your network.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20 ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.firstName ? (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                ) : null}
              </div>

              <div>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20 ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.lastName ? (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                ) : null}
              </div>
            </div>

            <div>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20 ${
                  errors.email ? "border-red-500" : "border-gray-300"
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
                  onChange={handleChange}
                  placeholder="Password"
                  className={`w-full rounded-lg border px-4 py-3 pr-16 text-sm text-gray-900 outline-none transition focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#0A66C2]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password ? (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              ) : null}

              <div className="mt-3">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-gray-500">Password strength</span>
                  <span className="font-medium text-gray-700">
                    {formData.password ? passwordStrength.label : "Not set"}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={`h-full rounded-full transition-all ${passwordStrength.color} ${
                      formData.password ? passwordStrength.width : "w-0"
                    }`}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[#0A66C2] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#004182]"
            >
              Agree & Join
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already on LinkedIn?{" "}
            <Link to="/" className="font-semibold text-[#0A66C2] hover:underline">
              Sign in
            </Link>
          </p>

          <p className="text-center text-xs leading-5 text-gray-500">
            By clicking Agree &amp; Join, you agree to the LinkedIn User Agreement,
            Privacy Policy, and Cookie Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
