import React from 'react';
import {
  BadgeCheck,
  Download,
  Share2,
  Mail,
  MapPin,
} from 'lucide-react';
import { SocialProfile } from '../types';
import { downloadVCard } from '../utils/vcard';
import perfilPhoto from '../assets/perfil.jpeg';

interface ProfileSectionProps {
  profile: SocialProfile;
  onOpenQr: () => void;
  onShare: () => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  profile,
  onShare,
}) => {
  const handleSaveContact = () => {
    downloadVCard(profile);
  };

  return (
    <section id="perfil" className="pt-8 pb-10 px-4 text-center">
      {/* Profile Photo Frame */}
      <div className="relative inline-block mx-auto mb-6">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-amber-600/40 via-stone-300 to-amber-700/30 shadow-md">
          <div className="w-full h-full rounded-full overflow-hidden bg-stone-200 border-2 border-white flex items-center justify-center relative">
            <img
              src={perfilPhoto}
              alt={profile.name}
              className="w-full h-full object-cover object-[center_20%]"
            />
          </div>
        </div>

        {profile.verified && (
          <div
            className="absolute bottom-1 right-1 bg-amber-600 text-white rounded-full p-1 border-2 border-white shadow-sm"
            title="Perfil Verificado"
          >
            <BadgeCheck className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Name and Professional Title */}
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight font-editorial">
            {profile.name}
          </h1>
        </div>

        <p className="mt-2 text-sm sm:text-base font-medium text-stone-700 tracking-tight">
          {profile.role}
        </p>

        {profile.location && (
          <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-stone-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-amber-700/80" />
            <span>{profile.location}</span>
          </div>
        )}

        {/* Bio & Tagline */}
        <p className="mt-4 text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
          {profile.bio}
        </p>
      </div>

      {/* Action Buttons: Salvar Contato & Compartilhar */}
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3 max-w-xs sm:max-w-sm mx-auto">
        <button
          onClick={handleSaveContact}
          className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 active:scale-[0.98] transition-all shadow-sm cursor-pointer"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>Salvar Contato</span>
        </button>

        <button
          onClick={onShare}
          className="flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-white border border-stone-300 text-stone-800 text-xs font-semibold hover:bg-stone-50 hover:border-stone-400 active:scale-[0.98] transition-all shadow-2xs cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-stone-600" />
          <span>Compartilhar</span>
        </button>
      </div>

      {/* Direct Quick Channels Bar: Instagram & Email */}
      <div id="contato" className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
        {profile.instagram && (
          <a
            href={profile.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-4 rounded-xl bg-white border border-stone-200/90 flex items-center gap-2 text-stone-700 hover:text-pink-700 hover:border-pink-300 hover:bg-pink-50/50 transition-all shadow-2xs text-xs font-medium cursor-pointer"
            title="Instagram @mayarabarrosms"
            aria-label="Acessar Instagram @mayarabarrosms"
          >
            <svg
              className="w-4 h-4 fill-current shrink-0 text-stone-600 group-hover:text-pink-700"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span>@mayarabarrosms</span>
          </a>
        )}

        {profile.email && (
          <a
            href={`mailto:${profile.email}`}
            className="h-10 px-4 rounded-xl bg-white border border-stone-200/90 flex items-center gap-2 text-stone-700 hover:text-stone-900 hover:border-stone-400 hover:bg-stone-50 transition-all shadow-2xs text-xs font-medium cursor-pointer"
            title={`E-mail: ${profile.email}`}
            aria-label={`Enviar E-mail para ${profile.email}`}
          >
            <Mail className="w-4 h-4 text-stone-600 shrink-0" />
            <span>{profile.email}</span>
          </a>
        )}
      </div>
    </section>
  );
};
