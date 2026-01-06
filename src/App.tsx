import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense, useEffect } from "react";
import { CartProvider } from "./contexts/CartContext";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SEOManager from "@/components/SEOManager";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { GiftListPage } from "./components/GiftListPage";
import { THEME } from "@/config";

/**
 * Injects theme CSS variables from wedding config into :root
 * This allows dynamic theming based on the config file
 */
const useThemeInjection = () => {
  useEffect(() => {
    const root = document.documentElement;
    const { colors } = THEME;

    // Inject color variables
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--primary-foreground', colors.primaryForeground);
    root.style.setProperty('--secondary', colors.secondary);
    root.style.setProperty('--secondary-foreground', colors.secondaryForeground);
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--accent-foreground', colors.accentForeground);
    root.style.setProperty('--background', colors.background);
    root.style.setProperty('--foreground', colors.foreground);
    root.style.setProperty('--muted', colors.muted);
    root.style.setProperty('--muted-foreground', colors.mutedForeground);
    root.style.setProperty('--border', colors.border);

    // Wedding-specific colors
    root.style.setProperty('--wedding-cream', colors.weddingCream);
    root.style.setProperty('--wedding-gold', colors.weddingGold);
    root.style.setProperty('--wedding-brown', colors.weddingBrown);
    root.style.setProperty('--wedding-olive', colors.weddingOlive);
    root.style.setProperty('--wedding-tan', colors.weddingTan);
  }, []);
};

/**
 * Theme Provider wrapper that injects CSS variables
 */
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  useThemeInjection();
  return (
    <>
      <SEOManager />
      {children}
    </>
  );
};

// Lazy load AdminDashboard for better performance
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));

const queryClient = new QueryClient();

// Wrapper to provide navigate function to AdminDashboard
const AdminPage = () => {
  const navigate = useNavigate();
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <AdminDashboard onBack={() => navigate('/')} />
    </Suspense>
  );
};

const App = () => (
  <ThemeProvider>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <TooltipProvider>
            <ScrollProgress />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/lista-presentes" element={<GiftListPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ThemeProvider>
);

export default App;

