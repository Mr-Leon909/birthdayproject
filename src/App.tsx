import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BirthdayIntro from './BirthdayIntro';
import TopPage from './components/TopPage';
import SNSPage from './components/SNSPage';
import PuzzlePage from './components/PuzzlePage';
import SecretPage from './components/SecretPage';
import TravelSchedule from './components/TravelSchedule';

function App() {
  const [currentPage, setCurrentPage] = useState('intro');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBirthdayIntroFinish = () => {
    setCurrentPage('top');
  };

  const menuItems = [
    { id: 'top', label: 'TOP', path: '/' },
    { id: 'sns', label: 'TSUTSUJI', path: '/sns/login' },
    { id: 'puzzle', label: '謎解き', path: '/puzzle' },
    { id: 'secret', label: 'メッセージページ', path: '/secret' },
  ];

  return (
    <Router>
      <div>
        {currentPage === 'intro' ? (
          <BirthdayIntro onFinish={handleBirthdayIntroFinish} />
        ) : (
          <div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="fixed top-4 right-4 z-50 p-2 bg-gray-300/80 backdrop-blur-sm rounded-full shadow-lg"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute w-full h-0.5 bg-black transition-all ${menuOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
                <span className={`absolute w-full h-0.5 bg-black top-3 ${menuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`absolute w-full h-0.5 bg-black transition-all ${menuOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
              </div>
            </button>

            <div className={`fixed inset-0 bg-gray-400/20 backdrop-blur-md z-40 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <nav className="h-full flex items-center justify-center">
                <div className="text-center">
                  {menuItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => {
                        setCurrentPage(item.id);
                        setMenuOpen(false);
                      }}
                      className="block py-4 px-8 text-2xl text-black hover:text-[#B8860B] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>

            <Routes>
              <Route path="/" element={<TopPage />} />
              <Route path="/sns/*" element={<SNSPage />} />
              <Route path="/puzzle" element={<PuzzlePage />} />
              <Route path="/secret" element={<SecretPage />} />
              <Route path="/schedule" element={<TravelSchedule />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;