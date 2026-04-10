import { useState } from 'react';

export default function DashboardPreview() {
  // Gracefully degrade to the placeholder if /dashboard-preview.png doesn't exist yet
  const [imgError, setImgError] = useState(false);

  return (
    <section className="bg-bg py-24 px-6 md:px-10 text-center" id="features">
      <h2 
        className="font-bold text-3xl md:text-4xl text-dark" 
        style={{ fontFamily: 'Plus Jakarta Sans' }}
      >
        Everything in one view
      </h2>
      <p 
        className="text-sm text-secondary mt-3 max-w-xl mx-auto leading-relaxed" 
        style={{ fontFamily: 'Inter' }}
      >
        A unified dashboard for sellers and buyers &mdash; real-time invoice tracking, GST summaries, and payment status at a glance.
      </p>

      {/* Presentation Container */}
      <div className="mt-12 max-w-5xl mx-auto rounded-[2rem] border border-card/80 overflow-hidden shadow-2xl shadow-primary/5 p-2 bg-dark transition-transform hover:scale-[1.01] duration-500">
        
        {/* Fake Browser Top Bar */}
        <div className="flex items-center px-4 py-3 gap-2">
          {/* Mac window controls */}
          <div className="flex items-center gap-2 mr-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          
          {/* Address bar filler */}
          <div className="flex-1 max-w-sm h-6 rounded-full bg-white/10 mx-auto" />
          
          {/* Balance element to keep address bar perfectly centered (matches left width roughly) */}
          <div className="w-[52px]" />
        </div>

        {/* Browser Viewport */}
        <div className="relative rounded-b-xl rounded-t-sm overflow-hidden bg-primary/20 aspect-video w-full flex items-center justify-center">
          {!imgError ? (
            <img 
              src="/dashboard-preview.png" 
              alt="InvoiceSync Dashboard Screenshot" 
              className="w-full h-full object-cover object-top"
              onError={() => setImgError(true)}
            />
          ) : (
            <p className="text-secondary/80 font-medium text-sm md:text-base">
              Dashboard Preview Coming Soon...
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
