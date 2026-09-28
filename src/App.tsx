import { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { INITIAL_PROFILE, INITIAL_LINKS } from './data/initialData';
import { SocialProfile, CustomLink } from './types';
import { Header } from './components/Header';
import { ProfileSection } from './components/ProfileSection';
import { LinksSection } from './components/LinksSection';
import { BiographyPage } from './components/BiographyPage';
import { QrCodeModal } from './components/QrCodeModal';

export default function App() {
  // Page routing: 'card' | 'biografia'
  const [currentPage, setCurrentPage] = useState<'card' | 'biografia'>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#biografia') {
      return 'biografia';
    }
    return 'card';
  });

  // Profile data
  const [profile] = useState<SocialProfile>(INITIAL_PROFILE);
  const [links] = useState<CustomLink[]>(INITIAL_LINKS);

  // Modals & Panels
  const [isQrOpen, setIsQrOpen] = useState(false);

  // Feedback Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Clean up any stale localStorage from previous editing versions
  useEffect(() => {
    try {
      localStorage.removeItem('mb_card_profile_v2');
      localStorage.removeItem('mb_card_profile');
    } catch {
      // ignore
    }
  }, []);

  // Synchronize hash with current page
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#biografia') {
        setCurrentPage('biografia');
      } else {
        setCurrentPage('card');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: 'card' | 'biografia') => {
    setCurrentPage(page);
    if (page === 'biografia') {
      window.location.hash = 'biografia';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://cartao-digital.app';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Cartão Digital - ${profile.name}`,
          text: `Acesse o cartão digital profissional e biografia de ${profile.name}`,
          url: currentUrl,
        });
      } catch {
        // User dismissed
      }
    } else {
      setIsQrOpen(true);
    }
  };

  if (currentPage === 'biografia') {
    return <BiographyPage onBackToCard={() => navigateTo('card')} />;
  }

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900">
      {/* Anchor top */}
      <div id="top" />

      {/* Top Header */}
      <Header
        brandName={profile.name}
        onOpenQr={() => setIsQrOpen(true)}
        onShare={handleShare}
        onOpenBiography={() => navigateTo('biografia')}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-xl mx-auto px-2 sm:px-4 pb-6 sm:pb-10">
        {/* Profile Section */}
        <ProfileSection
          profile={profile}
          onOpenQr={() => setIsQrOpen(true)}
          onShare={handleShare}
        />

        {/* Links Section */}
        <LinksSection
          links={links}
          onOpenBiography={() => navigateTo('biografia')}
          onShowToast={showToast}
        />
      </main>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 inset-x-0 z-50 flex justify-center pointer-events-none px-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-2 px-4 rounded-xl bg-stone-900 text-white text-xs font-medium shadow-lg flex items-center gap-2 border border-stone-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Modals */}
      <QrCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        url={currentUrl}
        name={profile.name}
      />

      {/* Clean Editorial Footer */}
      <footer className="w-full border-t border-stone-200/80 bg-stone-100 py-4 sm:py-6 px-4 text-center">
        <div className="max-w-xl mx-auto space-y-1.5 text-stone-500 text-xs">
          <p className="font-semibold text-stone-800 tracking-tight font-editorial text-sm">
            {profile.name}
          </p>
          <p className="text-[11px] text-stone-400">
            Cartão Digital Profissional · Conectando Propósito, Liderança e Negócios
          </p>
          <div className="pt-2 text-[10px] text-stone-400">
            © {new Date().getFullYear()} Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
