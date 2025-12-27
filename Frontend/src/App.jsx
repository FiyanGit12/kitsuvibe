import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AnimePage from "./pages/AnimePage";
import GenrePage from "./pages/GenrePage";
import AnimeDetail from "./pages/AnimeDetail";
import EpisodePlayer from "./pages/EpisodePlayer";

import Dashboard from "./pages/admin/Dashboard";
import Addanime from "./pages/admin/Addanime";
import Addepisode from "./pages/admin/Addepisode";
import ManageAnime from "./pages/admin/ManageAnime";

import AdminRoute from "./utils/AdminRoute";

function AppContent() {
  const location = useLocation();
  
  // Cek apakah di halaman admin atau login
  const isAdminPage = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/login';
  
  return (
    <>
      {/* Render Navbar default HANYA kalau bukan admin/login */}
      {!isAdminPage && !isLoginPage && <Navbar />}
      
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/anime" element={<AnimePage />} />
        <Route path="/genre/:genre" element={<GenrePage />} />
        <Route path="/anime/:animeId" element={<AnimeDetail />} />
        <Route path="/anime/:animeId/episode/:episodeId" element={<EpisodePlayer />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-anime"
          element={
            <AdminRoute>
              <Addanime />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-episode"
          element={
            <AdminRoute>
              <Addepisode />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/manage-anime"
          element={
            <AdminRoute>
              <ManageAnime />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}