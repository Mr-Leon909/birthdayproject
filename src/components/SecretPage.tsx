import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SecretPage() {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1111') {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('パスワードが違います');
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        {!isUnlocked ? (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-1xl font-bold mb-6 text-center text-black">
              🔐 シークレットページ
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="番号を入力"
                className="w-full p-3 border border-gray-300 rounded"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors"
              >
                開く
              </button>
            </form>
          </div>
        ) : (
          <div className="text-black prose max-w-none">
            <h1>シークレットメッセージが開放</h1>
            <p>
              ここにメッセージが表示されます...
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
