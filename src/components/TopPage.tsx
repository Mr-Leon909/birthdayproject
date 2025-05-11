import { useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';

export default function TopPage() {
  const imageRef = useRef<HTMLDivElement>(null);
  const currentImageIndex = useRef(0);
  
  const images = [
    {
      url: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=2000&q=80",
      title: "TSUTSUJI",
      description: "2人だけのSNS「TSUTSUJI」では、二人の思い出を写真や動画と一緒に投稿できます。大切な瞬間をここに残していきましょう。",
      link: "/sns",
      linkText: "TSUTSUJIを見る"
    },
    {
      url: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=2000&q=80",
      title: "謎解きページ",
      description: "2つの謎解き問題に挑戦してみましょう。全ての謎を解くと、秘密のページへのアクセス方法がわかります。",
      link: "/puzzle",
      linkText: "謎解きに挑戦"
    },
    {
      url: "https://images.unsplash.com/photo-1581022295087-35e593704911?auto=format&fit=crop&w=2000&q=80",
      title: "メッセージページ",
      description: "特別なメッセージが隠されています。謎解きを完了すると、このページにアクセスできるようになります。",
      link: "/secret",
      linkText: "メッセージを確認する"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (imageRef.current) {
        imageRef.current.style.opacity = '0';
        
        setTimeout(() => {
          currentImageIndex.current = (currentImageIndex.current + 1) % images.length;
          if (imageRef.current) {
            imageRef.current.style.backgroundImage = `url(${images[currentImageIndex.current].url})`;
            imageRef.current.style.opacity = '1';
          }
        }, 1000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
// 画面全体の背景色を白、文字色を黒
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image */}
        <div
          ref={imageRef}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${images[0].url})`,
            filter: 'brightness(0.5)'
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center opacity-0 animate-fade-in">
          <h1 
            className="text-5xl md:text-8xl font-light tracking-[0.2em] mb-8"
            style={{ fontFamily: 'Cormorant Garamond' }}
          >
            30th anniversary
          </h1>
          <h2 
            className="text-4xl md:text-7xl font-light tracking-[0.2em] mb-16"
            style={{ fontFamily: 'Cormorant Garamond' }}
          >
            Happy Birthday
          </h2>
          <p 
            className="text-xl md:text-3xl font-light tracking-[0.2em] mb-8"
            style={{ fontFamily: 'Noto Serif JP' }}
          >
            最高のひと時を最高の場所で
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-fade-in-delay">
          <div className="w-[1px] h-16 bg-white/50 mb-4 animate-scroll-down" />
          <p className="text-sm tracking-[0.2em] text-white/70">SCROLL</p>
        </div>
      </div>

      {/* コンテンツたち */}
      <div className="py-16 px-4 md:px-8 bg-white text-black">
        <h2 className="text-4xl font-light text-center mb-16 tracking-widest"
            style={{ fontFamily: 'Cormorant Garamond' }}>
          GALLERY
        </h2>
        
        <div className="space-y-24 max-w-6xl mx-auto">
          {images.map((item, index) => (
            <div key={index} className="group">
              {/* 1. 画像 */}
              <div className="aspect-[16/9] overflow-hidden mb-6">
                <img 
                  src={item.url} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="px-4">
                {/* 2. 本文 */}
                <h3 className="text-2xl font-light mb-4"
                    style={{ fontFamily: 'Noto Serif JP' }}>
                  {item.title}
                </h3>
                <p className="text-gray-700 mb-6"
                  style={{ fontFamily: 'Noto Serif JP' }}>
                  {item.description}
                </p>
                
                {/* 3. 詳細ページへのリンク */}
                <a 
                  href={item.link}
                  className="inline-block border-b border-black pb-1 hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'Noto Serif JP' }}
                >
                  {item.linkText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scrollDown {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          50.1% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fadeIn 1s ease-out 1s forwards;
        }

        .animate-fade-in-scroll {
          animation: fadeIn 1s ease-out forwards;
          animation-play-state: paused;
        }

        .animate-scroll-down {
          animation: scrollDown 2s ease-in-out infinite;
        }

        .visible .animate-fade-in-scroll {
          animation-play-state: running;
        }
      `}</style>
    </div>
  );
}
