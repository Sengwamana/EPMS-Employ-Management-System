import Card from "../../ui/Card";
import ProgressBar from "../../ui/ProgressBar";

const homeworkTasks = [
  {
    id: 1,
    task: "Learn 10 new words today",
    progress: 57,
    color: "#f97316", // Orange
    icon: "📖",
  },
  {
    id: 2,
    task: "Do 1 grammar task today",
    progress: 42,
    color: "#fbbf24", // Amber
    icon: "✏️",
  },
  {
    id: 3,
    task: "Watch a video, answer 3 questions",
    progress: 31,
    color: "#171717", // Black
    icon: "🎥",
  },
  {
    id: 4,
    task: "Write 3 sentences with vocab",
    progress: 84,
    color: "#ea580c", // Dark Orange
    icon: "📝",
  },
];

const HomeworkCard = () => {
  return (
    <Card className="flex-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">
            Homework
          </h3>
          <p className="text-gray-400 text-xs mt-0.5">
            Check and complete tasks
          </p>
        </div>
        <div className="relative">
          <select className="appearance-none bg-gray-50 text-gray-600 text-xs font-medium px-3 py-1.5 pr-7 rounded-xl border border-gray-200/60 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all">
            <option>Day</option>
            <option>Week</option>
            <option>Month</option>
          </select>
          <svg
            className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {homeworkTasks.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            {/* Icon */}
            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-base shrink-0 border border-gray-100">
              {item.icon}
            </div>

            {/* Task + Progress */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-sm text-gray-700 font-medium truncate pr-2">
                  {item.task}
                </p>
                <span className="text-sm font-bold text-gray-900 shrink-0">
                  {item.progress}%
                </span>
              </div>
              <ProgressBar
                value={item.progress}
                color={item.color}
                trackColor="#f3f4f6"
                height="h-1.5"
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default HomeworkCard;
