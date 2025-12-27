import { useParams, useNavigate } from "react-router-dom";
import { Play, Calendar, Clock, Tv, Film, Star } from "lucide-react";

const animeList = [
  {
    id: 1,
    title: "Koimonogatari",
    cover: "/thumbnail/cover/koimonogatari.jpg",
    genre: ["Mystery", "Romance", "Supernatural"],
    status: "Completed",
    rilis: "Dec 2013",
    jenis: "Serial TV",
    totalEpisodes: 6,
    durasi: "24 Menit / Episode",
    studio: "Shaft",
    musim: "Fall 2013",
    rating: "8.5",
    description:
      "Bagian dari Monogatari Series Second Season, Koimonogatari (Love Tale) mengikuti kisah Hitagi Senjougahara yang meminta bantuan penipu Deishuu Kaiki untuk menyelamatkan Koyomi Araragi dari ancaman maut.",
    episodes: [
      { id: 1, title: "Hitagi End - Part 1", video_url: "https://drive.google.com/file/d/1YGQT2RAMA2KpHrK7WvA5DHROGqCoF5F_/preview", thumbnail: "/thumbnail/cover_ep/koimonogatari_ep.jpg" },
      { id: 2, title: "Hitagi End - Part 2", video_url: "https://drive.google.com/file/d/1I2RR4Re_S8a2R7h5mj3ai8g3GUsToFo8/preview", thumbnail: "/thumbnail/cover_ep/koimonogatari_ep.jpg" },
      { id: 3, title: "Hitagi End - Part 3", video_url: "https://drive.google.com/file/d/1BuFS02Lg8O3EykanZXqwByDNTZksFBkZ/preview", thumbnail: "/thumbnail/cover_ep/koimonogatari_ep.jpg" },
      { id: 4, title: "Hitagi End - Part 4", video_url: "https://drive.google.com/file/d/1UdHHaoLHoCwzYeKF2mG0XYC2yVmy7Fq2/preview", thumbnail: "/thumbnail/cover_ep/koimonogatari_ep.jpg" },
      { id: 5, title: "Hitagi End - Part 5", video_url: "https://drive.google.com/file/d/1FLu8ESF7Pe9kbAo9dMHC03Nf2ynodAMF/preview", thumbnail: "/thumbnail/cover_ep/koimonogatari_ep.jpg" },
      { id: 6, title: "Hitagi End - Part 6", video_url: "https://drive.google.com/file/d/19pWMXGIWaAWTOMSS7Yc2m8jbXbf3-N0O/preview", thumbnail: "/thumbnail/cover_ep/koimonogatari_ep.jpg" },
    ],
  },
  {
    id: 2,
    title: "Arcane",
    cover: "/thumbnail/cover/arcane.jpg",
    genre: ["Action", "Adventure", "Drama", "Fantasy", "Sci-Fi"],
    status: "Completed",
    rilis: "Nov 6, 2021",
    jenis: "Serial TV",
    totalEpisodes: 6,
    durasi: "40 Menit / Episode",
    studio: "Fortiche Production",
    musim: "Fall 2021",
    rating: "9.0",
    description:
      "Berlatar di kota kembar Piltover dan Zaun, Arcane mengisahkan dua saudari Vi dan Powder (Jinx) yang terpisah di tengah konflik antara teknologi magis dan keyakinan yang bertentangan. Serial animasi yang memukau ini mengeksplorasi tema keluarga, ambisi, dan konsekuensi dari kemajuan teknologi di dunia yang penuh dengan pertentangan kelas sosial.",
    episodes: [
      { id: 1, title: "Welcome to the Playground", video_url: "https://drive.google.com/file/d/1fjN53x7rwqLBHojF8tw-6VRO4gOzjQyN/preview", thumbnail: "/thumbnail/cover_ep/arcane_ep.jpg" },
      { id: 2, title: "Some Mysteries Are Better Left Unsolved", video_url: "https://drive.google.com/file/d/1bOhnugnM_BLL6VazfLCbdEZBh91GZaLM/preview", thumbnail: "/thumbnail/cover_ep/arcane_ep.jpg" },
      { id: 3, title: "The Base Violence Necessary for Change", video_url: "https://drive.google.com/file/d/1ylqb7q8jc0ToMsq7EAywRzPEG_NB3AkG/preview", thumbnail: "/thumbnail/cover_ep/arcane_ep.jpg" },
      { id: 4, title: "Happy Progress Day!", video_url: "https://drive.google.com/file/d/1jWmXx3559PXL03WVDVt41gdBSE2uxD9G/preview", thumbnail: "/thumbnail/cover_ep/arcane_ep.jpg" },
      { id: 5, title: "Everybody Wants to Be My Enemy", video_url: "https://drive.google.com/file/d/1Q7LLZUhE-ao4KYoyEbPCR1BltJ4qxXK_/preview", thumbnail: "/thumbnail/cover_ep/arcane_ep.jpg" },
      { id: 6, title: "When These Walls Come Tumbling Down", video_url: "https://drive.google.com/file/d/1hXHXtHIHNVOQFRTKSgjK2ru19K5hXB7l/preview", thumbnail: "/thumbnail/cover_ep/arcane_ep.jpg" },
    ],
  },
];

