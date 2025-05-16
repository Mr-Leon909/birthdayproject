import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'top', label: 'TOP', link: "/" },
    { id: 'sns', label: 'TSUTSUJI', link: "/sns" },
    { id: 'puzzle', label: '謎解き', link: "/quiz"},
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2"
      >
        <div className="w-6 h-6 relative">
          <span className={`absolute w-full h-0.5 bg-black transition-all ${isOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
          <span className={`absolute w-full h-0.5 bg-black top-3 transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`absolute w-full h-0.5 bg-black transition-all ${isOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
        </div>
      </button>

      <div
        className={`fixed inset-0 bg-gray-400/20 backdrop-blur-md z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          opacity: isOpen ? '1' : '0',
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease'
        }}
      >
        <nav className="h-full flex items-center justify-center">
          <div className="text-center">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                onClick={() => {
                  setIsOpen(false);
                }}
                className="block py-4 px-8 text-2xl text-black transition-colors"
                style={{
                  fontFamily: 'Noto Serif JP, serif',
                  opacity: isOpen ? '1' : '0',
                  transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  transitionDelay: `${menuItems.indexOf(item) * 0.1}s`
                }}
                to={item.link}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <style>{`
        @keyframes menuFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
