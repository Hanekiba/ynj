/** 固定全屏星空背景：纯 SVG 圆点 + 远行星，twinkle 动画。无渐变、无 emoji。 */
export function Starfield() {
  const stars = Array.from({ length: 48 }).map((_, i) => {
    const x = (i * 53.7) % 100;
    const y = (i * 29.3 + 13) % 100;
    const r = i % 4 === 0 ? 0.55 : 0.32;
    const delay = (i % 7) * 0.4;
    return (
      <circle key={i} cx={x} cy={y} r={r} fill="#ffffff" opacity={0.85} className="twinkle" style={{ animationDelay: `${delay}s` }} />
    );
  });
  return (
    <div className="space-bg" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%">
        <circle cx="84" cy="14" r="6" fill="var(--obj-planet-b)" opacity="0.22" />
        <circle cx="10" cy="82" r="4" fill="var(--obj-planet-a)" opacity="0.2" />
        {stars}
      </svg>
    </div>
  );
}
