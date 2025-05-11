import { motion } from 'framer-motion';

export default function TravelSchedule() {
  return (
    <div className="min-h-screen bg-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">沖縄旅行表</h1>
        <div className="prose max-w-none">
          <h2 className="text-xl mb-4">
            テキストテキストテキストテキストテキストテキストテキストテキスト
          </h2>
          {/* ここに旅行スケジュールの詳細を追加 */}
        </div>
      </motion.div>
    </div>
  );
}