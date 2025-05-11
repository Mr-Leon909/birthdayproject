import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PuzzlePage() {
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase() === 'correct') { // 仮の正解
      setShowHint(true);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">謎解き 問題 1</h1>
        
        {!showHint ? (
          <>
            <div className="mb-8">
              <p className="text-lg mb-4">
                テキストテキストテキストテキストテキストテキスト
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mb-8">
                {/* イラスト図の代わりのプレースホルダー */}
                <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center">
                  イラスト図が入ります
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="回答を入力してください"
                  className="w-full p-3 border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors"
                >
                  回答を送信
                </button>
              </form>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-xl">
              この答えを1日目のホテルのフロントスタッフに伝えよ
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}