import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[800px] h-[800px] bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[600px] h-[600px] bg-gray-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
                  <span className="font-serif italic text-xl">E</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 leading-tight">20M+ User</p>
                  <Link to="/" className="text-sm text-gray-500 underline decoration-gray-300 hover:text-black transition-colors">Read Our Success Stories</Link>
                </div>
              </div>

              <h1 className="text-8xl lg:text-9xl font-serif font-medium text-gray-900 leading-none mb-6">
                EPMS
              </h1>

              <div className="h-px w-full bg-gray-200 my-8"></div>

              <p className="text-xl text-gray-600 leading-relaxed mb-10">
                Drive Operational Excellence, And Harness Ai-Powered Workforce Management — Up To 50× Faster.
              </p>

              {/* User Testimonial */}
              <div className="flex items-center gap-4 mb-10 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-100 max-w-sm">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">JD</div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Loved the performance</p>
                  <p className="text-xs text-gray-500">100% Satisfied</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <span className="text-black font-bold">★ 4.9</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <button className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300">
                  Get Started — It's Free
                </button>
                <Link to="/" className="flex items-center gap-2 font-medium text-gray-900 hover:text-orange-600 transition-colors group">
                  Our Pricing 
                  <span className="group-hover:translate-x-1 transition-transform">↗</span>
                </Link>
              </div>
            </div>

            {/* Right Content - Visuals */}
            <div className="relative h-[600px] hidden lg:block">
              {/* Main Image Container */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[600px] bg-gradient-to-br from-orange-400 to-orange-600 rounded-[40px] overflow-hidden shadow-2xl">
                {/* Overlay Image (Corporate Office) */}
                 <div className="absolute inset-0 opacity-80 mix-blend-normal bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80')] bg-cover bg-center"></div>
                 
                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              {/* Floating Cards */}
              <div className="absolute top-20 left-0 bg-white p-3 rounded-xl shadow-lg flex items-center gap-3 animate-float-slow transform -rotate-2">
                <div className="w-6 h-6 bg-orange-100 rounded-md flex items-center justify-center text-orange-500 text-xs">✓</div>
                <span className="text-sm font-medium">Payroll Processed</span>
              </div>

              <div className="absolute top-40 -left-10 bg-white p-3 rounded-xl shadow-lg flex items-center gap-3 animate-float delay-75 transform rotate-2">
                <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center text-blue-500 text-xs">✓</div>
                <span className="text-sm font-medium">Department Synced</span>
              </div>

              <div className="absolute top-10 right-0 glass-card p-6 rounded-3xl w-48">
                <p className="text-xs font-semibold text-gray-500 mb-1 tracking-wider">EFFICIENCY</p>
                <p className="text-4xl font-bold text-gray-900 mb-1">+45%</p>
                <p className="text-xs text-gray-600">Productivity boost</p>
              </div>

              <div className="absolute bottom-20 -right-10 glass-card p-4 rounded-3xl w-64 shadow-xl backdrop-blur-xl bg-white/40 border border-white/60">
                 <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-4xl">
                      👩‍💼
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Sarah J.</p>
                      <p className="text-sm text-gray-500 mt-1">HR Manager</p>
                      <div className="flex items-center gap-1 mt-2 bg-white rounded-full px-2 py-0.5 w-fit shadow-sm">
                        <span className="text-[10px] text-black">Active</span>
                      </div>
                    </div>
                 </div>
              </div>

              {/* Play Button */}
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-black border-b-[8px] border-b-transparent ml-1"></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud Section */}
      <section className="py-10 border-t border-gray-100 bg-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center lg:justify-between gap-8 opacity-70 grayscale">
             {["Rakuten", "NCR", "monday.com", "Disney", "Dropbox"].map((logo) => (
                <span key={logo} className="text-2xl font-bold font-serif text-black opacity-60 hover:opacity-100 transition-opacity cursor-default">{logo}</span>
             ))}
          </div>
        </div>
      </section>

      {/* Features Section (Redesigned) */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-serif font-medium mb-4">Powerful Features</h2>
            <p className="text-gray-500 max-w-xl">Everything you need to manage your organization's human resources effectively.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Employee Management",
                desc: "Add, update, and organize employee records with ease.",
              },
              {
                title: "Department Tracking",
                desc: "Create departments and assign base salaries at department level.",
              },
              {
                title: "Payroll Processing",
                desc: "Calculate net salary with automatic gross salary and deductions.",
              },
              {
                title: "Detailed Reports",
                desc: "Filter and review salary reports by employee, department, or month.",
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-3xl bg-gray-50 hover:bg-orange-50 transition-colors duration-300 border border-transparent hover:border-orange-100"
              >
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                   <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-start gap-12">
              <div>
                 <div className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center font-bold mb-6">
                  <span className="font-serif italic text-xl">E</span>
                </div>
                 <p className="text-gray-400 max-w-sm">
                   Empowering modern organizations with intelligent payroll and HR solutions.
                 </p>
              </div>
              <div className="flex gap-20">
                 <div>
                    <h4 className="font-bold mb-4">Product</h4>
                    <ul className="space-y-2 text-gray-400">
                       <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                       <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                    </ul>
                 </div>
                 <div>
                    <h4 className="font-bold mb-4">Company</h4>
                    <ul className="space-y-2 text-gray-400">
                       <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                       <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                    </ul>
                 </div>
              </div>
           </div>
           <div className="border-t border-gray-800 mt-16 pt-8 flex justify-between items-center text-sm text-gray-500">
              <p>&copy; {new Date().getFullYear()} EPMS.</p>
              <div className="flex gap-6">
                 <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                 <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
