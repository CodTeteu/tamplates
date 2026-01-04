import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Settings } from "lucide-react";
import { NAV_ITEMS, COUPLE } from "@/constants";
import type { NavItem } from "@/types";

const SCROLL_THRESHOLD = 10;

/**
 * Navigation Component
 * Mobile-first responsive navigation with slide-in drawer
 */
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: (isScrolled || isMobileMenuOpen) ? 0 : -100 }}
        transition={{ duration: 0.6 }}
        className={`mobile-nav z-50 transition-all duration-500 ${isScrolled || isMobileMenuOpen
          ? "fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-xl shadow-lg border-b border-border/30 py-3 md:py-4"
          : "absolute top-0 left-0 right-0 bg-transparent py-4 md:py-8"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("#inicio")}
              className={`font-script text-3xl md:text-4xl transition-all duration-300 hover:scale-105 z-50 drop-shadow-sm ${isScrolled || isMobileMenuOpen ? "text-primary" : "text-background"
                }`}
            >
              {COUPLE.initials}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 lg:gap-10">
              {NAV_ITEMS.map((item: NavItem) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`font-body text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:text-primary relative group ${isScrolled ? "text-foreground" : "text-background"
                    }`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`mobile-menu-btn md:hidden p-2 rounded-full transition-all duration-300 z-50 ${isScrolled || isMobileMenuOpen
                ? "text-foreground hover:bg-foreground/10"
                : "text-background hover:bg-background/10"
                } `}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu - Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] max-w-[80vw] bg-background/95 backdrop-blur-xl border-l border-border/30 shadow-2xl z-[100] flex flex-col items-center justify-center transition-transform duration-500 ease-out md:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Close Button */}
        <button
          onClick={closeMenu}
          className="absolute top-5 right-5 p-2 text-muted-foreground hover:text-primary transition-colors z-20"
        >
          <X className="w-7 h-7" />
        </button>

        {/* Monogram Header */}
        <div className="text-center mb-12 mt-8">
          <div className="font-script text-5xl text-primary drop-shadow-sm">
            {COUPLE.initials}
          </div>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mt-4" />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col items-center gap-2 w-full px-8">
          {NAV_ITEMS.map((item: NavItem, index) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              style={{ transitionDelay: isMobileMenuOpen ? `${index * 75} ms` : "0ms" }}
              className={`w-full text-center text-xl font-heading text-foreground hover:text-primary transition-all duration-300 py-3 border-b border-transparent hover:border-primary/10 transform ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Separator */}
        <div className="w-12 h-px bg-border mt-6" />

        {/* Admin Link */}
        <a
          href="/admin"
          className="mt-6 text-[10px] uppercase tracking-[0.25em] font-medium text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
        >
          <Settings className="w-3 h-3" />
          Área Restrita
        </a>
      </div>
    </>
  );
};

export default Navigation;
