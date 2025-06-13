// src/app/(page)/contact-us/page.tsx

import ContactUsClient from '@/features/dashboard/Page/components/ContactUsClient';

export const metadata = {
  title: 'Contact Us - FLASH VN',
  description: 'Get in touch with FLASH VN team for inquiries, partnerships, or support.',
};

export default function Page() {
  return <ContactUsClient />;
}
