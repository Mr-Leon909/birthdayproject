import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'top', label: 'TOP' },
    { id: 'puzzle', label: '謎解き' },
    { id: 'schedule', label: '沖縄旅行表' },
    { id: 'secret', label: 'シークレット' },
    { id: 'sns', label: '2人だけのSNS' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
      >
        <div className="w-6 h-6 relative">
          <span className={`absolute w-full h-0.5 bg-black transition-all ${isOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
          <span className={`absolute w-full h-0.5 bg-black top-3 transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`absolute w-full h-0.5 bg-black transition-all ${isOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
        </div>
      </button>

      <div 
        className={`fixed inset-0 bg-white/95 backdrop-blur-md z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          opacity: isOpen ? '1' : '0',
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease'
        }}
      >
        <nav className="h-full flex items-center justify-center">
          <div className="text-center">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setIsOpen(false);
                }}
                className="block py-4 px-8 text-2xl text-black hover:text-[#B8860B] transition-colors"
                style={{
                  fontFamily: 'Noto Serif JP, serif',
                  opacity: isOpen ? '1' : '0',
                  transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  transitionDelay: `${menuItems.indexOf(item) * 0.1}s`
                }}
              >
                {item.label}
              </button>
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