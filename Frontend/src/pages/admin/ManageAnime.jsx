import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Trash2, Eye } from "lucide-react";

export default function ManageAnime() {
  const navigate = useNavigate();

  // Dummy data - nanti diganti dengan fetch dari database
  const [animeList, setAnimeList] = useState([
    {
      id: 1,
      title: "Koimonogatari",
      cover: "/thumbnail/cover/koimonogatari.jpg",
      genre: ["Mystery", "Romance", "Supernatural"],
      totalEpisodes: 6,
      status: "Selesai ✓",
      rating: "8.5",
    },
    {
      id: 2,
      title: "Arcane",
      cover: "/thumbnail/cover/arcane.jpg",
      genre: ["Action", "Adventure", "Drama"],
      totalEpisodes: 9,
      status: "Season 1 Selesai ✓",
      rating: "9.0",
    },
  ]);

  const handleDelete = (id, title) => {
    if (window.confirm(`Yakin ingin menghapus "${title}"?`)) {
      // TODO: Hapus dari database
      setAnimeList(prev => prev.filter(anime => anime.id !== id));
      alert("✅ Anime berhasil dihapus!");
    }
  };

  const handleEdit = (id) => {
    // TODO: Navigate ke halaman edit dengan data anime
    alert(`Edit anime ID: ${id} (fitur coming soon)`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            Manage Anime
          </h1>
          <p className="text-gray-400">Edit atau hapus anime dari database</p>
        </div>

        {/* Anime List */}
        <div className="grid grid-cols-1 gap-6">
          {animeList.map((anime) => (
            <div
              key={anime.id}
              className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Cover Image */}
                <img
                  src={anime.cover}
                  alt={anime.title}
                  className="w-full md:w-48 h-64 object-cover rounded-lg"
                />

                {/* Info */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">{anime.title}</h2>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {anime.genre.map((g, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 rounded-full text-xs font-medium"
                      >
                        {g}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm text-gray-400 mb-4">
                    <p><span className="text-white font-medium">Total Episodes:</span> {anime.totalEpisodes}</p>
                    <p><span className="text-white font-medium">Status:</span> {anime.status}</p>
                    <p><span className="text-white font-medium">Rating:</span> ⭐ {anime.rating}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => navigate(`/anime/${anime.id}`)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/50 text-blue-400 rounded-lg hover:bg-blue-500/30 hover:border-blue-400 transition-all duration-300"
                    >
                      <Eye className="w-4 h-4" />
                      Lihat
                    </button>

                    <button
                      onClick={() => handleEdit(anime.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 rounded-lg hover:bg-cyan-500/30 hover:border-cyan-400 transition-all duration-300"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(anime.id, anime.title)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-400/50 text-red-400 rounded-lg hover:bg-red-500/30 hover:border-red-400 transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {animeList.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">Belum ada anime</p>
            <button
              onClick={() => navigate("/admin/add-anime")}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
            >
              Tambah Anime Pertama
            </button>
          </div>
        )}
      </div>
    </div>
  );
}