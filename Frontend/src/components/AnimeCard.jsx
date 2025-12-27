import { Play } from "lucide-react";

export default function AnimeCard({ title, thumbnail, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-xl animate-pulse" />
            
            {/* Play Button */}
            <div className="relative bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full p-4 transform transition-transform duration-300 group-hover:scale-110">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="p-4 bg-[#f7f7f7]">
        <h2 className="text-black font-semibold text-center line-clamp-2 group-hover:text-cyan-500 transition-colors duration-300">
          {title}
        </h2>
      </div>
    </div>
  );
}