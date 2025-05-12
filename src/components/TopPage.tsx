import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TopPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-['Dancing_Script']">
            Happy 30th Birthday
          </h1>
          <p className="text-xl md:text-2xl font-['Cormorant_Garamond']">
            最高のひと時を最高の場所で
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 p-6 rounded-lg"
          >
            <h2 className="text-2xl font-bold mb-4">思い出のギャラリー</h2>
            <p className="text-gray-300">
              私たちの大切な思い出をご覧ください。
            </p>
            <Link
              to="/gallery"
              className="inline-block mt-4 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
            >
              ギャラリーを見る
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/10 p-6 rounded-lg"
          >
            <h2 className="text-2xl font-bold mb-4">TSUTSUJI</h2>
            <p className="text-gray-300">
              2人だけの特別なSNSで思い出を共有しましょう。
            </p>
            <Link
              to="/sns/login"
              className="inline-block mt-4 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
            >
              TSUTSUJIへログイン
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-4">特別なメッセージ</h2>
          <p className="text-gray-300 mb-4">
            謎解きを解いて、特別なメッセージを見つけましょう。
          </p>
          <Link
            to="/puzzle"
            className="inline-block px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
          >
            謎解きに挑戦
          </Link>
        </motion.div>
      </div>
    </div>
  );
}