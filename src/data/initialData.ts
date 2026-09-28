import { SocialProfile, CustomLink } from '../types';

export const INITIAL_PROFILE: SocialProfile = {
  name: 'Mayara Barros',
  role: 'Líder Executiva, Palestrante & Fundadora',
  tagline: 'Conectando liderança humanizada, governança com propósito e impacto transformador.',
  bio: 'Fundadora do Movimento RÁZGA e diretora no Grupo Novo Horizonte / INH Horizonte Mulher. Impulsionando lideranças femininas, equipes corporativas e projetos estratégicos de alto impacto.',
  location: 'Campo Grande - MS',
  email: 'escritorio.mayarabarros@gmail.com',
  instagram: 'https://instagram.com/mayarabarrosms',
  avatarUrl: '/perfil.jpeg',
  verified: true,
};

export const INITIAL_LINKS: CustomLink[] = [
  {
    id: 'link-1',
    title: 'Conheça minha trajetória',
    subtitle: 'Perfil executivo 2026, biografia completa, projetos e instituições',
    url: '#biografia',
    iconName: 'book',
    featured: true,
  },
  {
    id: 'link-2',
    title: 'Movimento RÁZGA',
    subtitle: 'Comunidade e iniciativa de aceleração e protagonismo feminino',
    url: 'https://razga.vercel.app',
    iconName: 'flame',
    featured: true,
  },
  {
    id: 'link-3',
    title: 'INH | Horizonte Mulher',
    subtitle: 'Instituto focado no empoderamento socioeconômico e liderança',
    url: 'https://horizonte-mulher.vercel.app',
    iconName: 'heart',
  },
  {
    id: 'link-4',
    title: 'Grupo Novo Horizonte',
    subtitle: 'Ecossistema empresarial multissetorial e projetos estratégicos',
    url: 'https://grupo-novo-horizonte.vercel.app',
    iconName: 'building',
  },
];
