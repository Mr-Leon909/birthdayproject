import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BirthdayIntro from './BirthdayIntro';
import TopPage from './components/TopPage';
import SNSPage from './components/SNSPage';
import Quiz from './components/quiz';
import SecretPage from './components/SecretPage';
import TravelSchedule from './components/TravelSchedule';
import Navigation from './components/Navigation';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem('introSeen') ? 'top' : 'intro';
  });

  const handleBirthdayIntroFinish = () => {
    // 初回閲覧済フラグを保存
    localStorage.setItem('introSeen', 'true');
    setCurrentPage('top');
  };

  return (
    <Router>
      <div>
        {currentPage === 'intro' ? (
          <BirthdayIntro onFinish={handleBirthdayIntroFinish} />
        ) : (
            <div className="inset-0 z-10">
            <img src="../assets/logo.png" alt="Logo" className="top-6 left-7 w-10 h-10" />
            <Navigation/>
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
