import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageWithBackground from './ImageWithBackground';
import GalleryImage from './gallery/GalleryImage';
import fv1 from '../assets/fv1.png';
import fv2 from '../assets/fv2.png';
import fv3 from '../assets/fv3.png';
import fv4 from '../assets/fv4.png';
import fv5 from '../assets/fv5.png';
import fv6 from '../assets/fv6.png';
import fv7 from '../assets/fv7.png';
import g16 from '../assets/16.png';
import g17 from '../assets/17.png';
import g18 from '../assets/18.png';
import g19 from '../assets/19.png';
import g20 from '../assets/20.png';
import g21 from '../assets/21.png';
import g22 from '../assets/22.png';
import g23 from '../assets/23.png';
import g24 from '../assets/24.png';
import g25 from '../assets/25.png';
import topImage from '../assets/top.png';
import tsutsuji from '../assets/tsutsuji.png';
import quizImg from '../assets/quiz.png';
import SecretMessageImg from '../assets/SecretMessage.png';
import thankYouAnniversary from '../assets/thankYouAnniversary.png';

export default function TopPage() {
  const navigate = useNavigate();
  // スライドショー用の状態管理
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // FV画像のパス配列
  const fvImages = [
    fv1,
    fv2,
    fv3,
    fv4,
    fv5,
    fv6,
    fv7,
  ];
  
  const images = [
    {
      url: tsutsuji,
      title: "TSUTSUJI",
      description: "世界に1つしかない2人だけのSNS「TSUTSUJI」ここでは、二人の思い出を写真や動画と一緒に投稿できます。大切な瞬間をTSUTSUJIに残そう。",
      link: "/sns",
      linkText: "TSUTSUJIへログイン"
    },
    {
      url: quizImg,
      title: "謎解きページ",
      description: "4つの謎解き問題に挑戦してみましょう。全ての謎を解くと、秘密のページと南京錠のアクセス方法がわかります。",
      link: "/quiz",
      linkText: "謎解きに挑戦"
    },
    {
      url: SecretMessageImg,
      title: "Secret of message",
      description: "明日香への特別なメッセージです。謎解きを完了すると、このページにアクセスできるようになります。",
      link: "/secret",
      linkText: "メッセージを確認する"
    }
  ];

  // ギャラリー用の画像URLリスト
  const galleryImages = [
    g16,
    g17,
    g18,
    g19,
    g20,
    g21,
    g22,
    g23,
    g24,
    g25,
  ];

  // 画像のスライドショー効果
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => 
        prevIndex === fvImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3秒ごとに画像を切り替え
    
    return () => clearInterval(interval);
  }, []);

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
    <div className=" bg-white text-black">
      <div>
        <div style={{ height: '1px', backgroundColor: '#7b7b7b', margin: '16px 0' }} />
        
        <div className="bg-white text-black">
          <div>
            <div style={{ height: "1px", backgroundColor: "#7b7b7b", margin: "16px 0" }} />

            {/* トップ画像 */}
            <div className="mb-8">
              <img src={topImage} alt="トップ画像" className="w-full" />
            </div>

            {/* 横幅いっぱいの背景付き画像（スライドショー） */}
            <div className="relative w-full md:px-12 lg:px-16">
              {/* スライドショーコンテナ */}
              <div className="slideshow-container max-w-[1200px] mx-auto my-12">
                {fvImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`slideshow-slide ${index === currentImageIndex ? 'active' : ''}`}
                  >
                    <ImageWithBackground
                      src={image}
                      alt={`スライドショー画像 ${index + 1}`}
                      backgroundOffset={{ x: 150, y: 20 }}
                      backgroundColor="#0493a6"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-fade-in-delay">
          <div className="w-[1px] h-16 bg-black/50 mb-4 animate-scroll-down" />
          <p className="text-sm tracking-[0.2em] text-black/70">SCROLL</p>
        </div>
      </div>

      <div className="thankYou">
        <img src={thankYouAnniversary} alt="" className='animate-fade-in-delay'/>
      </div>

      <div className="py-16 bg-white overflow-hidden">
        <div className="gallery_container max-w-6xl mx-auto">
          <h2 className="text-4xl font-light text-center mb-16 tracking-widest"
              style={{ fontFamily: 'Cormorant Garamond' }}>
            GALLERY
          </h2>
          {galleryImages.map((src, index) => (
            <div key={index} className='gallery_item flex'>
              <GalleryImage 
                src={src} 
                index={index} 
                backgroundColor="#0493a6"
              />
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

        /* スライドショー用のスタイル */
        .slideshow-container {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .slideshow-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          opacity: 0;
          transition: opacity 2s ease-in-out;
        }

        .slideshow-slide.active {
          opacity: 1;
          position: relative;
        }
      `}</style>
    </div>
  );
}
