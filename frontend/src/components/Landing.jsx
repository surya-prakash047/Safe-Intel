import { MotionDiv } from './MotionPrimitives.jsx'

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-10 sm:py-14 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-blue-50/30 rounded-3xl"></div>
        <div className="grid md:grid-cols-2 gap-8 items-center relative">
          <MotionDiv className="space-y-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center rounded-full border border-blue-200/60 bg-blue-50/40 px-3 py-1 text-xs font-medium text-blue-700 backdrop-blur-sm">
              ✨ Advanced Medical Device Classification
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
              Safe<span className="text-blue-600">Intel</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Predict medical device failures before they happen.
              Our platform uses global recall and safety alert data to help manufacturers spot risks early, reduce downtime, cut maintenance costs, and keep devices safe and reliable in the market.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#device-info" className="inline-flex items-center justify-center rounded-xl bg-blue-600 text-white px-6 py-3 text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                Start Classification
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#features" className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-blue-50/50 text-blue-700 px-6 py-3 text-sm font-medium hover:bg-blue-100/50 transition-colors backdrop-blur-sm">
                Learn More
              </a>
            </div>
          </MotionDiv>
          <MotionDiv className="relative md:justify-self-end" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="grid grid-cols-2 gap-3 w-full max-w-md">
              {/* Main Classification Box */}
              <div className="col-span-2 aspect-[3/2] rounded-2xl bg-gradient-to-br from-blue-100 via-sky-50 to-indigo-100 p-1 shadow-xl shadow-blue-600/10 group hover:shadow-2xl hover:shadow-blue-600/20 transition-all duration-300">
                <div className="h-full w-full rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center text-slate-500 border border-blue-100/50 group-hover:bg-white/80 transition-all duration-300">
                  <div className="text-center p-4">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🩺</div>
                    <div className="space-y-1.5">
                      <div className="h-1.5 bg-blue-200/60 rounded-full w-3/4 mx-auto group-hover:bg-blue-300/70 transition-colors"></div>
                      <div className="h-1.5 bg-blue-100/60 rounded-full w-1/2 mx-auto group-hover:bg-blue-200/70 transition-colors"></div>
                    </div>
                    <p className="text-xs mt-3 text-slate-600 font-medium">AI Classification</p>
                  </div>
                </div>
              </div>

              {/* FDA Compliance Box */}
              <div className="aspect-square rounded-xl bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 p-1 shadow-lg shadow-emerald-600/10 group hover:shadow-xl hover:shadow-emerald-600/20 transition-all duration-300 hover:scale-105">
                <div className="h-full w-full rounded-xl bg-white/60 backdrop-blur-sm flex items-center justify-center border border-emerald-100/50 group-hover:bg-white/80 transition-all duration-300">
                  <div className="text-center p-2">
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">✅</div>
                    <div className="h-1 bg-emerald-200/60 rounded-full w-2/3 mx-auto mb-1 group-hover:bg-emerald-300/70 transition-colors"></div>
                    <p className="text-xs text-slate-600 font-medium leading-tight">Protect Patients & Reliability</p>
                  </div>
                </div>
              </div>

              {/* Risk Assessment Box */}
              <div className="aspect-square rounded-xl bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 p-1 shadow-lg shadow-amber-600/10 group hover:shadow-xl hover:shadow-amber-600/20 transition-all duration-300 hover:scale-105">
                <div className="h-full w-full rounded-xl bg-white/60 backdrop-blur-sm flex items-center justify-center border border-amber-100/50 group-hover:bg-white/80 transition-all duration-300">
                  <div className="text-center p-2">
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">⚡</div>
                    <div className="h-1 bg-amber-200/60 rounded-full w-2/3 mx-auto mb-1 group-hover:bg-amber-300/70 transition-colors"></div>
                    <p className="text-xs text-slate-600 font-medium leading-tight">Risk Analysis</p>
                  </div>
                </div>
              </div>

              {/* Documentation Box */}
              <div className="aspect-square rounded-xl bg-gradient-to-br from-purple-100 via-violet-50 to-indigo-100 p-1 shadow-lg shadow-purple-600/10 group hover:shadow-xl hover:shadow-purple-600/20 transition-all duration-300 hover:scale-105">
                <div className="h-full w-full rounded-xl bg-white/60 backdrop-blur-sm flex items-center justify-center border border-purple-100/50 group-hover:bg-white/80 transition-all duration-300">
                  <div className="text-center p-2">
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">📋</div>
                    <div className="h-1 bg-purple-200/60 rounded-full w-2/3 mx-auto mb-1 group-hover:bg-purple-300/70 transition-colors"></div>
                    <p className="text-xs text-slate-600 font-medium leading-tight">Uncover Hidden Risks</p>
                  </div>
                </div>
              </div>

              {/* Regulatory Box */}
              <div className="aspect-square rounded-xl bg-gradient-to-br from-rose-100 via-pink-50 to-red-100 p-1 shadow-lg shadow-rose-600/10 group hover:shadow-xl hover:shadow-rose-600/20 transition-all duration-300 hover:scale-105">
                <div className="h-full w-full rounded-xl bg-white/60 backdrop-blur-sm flex items-center justify-center border border-rose-100/50 group-hover:bg-white/80 transition-all duration-300">
                  <div className="text-center p-2">
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">🛡️</div>
                    <div className="h-1 bg-rose-200/60 rounded-full w-2/3 mx-auto mb-1 group-hover:bg-rose-300/70 transition-colors"></div>
                    <p className="text-xs text-slate-600 font-medium leading-tight">Risk Control</p>
                  </div>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* For Manufacturers Section */}
      <section className="py-16 sm:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-blue-50/30 to-slate-50 rounded-3xl"></div>
        <div className="relative">
          <MotionDiv 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center rounded-full border border-blue-200/60 bg-blue-50/60 px-4 py-2 text-sm font-medium text-blue-700 backdrop-blur-sm mb-4">
              🏭 For Medical Device Manufacturers
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Streamline Your <span className="text-blue-600">Regulatory Journey</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              From concept to market approval, our platform provides the tools and insights manufacturers need to navigate FDA regulations efficiently.
            </p>
          </MotionDiv>
          
          <div className="grid md:grid-cols-4 gap-6">
            <MotionDiv 
              className="relative group"
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 group-hover:shadow-xl group-hover:shadow-emerald-500/20"></div>
              <div className="relative p-6 border border-emerald-100/50 rounded-2xl bg-white/60 backdrop-blur-sm h-full">
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">AI-Powered Failure Prediction</h3>
                <ul className="text-sm text-slate-600 mb-4 space-y-2">
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2 mt-0.5">•</span>
                    Advanced machine learning models trained on global recall and safety alert data.
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2 mt-0.5">•</span>
                    Predict failures before they happen, enabling preventive maintenance and reducing costly breakdowns.
                  </li>
                </ul>
                
              </div>
            </MotionDiv>

            <MotionDiv 
              className="relative group"
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 group-hover:shadow-xl group-hover:shadow-amber-500/20"></div>
              <div className="relative p-6 border border-amber-100/50 rounded-2xl bg-white/60 backdrop-blur-sm h-full">
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Risk Analysis for Manufacturers</h3>
                <ul className="text-sm text-slate-600 mb-4 space-y-2">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2 mt-0.5">•</span>
                    Identify high-risk device categories and common causes of failure.
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2 mt-0.5">•</span>
                    Prioritize corrective actions based on device type, function, and patient impact.
                  </li>
                </ul>
                
              </div>
            </MotionDiv>

            <MotionDiv 
              className="relative group"
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 group-hover:shadow-xl group-hover:shadow-purple-500/20"></div>
              <div className="relative p-6 border border-purple-100/50 rounded-2xl bg-white/60 backdrop-blur-sm h-full">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Built for Manufacturers</h3>
                <ul className="text-sm text-slate-600 mb-4 space-y-2">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-0.5">•</span>
                    Designed to support quality assurance and engineering teams.
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-0.5">•</span>
                    Provides actionable insights that help reduce recalls, extend device life, and maintain trust in the market.
                  </li>
                </ul>
                
              </div>
            </MotionDiv>

            <MotionDiv 
              className="relative group"
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 group-hover:shadow-xl group-hover:shadow-rose-500/20"></div>
              <div className="relative p-6 border border-rose-100/50 rounded-2xl bg-white/60 backdrop-blur-sm h-full">
                <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-rose-200 transition-colors">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Data-Driven Insights</h3>
                <ul className="text-sm text-slate-600 mb-4 space-y-2">
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-2 mt-0.5">•</span>
                    Built on a global dataset of recalls, safety alerts, and field safety notices.
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-2 mt-0.5">•</span>
                    Includes curated data from trusted sources like the International Consortium of Investigative Journalists (ICIJ).
                  </li>
                </ul>
                
              </div>
            </MotionDiv>
          </div>

          {/* Value Proposition */}
          <MotionDiv 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            
          </MotionDiv>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20">
        <div className="text-center mb-12">
          <MotionDiv initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Our Platform?
            </h2>
          </MotionDiv>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <MotionDiv 
            className="relative group"
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
            <div className="relative p-8 border border-blue-100/50 rounded-2xl bg-white/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Pattern & Risk Discovery</h3>
              <p className="text-slate-600">Find design flaws and common failure causes.</p>
            </div>
          </MotionDiv>

          <MotionDiv 
            className="relative group"
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
            <div className="relative p-8 border border-blue-100/50 rounded-2xl bg-white/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Actionable Manufacturer Insights</h3>
              <p className="text-slate-600">Reduce downtime, costs, and improve safety</p>
            </div>
          </MotionDiv>

          <MotionDiv 
            className="relative group"
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
            <div className="relative p-8 border border-blue-100/50 rounded-2xl bg-white/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Customizable for Any Manufacturer</h3>
              <p className="text-slate-600">Adaptable to different devices, markets, and needs</p>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Stats Section */}
      
    </div>
  )
}


