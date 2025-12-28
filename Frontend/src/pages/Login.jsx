import { useState } from "react";
import axios from "axios";
import { loginUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { User, Lock, LogIn, AlertCircle, Home } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ✅ FIXED: Pakai /api prefix
      const res = await axios.post("/api/auth/login", {
        username,
        password,
      });

      // Simpan user ke localStorage
      loginUser(res.data);

      // Navigate berdasarkan role
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login gagal. Cek username dan password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl font-bold py-6 mb-3">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Kitsuvibe
            </span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full mx-auto mb-3" />
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl animate-slide-up">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-start gap-3 animate-shake">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-300" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  placeholder="Masukkan username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-300" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  placeholder="Masukkan password"
                />
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer" />
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
              </label>
              <button
                type="button"
                className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                onClick={() => alert("Hubungi admin untuk reset password")}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:from-cyan-600 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Login
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gradient-to-r from-transparent via-gray-800/80 to-transparent text-gray-400">atau</span>
            </div>
          </div>

          {/* Back to Home */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full bg-white/5 border border-white/10 text-gray-300 py-3 rounded-lg font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Kembali ke Home
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">© 2025 Kitsuvibe. All rights reserved.</p>

        {/* Demo Credentials */}
        <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-center">
          <p className="text-yellow-400 text-sm font-medium mb-2">Demo Credentials:</p>
          <div className="space-y-1 text-xs text-yellow-300/80">
            <p>Admin - Username: <span className="font-semibold">admin</span> | Password: <span className="font-semibold">admin123</span></p>
            <p>User - Username: <span className="font-semibold">user1</span> | Password: <span className="font-semibold">user123</span></p>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fade-in { from {opacity:0; transform:translateY(-20px);} to {opacity:1; transform:translateY(0);} }
        @keyframes slide-up { from {opacity:0; transform:translateY(40px);} to {opacity:1; transform:translateY(0);} }
        @keyframes shake { 0%,100%{transform:translateX(0);}10%,30%,50%,70%,90%{transform:translateX(-5px);}20%,40%,60%,80%{transform:translateX(5px);} }

        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </div>
  );
}