import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Home } from "lucide-react";

const animeList = [
  {
    id: 1,
    title: "Koimonogatari",
    cover: "/thumbnail/cover/koimonogatari.jpg",
    genre: ["Mystery", "Romance", "Supernatural"],
    status: "Selesai ✓",
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
    status: "Season 1 Selesai ✓",
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

export default function EpisodePlayer() {
  const { animeId, episodeId } = useParams();
  const navigate = useNavigate();

  const anime = animeList.find((a) => a.id === Number(animeId));
  const episode = anime?.episodes.find((e) => e.id === Number(episodeId));

  if (!anime || !episode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="text-6xl">😢</div>
          <h2 className="text-3xl font-bold text-red-400 mb-2">Episode Tidak Ditemukan</h2>
          <p className="text-gray-400 mb-6">Episode yang kamu cari tidak tersedia</p>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-transparent border border-cyan-400/50 text-cyan-400 px-6 py-3 rounded-lg hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 mx-auto"
          >
            <Home className="w-4 h-4" />
            Kembali ke Home
          </button>
        </div>
      </div>
    );
  }

  const handlePrevEpisode = () => {
    if (episode.id > 1) {
      navigate(`/anime/${animeId}/episode/${episode.id - 1}`);
    }
  };

  const handleNextEpisode = () => {
    if (episode.id < anime.episodes.length) {
      navigate(`/anime/${animeId}/episode/${episode.id + 1}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <div className="relative z-10 bg-[#0a0e27]/80 backdrop-blur-md border-b border-white/10 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/anime/${animeId}`)}
              className="flex items-center gap-2 bg-transparent border border-cyan-400/50 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 bg-transparent border border-white/20 text-gray-400 px-4 py-2 rounded-lg hover:bg-white/5 hover:border-white/40 hover:text-white transition-all duration-300"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </button>
          </div>

          <div className="text-right">
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {anime.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-400">{episode.title}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Video Player */}
        <div className="bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-6">
          <iframe
            key={episode.video_url}
            src={episode.video_url}
            className="w-full aspect-video bg-black"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={episode.title}
          />
        </div>

        {/* Navigasi Episode */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <button
            onClick={handlePrevEpisode}
            disabled={episode.id === 1}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg transition-all duration-300 ${
              episode.id === 1
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 text-cyan-400 hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Episode Sebelumnya</span>
          </button>

          <button
            onClick={handleNextEpisode}
            disabled={episode.id === anime.episodes.length}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg transition-all duration-300 ${
              episode.id === anime.episodes.length
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 text-cyan-400 hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400'
            }`}
          >
            <span className="hidden sm:inline">Episode Selanjutnya</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>

        {/* Episode Info */}
        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl p-4 shadow-lg flex-shrink-0">
              <Play className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{episode.title}</h2>
              <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 mb-3">
                <span>Episode {episode.id} dari {anime.totalEpisodes}</span>
                <span className="hidden sm:inline">•</span>
                <span>{anime.durasi}</span>
                <span className="hidden sm:inline">•</span>
                <span>{anime.studio}</span>
              </div>
              <p className="text-sm sm:text-base text-gray-300">{anime.description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {anime.genre.map((g, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 rounded-full text-xs font-medium"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Episode List */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
            <h3 className="text-xl sm:text-2xl font-bold text-white">Semua Episode</h3>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
            {anime.episodes.map((ep) => (
              <button
                key={ep.id}
                onClick={() => navigate(`/anime/${animeId}/episode/${ep.id}`)}
                className={`group relative bg-gradient-to-br rounded-xl p-4 sm:p-5 border transition-all duration-300 transform hover:scale-105 ${
                  ep.id === episode.id
                    ? "from-cyan-500/20 to-blue-500/20 border-cyan-400 shadow-lg shadow-cyan-400/20"
                    : "from-white/5 to-white/10 border-white/10 hover:border-cyan-400/50"
                }`}
              >
                <div className="text-center">
                  <div
                    className={`text-2xl sm:text-4xl font-bold mb-1 sm:mb-2 transition-all duration-300 ${
                      ep.id === episode.id ? "text-cyan-400" : "text-white/60 group-hover:text-cyan-400"
                    }`}
                  >
                    {ep.id}
                  </div>
                  <p
                    className={`text-xs line-clamp-2 transition-colors duration-300 ${
                      ep.id === episode.id ? "text-cyan-300 font-medium" : "text-gray-400 group-hover:text-cyan-300"
                    }`}
                  >
                    {ep.title}
                  </p>
                </div>

                {ep.id === episode.id && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}