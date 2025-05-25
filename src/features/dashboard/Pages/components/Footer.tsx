import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTiktok, faYoutube, faSquareWhatsapp } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export default function Footer() {
  return (
    <footer className="bg-white border-t-2 border-black">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
          <div className="flex justify-center md:justify-start">
            <Image
              src="/images/logo.png"
              alt="FLASH VN Logo"
              width={120}
              height={120}
              className="w-32 h-auto md:w-48"
            />
          </div>
          <div className="flex flex-col justify-center items-start space-y-6 text-base md:text-lg text-gray-700 text-left">
            <div className="flex flex-col md:flex-row items-start md:space-x-12 space-y-4 md:space-y-0 w-full">
              <div className="flex items-center space-x-2">
                <span className="font-bold">Mail:</span>
                <a
                  href="mailto:contact@flashasean.org"
                  className="hover:text-blue-600 transition-colors"
                >
                  contact@flashasean.org
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold">Phone:</span>
                <a
                  href="tel:+84 939 249 127"
                  className="hover:text-blue-600 transition-colors"
                >
                  +84 939 249 127
                </a>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:space-x-4 space-y-2 md:space-y-0 w-full">
              <span className="font-bold">Follow us on social media:</span>
              <div className="flex items-center space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                  <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                  <FontAwesomeIcon icon={faTiktok} className="text-2xl" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                  <FontAwesomeIcon icon={faYoutube} className="text-2xl" />
                </a>
                <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                  <FontAwesomeIcon icon={faSquareWhatsapp} className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
