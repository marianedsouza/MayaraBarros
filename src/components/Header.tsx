import React from 'react';
import { QrCode, Share2 } from 'lucide-react';

interface HeaderProps {
  brandName: string;
  onOpenQr: () => void;
  onShare: () => void;
  onOpenBiography?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  brandName,
  onOpenQr,
  onShare,
  onOpenBiography,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-stone-100/85 border-b border-stone-200/80 transition-colors">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="text-sm tracking-widest uppercase font-semibold text-stone-900 hover:text-stone-700 transition-colors truncate max-w-[200px]"
        >
          {brandName}
        </a>

        {/* Zone 2: Clean internal links */}
        <nav className="hidden sm:flex items-center gap-5 text-xs font-medium text-stone-500">
          <a href="#perfil" className="hover:text-stone-900 transition-colors">
            Perfil
          </a>
          {onOpenBiography && (
            <button
              onClick={onOpenBiography}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Biografia
            </button>
          )}
          <a href="#links" className="hover:text-stone-900 transition-colors">
            Links
          </a>
          <a href="#contato" className="hover:text-stone-900 transition-colors">
            Contato
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={onOpenQr}
            className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-xl transition-colors cursor-pointer"
            title="Exibir QR Code"
            aria-label="Abrir QR Code do cartão"
          >
            <QrCode className="w-4 h-4" />
          </button>

          <button
            onClick={onShare}
            className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-xl transition-colors cursor-pointer"
            title="Compartilhar Cartão"
            aria-label="Compartilhar Cartão"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
