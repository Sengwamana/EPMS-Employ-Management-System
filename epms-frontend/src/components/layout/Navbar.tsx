import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUser(null);
      toast.success("Logged out successfully!");
      navigate("/login");
    }
  };

  const navLinks = [
    { to: "/employee", label: "Employees" },
    { to: "/department", label: "Departments" },
    { to: "/salaryform", label: "Payroll" },
    { to: "/report", label: "Reports" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4 transition-all duration-300">
      <nav 
        className={`w-full max-w-6xl transition-all duration-300 ${
          scrolled || mobileOpen ? "glass shadow-lg rounded-2xl" : "bg-transparent"
        }`}
      >
        <div className="px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0 group">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-serif italic text-lg font-bold group-hover:scale-105 transition-transform">
                E
              </div>
              <span className="font-serif font-bold text-xl tracking-tight group-hover:opacity-80 transition-opacity">EPMS</span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {isLoggedIn ? (
                <>
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`text-sm font-medium transition-colors hover:text-orange-600 ${
                        isActive(link.to) ? "text-orange-600 font-semibold" : "text-gray-600"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </>
              ) : (
                <>
                  <Link to="/" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Product</Link>
                  <Link to="/" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Solutions</Link>
                  <Link to="/" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Pricing</Link>
                  <Link to="/" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Developers</Link>
                </>
              )}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <div className="hidden md:flex items-center gap-4">
                   <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                    <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">
                      {user?.username?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user?.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-6">
                  <Link
                    to="/login"
                    className="text-sm font-bold text-gray-900 hover:text-orange-600 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Get it Now <span className="text-gray-400 font-normal ml-1">— It's Free</span>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-black transition-colors"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`h-0.5 w-full bg-current transform transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
                  <span className={`h-0.5 w-full bg-current transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
                  <span className={`h-0.5 w-full bg-current transform transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="px-6 pb-6 pt-2 space-y-3">
             {isLoggedIn ? (
               <>
                 {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                         isActive(link.to) ? "bg-orange-50 text-orange-600" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {link.label}
                    </Link>
                 ))}
                 <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Signed in as {user?.username}</span>
                    <button onClick={handleLogout} className="text-sm font-medium text-red-500">Logout</button>
                 </div>
               </>
             ) : (
                <>
                  <Link to="/" onClick={() => setMobileOpen(false)} className="block py-2 text-gray-600 hover:text-black">Product</Link>
                  <Link to="/" onClick={() => setMobileOpen(false)} className="block py-2 text-gray-600 hover:text-black">Solutions</Link>
                  <Link to="/" onClick={() => setMobileOpen(false)} className="block py-2 text-gray-600 hover:text-black">Pricing</Link>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="block py-2 font-bold text-gray-900">Log in</Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)} className="block w-full text-center mt-4 py-3 rounded-xl bg-black text-white font-medium">Get it Now</Link>
                </>
             )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

