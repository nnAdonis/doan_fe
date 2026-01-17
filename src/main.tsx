import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './index.css'
import App from './App.tsx'
<<<<<<< HEAD
import { AuthProvider } from "./context/AuthContext";
=======
import "./styles/theme.css";

>>>>>>> cf5ba06b20dd0d61f05f58f277b47e5dcc5a2359

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
          <App />
      </AuthProvider>
  </StrictMode>,
)
