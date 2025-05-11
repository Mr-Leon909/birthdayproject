import { useEffect, useRef } from 'react';

export default function TopPage() {
  const imageRef = useRef<HTMLDivElement>(null);
  const currentImageIndex = useRef(0);
  
  const images = [
    {
      url: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=2000&q=80",
      title: "沖縄の美しいビーチ",
      description: "最高の思い出になった沖縄旅行"
    },
    {
      url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=2000&q=80",
      title: "カフェでのひととき",
      description: "いつも心が温かくなる時間"
    },
    {
      url: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=2000&q=80",
      title: "特別な記念日",
      description: "一緒に過ごせる幸せ"
    },
    {
      url: "https://images.unsplash.com/photo-1581022295087-35e593704911?auto=format&fit=crop&w=2000&q=80",
      title: "素敵な思い出",
      description: "かけがえのない瞬間"
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

      {/* Gallery Section */}
      <div className="py-24 px-4 md:px-8">
        <h3 
          className="text-3xl md:text-5xl font-light tracking-[0.2em] text-center mb-16 opacity-0 animate-fade-in-scroll"
          style={{ fontFamily: 'Cormorant Garamond' }}
        >
          GALLERY
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {images.map((item, index) => (
            <div
              key={index}
              className="relative group opacity-0 animate-fade-in-scroll"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-4">
                <h4 
                  className="text-xl font-light mb-2"
                  style={{ fontFamily: 'Noto Serif JP' }}
                >
                  {item.title}
                </h4>
                <p 
                  className="text-sm font-light"
                  style={{ fontFamily: 'Noto Serif JP' }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Section */}
      <div className="py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto opacity-0 animate-fade-in-scroll">
          <h3 
            className="text-3xl md:text-4xl font-light tracking-[0.2em] mb-8"
            style={{ fontFamily: 'Cormorant Garamond' }}
          >
            Thank you
          </h3>
          <p 
            className="text-lg md:text-xl font-light leading-relaxed"
            style={{ fontFamily: 'Noto Serif JP' }}
          >
            これからも、ずっと一緒に。<br />
            素敵な思い出をありがとう。
          </p>
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