import React, { useState } from 'react';
import {
  ExternalLink,
  BookOpen,
  Flame,
  HeartHandshake,
  Building2,
  Globe,
  Star,
  Copy,
  Check,
} from 'lucide-react';
import { CustomLink } from '../types';

interface LinksSectionProps {
  links: CustomLink[];
  onOpenBiography: () => void;
}

export const LinksSection: React.FC<LinksSectionProps> = ({ links, onOpenBiography }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getIcon = (iconName: CustomLink['iconName']) => {
    switch (iconName) {
      case 'book':
        return <BookOpen className="w-5 h-5 text-[#631B26]" />;
      case 'flame':
        return <Flame className="w-5 h-5 text-amber-600" />;
      case 'heart':
        return <HeartHandshake className="w-5 h-5 text-rose-600" />;
      case 'building':
        return <Building2 className="w-5 h-5 text-stone-700" />;
      case 'star':
        return <Star className="w-5 h-5 text-amber-500" />;
      default:
        return <Globe className="w-5 h-5 text-stone-600" />;
    }
  };

  const handleCopyLink = async (e: React.MouseEvent, id: string, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <section id="links" className="px-2 sm:px-4 py-2 sm:py-3">
      <div className="max-w-xl mx-auto">
        {/* Section Header with compact spacing */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-stone-900 font-editorial tracking-tight">
              Links & Trajetória
            </h2>
            <p className="text-[11px] sm:text-xs text-stone-500">
              Trajetória, movimentos e ecossistema institucional
            </p>
          </div>
          <span className="text-[11px] font-mono text-stone-400 tabular-nums">
            {links.length} canais
          </span>
        </div>

        {/* Links Cards List with full button titles and no truncation */}
        <div className="space-y-2.5">
          {links.map((link) => {
            const isCopied = copiedId === link.id;
            const isBiography =
              link.id === 'link-1' ||
              link.url === '#biografia' ||
              link.title.toLowerCase().includes('trajetória');

            if (isBiography) {
              const internalBioUrl = typeof window !== 'undefined'
                ? `${window.location.origin}${window.location.pathname}#biografia`
                : '#biografia';

              return (
                <div
                  key={link.id}
                  onClick={onOpenBiography}
                  className="group relative flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#631B26]/30 hover:border-[#631B26] hover:shadow-md transition-all duration-200 active:scale-[0.99] text-left cursor-pointer gap-2"
                >
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FAF8F5] group-hover:bg-[#631B26]/10 border border-[#631B26]/20 flex items-center justify-center shrink-0 transition-colors">
                      {getIcon(link.iconName)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <h3 className="text-xs sm:text-sm md:text-base font-semibold text-stone-900 group-hover:text-[#631B26] transition-colors leading-snug">
                          {link.title}
                        </h3>
                        <span className="text-[9px] sm:text-[10px] text-[#631B26] font-semibold bg-[#631B26]/10 px-1.5 py-0.5 rounded-full shrink-0">
                          Página Oficial
                        </span>
                      </div>
                      {link.subtitle && (
                        <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5 leading-snug group-hover:text-stone-600 transition-colors">
                          {link.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => handleCopyLink(e, link.id, internalBioUrl)}
                      className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
                      title="Copiar URL da Biografia"
                      aria-label={`Copiar link para ${link.title}`}
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[#631B26] group-hover:translate-x-0.5 transition-all">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-stone-200/90 hover:border-stone-400 hover:shadow-md transition-all duration-200 active:scale-[0.99] text-left gap-2"
              >
                <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-stone-100 group-hover:bg-amber-100/60 border border-stone-200 flex items-center justify-center shrink-0 transition-colors">
                    {getIcon(link.iconName)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs sm:text-sm md:text-base font-semibold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                      {link.title}
                    </h3>
                    {link.subtitle && (
                      <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5 leading-snug group-hover:text-stone-600 transition-colors">
                        {link.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => handleCopyLink(e, link.id, link.url)}
                    className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
                    title="Copiar URL"
                    aria-label={`Copiar link para ${link.title}`}
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-stone-400 group-hover:text-stone-700 group-hover:translate-x-0.5 transition-all">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
