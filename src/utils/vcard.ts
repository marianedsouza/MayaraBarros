import { SocialProfile } from '../types';

export function generateVCard(profile: SocialProfile): string {
  const nameParts = profile.name.trim().split(' ');
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
  const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : profile.name;

  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${profile.name}`,
    `TITLE:${profile.role}`,
    'ORG:Mundial Business;Movimento RÁZGA',
    `NOTE:${profile.bio}`,
    profile.phone ? `TEL;TYPE=CELL,VOICE;PREF:${profile.phone}` : '',
    'TEL;TYPE=CELL,VOICE:+55 67 9667-1390',
    `EMAIL;TYPE=PREF,INTERNET:${profile.email}`,
    'ADR;TYPE=WORK:;;Campo Grande;MS;;Brasil',
    profile.instagram ? `URL;TYPE=Instagram:${profile.instagram}` : '',
    'END:VCARD',
  ]
    .filter(Boolean)
    .join('\r\n');
}

export function downloadVCard(profile: SocialProfile): void {
  const vcardData = generateVCard(profile);
  const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const fileName = `${profile.name.toLowerCase().replace(/\s+/g, '_')}_contato.vcf`;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
