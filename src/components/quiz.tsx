import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PuzzlePage() {
  const [answer1, setAnswer1] = useState('');
  const [solved1, setSolved1] = useState(false);
  const [answer2, setAnswer2] = useState('');
  const [solved2, setSolved2] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const handleSubmit1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer1.toLowerCase() === 'correct1') {
      setSolved1(true);
    }
  };
  const handleSubmit2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer2.toLowerCase() === 'correct2') {
      setSolved2(true);
    }
    // 両問題正解で暗証番号表示
    if (solved1 && answer2.toLowerCase() === 'correct2') {
      setShowPin(true);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">謎解きページ</h1>

        {/* 問題1 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">問1</h2>
          {!solved1 ? (
            <>
              <p className="text-lg mb-4">テキストテキストテキストテキストテキストテキスト</p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center">
                  イラスト図が入ります
                </div>
              </div>
              <form onSubmit={handleSubmit1} className="space-y-4">
                <input
                  type="text"
                  value={answer1}
                  onChange={(e) => setAnswer1(e.target.value)}
                  placeholder="回答を入力してください"
                  className="w-full p-3 border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors"
                >送信</button>
              </form>
            </>
          ) : (
            <p className="text-green-600">正解！次の問題へ進んでください。</p>
          )}
        </section>
        {/* 問題2 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">問2</h2>
          {!solved2 ? (
            <>
              <p className="text-lg mb-4">テキストテキストテキストテキストテキストテキスト</p>
              <form onSubmit={handleSubmit2} className="space-y-4">
                <input
                  type="text"
                  value={answer2}
                  onChange={(e) => setAnswer2(e.target.value)}
                  placeholder="回答を入力してください"
                  className="w-full p-3 border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors"
                >送信</button>
              </form>
            </>
          ) : (
            <p className="text-green-600">正解！</p>
          )}
        </section>
        {/* 暗証番号表示 */}
        {showPin && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
            <p className="text-2xl font-bold">暗証番号: 1234</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
