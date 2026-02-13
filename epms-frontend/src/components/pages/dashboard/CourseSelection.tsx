import { useState } from "react";

const courses = [
  {
    id: 1,
    title: "Speak with Confidence",
    description:
      "Learn how to speak English clearly and confidently in everyday situations.",
    date: "27 Apr 2025",
    bgColor: "bg-black text-white",
    textColor: "text-white",
    dateColor: "text-white",
    dateBg: "bg-white/20",
    avatarColors: ["bg-orange-500", "bg-yellow-500", "bg-orange-400"],
  },
  {
    id: 2,
    title: "Master the Basics",
    description:
      "Build a strong foundation with essential grammar and vocabulary.",
    date: "30 Apr 2025",
    bgColor: "bg-white border border-gray-100",
    textColor: "text-gray-900",
    dateColor: "text-gray-600",
    dateBg: "bg-gray-100",
    avatarColors: ["bg-gray-800", "bg-gray-600", "bg-gray-400"],
  },
  {
    id: 3,
    title: "Sound Like a Native",
    description:
      "Improve your pronunciation and intonation for natural speech.",
    date: "15 May 2025",
    bgColor: "bg-orange-50 border border-orange-100",
    textColor: "text-orange-900",
    dateColor: "text-orange-700",
    dateBg: "bg-orange-200/50",
    avatarColors: ["bg-orange-600", "bg-orange-500", "bg-orange-400"],
  },
];

const CourseSelection = () => {
  const [search, setSearch] = useState("");

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Select a course
          </h2>
          <p className="text-gray-400 text-sm mt-0.5">Start learning today.</p>
        </div>
        <button className="w-9 h-9 rounded-xl bg-white border border-gray-200/60 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-200/80 rounded-2xl pl-4 pr-12 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 transition-all"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-violet-500 hover:bg-violet-600 rounded-xl flex items-center justify-center text-white transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      {/* Course Cards */}
      <div className="space-y-4">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className={`${course.bgColor} rounded-[20px] p-5 cursor-pointer hover:scale-[1.01] transition-all duration-200 group`}
            style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}
          >
            <h3
              className={`text-lg font-bold ${course.textColor} mb-1.5 group-hover:translate-x-0.5 transition-transform`}
            >
              {course.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              {course.description}
            </p>

            <div className="flex items-center justify-between">
              {/* Date */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 ${course.dateBg} rounded-full flex items-center justify-center`}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className={course.dateColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <span className={`text-xs font-medium ${course.dateColor}`}>
                  {course.date}
                </span>
              </div>

              {/* Overlapping Avatars */}
              <div className="flex -space-x-2">
                {course.avatarColors.map((color, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full ${color} ring-2 ring-white flex items-center justify-center`}
                  >
                    <span className="text-white text-[9px] font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSelection;
