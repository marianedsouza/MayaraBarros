export interface SocialProfile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  instagram: string;
  linkedin?: string;
  avatarUrl: string;
  verified: boolean;
}

export interface CustomLink {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  iconName: 'book' | 'flame' | 'heart' | 'building' | 'globe' | 'star';
  featured?: boolean;
}
