import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="font-script text-4xl mb-4">Eduardo & Nicole</p>
        <p className="font-heading text-lg opacity-80 mb-6">28 de Fevereiro de 2026</p>
        
        <div className="flex items-center justify-center gap-2 text-sm opacity-60">
          <span>Feito com</span>
          <Heart className="w-4 h-4 fill-current text-red-400" />
          <span>para o nosso grande dia</span>
        </div>
        
        <p className="font-heading text-sm opacity-40 mt-8">
          "O Senhor fez isto, e é maravilhoso aos nossos olhos." — Salmos 118:23
        </p>
      </div>
    </footer>
  );
};

export default Footer;
