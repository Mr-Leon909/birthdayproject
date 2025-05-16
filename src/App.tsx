import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import BirthdayIntro from './BirthdayIntro';
import TopPage from './components/TopPage';
import SNSPage from './components/SNSPage';
import Quiz from './components/quiz';
import Navigation from './components/Navigation';
import SecretPage from './components/secretPage';
import logoImage from './assets/logo.png';

// App内のロジックとLocationObserverを分離
const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('intro');
  const [showIntroOnHome, setShowIntroOnHome] = useState(true);
  const location = useLocation();

  const handleBirthdayIntroFinish = () => {
    setCurrentPage('top');
    setShowIntroOnHome(false);
  };
  
  // locationの変更を監視
  useEffect(() => {
    if (location.pathname === '/') {
      setShowIntroOnHome(true);
    }
  }, [location]);

  return (
    <div>
      {(currentPage === 'intro' || (showIntroOnHome && location.pathname === '/')) ? (
        <BirthdayIntro onFinish={handleBirthdayIntroFinish} />
      ) : (
        <div className="z-10">
          <img src={logoImage} alt="Logo" className="mt-3 left-7 w-12 h-13" />
          <Navigation/>
          <Routes>
            <Route path="/" element={<TopPage />} />
            <Route path="/sns/*" element={<SNSPage />} />
            <Route path="/quiz/*" element={<Quiz />} />
            <Route path="/secret" element={<SecretPage />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
