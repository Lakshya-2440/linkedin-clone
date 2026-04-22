import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { NotificationProvider } from './contexts/NotificationContext';
import { DarkModeProvider } from "./contexts/DarkModeContext.jsx";

createRoot(document.getElementById('root')).render(
  <DarkModeProvider>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </DarkModeProvider>
);
