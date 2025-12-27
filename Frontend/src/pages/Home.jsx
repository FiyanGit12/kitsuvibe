import { useNavigate } from "react-router-dom";
import AnimeCard from "../components/AnimeCard";

export default function Home() {
  const navigate = useNavigate();

  const animeList = [
    {
      id: 1,
      title: "Koimonogatari",
      thumbnail: "/thumbnail/cover/koimonogatari.jpg",
    },
    {
     id: 2,
     title: "Arcane",
     thumbnail: "/thumbnail/cover/arcane.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-[#1a1f3a] to-transparent pt-16 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 animate-fade-in">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Kitsuvibe
                </span>
              </h1>
              <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
                Irasshaimase - いらっしゃいませ! Selamat datang di Kitsuvibe, destinasi utama Anda untuk streaming anime favorit dengan kualitas terbaik dan pengalaman menonton yang tak tertandingi.
              </p>
              <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full mx-auto" />
            </div>
          </div>
        </div>

        {/* Trending Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
            <h2 className="text-3xl font-bold text-white">Trending Now</h2>
          </div>

          {/* Anime Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {animeList.map((anime, index) => (
              <div
                key={anime.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AnimeCard
                  title={anime.title}
                  thumbnail={anime.thumbnail}
                  onClick={() => navigate(`/anime/${anime.id}`)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full" />
            <h2 className="text-3xl font-bold text-white">Kategori Populer</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {['Action', 'Romance', 'Fantasy', 'Comedy'].map((category, idx) => (
              <div
                key={category}
                className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl p-6 cursor-pointer border border-white/10 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-cyan-400/0 group-hover:from-cyan-400/10 group-hover:to-blue-400/10 transition-all duration-300" />
                <h3 className="relative text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300 text-center">
                  {category}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inline Styles for Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }

        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}