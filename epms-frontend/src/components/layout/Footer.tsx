const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">EP</span>
          </div>
          <span className="text-slate-400 text-sm">EPMS &copy; {new Date().getFullYear()}</span>
        </div>
        <p className="text-slate-500 text-xs">Employee Payroll Management System</p>
      </div>
    </footer>
  );
};

export default Footer;
