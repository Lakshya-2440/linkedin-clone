import { BrowserRouter, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { ToastProvider } from "./contexts/ToastContext";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

function AppLayout() {
  const location = useLocation();
  const hideNavbar = ["/", "/signup"].includes(location.pathname);
  return (
    <div className="min-h-screen bg-[var(--li-bg)] text-[var(--li-text)]">
      {!hideNavbar && <Navbar />}
      <main className="pb-20 md:pb-0">
        <AppRoutes />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <ToastProvider>
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </ToastProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}
