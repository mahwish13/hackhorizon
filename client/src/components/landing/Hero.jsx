import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-bg flex flex-col items-center justify-center text-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Background radial blur behind heading */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl z-0 pointer-events-none" />

      {/* Content wrapper relative to z-10 */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Top pill badge */}
        <div className="bg-dark/10 text-dark rounded-full px-4 py-1.5 text-xs font-medium flex items-center mb-6">
          <span className="w-2 h-2 rounded-full bg-primary inline-block mr-2" />
          B2B Invoice Collaboration Platform
        </div>

        {/* Main heading */}
        <h1 
          className="text-4xl md:text-6xl font-extrabold text-dark leading-tight max-w-3xl mx-auto" 
          style={{ fontFamily: 'Plus Jakarta Sans' }}
        >
          Streamline Your <br className="hidden sm:block" />
          <span className="text-primary underline decoration-wavy decoration-[3px] underline-offset-8">
            Invoice
          </span>{' '}
          Workflow
        </h1>

        {/* Subheading */}
        <p className="text-lg text-secondary mt-6 max-w-xl mx-auto" style={{ fontFamily: 'Inter' }}>
          Sellers upload. Buyers verify. Everyone gets paid faster.
        </p>

        {/* Buttons row */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
          <Link
            to="/register"
            className="flex items-center justify-center gap-2 bg-dark text-white rounded-xl px-7 py-3.5 font-medium text-sm hover:bg-primary transition-all duration-300"
          >
            Get Started
            <span>&rarr;</span>
          </Link>
          <button
            className="flex items-center justify-center gap-2 bg-transparent border border-dark text-dark rounded-xl px-7 py-3.5 font-medium text-sm hover:bg-dark hover:text-white transition-all duration-300"
          >
            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4l12 6-12 6V4z" />
            </svg>
            Live Demo
          </button>
        </div>

        {/* Below buttons small text */}
        <p className="mt-4 text-xs text-secondary">
          No credit card required &middot; Free to start &middot; GST-ready
        </p>
      </div>
    </div>
  );
}
