// MessagePage.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MessagePage() {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');

  const correctPassword = '0420';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === correctPassword) {
      setUnlocked(true);
      setError('');
    } else {
      setError('パスワードが違うみたい…');
    }
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
              🔐 パスワードを入力してね
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                placeholder="パスワード"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f29e9e]"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-[#f29e9e] text-white py-3 rounded-lg font-semibold hover:bg-[#e98d8d] transition-colors"
              >
                メッセージを開く
              </button>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-pink-600">💌 メッセージ</h2>
            <p className="text-gray-700 leading-relaxed">
              ここまで辿り着いてくれてありがとう。  
              毎日一緒にいられることが、本当に幸せです。  
              これからも、たくさんの思い出を一緒に作っていこうね✨  
              <br />
              大好きだよ。
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
