import { useLocation, useNavigate } from "react-router-dom";

const sidebarIcons = [
  {
    id: "dashboard",
    path: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: "employees",
    path: "/employee",
    label: "Employees",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "departments",
    path: "/department",
    label: "Departments",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M8 10h.01" />
        <path d="M16 10h.01" />
        <path d="M8 14h.01" />
        <path d="M16 14h.01" />
      </svg>
    ),
  },
  {
    id: "payroll",
    path: "/salaryform",
    label: "Payroll",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    id: "reports",
    path: "/report",
    label: "Reports",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

const Sidebar = ({ mobileOpen, setMobileOpen }: { mobileOpen?: boolean, setMobileOpen?: (open: boolean) => void }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path: string) => {
    navigate(path);
    if (setMobileOpen) setMobileOpen(false);
  };

  const handleLogout = () => {
    if(window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen && setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen w-20 bg-black text-white flex flex-col items-center py-8 z-50 transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Top Icons */}
        <div className="flex flex-col gap-6 w-full items-center">
          {/* Brand/Home */}
          <div className="mb-4">
             <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center font-serif italic text-xl font-bold">
               E
             </div>
          </div>

          {sidebarIcons.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.path)}
                className={`p-3 rounded-xl transition-all duration-200 group relative flex items-center justify-center ${
                  isActive ? "bg-white text-black" : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
                title={item.label}
              >
                {item.icon}
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-orange-500 rounded-l-full translate-x-3" />
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Icons */}
        <div className="mt-auto flex flex-col gap-6">
          <button 
             onClick={handleLogout}
             className="p-3 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-xl transition-colors"
             title="Logout"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
