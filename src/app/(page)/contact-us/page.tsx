import Section from '@/features/dashboard/Page/components/Section';
import Image from 'next/image';
import Link from 'next/link';


export const metadata = {
  title: 'Contact Us - FLASH VN',
  description: 'Get in touch with FLASH VN team for inquiries, partnerships, or support.',
};

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <Section title="" className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-600 mb-4"><span className="text-black bg-[#FFCF24] px-2 py-2 rounded-2xl">FLASH VN</span>{' '}Social Enterprise LLC</h2>
                <p className="text-gray-700">
                  Business Registration Number: 0317922010 <br />
                  Address: 102A Le Trung Nghia, Tan Binh District, Ho Chi Minh, 700000 <br />
                  Email: <a href="mailto:contact@flashasean.org" className="text-blue-600 hover:underline">contact@flashasean.org</a> <br />
                  Mobile/Whatsapp: +84 939 249 127
                </p>
              </div>
              <Link
                href="/what-we-do"
                className="inline-block border border-black font-bold rounded-full px-4 py-2 text-sm text-black hover:bg-[#FFCF24] hover:border-2 transition-colors"
              >
                Discover our programs
              </Link>
            </div>
            <div className="relative h-[300px] w-full">
              <Image
                src="/images/holistic-approach.png"
                alt="Holistic approach illustration"
                fill
                className="object-contain"
              />
            </div>

          </div>
        </Section>
        <Section title="" className="py-8 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-black mb-4">Support us 💖💖💖</h2>
            <p className="text-gray-700 mb-6">
              With a spirit of community service, most activities organized by FLASH VN are entirely non-profit. 
              We do not charge any fees for workshops at schools or local education departments. However, costs such as travel, 
              instructor support, and social media maintenance require funding. When sponsorship is unavailable, we’ve implemented 
              solutions like organizing small courses and workshops with minimal fees to sustain operations.
            </p>
            <p className="text-gray-700 mb-6">
              We deeply appreciate contributions from the community to help maintain and expand our activities, ensuring greater 
              benefits for everyone. Every contribution serves as a vital motivation for us to innovate and grow in our mission 
              to improve the quality of human resources in Vietnam.
            </p>
            <h3 className="text-lg font-bold text-black mb-4">Donation Information</h3>
            <ul className="text-gray-700 space-y-2">
              <li>Recipient: FLASH VN SOCIAL ENTERPRISE LLC</li>
              <li>Bank: VP Bank – Go Vap Branch</li>
              <li>Account Number: 338149999</li>
              <li>
                Transfer Note: &quot;Support Project – [Your Name] – [Your Email/Phone Number]&quot;
              </li>
            </ul>
            <p className="text-gray-700 mt-4">
              All benefactors will receive monthly updates (newsletters) via email/Zalo, and detailed project outcomes will also 
              be updated on the project’s website.
            </p>
          </div>
        </Section>
        <div className="w-full h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d358.4888780044865!2d106.64665788561821!3d10.800763133282114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752948c52f0343%3A0x8d264868419183a!2zMTAyQSBMw6ogVHJ1bmcgTmdoxKlhLCBQaMaw4budbmcgMTIsIFTDom4gQsOsbmgsIEjhu5MgQ2jDrSBNaW5oIDcwMDAwMCwgVmnhu4d0IE5hbQ!5e1!3m2!1svi!2sus!4v1745797939844!5m2!1svi!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </main>
    </div>
  );
}
