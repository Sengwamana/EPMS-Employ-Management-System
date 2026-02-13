import { useState } from "react";

const tabs = ["Dashboard", "Speaking", "Progress", "Courses"];

const DashboardNavbar = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <nav className="flex items-center justify-between px-4 sm:px-8 py-4 bg-white/50 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100 lg:border-none lg:bg-transparent">
      {/* Mobile Menu Button & Logo */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>

        <div className="flex items-center gap-2 group lg:hidden">
          <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-serif italic text-lg font-bold">
            E
          </div>
          <span className="font-serif font-bold text-lg tracking-tight text-black">EPMS</span>
        </div>

        {/* Desktop Title/Breadcrumb can go here */}
      </div>

      {/* Center Tabs (Desktop Only) */}
      <div className="hidden lg:flex items-center gap-1 bg-white p-1.5 rounded-full border border-gray-100 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeTab === tab
                ? "bg-black text-white shadow-md"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-orange-600 hover:border-orange-200 transition-all shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        {/* Notification Bell */}
        <button className="relative w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-orange-600 hover:border-orange-200 transition-all shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </button>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 text-sm font-bold cursor-pointer hover:ring-2 hover:ring-orange-100 transition-all">
          U
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
