import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { CartProvider } from "./contexts/CartContext";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { GiftListPage } from "./components/GiftListPage";

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
);

export default App;

