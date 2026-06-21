import { redirect } from 'next/navigation';

export default function MisspelledSocialSecurityPage() {
  redirect('/social-security');
}
