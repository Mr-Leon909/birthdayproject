interface ImageWithBackgroundProps {
  src: string
  alt: string
  width: number
  height: number
  backgroundOffset?: { x: number; y: number }
  backgroundColor?: string
}

export default function ImageWithBackground({
  src,
  alt,
  width,
  height,
  backgroundOffset = { x: 20, y: 20 },
  backgroundColor = "#0493a6",
}: ImageWithBackgroundProps) {
  return (
    <div className="relative inline-block">
      {/* 背景要素 */}
      <div
        className="absolute rounded-sm"
        style={{
          backgroundColor: backgroundColor,
          width: `${width}px`,
          height: `${height}px`,
          top: `${backgroundOffset.y}px`,
          left: `${backgroundOffset.x}px`,
        }}
      />

      {/* 画像要素 - 相対位置で配置 */}
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className="relative"
        style={{ display: "block" }}
      />
    </div>
  )
}
