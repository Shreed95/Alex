import React from 'react';

const Hero = ({ onGetStarted }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
      {/* Modern background elements */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Status badge */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/90 backdrop-blur-sm rounded-2xl border border-blue-200/50 shadow-lg">
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
              Powered by Advanced AI
            </span>
          </div>
        </div>

        {/* Main content */}
        <div className="text-center mb-16">
          {/* Headline with modern typography */}
          <h1 className="font-bold text-slate-900 mb-8 leading-[1.1] tracking-tight">
            <span className="block text-5xl md:text-7xl lg:text-8xl mb-2">
              Smart meals,
            </span>
            <span className="block text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 bg-clip-text text-transparent">
              smarter planning
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
            Transform your kitchen experience with AI-powered meal planning that creates 
            <span className="font-medium text-slate-700"> personalized recipes</span>, 
            <span className="font-medium text-slate-700"> smart shopping lists</span>, and 
            <span className="font-medium text-slate-700"> budget-friendly suggestions</span>.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center items-center mb-20">
          <button 
            onClick={onGetStarted}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-3"
          >
            <span className="relative z-10">Start Planning Now</span>
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
