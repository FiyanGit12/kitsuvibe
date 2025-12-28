import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Play, Clock, TrendingUp } from "lucide-react";

export default function AnimePage() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnimes();
  }, []);

  const fetchAnimes = async () => {
    setLoading(true);
    setError("");
    try {
      // ✅ FIXED: Pakai /api prefix
      const res = await axios.get("/api/anime");
      setAnimes(res.data);
    } catch (err) {
      console.error("Fetch anime error:", err);
      setError("Gagal memuat anime");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading anime...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button 
            onClick={fetchAnimes}
            className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full mb-4">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">Koleksi Lengkap</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Semua Anime
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Jelajahi koleksi anime terbaik dengan kualitas streaming HD
            </p>
          </div>

          {/* Anime Grid */}
          {animes.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-block p-8 bg-white/5 rounded-2xl border border-white/10">
                <Play className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Belum ada anime tersedia</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {animes.map((anime) => (
                <Link
                  key={anime.id}
                  to={`/anime/${anime.id}`}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-800">
                    <img
                      src={anime.thumbnail || "/placeholder-anime.jpg"}
                      alt={anime.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { e.target.src = "/placeholder-anime.jpg"; }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 text-cyan-400">
                          <Play className="w-5 h-5" />
                          <span className="text-sm font-semibold">Tonton</span>
                        </div>
                      </div>
                    </div>

                    {/* Episode Badge */}
                    {anime.totalEpisodes > 0 && (
                      <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span className="text-xs font-bold text-white">
                          {anime.totalEpisodes}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="font-bold text-sm mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors min-h-[2.5rem]">
                      {anime.title}
                    </h3>
                    
                    {/* Genre Tags */}
                    {anime.genre && (
                      <div className="flex flex-wrap gap-1">
                        {anime.genre.split(",").slice(0, 2).map((g, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-0.5 bg-cyan-400/10 text-cyan-400 rounded-full border border-cyan-400/20"
                          >
                            {g.trim()}
                          </span>
                        ))}
                        {anime.genre.split(",").length > 2 && (
                          <span className="text-xs px-2 py-0.5 bg-gray-700 text-gray-400 rounded-full">
                            +{anime.genre.split(",").length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}