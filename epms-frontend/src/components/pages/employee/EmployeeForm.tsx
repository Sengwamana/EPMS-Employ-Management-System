import { useEffect, useState } from "react";
import api from "../../../utils/axios";
import { toast } from "sonner";

const Employee = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const emptyEmployee = { firstName: "", lastName: "", gender: "male", address: "", position: "", departmentCode: "" };
  const [employee, setEmployee] = useState(emptyEmployee);

  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await api.get("/department");
      setDepartments(res.data.departments);
    } catch {
      toast.error("Failed to fetch departments");
    }
  };

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await api.get("/employee");
      setEmployees(res.data.employee);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch employees.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (employeeNumber: number) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await api.delete(`/employee/${employeeNumber}`);
      toast.success("Employee deleted!");
      fetchEmployees();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete employee.");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!employee.firstName || !employee.lastName || !employee.departmentCode || !employee.position) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await api.post("/employee", employee);
      toast.success("Employee created!");
      setEmployee(emptyEmployee);
      fetchEmployees();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create employee.");
    }
  };

  const inputClass = "w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 p-3 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm shadow-sm";
  const selectClass = "w-full bg-white border border-gray-200 text-gray-900 p-3 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm shadow-sm hover:cursor-pointer";

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Employees</h1>
            <p className="text-gray-500">Manage your team members and their roles.</p>
          </div>
        </div>

        {/* Form */}
        <div className="glass-card rounded-3xl p-8 mb-8 bg-white/80 border border-white/60 shadow-xl shadow-gray-200/50 backdrop-blur-xl">
          <h2 className="text-xl font-serif font-semibold text-gray-900 mb-6">Add New Employee</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="space-y-1.5">
               <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">First Name</label>
               <input type="text" value={employee.firstName} onChange={(e) => setEmployee({ ...employee, firstName: e.target.value })} placeholder="John" className={inputClass} />
            </div>
            <div className="space-y-1.5">
               <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Last Name</label>
               <input type="text" value={employee.lastName} onChange={(e) => setEmployee({ ...employee, lastName: e.target.value })} placeholder="Doe" className={inputClass} />
            </div>
            <div className="space-y-1.5">
               <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Gender</label>
               <select value={employee.gender} onChange={(e) => setEmployee({ ...employee, gender: e.target.value })} className={selectClass}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-1.5">
               <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Department</label>
               <select value={employee.departmentCode} onChange={(e) => setEmployee({ ...employee, departmentCode: e.target.value })} className={selectClass}>
                <option value="">Select Department</option>
                {departments.map((dept: any) => (
                  <option key={dept.departmentCode} value={dept.departmentCode}>{dept.departmentName}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
               <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Position</label>
               <input type="text" value={employee.position} onChange={(e) => setEmployee({ ...employee, position: e.target.value })} placeholder="e.g. Software Engineer" className={inputClass} />
            </div>
            <div className="space-y-1.5">
               <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Address</label>
               <input type="text" value={employee.address} onChange={(e) => setEmployee({ ...employee, address: e.target.value })} placeholder="City, Country" className={inputClass} />
            </div>
            <div className="sm:col-span-2 lg:col-span-3 mt-4 flex justify-end">
              <button type="submit" className="bg-black hover:bg-gray-800 text-white rounded-xl px-8 py-3 text-sm font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                + Add Employee
              </button>
            </div>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900">Employee List</h2>
            <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full">{employees.length} Members</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <svg className="animate-spin w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            </div>
          ) : employees.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <p className="text-gray-500 font-medium">No employees found</p>
              <p className="text-gray-400 text-sm mt-1">Get started by adding a new employee above.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Gender</th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Address</th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Dept</th>
                    <th className="px-8 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {employees.map((emp: any) => (
                    <tr key={emp.employeeNumber} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="px-8 py-4 text-gray-500 font-mono text-xs">#{emp.employeeNumber}</td>
                      <td className="px-8 py-4">
                        <div className="font-bold text-gray-900 group-hover:text-black transition-colors">{emp.firstName} {emp.lastName}</div>
                      </td>
                      <td className="px-8 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${
                          emp.gender === "male" ? "bg-blue-50 text-blue-600" :
                          emp.gender === "female" ? "bg-pink-50 text-pink-600" :
                          "bg-purple-50 text-purple-600"
                        }`}>{emp.gender}</span>
                      </td>
                      <td className="px-8 py-4 text-gray-600 font-medium">{emp.position}</td>
                      <td className="px-8 py-4 text-gray-500">{emp.address || "—"}</td>
                      <td className="px-8 py-4">
                        <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-md">{emp.departmentCode}</span>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <button onClick={() => handleDelete(emp.employeeNumber)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-bold transition-all">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employee;
