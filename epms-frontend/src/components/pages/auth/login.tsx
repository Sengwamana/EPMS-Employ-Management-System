import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../utils/axios";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!credentials.username || !credentials.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/login", credentials);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login successful!");
      navigate("/report");
      window.location.reload();
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed. Please check your credentials and try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-24 relative overflow-hidden">
         {/* Background Decoration */}
         <div className="absolute top-0 left-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-md mx-auto w-full z-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-12 group">
            <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center font-serif italic text-xl font-bold group-hover:scale-105 transition-transform">
              E
            </div>
            <span className="font-serif font-bold text-xl tracking-tight text-black">EPMS</span>
          </Link>

          <h1 className="text-4xl font-serif font-medium text-gray-900 mb-3">Welcome back</h1>
          <p className="text-gray-500 mb-10">Please enter your details to sign in.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-gray-400"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Link to="#" className="text-sm font-medium text-orange-600 hover:text-orange-500">Forgot password?</Link>
              </div>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white rounded-xl py-3.5 font-semibold hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-8 text-center">
             <p className="text-gray-500">
                Don't have an account?{" "}
                <Link to="/signup" className="font-semibold text-orange-600 hover:text-orange-500 transition-colors">Sign up for free</Link>
             </p>
          </div>
        </div>
        
        <div className="mt-12 text-center text-xs text-gray-400">
           &copy; {new Date().getFullYear()} EPMS. All rights reserved.
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden bg-gray-900">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1964&q=80')] bg-cover bg-center opacity-60 mix-blend-overlay"></div>
         <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-600/20"></div>
         
         <div className="absolute bottom-12 left-12 right-12 z-10">
            <div className="glass-card p-8 rounded-3xl border-t border-white/20">
               <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-3">
                     {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                           <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                        </div>
                     ))}
                     <div className="w-10 h-10 rounded-full border-2 border-white bg-black text-white flex items-center justify-center text-xs font-bold">+2k</div>
                  </div>
                  <div className="flex gap-1 text-yellow-400">
                     {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                  </div>
               </div>
               <p className="text-white text-lg font-medium leading-relaxed">
                  "EPMS has transformed how we manage our team. The UI is stunning and the features are exactly what we needed."
               </p>
               <div className="mt-4">
                  <p className="text-white font-bold">Sarah Jenkins</p>
                  <p className="text-white/60 text-sm">HR Director, TechCorp</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Login;
