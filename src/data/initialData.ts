import { SocialProfile, CustomLink } from '../types';

export const INITIAL_PROFILE: SocialProfile = {
  name: 'Mayara Barros',
  role: 'Líder Executiva, Palestrante & Fundadora',
  tagline: 'Conectando liderança humanizada, governança com propósito e impacto transformador.',
  bio: 'Fundadora do Movimento RÁZGA e diretora no Grupo Novo Horizonte / INH Horizonte Mulher. Impulsionando lideranças femininas, equipes corporativas e projetos estratégicos de alto impacto.',
  location: 'Campo Grande - MS',
  email: 'escritorio.mayarabarros@gmail.com',
  phone: '+55 (67) 99667-1390',
  whatsapp: '5567996671390',
  instagram: 'https://instagram.com/mayarabarrosms',
  avatarUrl: '/perfil.jpeg',
  verified: true,
};

export const INITIAL_LINKS: CustomLink[] = [
  {
    id: 'link-1',
    title: 'CONHEÇA MINHA TRAJETÓRIA',
    subtitle: 'Biografia, experiências e construções que moldaram minha atuação.',
    url: '#biografia',
    iconName: 'book',
    featured: true,
  },
  {
    id: 'link-2',
    title: 'MUNDIAL BUSINESS',
    subtitle: 'Estratégia, desenvolvimento institucional e projetos de impacto.',
    url: '#mundial-business',
    iconName: 'briefcase',
    isUpcoming: true,
  },
  {
    id: 'link-3',
    title: 'MOVIMENTO RÁZGA®',
    subtitle: 'Pertencimento, mobilização e incidência a partir da ruptura do silenciamento das mulheres.',
    url: 'https://razga.vercel.app',
    iconName: 'flame',
  },
  {
    id: 'link-4',
    title: 'GRUPO NOVO HORIZONTE®',
    subtitle: 'Ecossistema de desenvolvimento humano, formação, negócios e impacto social.',
    url: 'https://grupo-novo-horizonte.vercel.app',
    iconName: 'building',
  },
  {
    id: 'link-5',
    title: 'INSTITUTO NOVO HORIZONTE',
    subtitle: 'Projetos e iniciativas para mulheres, famílias e comunidades.',
    url: 'https://horizonte-mulher.vercel.app',
    iconName: 'heart',
  },
  {
    id: 'link-6',
    title: 'PALESTRAS & CONVITES',
    subtitle: 'Palestras, eventos, painéis e participações institucionais.',
    url: 'https://wa.me/5567996671390?text=' + encodeURIComponent('Olá Mayara, gostaria de convidá-la para palestra/evento/painel institucional.'),
    iconName: 'mic',
    ctaText: 'Convidar Mayara',
    featured: true,
  },
];
