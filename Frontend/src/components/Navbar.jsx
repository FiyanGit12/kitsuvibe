import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";
import { Menu, X, LogOut, Search, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Clear search after submit
      setOpen(false); // Close mobile menu
    }
  };

  const genres = [
    "Action",
    "Adventure", 
    "Drama",
    "Fantasy",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Supernatural"
  ];

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Anime", path: "/anime" },
  ];

  return (
    <nav className="bg-[#0a0e27]/95 backdrop-blur-md border-b border-white/10 text-white px-4 sm:px-6 py-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <img 
              src="/logo/kitsuvibe.png" 
              alt="Kitsuvibe Logo" 
              className="w-7 h-7 sm:w-10 sm:h-7 object-contain"
            />
            <div className="text-xl sm:text-2xl font-bold tracking-tight whitespace-nowrap">
              <span className="text-cyan-400">Kitsu</span>
              <span className="text-white">vibe</span>
            </div>
          </Link>

          {/* Desktop Menu - Centered */}
          <div className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium whitespace-nowrap"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              
              {/* Desktop Genre Dropdown */}
              <li className="relative">
                <button
                  onClick={() => setGenreOpen(!genreOpen)}
                  className="flex items-center gap-1 text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium whitespace-nowrap"
                >
                  Genre
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${genreOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Desktop Dropdown Menu */}
                {genreOpen && (
                  <div className="absolute top-full mt-2 left-0 bg-[#0a0e27]/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl py-2 min-w-[200px] animate-fade-in">
                    {genres.map((genre, idx) => (
                      <Link
                        key={idx}
                        to={`/genre/${genre.toLowerCase()}`}
                        onClick={() => setGenreOpen(false)}
                        className="block px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-colors duration-200"
                      >
                        {genre}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* Search & Auth Area */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            {/* Search Box - Desktop */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari anime..."
                className="w-48 xl:w-64 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg pl-4 pr-11 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="bg-transparent border border-cyan-400/50 text-cyan-400 px-6 py-2 rounded-lg font-medium hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 whitespace-nowrap"
              >
                Login
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/10">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {user?.username?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">
                      {user?.username || "User"}
                    </span>
                    <span className="text-xs text-gray-400">{user?.role || "user"}</span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-transparent border border-red-400/50 text-red-400 px-3 py-2 rounded-lg hover:bg-red-400/10 hover:border-red-400 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium hidden xl:inline">Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white hover:text-cyan-400 transition-colors duration-300 ml-4"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/10 animate-fade-in max-h-[calc(100vh-80px)] overflow-y-auto">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari anime..."
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg pl-4 pr-11 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            <ul className="space-y-3">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="block text-gray-300 hover:text-cyan-400 hover:bg-white/5 px-4 py-2 rounded-lg transition-all duration-300"
                    onClick={() => setOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              
              {/* Mobile Genre - Grid Layout */}
              <li>
                <button
                  onClick={() => setGenreOpen(!genreOpen)}
                  className="w-full flex items-center justify-between text-gray-300 hover:text-cyan-400 hover:bg-white/5 px-4 py-2 rounded-lg transition-all duration-300"
                >
                  Genre
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${genreOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {genreOpen && (
                  <div className="mt-3 px-2">
                    <div className="grid grid-cols-2 gap-2">
                      {genres.map((genre, idx) => (
                        <Link
                          key={idx}
                          to={`/genre/${genre.toLowerCase()}`}
                          onClick={() => {
                            setGenreOpen(false);
                            setOpen(false);
                          }}
                          className="block text-center text-sm text-gray-300 hover:text-cyan-400 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg border border-white/10 hover:border-cyan-400/50 transition-all duration-200"
                        >
                          {genre}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            </ul>

            {/* Mobile Auth */}
            <div className="mt-4 pt-4 border-t border-white/10">
              {!user ? (
                <button
                  onClick={() => {
                    navigate("/login");
                    setOpen(false);
                  }}
                  className="w-full bg-transparent border border-cyan-400/50 text-cyan-400 px-6 py-3 rounded-lg font-medium hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300"
                >
                  Login
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/10">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {user?.username?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">
                        {user?.username || "User"}
                      </span>
                      <span className="text-xs text-gray-400">{user?.role || "user"}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-transparent border border-red-400/50 text-red-400 px-4 py-3 rounded-lg hover:bg-red-400/10 hover:border-red-400 transition-all duration-300"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Inline Styles for Animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .overflow-y-auto::-webkit-scrollbar {
          width: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.2);
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.4);
        }

        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: rgba(34, 211, 238, 0.2) transparent;
        }

        @media (hover: none) {
          .overflow-y-auto {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          
          .overflow-y-auto::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}
