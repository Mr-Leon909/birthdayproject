import { useState } from 'react';
import BirthdayIntro from './BirthdayIntro';
import TopPage from './components/TopPage';

function App() {
  const [currentPage, setCurrentPage] = useState('intro');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBirthdayIntroFinish = () => {
    setCurrentPage('top');
  };

  const menuItems = [
    { id: 'top', label: 'TOP' },
    { id: 'puzzle', label: '謎解き' },
    { id: 'schedule', label: '沖縄旅行表' },
    { id: 'secret', label: 'シークレット' },
    { id: 'sns', label: '2人だけのSNS' },
  ];

  return (
    <div>
      {currentPage === 'intro' ? (
        <BirthdayIntro onFinish={handleBirthdayIntroFinish} />
      ) : (
        <div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="fixed top-4 right-4 z-50 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
          >
            <div className="w-6 h-6 relative">
              <span className={`absolute w-full h-0.5 bg-black transition-all ${menuOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
              <span className={`absolute w-full h-0.5 bg-black top-3 ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`absolute w-full h-0.5 bg-black transition-all ${menuOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
            </div>
          </button>

          <div className={`fixed inset-0 bg-white/95 backdrop-blur-md z-40 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <nav className="h-full flex items-center justify-center">
              <div className="text-center">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setMenuOpen(false);
                    }}
                    className="block py-4 px-8 text-2xl hover:text-red-500 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          <main>
            <TopPage />
          </main>
        </div>
      )}
    </div>
  );
}

export default App;