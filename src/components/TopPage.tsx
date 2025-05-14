import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageWithBackground from './ImageWithBackground';

export default function TopPage() {
  const navigate = useNavigate();
  
  const images = [
    {
      url: "../../assets/tsutsuji.png",
      title: "TSUTSUJI",
      description: "世界に1つしかない2人だけのSNS「TSUTSUJI」ここでは、二人の思い出を写真や動画と一緒に投稿できます。大切な瞬間をTSUTSUJIに残そう。",
      link: "/sns",
      linkText: "TSUTSUJIへログイン"
    },
    {
      url: "../../assets/quiz.png",
      title: "謎解きページ",
      description: "2つの謎解き問題に挑戦してみましょう。全ての謎を解くと、秘密のページと南京錠のアクセス方法がわかります。",
      link: "/quiz",
      linkText: "謎解きに挑戦"
    },
    {
      url: "../../assets/SecretMessage.png",
      title: "Secret of message",
      description: "明日香への特別なメッセージです。謎解きを完了すると、このページにアクセスできるようになります。",
      link: "/secret",
      linkText: "メッセージを確認する"
    }
  ];

  // ギャラリー用の画像URLリスト
  const galleryImages = [
    "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1581022295087-35e593704911?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2000&q=80"
  ];

  useEffect(() => {
    const items = document.querySelectorAll<HTMLDivElement>('.gallery_item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <div>
        <div style={{ height: '1px', backgroundColor: '#7b7b7b', margin: '16px 0' }} />
        <img src="../../assets/top.png" alt="" />
        
        <div className="min-h-screen bg-white text-black">
      <div>
        <div style={{ height: "1px", backgroundColor: "#7b7b7b", margin: "16px 0" }} />

        {/* トップ画像 */}
        <div className="mb-8">
          <img src="/assets/top.png" alt="トップ画像" className="w-full" />
        </div>

        {/* 横幅いっぱいの背景付き画像 */}
        <div className="relative w-full">
          {/* 背景色のオフセット用ボックス */}
          <div
            className="absolute rounded-sm bg-[#0493a6]"
            style={{ top: '20px', left: '20px', width: '95%', height: '100%' }}
          />

          {/* 画像本体 */}
          <img
            src="/assets/image.webp"
            alt="背景付き画像"
            className="relative w-[95%] block"
          />
        </div>
      </div>
    </div>

      <div className="bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-fade-in-delay">
        <div className="w-[1px] h-16 bg-black/50 mb-4 animate-scroll-down" />
        <p className="text-sm tracking-[0.2em] text-black/70">SCROLL</p>
        </div>
      </div>

      <div className="thankYou">
        <img src="../../assets/thankYouAnniversary.png" alt="" className='animate-fade-in-delay'/>
      </div>

      <div className="py-16 bg-white">
        <div className="gallery_container max-w-6xl mx-auto">
          <h2 className="text-4xl font-light text-center mb-16 tracking-widest"
              style={{ fontFamily: 'Cormorant Garamond' }}>
            GALLERY
          </h2>
          {galleryImages.map((src, index) => (
            <div key={index} className='gallery_item flex mb-10'>
              <img src={src} alt="" className={`w-full animate-fade-in-scroll index-${index}`} />
            </div>
          ))}
        </div>
        
        <div className="space-y-24 max-w-6xl mx-auto">
          {images.map((item, index) => (
            <div key={index} className="group">
              <div className="aspect-[16/9] overflow-hidden mb-6">
                <img 
                  src={item.url} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="px-4">
                <h3 className="text-2xl font-light mb-4 text-black"
                    style={{ fontFamily: 'font-sans', fontWeight: 'bolder' }}>
                  {item.title}
                </h3>
                <p className="text-gray-700 mb-6"
                  style={{ fontFamily: 'font-sans' }}>
                  {item.description}
                </p>
                
                <button 
                  onClick={() => navigate(item.link)}
                  className="inline-block border-b border-black pb-1 hover:opacity-70 transition-opacity text-black"
                  style={{ fontFamily: 'Noto Serif JP' }}
                >
                  {item.linkText}
                </button>
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
          animation: fadeIn 2s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fadeIn 2s ease-out 1s forwards;
        }

        .animate-fade-in-scroll {
          animation: fadeIn 2s ease-out forwards;
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
