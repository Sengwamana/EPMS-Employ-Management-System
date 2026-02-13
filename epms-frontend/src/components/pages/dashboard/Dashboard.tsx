import CourseSelection from "./CourseSelection";
import PerformanceChart from "./PerformanceChart";
import HomeworkCard from "./HomeworkCard";
import FriendsScore from "./FriendsScore";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
          Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column — Course Selection */}
        <div className="lg:col-span-4">
          <CourseSelection />
        </div>

        {/* Right Column — Performance + Bottom Cards */}
        <div className="lg:col-span-8 space-y-6">
          {/* Performance Chart */}
          <PerformanceChart />

          {/* Bottom Row: Homework + Friends Score */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HomeworkCard />
            <FriendsScore />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
