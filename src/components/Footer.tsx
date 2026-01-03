import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 bg-foreground text-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-background/30 to-transparent mx-auto mb-8" />
        
        <p className="font-script text-5xl mb-4">Eduardo & Nicole</p>
        <p className="font-heading text-lg opacity-70 tracking-widest mb-8">28 de Fevereiro de 2026</p>
        
        <div className="flex items-center justify-center gap-2 text-sm opacity-50 mb-10">
          <span className="font-body">Feito com</span>
          <Heart className="w-4 h-4 fill-current text-red-400 animate-pulse" />
          <span className="font-body">para o nosso grande dia</span>
        </div>
        
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-background/30 to-transparent mx-auto mb-8" />
        
        <p className="font-heading text-sm opacity-40 italic max-w-md mx-auto">
          "O Senhor fez isto, e é maravilhoso aos nossos olhos."
          <br />
          <span className="not-italic tracking-widest text-xs">— Salmos 118:23</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
