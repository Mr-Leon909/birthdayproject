import { useEffect, useRef } from 'react';

interface GalleryImageProps {
  src: string;
  alt?: string;
  index: number;
  backgroundColor?: string;
}

export default function GalleryImage({ 
  src, 
  alt = "", 
  index, 
  backgroundColor = "#0493a6" 
}: GalleryImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  // 奇数番号: 左から右へ、偶数番号: 右から左へ
  const isOdd = index % 2 === 1;
  const initialTransform = isOdd ? 'translateX(-100%)' : 'translateX(100%)';
  
  useEffect(() => {
    // スクロールに合わせてアニメーションを実行
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // コンテナを中央揃えに変更
            if (containerRef.current) {
              containerRef.current.style.justifyContent = 'center';
            }
            
            // 画像の表示
            if (imageRef.current) {
              imageRef.current.style.opacity = '1';
              imageRef.current.style.transform = 'translateX(0)';
            }
            
            // 背景の表示
            if (bgRef.current) {
              bgRef.current.style.opacity = '1';
            }
            
            // 一度表示されたら監視を解除
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 } // 20%が見えたらアニメーション開始
    );
    
    // コンテナ要素を監視
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full mb-10 md:mb-16" 
      style={{ 
        display: 'flex', 
        justifyContent: isOdd ? 'flex-start' : 'flex-end',
        transition: 'justify-content 1.2s ease-out' 
      }}
    >
      {/* 画像と背景をラップする要素 */}
      <div className="relative" style={{ width: '65%' }}>
        {/* 背景要素 - フェードインするだけ */}
        <div
          ref={bgRef}
          className="absolute rounded-sm transition-opacity duration-1000 opacity-0"
          style={{
            backgroundColor: backgroundColor,
            width: '100%',
            height: '110%',
            top: '-5%',
            left: '0',
            zIndex: 0
          }}
        />

        {/* 画像要素 - 左右から移動 */}
        <div 
          ref={imageRef}
          className="relative z-10 transition-all duration-1000 ease-out"
          style={{
            opacity: 0,
            transform: initialTransform,
            width: '100%'
          }}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-auto block"
            style={{ 
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          />
        </div>
      </div>
    </div>
  );
}
