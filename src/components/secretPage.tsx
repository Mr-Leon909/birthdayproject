import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SecretPage() { // Changed function name to follow convention
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');
  const correctPassword = '1206';

  const handleDownloadImage = () => {
    const imageUrls = [
      '../../public/1_0.png',
      '../../public/2_0.png',
      '../../public/3_0.png',
      '../../public/4_0.png',
      '../../public/5_0.png',
      '../../public/6_0.png',
      '../../public/7_0.png',
      '../../public/8_0.png',
    ];
  
    imageUrls.forEach((url, index) => {
      const link = document.createElement('a');
      link.href = url;
      link.download = `love_message_${index + 1}.png`;
      document.body.appendChild(link);
  
      // 遅延を入れて順番通りにクリック
      setTimeout(() => {
        link.click();
        document.body.removeChild(link);
      }, index * 400);
    });
  };

  // Function to handle password submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === correctPassword) {
      setUnlocked(true);
      setError(''); // Clear error on success
    } else {
      setError('パスワードが違うみたい…'); // Display error message
      setUnlocked(false); // Ensure unlocked is false on failure
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
          // Content shown when not unlocked (password form)
          <>
            <p className="text-black">
                暗証番号を入力して、シークレットメッセージをダウンロードしよう！
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🔐 暗証番号を入力してね
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none text-black"
                placeholder="パスワード" // Added placeholder for clarity
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit" // Changed type to submit for form submission
                className="inline-flex items-center bg-[#0493a6] text-white py-3 px-6 rounded transition-colors hover:bg-[#037a8a]" // Added hover effect
              >
                ロック解除
              </button>
            </form>
          </>
        ) : (
          // Content shown when unlocked (download button)
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🎉 ロック解除成功！ 🎉
            </h2>
            <p className="text-gray-600 mb-6">
              メッセージをダウンロードしてね！
            </p>
            <button
              type="button"
              onClick={handleDownloadImage} 
              className="inline-flex items-center bg-[#0493a6] text-white py-3 px-6 rounded transition-colors hover:bg-[#037a8a]" // Added hover effect
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              メッセージをダウンロード
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
