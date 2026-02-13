import { useState, useEffect } from "react";
import api from "../../../utils/axios";
import { toast } from "sonner";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const emptyDept = { departmentCode: "", departmentName: "", grossSalary: "" };
  const [department, setDepartment] = useState(emptyDept);

  useEffect(() => { fetchDepartments(); }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/department");
      setDepartments(res.data.departments);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch departments.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (departmentCode: string) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;
    try {
      await api.delete(`/department/${departmentCode}`);
      toast.success("Department deleted!");
      fetchDepartments();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete department.");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!department.departmentCode || !department.departmentName || !department.grossSalary) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await api.post("/department", { ...department, grossSalary: parseFloat(department.grossSalary) });
      toast.success("Department created!");
      setDepartment(emptyDept);
      fetchDepartments();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create department.");
    }
  };

  const inputClass = "w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 p-3 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm shadow-sm";

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Departments</h1>
            <p className="text-gray-500">Manage departments and salary structures.</p>
          </div>
        </div>

        {/* Form */}
        <div className="glass-card rounded-3xl p-8 mb-8 bg-white/80 border border-white/60 shadow-xl shadow-gray-200/50 backdrop-blur-xl">
          <h2 className="text-xl font-serif font-semibold text-gray-900 mb-6">Add New Department</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
             <div className="space-y-1.5">
               <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Dept Code</label>
               <input type="text" value={department.departmentCode} onChange={(e) => setDepartment({ ...department, departmentCode: e.target.value })} placeholder="e.g. IT" className={inputClass} />
             </div>
             <div className="space-y-1.5">
               <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Department Name</label>
               <input type="text" value={department.departmentName} onChange={(e) => setDepartment({ ...department, departmentName: e.target.value })} placeholder="e.g. Information Technology" className={inputClass} />
             </div>
             <div className="space-y-1.5">
               <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Base Gross Salary</label>
               <input type="number" step="0.01" value={department.grossSalary} onChange={(e) => setDepartment({ ...department, grossSalary: e.target.value })} placeholder="0.00" className={inputClass} />
             </div>
             <div className="sm:col-span-3 mt-4 flex justify-end">
              <button type="submit" className="bg-black hover:bg-gray-800 text-white rounded-xl px-8 py-3 text-sm font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                + Add Department
              </button>
            </div>
          </form>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
             <div className="col-span-full flex items-center justify-center py-20">
              <svg className="animate-spin w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            </div>
          ) : departments.length === 0 ? (
             <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-gray-100">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
              </div>
              <p className="text-gray-500 font-medium">No departments found</p>
              <p className="text-gray-400 text-sm mt-1">Get started by adding a new department above.</p>
            </div>
          ) : (
            departments.map((dept: any) => (
              <div key={dept.departmentCode} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <span className="bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">{dept.departmentCode}</span>
                  <button onClick={() => handleDelete(dept.departmentCode)} className="text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{dept.departmentName}</h3>
                <div className="flex items-baseline gap-1 mt-4 pt-4 border-t border-gray-50">
                  <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Base Salary</span>
                  <span className="ml-auto text-2xl font-serif font-bold text-gray-900">${parseFloat(dept.grossSalary).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Department;
