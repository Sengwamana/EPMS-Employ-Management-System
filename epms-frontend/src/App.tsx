

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import Employee from "./components/pages/employee/EmployeeForm";
import Deparment from "./components/pages/department/Department";
import Salary from "./components/pages/salary/Salary";
import Report from "./components/pages/report/report";
import SignUp from "./components/pages/auth/signup";
import Login from "./components/pages/auth/login";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Speaking from "./components/pages/dashboard/Speaking";
import Progress from "./components/pages/dashboard/Progress";
import Courses from "./components/pages/dashboard/Courses";

const AppContent = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<><Navbar /><Home /></>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Dashboard Routes */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/department" element={<Deparment />} />
        <Route path="/salaryform" element={<Salary />} />
        <Route path="/report" element={<Report />} />
        <Route path="/speaking" element={<Speaking />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/courses" element={<Courses />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};


export default App;