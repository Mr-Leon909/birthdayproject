interface ImageWithBackgroundProps {
  src: string
  alt: string
  width?: number
  height?: number
  backgroundOffset?: { x: number; y: number }
  backgroundColor?: string
}

export default function ImageWithBackground({
  src,
  alt,
  width,
  height,
  backgroundOffset = { x: 20, y: 0 },
  backgroundColor = "#0493a6",
}: ImageWithBackgroundProps) {
  return (
    <div className="relative inline-block">
      {/* 背景要素 - 画像と上辺を揃え、右下にはみ出す */}
      <div
        className="absolute rounded-sm"
        style={{
          backgroundColor: backgroundColor,
          width: width ? `${width * 0.9}px` : '95%',
          height: height ? `${height * 1.1}px` : '110%', // 高さを110%にして下にはみ出すように
          top: 0, // 上辺を画像と揃える
          left: `${backgroundOffset.x}px`,
          zIndex: 0
        }}
      />

      {/* 画像要素を前面に配置 */}
      <div className="relative z-10">
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto block pr-4"
          style={{ 
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        />
      </div>
    </div>
  )
}
