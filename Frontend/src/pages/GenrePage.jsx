import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Play, Clock, Filter } from "lucide-react";

export default function GenrePage() {
  const { genre } = useParams();
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnimesByGenre();
  }, [genre]);

  const fetchAnimesByGenre = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/anime");
      
      // Filter anime by genre (case insensitive)
      const filtered = res.data.filter((anime) => {
        if (!anime.genre) return false;
        const genres = anime.genre.toLowerCase().split(",").map(g => g.trim());
        return genres.includes(genre.toLowerCase());
      });
      
      setAnimes(filtered);
    } catch (err) {
      console.error("Fetch anime error:", err);
      setError("Gagal memuat anime");
    } finally {
      setLoading(false);
    }
  };

  const capitalizeGenre = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
        <div className="text-center text-red-400">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-8 h-8 text-cyan-400" />
              <h1 className="text-4xl sm:text-5xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Genre: {capitalizeGenre(genre)}
                </span>
              </h1>
            </div>
            <p className="text-gray-400 text-lg">
              {animes.length} anime ditemukan dalam genre ini
            </p>
          </div>

          {/* Anime Grid */}
          {animes.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-block p-6 bg-white/5 rounded-xl border border-white/10">
                <Filter className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-2">
                  Belum ada anime dengan genre "{capitalizeGenre(genre)}"
                </p>
                <Link
                  to="/anime"
                  className="inline-block mt-4 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Lihat semua anime →
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {animes.map((anime) => (
                <Link
                  key={anime.id}
                  to={`/anime/${anime.id}`}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={anime.thumbnail || "/placeholder-anime.jpg"}
                      alt={anime.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "/placeholder-anime.jpg";
                      }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 text-cyan-400 mb-2">
                          <Play className="w-5 h-5" />
                          <span className="text-sm font-semibold">Tonton Sekarang</span>
                        </div>
                      </div>
                    </div>

                    {/* Episode Count Badge */}
                    {anime.total_episodes > 0 && (
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span className="text-xs font-semibold text-white">
                          {anime.total_episodes} Eps
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors">
                      {anime.title}
                    </h3>
                    
                    {/* Genre Tags */}
                    {anime.genre && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {anime.genre.split(",").slice(0, 3).map((g, idx) => (
                          <span
                            key={idx}
                            className={`text-xs px-2 py-1 rounded-full border ${
                              g.trim().toLowerCase() === genre.toLowerCase()
                                ? "bg-cyan-400/20 text-cyan-400 border-cyan-400/40"
                                : "bg-cyan-400/10 text-cyan-400 border-cyan-400/20"
                            }`}
                          >
                            {g.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-sm text-gray-400 line-clamp-2">
                      {anime.description || "Tidak ada deskripsi"}
                    </p>
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