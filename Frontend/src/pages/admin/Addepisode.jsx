import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";

export default function AddEpisode() {
  const navigate = useNavigate();
  
  // Dummy anime list - nanti diganti dengan fetch dari database
  const animeList = [
    { id: 1, title: "Koimonogatari" },
    { id: 2, title: "Arcane" },
  ];

  const [formData, setFormData] = useState({
    anime_id: "",
    episode_number: "",
    title: "",
    video_url: "",
    thumbnail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // TODO: Kirim ke backend/database
    console.log("Data episode baru:", formData);
    
    // Simulasi success
    alert("✅ Episode berhasil ditambahkan!");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Dashboard
          </button>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Tambah Episode Baru
          </h1>
          <p className="text-gray-400">Tambahkan episode untuk anime yang sudah ada</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            
            {/* Select Anime */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Pilih Anime *
              </label>
              <select
                name="anime_id"
                value={formData.anime_id}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors duration-300"
              >
                <option value="">-- Pilih Anime --</option>
                {animeList.map(anime => (
                  <option key={anime.id} value={anime.id}>
                    {anime.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Episode Number */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nomor Episode *
              </label>
              <input
                type="number"
                name="episode_number"
                value={formData.episode_number}
                onChange={handleChange}
                required
                min="1"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                placeholder="1"
              />
            </div>

            {/* Episode Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Judul Episode *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                placeholder="Contoh: Welcome to the Playground"
              />
            </div>

            {/* Video URL */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Video Path *
              </label>
              <input
                type="text"
                name="video_url"
                value={formData.video_url}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                placeholder="videos/NamaAnime/ep1.mp4"
              />
              <p className="text-xs text-gray-500 mt-2">
                Upload video ke folder public/videos/ terlebih dahulu
              </p>
            </div>

            {/* Thumbnail */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Thumbnail Path *
              </label>
              <input
                type="text"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                placeholder="/thumbnail/cover_ep/nama-anime_ep.jpg"
              />
              <p className="text-xs text-gray-500 mt-2">
                Upload thumbnail ke folder public/thumbnail/cover_ep/
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Tambah Episode
              </button>
              
              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                Batal
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}