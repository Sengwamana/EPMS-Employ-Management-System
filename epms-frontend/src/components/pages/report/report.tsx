import { useEffect, useState } from "react";
import api from "../../../utils/axios";
import { toast } from "sonner";

const Report = () => {
  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({ employeeNumber: "", month: "", departmentCode: "" });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [salRes, empRes, deptRes] = await Promise.all([
        api.get("/salary"), api.get("/employee"), api.get("/department")
      ]);
      setSalaries(salRes.data.salary || []);
      setEmployees(empRes.data.employee || []);
      setDepartments(deptRes.data.departments || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load report data.");
    } finally {
      setLoading(false);
    }
  };

  const getFilteredSalaries = () => {
    let filtered = salaries;
    if (filters.employeeNumber) filtered = filtered.filter((s: any) => s.employeeNumber === parseInt(filters.employeeNumber));
    if (filters.month) filtered = filtered.filter((s: any) => s.month === filters.month);
    if (filters.departmentCode) {
      const deptEmps = employees.filter((e: any) => e.departmentCode === filters.departmentCode).map((e: any) => e.employeeNumber);
      filtered = filtered.filter((s: any) => deptEmps.includes(s.employeeNumber));
    }
    return filtered;
  };

  const filteredData = getFilteredSalaries();
  const totals = {
    totalGross: filteredData.reduce((sum: number, s: any) => sum + parseFloat(s.grossSalary || 0), 0),
    totalDeductions: filteredData.reduce((sum: number, s: any) => sum + parseFloat(s.deductions || 0), 0),
    totalNet: filteredData.reduce((sum: number, s: any) => sum + parseFloat(s.netSalary || 0), 0),
    count: filteredData.length
  };

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const selectClass = "w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 p-3 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm shadow-sm";
  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2 });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
            <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Salary Report</h1>
            <p className="text-gray-500">Filter and analyze payroll data.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-3xl p-8 mb-8 bg-white/80 border border-white/60 shadow-xl shadow-gray-200/50 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Employee</label>
              <select value={filters.employeeNumber} onChange={(e) => setFilters({ ...filters, employeeNumber: e.target.value })} className={selectClass}>
                <option value="">All Employees</option>
                {employees.map((emp: any) => (
                  <option key={emp.employeeNumber} value={emp.employeeNumber}>{emp.firstName} {emp.lastName}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Month</label>
              <select value={filters.month} onChange={(e) => setFilters({ ...filters, month: e.target.value })} className={selectClass}>
                <option value="">All Months</option>
                {monthNames.map((name, i) => {
                  const val = String(i + 1).padStart(2, "0");
                  return <option key={val} value={val}>{name}</option>;
                })}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Department</label>
              <select value={filters.departmentCode} onChange={(e) => setFilters({ ...filters, departmentCode: e.target.value })} className={selectClass}>
                <option value="">All Departments</option>
                {departments.map((dept: any) => (
                  <option key={dept.departmentCode} value={dept.departmentCode}>{dept.departmentName}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end gap-3">
              <button onClick={() => setFilters({ employeeNumber: "", month: "", departmentCode: "" })} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl px-4 py-3 text-sm font-medium transition-all">
                Clear
              </button>
              <button onClick={fetchData} className="flex-1 bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-4 py-3 text-sm font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        {filteredData.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Records", value: totals.count.toString(), color: "blue", prefix: "" },
              { label: "Total Gross", value: `$${fmt(totals.totalGross)}`, color: "emerald", prefix: "" },
              { label: "Total Deductions", value: `$${fmt(totals.totalDeductions)}`, color: "red", prefix: "" },
              { label: "Total Net Pay", value: `$${fmt(totals.totalNet)}`, color: "violet", prefix: "" },
            ].map((card, i) => (
              <div key={i} className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow`}>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">{card.label}</p>
                <p className={`text-${card.color}-600 text-3xl font-bold font-serif`}>{card.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h2 className="font-serif font-bold text-gray-900 text-lg">Report Data</h2>
            <span className="bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{filteredData.length} records</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <svg className="animate-spin w-8 h-8 text-violet-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <p className="text-gray-500 font-medium">No records match your filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/30">
                    <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Month</th>
                    <th className="px-8 py-5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Gross</th>
                    <th className="px-8 py-5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Deductions</th>
                    <th className="px-8 py-5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Net</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredData.map((sal: any, idx: number) => {
                    const emp: any = employees.find((e: any) => e.employeeNumber === sal.employeeNumber);
                    const dept: any = departments.find((d: any) => d.departmentCode === emp?.departmentCode);
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
                          <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-lg">{dept?.departmentName || "—"}</span>
                        </td>
                        <td className="px-8 py-5 text-gray-500">{sal.month}</td>
                        <td className="px-8 py-5 text-right font-medium text-emerald-600">${fmt(grossVal)}</td>
                        <td className="px-8 py-5 text-right font-medium text-red-500">${fmt(dedVal)}</td>
                        <td className="px-8 py-5 text-right font-bold text-gray-900">${fmt(netVal)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-200 bg-gray-50/80">
                    <td colSpan={4} className="px-8 py-5 text-right text-gray-900 font-bold uppercase text-xs tracking-wider">Totals</td>
                    <td className="px-8 py-5 text-right text-emerald-600 font-bold">${fmt(totals.totalGross)}</td>
                    <td className="px-8 py-5 text-right text-red-500 font-bold">${fmt(totals.totalDeductions)}</td>
                    <td className="px-8 py-5 text-right text-violet-600 font-bold text-lg">${fmt(totals.totalNet)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
