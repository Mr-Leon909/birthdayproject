import { useEffect } from 'react';

type Props = {
  onFinish: () => void;
};

export default function BirthdayIntro({ onFinish }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="relative w-full max-w-md px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=2000&q=80')"
          }}
        />
        <div className="relative z-10 text-center">
          <div className="text-[120px] leading-none tracking-tight" style={{ fontFamily: 'Times New Roman' }}>
            30
            <span className="text-xl align-top ml-1">th</span>
          </div>
          <div className="text-xl tracking-[0.3em] mb-4">Anniversary</div>
          <div className="w-full h-[1px] bg-black mb-4"></div>
          <div 
            className="text-4xl text-red-500"
            style={{ fontFamily: 'Dancing Script, cursive' }}
          >
            Happy Birthday
          </div>
        </div>
      </div>
    </div>
  );
}