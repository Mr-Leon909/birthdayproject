import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Quiz1: 1問目のコンポーネント
function Quiz1() {
  const [answer, setAnswer] = useState('');
  const [solved, setSolved] = useState(false);
  const navigate = useNavigate();

  const errorMessage = '残念！間違えているようだぁ！';
  const correctMessage = 'congratulation！！正解です。では、この回答を1日目のホテルのフロントスタッフに伝え、暗証番号を受け取ってください。';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isCorrect = ['happy', 'ハッピー'].some(correctAnswer => 
      answer.toLowerCase() === correctAnswer.toLowerCase()
    );
    
    if (isCorrect) {
      alert(correctMessage);
      setSolved(true);
    } else {
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto w-full flex-grow flex flex-col relative p-4"
      >
        <h1 className="p-8 text-3xl font-bold mb-8 text-black text-center">謎を解き、ロックを解除せよ</h1>

        <section className="mb-12 pt-8">
          <h2 className="text-black text-2xl mb-4">第1問</h2>
          {!solved ? (
            <>
              <div className="rounded-lg mb-4">
                <div className="w-full h-64 rounded flex items-center justify-center">
                  <img src="../../assets/quiz1.png" alt="" />
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="回答を入力する"
                  className="text-black w-full p-3 border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors"
                >送信</button>
              </form>
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-green-600">正解！次の問題へ進んでください。</p>
              <button
                onClick={() => navigate("/quiz/2")}
                className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition-colors"
              >
                次の問題へ
              </button>
            </div>
          )}
        </section>
      </motion.div>
    </div>
  );
}

// Quiz2: 2問目のコンポーネント
function Quiz2() {
  const [answer, setAnswer] = useState('');
  const [solved, setSolved] = useState(false);
  const navigate = useNavigate();

  const errorMessage = '残念！間違えているようだぁ！';
  const correctMessage = 'congratulation！！正解です。では、この回答を1日目のホテルのフロントスタッフに伝え、暗証番号を受け取ってください。';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isCorrect = ['大吉', 'だいきち'].some(correctAnswer => 
      answer.toLowerCase() === correctAnswer.toLowerCase()
    );
    
    if (isCorrect) {
      alert(correctMessage);
      setSolved(true);
    } else {
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto w-full flex-grow flex flex-col relative p-4"
      >
        <h1 className="p-8 text-3xl font-bold mb-8 text-black text-center">謎を解き、ロックを解除せよ</h1>

        <section className="mb-12">
          <h2 className="text-black text-2xl font-semibold mb-4">第2問</h2>
          {!solved ? (
            <>
              <p className="text-black text-lg mb-4">テキストテキストテキストテキストテキストテキスト</p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center">
                  <img src="../../assets/quiz2.png" alt="" />
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="回答を入力してください"
                  className="text-black w-full p-3 border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors"
                >送信</button>
              </form>
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-green-600">正解！次の問題へ進んでください。</p>
              <button
                onClick={() => navigate("/quiz/3")}
                className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition-colors"
              >
                次の問題へ
              </button>
            </div>
          )}
        </section>
      </motion.div>
    </div>
  );
}

// Quiz3: 3問目のコンポーネント
function Quiz3() {
  const [answer, setAnswer] = useState('');
  const [solved, setSolved] = useState(false);
  const navigate = useNavigate();
  const errorMessage = '残念！間違えているようだぁ！';
  const correctMessage = 'congratulation！！正解です。では、この回答を1日目のホテルのフロントスタッフに伝え、暗証番号を受け取ってください。';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isCorrect = ['菜の花', 'なのはな'].some(correctAnswer => 
      answer.toLowerCase() === correctAnswer.toLowerCase()
    );
    
    if (isCorrect) {
      alert(correctMessage);
      setSolved(true);
    } else {
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto w-full flex-grow flex flex-col relative p-4"
      >
        <h1 className="p-8 text-3xl font-bold mb-8 text-black text-center">謎を解き、ロックを解除せよ</h1>

        <section className="mb-12">
          <h2 className="text-black text-2xl font-semibold mb-4">第3問</h2>
          {!solved ? (
            <>
              <p className="text-black text-lg mb-4">テキストテキストテキストテキストテキストテキスト</p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center">
                  <img src="../../assets/quiz3.png" alt="" />
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="回答を入力してください"
                  className="text-black w-full p-3 border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors"
                >送信</button>
              </form>
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-green-600">正解！次の問題へ進んでください。</p>
              <button
                onClick={() => navigate("/quiz/4")}
                className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition-colors"
              >
                次の問題へ
              </button>
            </div>
          )}
        </section>
      </motion.div>
    </div>
  );
}

// Quiz4: 4問目のコンポーネント
function Quiz4() {
  const [answer, setAnswer] = useState('');
  const [solved, setSolved] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const errorMessage = '残念！間違えているようだぁ！';
  const correctMessage = 'congratulation！！正解です。では、この回答を1日目のホテルのフロントスタッフに伝え、暗証番号を受け取ってください。';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isCorrect = ['くうまめ'].some(correctAnswer => 
      answer.toLowerCase() === correctAnswer.toLowerCase()
    );
    
    if (isCorrect) {
      setSolved(true);
      setShowPin(true);
    } else {
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto w-full flex-grow flex flex-col relative p-4"
      >
        <h1 className="p-8 text-3xl font-bold mb-8 text-black text-center">謎を解き、ロックを解除せよ</h1>

        <section className="mb-12">
          <h2 className="text-black text-2xl font-semibold mb-4">第4問</h2>
          {!solved ? (
            <>
              <p className="text-black text-lg mb-4">テキストテキストテキストテキストテキストテキスト</p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="text-black w-full h-64 bg-gray-200 rounded flex items-center justify-center">
                  <img src="../../assets/quiz4.png" alt="" />
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="回答を入力してください"
                  className="text-black w-full p-3 border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors"
                >送信</button>
              </form>
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-green-600">正解！全問正解おめでとうございます。</p>
              {showPin && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                  <p className="text-2xl font-bold text-black">暗証番号: 1234</p>
                  <div className="mt-6">
                    <a 
                      href="/secret"
                      className="inline-block bg-green-600 text-white py-3 px-6 rounded hover:bg-green-700 transition-colors"
                    >
                      シークレットページへ
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </section>
      </motion.div>
    </div>
  );
}

// メインのクイズナビゲーターコンポーネント
export default function PuzzlePage() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/quiz/1" replace />} />
      <Route path="/1" element={<Quiz1 />} />
      <Route path="/2" element={<Quiz2 />} />
      <Route path="/3" element={<Quiz3 />} />
      <Route path="/4" element={<Quiz4 />} />
    </Routes>
  );
}
