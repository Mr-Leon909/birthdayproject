import { useEffect, useState } from 'react';

type Props = {
  onFinish: () => void;
};

export default function BirthdayIntro({ onFinish }: Props) {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 3秒後にフェードアウト開始
    const timer = setTimeout(() => {
      setIsFading(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // フェードアウト効果のアニメーションが終了したら onFinish を呼び出す
  const handleAnimationEnd = () => {
    if (isFading) {
      onFinish();
    }
  };

  return (
    <div 
      className={`bg-white fixed inset-0 flex items-center justify-center transition-opacity duration-1000 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
      onAnimationEnd={handleAnimationEnd}
      onTransitionEnd={handleAnimationEnd}
    >
      <div className="relative w-full h-full max-w-4xl">
        <img 
          src="/assets/opening.png" 
          alt="Birthday" 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
