import { useEffect, useState } from "react";
import api from "../../../utils/axios";
import { toast } from "sonner";

const Salary = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = String(now.getMonth() + 1).padStart(2, "0");

  const [employees, setEmployees] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(false);

  const emptySalary = { employeeNumber: "", month: `${currentYear}-${currentMonth}`, deductions: "" };
  const [salary, setSalary] = useState(emptySalary);

  useEffect(() => { fetchEmployees(); fetchSalaries(); }, []);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employee");
      setEmployees(res.data.employee);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch employees.");
    }
  };

  const fetchSalaries = async () => {
    try {
      setLoading(true);
      const res = await api.get("/salary");
      setSalaries(res.data.salary || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch salary records.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!salary.employeeNumber) {
      toast.error("Please select an employee.");
      return;
    }
    try {
      await api.post("/salary", {
        employeeNumber: parseInt(salary.employeeNumber),
        month: salary.month,
        deductions: salary.deductions ? parseFloat(salary.deductions) : 0
      });
      toast.success("Salary record created!");
      setSalary(emptySalary);
      fetchSalaries();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create salary record.");
    }
  };

  const handleDelete = async (salaryId: string) => {
    if (!window.confirm("Delete this salary record?")) return;
    try {
      await api.delete(`/salary/${salaryId}`);
      toast.success("Salary record deleted!");
      fetchSalaries();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete salary record.");
    }
  };

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const inputClass = "w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 p-3 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm shadow-sm";

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Payroll</h1>
            <p className="text-gray-500">Create and manage salary records.</p>
          </div>
        </div>

        {/* Form */}
        <div className="glass-card rounded-3xl p-8 mb-8 bg-white/80 border border-white/60 shadow-xl shadow-gray-200/50 backdrop-blur-xl">
          <h2 className="text-xl font-serif font-semibold text-gray-900 mb-6">New Salary Record</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="space-y-1.5">
               <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Employee</label>
               <select value={salary.employeeNumber} onChange={(e) => setSalary({ ...salary, employeeNumber: e.target.value })} className={inputClass}>
                  <option value="">Select Employee *</option>
                  {employees.map((emp: any) => (
                  <option key={emp.employeeNumber} value={emp.employeeNumber}>{emp.firstName} {emp.lastName}</option>
                  ))}
               </select>
            </div>
            
            <div className="space-y-1.5">
               <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Month</label>
               <select value={salary.month} onChange={(e) => setSalary({ ...salary, month: e.target.value })} className={inputClass}>
                  {months.map((name, index) => {
                  const val = `${currentYear}-${String(index + 1).padStart(2, "0")}`;
                  return <option key={val} value={val}>{name} {currentYear}</option>;
                  })}
               </select>
            </div>

            <div className="space-y-1.5">
               <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Deductions</label>
               <input type="number" step="0.01" value={salary.deductions} onChange={(e) => setSalary({ ...salary, deductions: e.target.value })} placeholder="0.00" className={inputClass} />
            </div>
            
            <div className="flex items-end">
               <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-3 text-sm font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  + Create Record
               </button>
            </div>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h2 className="font-serif font-bold text-gray-900 text-lg">Salary Records</h2>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{salaries.length} records</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <svg className="animate-spin w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            </div>
          ) : salaries.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <p className="text-gray-500 font-medium">No salary records yet</p>
              <p className="text-gray-400 text-sm mt-1">Create a new record using the form above.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/30">
                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Month</th>
                    <th className="px-8 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Gross</th>
                    <th className="px-8 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Deductions</th>
                    <th className="px-8 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Net</th>
                    <th className="px-8 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {salaries.map((sal: any, idx: number) => {
                    const grossVal = parseFloat(sal.grossSalary || 0);
                    const dedVal = parseFloat(sal.deductions || 0);
                    const netVal = parseFloat(sal.netSalary || 0);
                    return (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-8 py-5 font-medium text-gray-900">
                          {sal.firstName && sal.lastName ? `${sal.firstName} ${sal.lastName}` : `Emp #${sal.employeeNumber}`}
                        </td>
                        <td className="px-8 py-5 text-gray-500">{sal.position || "—"}</td>
                        <td className="px-8 py-5">
                          <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-lg">{sal.month}</span>
                        </td>
                        <td className="px-8 py-5 text-right font-medium text-emerald-600">${grossVal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                        <td className="px-8 py-5 text-right font-medium text-red-500">${dedVal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                        <td className="px-8 py-5 text-right font-bold text-gray-900">${netVal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                        <td className="px-8 py-5 text-right">
                          <button onClick={() => handleDelete(sal.salaryId)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Salary;
