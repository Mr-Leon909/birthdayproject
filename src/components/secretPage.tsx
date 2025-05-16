import { useState } from 'react';
import { motion } from 'framer-motion';

export default function secretPage() {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');

  const correctPassword = '1206';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === correctPassword) {
      setUnlocked(true);
      setError('');
    } else {
      setError('パスワードが違うみたい…');
    }
  };

  const handleDownloadImage = () => {
    const imageUrl = '/src/assets/quiz.png'; 
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'love_love_message.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf6f0] px-4">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {!unlocked ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🔐 暗証番号を入力してね
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f29e9e]"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                onClick={handleDownloadImage}
                className="inline-flex items-center bg-[#0493a6] text-white py-3 px-6 mt-6 rounded transition-colors"
              >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
                メッセージをダウンロード
              </button>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
