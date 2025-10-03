export default function FlowerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width="100%"
      height="100%"
      style={{ filter: 'drop-shadow(0 4px 12px rgba(115, 110, 225, 0.3))' }}
    >
      {/* Define mask */}
      <defs>
        {/* Mask = 5 petals + star cutout */}
        <mask id="flowerMask">
          {/* Draw 5 petals in a circle */}
          {Array.from({ length: 5 }).map((_, i) => {
            const angle = (i * 72 * Math.PI) / 180; // 72° apart
            const cx = 100 + 40 * Math.cos(angle);
            const cy = 100 + 40 * Math.sin(angle);
            return <circle key={i} cx={cx} cy={cy} r="44" fill="white" />;
          })}

          {/* Curved diamond star cutout in the middle */}
          <path
            fill="black"
            d="M 100 75
               Q 105 85, 110 90
               Q 115 95, 125 100
               Q 115 105, 110 110
               Q 105 115, 100 125
               Q 95 115, 90 110
               Q 85 105, 75 100
               Q 85 95, 90 90
               Q 95 85, 100 75 Z"
          />
        </mask>
      </defs>

      {/* Solid color flower shape */}
      <rect
        x="0"
        y="0"
        width="200"
        height="200"
        fill="#736ee1"
        mask="url(#flowerMask)"
      />
    </svg>
  );
}
