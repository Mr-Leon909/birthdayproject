import { useState } from 'react';
import { motion } from 'framer-motion'; // Ensure motion is imported

export default function PuzzlePage() {
  const [answer1, setAnswer1] = useState('');
  const [solved1, setSolved1] = useState(false);
  const [answer2, setAnswer2] = useState('');
  const [solved2, setSolved2] = useState(false);
  const [answer3, setAnswer3] = useState('');
  const [solved3, setSolved3] = useState(false);
  const [answer4, setAnswer4] = useState('');
  const [solved4, setSolved4] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const errorMessage = '残念！間違えているようだぁ！';
  const correctMessage = 'congratulation！！正解です。では、この回答を1日目のホテルのフロントスタッフに伝え、暗証番号を受け取ってください。';

  const checkAllSolved = () => {
    console.log('Checking all solved:', solved1, solved2, solved3, solved4);
    if (solved1 && solved2 && solved3 && solved4) {
      console.log('全問正解');
      setShowPin(true);
    }
  };

  const quizAnswers = {
    1: { answers: ['happy', 'ハッピー'], showAlert: true },
    2: { answers: ['大吉', 'だいきち'], showAlert: true },
    3: { answers: ['菜の花', 'なのはな'], showAlert: false },
    4: { answers: ['くうまめ'], showAlert: false }
  };
  
  // 共通のハンドラー関数
  const handleSubmit = (e: React.FormEvent, questionNumber: number, answer: string) => {
    e.preventDefault();
    
    const quizConfig = quizAnswers[questionNumber as keyof typeof quizAnswers];
    const isCorrect = quizConfig.answers.some(correctAnswer => 
      answer.toLowerCase() === correctAnswer.toLowerCase()
    );
    
    if (isCorrect) {
      if (quizConfig.showAlert) {
        alert(correctMessage);
      }
      
      // 動的に状態を更新
      switch (questionNumber) {
        case 1: setSolved1(true); break;
        case 2: setSolved2(true); break;
        case 3: setSolved3(true); break;
        case 4: setSolved4(true); break;
      }
      
      checkAllSolved();
    } else if (quizConfig.showAlert) {
      alert(errorMessage);
    }
  };
  
  // 元の関数は新しい共通関数を使用
  const handleSubmit1 = (e: React.FormEvent) => handleSubmit(e, 1, answer1);
  const handleSubmit2 = (e: React.FormEvent) => handleSubmit(e, 2, answer2);
  const handleSubmit3 = (e: React.FormEvent) => handleSubmit(e, 3, answer3);
  const handleSubmit4 = (e: React.FormEvent) => handleSubmit(e, 4, answer4);

  // Variants for the scroll indicator's fade-in animation
  const scrollIndicatorVariants = {
    hidden: { opacity: 0, y: 20 }, // Initial state: invisible and slightly down
    visible: {
      opacity: 1,
      y: 0, // Final state: visible and in place
      transition: {
        duration: 0.6,
        ease: "easeOut", // Smooth easing
      },
    },
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Initial animation for the whole page content
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto w-full flex-grow flex flex-col relative"
      >
        <h1 className="p-8 text-3xl font-bold mb-8 text-black text-center">謎を解き、ロックを解除せよ</h1>

        {/* SCROLL Indicator with scroll-triggered fade-in */}
        <motion.div
          className="bottom-5 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
          initial="hidden"       // Start with the 'hidden' variant
          whileInView="visible"  // Animate to 'visible' when in viewport
          viewport={{ once: true, amount: 0.3 }} // Trigger once 30% is visible
          variants={scrollIndicatorVariants} // Use the defined variants
        >
          {/* Vertical bar using the provided class and Tailwind animation */}
          <div
            className="w-[1px] h-16 bg-black/50 mb-4 animate-scroll-down origin-top"
            // origin-top is crucial for scaleY to make the bar grow from the top
          />
          {/* Scroll text (will fade in as part of the parent motion.div) */}
          <span className="text-sm text-gray-600 tracking-wider">
            SCROLL
          </span>
        </motion.div>

        <div className="flex-grow">
          {/* 問題1 */}
          <section className="mb-12 pt-8">
            <h2 className="text-black text-2xl mb-4">第1問</h2>
            {!solved1 ? (
              <>
                <div className="rounded-lg mb-4">
                  <div className="w-full h-64 rounded flex items-center justify-center">
                    <img src="../../assets/quiz1.png" alt="" />
                  </div>
                </div>
                <form onSubmit={handleSubmit1} className="space-y-4">
                  <input
                    type="text"
                    value={answer1}
                    onChange={(e) => setAnswer1(e.target.value)}
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
              <p className="text-green-600">正解！次の問題へ進んでください。</p>
            )}
          </section>

          {/* 問題2 */}
          <section className="mb-12">
            <h2 className="text-black text-2xl font-semibold mb-4">第2問</h2>
            {!solved2 ? (
              <>
                <p className="text-black text-lg mb-4">テキストテキストテキストテキストテキストテキスト</p>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center">
                    <img src="../../assets/quiz2.png" alt="" />
                  </div>
                </div>
                <form onSubmit={handleSubmit2} className="space-y-4">
                  <input
                    type="text"
                    value={answer2}
                    onChange={(e) => setAnswer2(e.target.value)}
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
              <p className="text-green-600">正解！次の問題へ進んでください。</p>
            )}
          </section>

          <section className="mb-12">
            <h2 className="text-black text-2xl font-semibold mb-4">第3問</h2>
            {!solved3 ? (
              <>
                <p className="text-black text-lg mb-4">テキストテキストテキストテキストテキストテキスト</p>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center">
                    <img src="../../assets/quiz3.png" alt="" />
                  </div>
                </div>
                <form onSubmit={handleSubmit3} className="space-y-4">
                  <input
                    type="text"
                    value={answer3}
                    onChange={(e) => setAnswer3(e.target.value)}
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
              <p className="text-green-600">正解！次の問題へ進んでください。</p>
            )}
          </section>

          <section className="mb-12">
            <h2 className="text-black text-2xl font-semibold mb-4">第4問</h2>
            {!solved4 ? (
              <>
                <p className="text-black text-lg mb-4">テキストテキストテキストテキストテキストテキスト</p>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <div className="text-black w-full h-64 bg-gray-200 rounded flex items-center justify-center">
                    <img src="../../assets/quiz4.png" alt="" />
                  </div>
                </div>
                <form onSubmit={handleSubmit4} className="space-y-4">
                  <input
                    type="text"
                    value={answer4}
                    onChange={(e) => setAnswer4(e.target.value)}
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

          {showPin && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
              <p className="text-2xl font-bold">暗証番号: 1234</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
