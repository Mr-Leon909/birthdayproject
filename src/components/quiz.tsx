import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


// カスタムポップアップコンポーネント
function ResultPopup({ isOpen, onClose, isCorrect, message, onNext }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`relative bg-white rounded-lg p-8 max-w-md mx-auto shadow-xl ${isCorrect ? 'border-4 border-[#0493a6]' : 'border-4 border-red-500'}`}
          >
            <h3 className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-[#0493a6]' : 'text-red-600'}`}>
              {isCorrect ? '正解！' : '残念！'}
            </h3>
            <div className="mb-6 whitespace-pre-wrap text-black">
              {message}
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded transition-colors"
              >
                閉じる
              </button>
              {isCorrect && onNext && (
                <button 
                  onClick={onNext}
                  className="px-4 py-2 bg-[#0493a6] text-white rounded transition-colors"
                >
                  次へ進む
                </button>
              )}
            </div>
            {isCorrect && (
              <motion.div 
                className="absolute -top-10 -left-10 -right-10 -bottom-10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      initial={{
                        x: Math.random() * 100 - 50 + "%",
                        y: -20,
                        scale: Math.random() * 0.5 + 0.5,
                      }}
                      animate={{
                        y: ["0%", "100%"],
                        x: [
                          `${Math.random() * 100 - 50}%`,
                          `${Math.random() * 100 - 50}%`,
                        ],
                        opacity: [1, 0],
                      }}
                      transition={{
                        duration: Math.random() * 2 + 1,
                        ease: "easeOut",
                        delay: Math.random() * 0.5,
                      }}
                      style={{
                        background: [
                          "#FFD700",
                          "#FF69B4",
                          "#00CED1",
                          "#FF6347",
                          "#7B68EE",
                        ][Math.floor(Math.random() * 5)],
                        borderRadius: "50%",
                        width: `${Math.random() * 10 + 5}px`,
                        height: `${Math.random() * 10 + 5}px`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Quiz1: 1問目のコンポーネント
function Quiz1() {
  const [answer, setAnswer] = useState('');
  const [solved, setSolved] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const errorMessage = '残念！間違えているようだぁ！';
  const correctMessage = 'congratulation！！\n正解です。\nでは、この回答を沖縄かりゆしリゾートのフロントスタッフに伝え、暗証番号を受け取ってください。';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isCorrect = ['happy', 'ハッピー'].some(correctAnswer => 
      answer.toLowerCase() === correctAnswer.toLowerCase()
    );
    
    if (isCorrect) {
      setIsCorrect(true);
      setShowPopup(true);
    } else {
      setIsCorrect(false);
      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    if (isCorrect) {
      setSolved(true);
    }
  };

  const handleNextQuiz = () => {
    setShowPopup(false);
    navigate('/quiz/2');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto w-full flex-grow flex flex-col relative"
      >
        <h1 className="p-8 text-3xl font-bold mb-8 text-black text-center">謎を解き、ロックを解除せよ</h1>

        <section className="mb-12 pt-8">
          <h2 className="text-black text-2xl mb-4 px-4">第1問</h2>
          {!solved ? (
            <>
              <div className="rounded-lg mb-4">
                <div className="w-full h-64 rounded flex items-center justify-center">
                  <img src="/src/assets/quiz1.png" alt="" />
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4 px-4">
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

              <ResultPopup 
                isOpen={showPopup}
                onClose={handlePopupClose}
                isCorrect={isCorrect}
                message={isCorrect ? correctMessage : errorMessage}
                onNext={isCorrect ? handleNextQuiz : null}
              />
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-[#0493a6]">正解！次の問題へ進んでください。</p>
              <button
                onClick={() => navigate("/quiz/2")}
                className="w-full bg-[#0493a6] text-white py-3 roundedtransition-colors"
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
  const [showPopup, setShowPopup] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const errorMessage = '残念！間違えているようだぁ！';
  const correctMessage = 'congratulation！！\n正解です。\nでは、この回答をカドウカ　ビジャヤさんに伝え、暗証番号を受け取ってください。';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isCorrect = ['大吉', 'だいきち'].some(correctAnswer => 
      answer.toLowerCase() === correctAnswer.toLowerCase()
    );
    
    if (isCorrect) {
      setIsCorrect(true);
      setShowPopup(true);
    } else {
      setIsCorrect(false);
      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    if (isCorrect) {
      setSolved(true);
    }
  };

  const handleNextQuiz = () => {
    setShowPopup(false);
    navigate('/quiz/3');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto w-full flex-grow flex flex-col relative"
      >
        <h1 className="p-8 text-3xl font-bold mb-8 text-black text-center">謎を解き、ロックを解除せよ</h1>

        <section className="mb-12 pt-8">
          <h2 className="text-black text-2xl mb-4 px-4">第2問</h2>
          {!solved ? (
            <>
              <div className="rounded-lg mb-4">
                <div className="w-full h-64 rounded flex items-center justify-center">
                  <img src="/src/assets/quiz2.png" alt="" />
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4 px-4">
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

              <ResultPopup 
                isOpen={showPopup}
                onClose={handlePopupClose}
                isCorrect={isCorrect}
                message={isCorrect ? correctMessage : errorMessage}
                onNext={isCorrect ? handleNextQuiz : null}
              />
            </>
          ) : (
            <div className="space-y-4 px-4">
              <p className="text-[#0493a6]">正解！次の問題へ進んでください。</p>
              <button
                onClick={() => navigate("/quiz/3")}
                className="w-full bg-[#0493a6] text-white py-3 rounded transition-colors"
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
  const [showPopup, setShowPopup] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const errorMessage = '残念！間違えているようだぁ！';
  const correctMessage = 'congratulation！！\n正解です。\nでは、この回答をthe rescapeのフロントスタッフに伝え暗証番号を受け取ってください。';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isCorrect = ['菜の花', 'なのはな'].some(correctAnswer => 
      answer.toLowerCase() === correctAnswer.toLowerCase()
    );
    
    if (isCorrect) {
      setIsCorrect(true);
      setShowPopup(true);
    } else {
      setIsCorrect(false);
      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    if (isCorrect) {
      setSolved(true);
    }
  };

  const handleNextQuiz = () => {
    setShowPopup(false);
    navigate('/quiz/4');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto w-full flex-grow flex flex-col relative"
      >
        <h1 className="p-8 text-3xl font-bold mb-8 text-black text-center">謎を解き、ロックを解除せよ</h1>

        <section className="mb-12 pt-8">
          <h2 className="text-black text-2xl mb-4 px-4">第3問</h2>
          {!solved ? (
            <>
              <div className="rounded-lg mb-4">
                <div className="w-full h-64 rounded flex items-center justify-center">
                  <img src="/src/assets/quiz3.png" alt="" />
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4 px-4">
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

              <ResultPopup 
                isOpen={showPopup}
                onClose={handlePopupClose}
                isCorrect={isCorrect}
                message={isCorrect ? correctMessage : errorMessage}
                onNext={isCorrect ? handleNextQuiz : null}
              />
            </>
          ) : (
            <div className="space-y-4 px-4">
              <p className="text-[#0493a6]">正解！次の問題へ進んでください。</p>
              <button
                onClick={() => navigate("/quiz/4")}
                className="w-full bg-[#0493a6] text-white py-3 rounded transition-colors"
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
  const [showPopup, setShowPopup] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const errorMessage = '残念！間違えているようだぁ！';
  const correctMessage = 'congratulation！！\n正解です。\nでは、この回答を響に伝え、暗証番号を受け取ってください。';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isCorrect = ['くうまめ'].some(correctAnswer => 
      answer.toLowerCase() === correctAnswer.toLowerCase()
    );
    
    if (isCorrect) {
      setIsCorrect(true);
      setShowPopup(true);
      setShowPin(true);
    } else {
      setIsCorrect(false);
      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    if (isCorrect) {
      setSolved(true);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto w-full flex-grow flex flex-col relative"
      >
        <div className="message_container">
          <h1 className="p-8 text-2xl font-bold mb-8 text-black text-center">謎を解き、<br />ロックを解除せよ</h1>
        </div>

        <section className="mb-12 pt-8">
          {!solved ? (
            <>
              <div className="rounded-lg mb-4">
              <h2 className="text-black text-2xl mb-4 px-4">第4問</h2>
                <div className="w-full h-64 rounded flex items-center justify-center">
                  <img src="/src/assets/quiz4.png" alt="" />
                </div>
                
                <div className="text-black px-6 py-4">
                  <p className="whitespace-normal break-words">①手のひらに落花。</p>
                  
                  <br />
                  
                  <p className="whitespace-normal break-words">②日々の幸せの蓄積により生まれる温かな巻物<br />
                  ピンクとオレンジのベールを纏った巻物は、私たちらしい初めての揃いもの。</p>
                  
                  <br />
                  
                  <p className="whitespace-normal break-words">③初めて連れてきてくれた行きつけの場所<br />
                  布団に包まれた2人の赤ちゃん。</p>
                  
                  <br />
                  
                  <p className="whitespace-normal break-words">④最後のメッセージが始まりの合図。その時男がかけていたものは。</p>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4 px-4">
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

              <ResultPopup 
                isOpen={showPopup}
                onClose={handlePopupClose}
                isCorrect={isCorrect}
                message={isCorrect ? correctMessage : errorMessage}
                onNext={null}
              />
            </>
          ) : (
            <div className="space-y-4 px-4">
              <iframe 
                src="https://www.youtube.com/embed/iZAbOC3pLpM?autoplay=1&mute=1&loop=1&playlist=iZAbOC3pLpM" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full aspect-video rounded"
                frameBorder="0"
              ></iframe>
              <p className="text-black">全問正解おめでとうございます！ < br />
                次の画面で暗証番号を入力して、シークレットメッセージをダウンロードしよう！
              </p>

              {showPin && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                  <div className="mt-6">
                    <Link to="/secret">
                      <button className="bg-[#0493a6] text-white py-3 px-6 rounded transition-colors hover:bg-[#037a8a]">
                        次へ
                      </button>
                    </Link>
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
