import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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

    navigate("/feed");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.08)] sm:p-10">
        <div className="space-y-6">
          <LinkedInLogo />

          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Sign in</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Stay updated on your professional world.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full rounded-lg border bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 outline-none transition focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20 ${
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
                  className={`w-full rounded-lg border bg-white dark:bg-gray-900 px-4 py-3 pr-16 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 outline-none transition focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20 ${
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
            </div>

            <div className="text-left">
              <a href="#" className="text-sm font-semibold text-[#0A66C2] hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[#0A66C2] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#004182]"
            >
              Sign in
            </button>
          </form>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="space-y-3">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <span className="text-base font-semibold text-[#4285F4]">G</span>
              Continue with Google
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <span className="text-base font-semibold text-black">Apple</span>
              Continue with Apple
            </button>
          </div>

          <p className="text-center text-sm text-gray-600">
            New to LinkedIn?{" "}
            <Link to="/signup" className="font-semibold text-[#0A66C2] hover:underline">
              Join now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
