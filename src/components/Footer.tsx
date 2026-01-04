import { Heart, Settings } from "lucide-react";
import { COUPLE, WEDDING, BIBLE_VERSE } from "@/constants";

/**
 * Footer Component
 * Displays couple names, wedding date, and credits
 */
const Footer = () => {
  return (
    <footer className="py-8 bg-[#3E2F2B] text-[#E5D3B3] relative overflow-hidden font-body">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-black/20 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">

        {/* Names */}
        <h2 className="font-script text-4xl md:text-5xl mb-4 text-[#FFF5E1]">
          {COUPLE.displayName}
        </h2>

        {/* Separator */}
        <div className="w-12 h-[1px] bg-[#E5D3B3]/30 mb-4" />

        {/* Verse */}
        <div className="mb-6 max-w-lg mx-auto">
          <p className="font-heading text-base italic text-[#E5D3B3]/90 mb-2 leading-relaxed">
            "{BIBLE_VERSE.text}"
          </p>
          <p className="font-body text-[10px] uppercase tracking-widest text-[#E5D3B3]/60">
            — {BIBLE_VERSE.reference}
          </p>
        </div>

        {/* Admin Button */}
        <a
          href="/admin"
          className="inline-flex items-center gap-2 px-6 py-2 border border-[#E5D3B3]/20 rounded transition-all text-[10px] uppercase tracking-[0.2em] text-[#E5D3B3]/70 hover:text-[#3E2F2B] hover:bg-[#E5D3B3] hover:border-[#E5D3B3] mb-6"
        >
          <Settings className="w-3 h-3" />
          Painel Admin
        </a>

        {/* Credits */}
        <div className="flex flex-col items-center gap-2 border-t border-[#E5D3B3]/10 pt-6 w-full max-w-xs">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#E5D3B3]/40">
            Site desenvolvido por
          </p>

          <img
            src="/images/luma-logo-v2.png"
            alt="LUMA"
            className="h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
          />

          <a
            href="https://instagram.com/luma.convitesdigitais"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#E5D3B3]/60 hover:text-[#E5D3B3] transition-colors text-xs font-body"
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            @luma.convitesdigitais
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
