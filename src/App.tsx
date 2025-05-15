import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BirthdayIntro from './BirthdayIntro';
import TopPage from './components/TopPage';
import SNSPage from './components/SNSPage';
import Quiz from './components/quiz';
import SecretPage from './components/SecretPage';
import TravelSchedule from './components/TravelSchedule';
import logo from '../assets/logo.png';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem('introSeen') ? 'top' : 'intro';
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBirthdayIntroFinish = () => {
    // 初回閲覧済フラグを保存
    localStorage.setItem('introSeen', 'true');
    setCurrentPage('top');
  };

  const menuItems = [
    { id: 'top', label: 'TOP', link: "/" },
    { id: 'sns', label: 'TSUTSUJI', link: "/sns" },
    { id: 'puzzle', label: '謎解き', link: "/quiz"},
    { id: 'secret', label: 'メッセージページ', link: "/secret" },
  ];

  return (
    <Router>
      <div>
        {currentPage === 'intro' ? (
          <BirthdayIntro onFinish={handleBirthdayIntroFinish} />
        ) : (
            <div className="inset-0 z-10">
            <img src={logo} alt="Logo" className="top-6 left-7 w-10 h-10" />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="fixed top-4 right-4 z-50 p-2 bg-transparent backdrop-blur-sm rounded-full shadow-lg"
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
                    <a
                      key={item.id}
                      onClick={() => {
                        setCurrentPage(item.id);
                        setMenuOpen(false);
                      }}
                      className="block py-4 px-8 text-2xl text-black hover:text-[#B8860B] transition-colors"
                      href={item.link ? item.link : undefined}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </nav>
            </div>

            <Routes>
              <Route path="/" element={<TopPage />} />
              <Route path="/sns/*" element={<SNSPage />} />
              <Route path="/quiz/*" element={<Quiz />} />
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
