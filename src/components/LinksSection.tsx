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
    <section id="links" className="px-4 py-8">
      <div className="max-w-xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 font-editorial tracking-tight">
              Links
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Trajetória, movimentos e ecossistema institucional
            </p>
          </div>
          <span className="text-xs font-mono text-stone-400 tabular-nums">
            {links.length} canais
          </span>
        </div>

        {/* Links Cards List */}
        <div className="space-y-3">
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
                  className="group relative flex items-center justify-between p-4 sm:p-4.5 rounded-2xl bg-white border border-[#631B26]/30 hover:border-[#631B26] hover:shadow-md transition-all duration-200 active:scale-[0.99] text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 pr-2">
                    <div className="w-11 h-11 rounded-xl bg-[#FAF8F5] group-hover:bg-[#631B26]/10 border border-[#631B26]/20 flex items-center justify-center shrink-0 transition-colors">
                      {getIcon(link.iconName)}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-semibold text-stone-900 group-hover:text-[#631B26] transition-colors truncate">
                          {link.title}
                        </h3>
                        <span className="text-[10px] text-[#631B26] font-semibold bg-[#631B26]/10 px-2 py-0.5 rounded-full">
                          Página Oficial
                        </span>
                      </div>
                      {link.subtitle && (
                        <p className="text-xs text-stone-500 line-clamp-1 mt-0.5 group-hover:text-stone-600 transition-colors">
                          {link.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 pl-2">
                    <button
                      onClick={(e) => handleCopyLink(e, link.id, internalBioUrl)}
                      className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors opacity-70 sm:opacity-0 sm:group-hover:opacity-100"
                      title="Copiar URL da Biografia"
                      aria-label={`Copiar link para ${link.title}`}
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#631B26] group-hover:translate-x-0.5 transition-all">
                      <ExternalLink className="w-4 h-4" />
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
                className="group relative flex items-center justify-between p-4 sm:p-4.5 rounded-2xl bg-white border border-stone-200/90 hover:border-stone-400 hover:shadow-md transition-all duration-200 active:scale-[0.99] text-left"
              >
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 pr-2">
                  <div className="w-11 h-11 rounded-xl bg-stone-100 group-hover:bg-amber-50/70 border border-stone-200/60 flex items-center justify-center shrink-0 transition-colors">
                    {getIcon(link.iconName)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-semibold text-stone-900 group-hover:text-amber-900 transition-colors truncate">
                        {link.title}
                      </h3>
                      {link.featured && (
                        <span className="text-[10px] text-amber-700 font-medium">
                          · Destaque
                        </span>
                      )}
                    </div>
                    {link.subtitle && (
                      <p className="text-xs text-stone-500 line-clamp-1 mt-0.5 group-hover:text-stone-600 transition-colors">
                        {link.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 pl-2">
                  <button
                    onClick={(e) => handleCopyLink(e, link.id, link.url)}
                    className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors opacity-70 sm:opacity-0 sm:group-hover:opacity-100"
                    title="Copiar URL"
                    aria-label={`Copiar link para ${link.title}`}
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 transition-all">
                    <ExternalLink className="w-4 h-4" />
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
