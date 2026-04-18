import { BrowserRouter, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

function AppLayout() {
  const location = useLocation();
  const hideNavbar = ["/", "/signup"].includes(location.pathname);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {!hideNavbar && <Navbar />}
      <main className="pt-4">
        <AppRoutes />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </ProfileProvider>
    </AuthProvider>
  );
}
