import { useNavigate } from "react-router-dom";
import { Plus, Film, List, TrendingUp, Clock, Star } from "lucide-react";
import NavbarAdmin from "../../components/NavbarAdmin";

export default function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Anime", value: "2", icon: Film, color: "from-cyan-400 to-blue-500" },
    { label: "Total Episodes", value: "15", icon: List, color: "from-blue-400 to-purple-500" },
    { label: "Total Views", value: "1.2K", icon: TrendingUp, color: "from-purple-400 to-pink-500" },
  ];

  const quickActions = [
    {
      title: "Add Anime",
      description: "Tambah anime baru ke database",
      icon: Plus,
      color: "from-cyan-500/20 to-blue-500/20",
      borderColor: "border-cyan-400/50",
      hoverColor: "hover:border-cyan-400",
      path: "/admin/add-anime",
    },
    {
      title: "Add Episode",
      description: "Tambah episode ke anime yang ada",
      icon: Film,
      color: "from-blue-500/20 to-purple-500/20",
      borderColor: "border-blue-400/50",
      hoverColor: "hover:border-blue-400",
      path: "/admin/add-episode",
    },
    {
      title: "Manage Anime",
      description: "Edit atau hapus anime",
      icon: List,
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-400/50",
      hoverColor: "hover:border-purple-400",
      path: "/admin/manage-anime",
    },
  ];

  const recentActivity = [
    {
      action: "Arcane Episode 9 added",
      time: "2 hours ago",
      color: "bg-green-400",
      animate: true,
    },
    {
      action: "Koimonogatari updated",
      time: "5 hours ago",
      color: "bg-blue-400",
      animate: false,
    },
    {
      action: "New anime added",
      time: "1 day ago",
      color: "bg-cyan-400",
      animate: false,
    },
    {
      action: "Episode 8 uploaded",
      time: "2 days ago",
      color: "bg-purple-400",
      animate: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navbar Admin */}
      <NavbarAdmin />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-gray-400">Selamat datang di admin panel Kitsuvibe</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 transform cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`bg-gradient-to-br ${stat.color} rounded-lg p-3 shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
            <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => navigate(action.path)}
                className={`group bg-gradient-to-br ${action.color} backdrop-blur-sm rounded-xl p-6 border ${action.borderColor} ${action.hoverColor} transition-all duration-300 text-left hover:scale-105 transform`}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 rounded-lg p-3 group-hover:bg-white/20 transition-all duration-300 shadow-lg">
                    <action.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-400">{action.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full" />
            <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-4 ${
                    idx !== recentActivity.length - 1 ? "pb-4 border-b border-white/10" : ""
                  }`}
                >
                  <div
                    className={`w-2 h-2 ${activity.color} rounded-full ${
                      activity.animate ? "animate-pulse" : ""
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                onClick={() => navigate("/admin/activity")}
                className="w-full text-center text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
              >
                View All Activity →
              </button>
            </div>
          </div>
        </div>

        {/* Latest Anime Section (Optional) */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
            <h2 className="text-2xl font-bold text-white">Latest Anime</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Anime Card 1 */}
            <div className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 transform cursor-pointer">
              <div className="aspect-[3/4] bg-gradient-to-br from-cyan-500/20 to-blue-500/20 relative overflow-hidden">
                <img
                  src="/thumbnail/cover/koimonogatari.jpg"
                  alt="Koimonogatari"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-cyan-400/90 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  8.5
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-cyan-400 transition-colors">
                  Koimonogatari
                </h3>
                <p className="text-xs text-gray-400">6 Episodes</p>
              </div>
            </div>

            {/* Anime Card 2 */}
            <div className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 transform cursor-pointer">
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-500/20 to-purple-500/20 relative overflow-hidden">
                <img
                  src="/thumbnail/cover/arcane.jpg"
                  alt="Arcane"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-blue-400/90 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  9.0
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-cyan-400 transition-colors">
                  Arcane
                </h3>
                <p className="text-xs text-gray-400">9 Episodes</p>
              </div>
            </div>

            {/* Add More Placeholder */}
            <div
              onClick={() => navigate("/admin/add-anime")}
              className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-dashed border-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 transform cursor-pointer flex items-center justify-center aspect-[3/4]"
            >
              <div className="text-center">
                <Plus className="w-12 h-12 text-gray-400 group-hover:text-cyan-400 transition-colors mx-auto mb-2" />
                <p className="text-gray-400 group-hover:text-cyan-400 transition-colors text-sm font-medium">
                  Add Anime
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}