export default function AnimeDetail() {
  const { animeId } = useParams();
  const navigate = useNavigate();

  const anime = animeList.find((a) => a.id === Number(animeId));

  if (!anime) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-white mb-4">Anime tidak ditemukan</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-cyan-400 text-black px-6 py-2 rounded-lg hover:bg-cyan-300 transition-all duration-300"
          >
            ← Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section with Background */}
      <div className="relative">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
          style={{ backgroundImage: `url(${anime.cover})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/80 to-gray-900" />
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="mb-8 group flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-5 py-2.5 rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300 transform hover:scale-105"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
          </button>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            {/* Poster */}
            <div className="lg:col-span-1">
              <div className="relative group">
                <img
                  src={anime.cover}
                  alt={anime.title}
                  className="w-full rounded-2xl shadow-2xl object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title & Rating */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 animate-slide-in leading-tight">
                  {anime.title}
                </h1>
                
                {/* Rating & Status */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-yellow-400">{anime.rating || "N/A"}</span>
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg font-semibold backdrop-blur-sm">
                    {anime.status}
                  </span>
                </div>
              </div>

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2">
                {anime.genre.map((g, idx) => (
                  <span
                    key={idx}
                    className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium hover:bg-cyan-400/40 hover:text-cyan-200 transition-all duration-300 cursor-default"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard icon={<Calendar className="w-5 h-5 text-cyan-400" />} label="Rilis" value={anime.rilis} />
                <InfoCard icon={<Tv className="w-5 h-5 text-cyan-400" />} label="Jenis" value={anime.jenis} />
                <InfoCard icon={<Film className="w-5 h-5 text-cyan-400" />} label="Episode" value={anime.totalEpisodes} />
                <InfoCard icon={<Clock className="w-5 h-5 text-cyan-400" />} label="Durasi" value={anime.durasi} />
                <InfoCard icon={<Film className="w-5 h-5 text-cyan-400" />} label="Studio" value={anime.studio} />
                <InfoCard icon={<Calendar className="w-5 h-5 text-cyan-400" />} label="Musim" value={anime.musim} />
              </div>

              {/* Description */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-yellow-400/30 transition-all duration-300">
                <h2 className="text-2xl font-bold mb-3 text-cyan-400">Sinopsis</h2>
                <p className="text-gray-300 leading-relaxed">{anime.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Daftar Episode</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#f7f7f7] to-cyan-400 rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {anime.episodes.map((ep, idx) => (
            <div
              key={ep.id}
              className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/20 border border-white/10 hover:border-cyan-400/50"
              onClick={() => navigate(`/anime/${anime.id}/episode/${ep.id}`)}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gray-800 overflow-hidden">
                <img
                  src={ep.thumbnail}
                  alt={ep.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = anime.cover;
                  }}
                />
                
                {/* Play Icon Overlay */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="bg-cyan-400 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                </div>

                {/* Episode Number Badge */}
                <div className="absolute top-2 left-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-semibold">
                  EP {ep.id}
                </div>
              </div>

              {/* Episode Title */}
              <div className="p-3 bg-black/40">
                <h3 className="font-semibold text-sm text-center text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {ep.title}
                </h3>
              </div>
            </div>
          ))}
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

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

// Info Card Component
function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-yellow-400/30 hover:bg-white/10 transition-all duration-300 group">
      <div className="flex items-center gap-3">
        <div className="text-yellow-400 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-0.5">{label}</p>
          <p className="font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}