export type CarKind =
  | 'car1'
  | 'car2'
  | 'car3'
  | 'car4'
  | 'car5'
  | 'car6'
  | 'car7'
  | 'car8'
  | 'car9'
  | 'car10';

export const CAR_STICKERS: CarKind[] = [
  'car1',
  'car2',
  'car3',
  'car4',
  'car5',
  'car6',
  'car7',
  'car8',
  'car9',
  'car10',
];

const WHEEL = '#1a2050';
const WHEEL_HUB = '#9aa3d6';
const GLASS = '#eef1ff';

/** 车轮：可被外部 CSS 选中做旋转动画（.car-driving .wheel） */
function Wheel({ cx, cy, r = 4 }: { cx: number; cy: number; r?: number }) {
  return (
    <g className="wheel">
      <circle cx={cx} cy={cy} r={r} fill={WHEEL} />
      <circle cx={cx} cy={cy} r={r * 0.4} fill={WHEEL_HUB} />
    </g>
  );
}

/** 驾驶座头像：圆形裁切，放在车窗里，像在开车。无头像时显示默认剪影。 */
function DriverSeat({
  cx,
  cy,
  r,
  avatarUrl,
}: {
  cx: number;
  cy: number;
  r: number;
  avatarUrl?: string;
}) {
  const id = `driver-clip-${cx}-${cy}-${r}`;
  if (avatarUrl) {
    return (
      <>
        <defs>
          <clipPath id={id}>
            <circle cx={cx} cy={cy} r={r} />
          </clipPath>
        </defs>
        <image
          href={avatarUrl}
          x={cx - r}
          y={cy - r}
          width={r * 2}
          height={r * 2}
          clipPath={`url(#${id})`}
          preserveAspectRatio="xMidYMid slice"
        />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
      </>
    );
  }
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill="var(--color-muted)" />
      <circle cx={cx} cy={cy - r * 0.25} r={r * 0.35} fill="#fff" opacity="0.7" />
      <path
        d={`M${cx - r * 0.55} ${cy + r * 0.7} q${r * 0.55} -${r * 0.55} ${r * 1.1} 0 z`}
        fill="#fff"
        opacity="0.7"
      />
    </>
  );
}

/** 10 款不同小汽车贴纸（侧面简笔画，扁平、走 token 色），viewBox 40x40 */
export function CarSticker({
  kind,
  size = 48,
  avatarUrl,
  driving,
}: {
  kind: CarKind;
  size?: number;
  avatarUrl?: string;
  /** 打开后车轮旋转 + 车身颠簸，模拟在开车 */
  driving?: boolean;
}) {
  const common = {
    viewBox: '0 0 40 40',
    width: size,
    height: size,
    'aria-hidden': true,
    className: driving ? 'car-driving' : undefined,
  } as const;
  switch (kind) {
    case 'car1': // 红色小轿车
      return (
        <svg {...common}>
          <rect x="5" y="21" width="30" height="9" rx="3" fill="var(--obj-rocket)" />
          <path d="M12 21 L15 13 L26 13 L29 21 Z" fill="var(--obj-rocket)" />
          <rect x="16" y="14" width="4" height="4" rx="1" fill={GLASS} />
          <rect x="22" y="14" width="4" height="4" rx="1" fill={GLASS} />
          <DriverSeat cx={18} cy={16} r={3.6} avatarUrl={avatarUrl} />
          <Wheel cx={13} cy={31} r={4} />
          <Wheel cx={27} cy={31} r={4} />
        </svg>
      );
    case 'car2': // 蓝色面包车
      return (
        <svg {...common}>
          <rect x="5" y="13" width="30" height="17" rx="3" fill="var(--obj-planet-b)" />
          <rect x="7" y="15" width="8" height="6" rx="1" fill={GLASS} />
          <rect x="17" y="15" width="8" height="6" rx="1" fill={GLASS} />
          <rect x="27" y="15" width="5" height="6" rx="1" fill={GLASS} />
          <DriverSeat cx={11} cy={18} r={3.4} avatarUrl={avatarUrl} />
          <Wheel cx={13} cy={31} r={4} />
          <Wheel cx={27} cy={31} r={4} />
        </svg>
      );
    case 'car3': // 黄色校车
      return (
        <svg {...common}>
          <rect x="4" y="15" width="32" height="15" rx="3" fill="var(--obj-star)" />
          <rect x="6" y="17" width="28" height="5" rx="1" fill={WHEEL} opacity="0.85" />
          <rect x="8" y="17.8" width="5" height="3.4" rx="0.6" fill={GLASS} />
          <rect x="16" y="17.8" width="5" height="3.4" rx="0.6" fill={GLASS} />
          <rect x="24" y="17.8" width="5" height="3.4" rx="0.6" fill={GLASS} />
          <DriverSeat cx={10.5} cy={19.5} r={3} avatarUrl={avatarUrl} />
          <Wheel cx={12} cy={31} r={4} />
          <Wheel cx={28} cy={31} r={4} />
        </svg>
      );
    case 'car4': // 绿色赛车
      return (
        <svg {...common}>
          <path d="M6 27 L10 22 L27 22 L31 27 Z" fill="var(--color-correct)" />
          <rect x="14" y="16" width="9" height="6" rx="2" fill="var(--color-correct)" />
          <rect x="27" y="13" width="6" height="3" rx="1.5" fill="var(--color-correct)" />
          <rect x="15" y="17" width="7" height="4" rx="1" fill={GLASS} />
          <DriverSeat cx={18.5} cy={19} r={3.2} avatarUrl={avatarUrl} />
          <Wheel cx={13} cy={29} r={4} />
          <Wheel cx={27} cy={29} r={4} />
        </svg>
      );
    case 'car5': // 橙色 SUV
      return (
        <svg {...common}>
          <rect x="5" y="17" width="30" height="13" rx="3" fill="var(--obj-comet)" />
          <path d="M9 17 L12 11 L21 11 L24 17 Z" fill="var(--obj-comet)" />
          <rect x="13" y="12" width="5" height="4" rx="1" fill={GLASS} />
          <rect x="20" y="12" width="5" height="4" rx="1" fill={GLASS} />
          <DriverSeat cx={15.5} cy={14} r={3.3} avatarUrl={avatarUrl} />
          <Wheel cx={13} cy={31} r={4} />
          <Wheel cx={27} cy={31} r={4} />
        </svg>
      );
    case 'car6': // 青色敞篷车
      return (
        <svg {...common}>
          <rect x="5" y="21" width="30" height="9" rx="3" fill="var(--obj-moon)" />
          <path d="M12 21 L14 16 L23 16 L25 21 Z" fill="var(--obj-moon)" />
          <rect x="15" y="17" width="7" height="3" rx="1" fill={GLASS} />
          <DriverSeat cx={18.5} cy={18.5} r={3.4} avatarUrl={avatarUrl} />
          <Wheel cx={13} cy={31} r={4} />
          <Wheel cx={27} cy={31} r={4} />
        </svg>
      );
    case 'car7': // 薄荷绿迷你车
      return (
        <svg {...common}>
          <rect x="6" y="20" width="28" height="10" rx="4" fill="var(--car-mint)" />
          <path d="M11 20 L13 14 L22 14 L24 20 Z" fill="var(--car-mint)" />
          <rect x="14" y="15" width="4" height="4" rx="1" fill={GLASS} />
          <rect x="20" y="15" width="4" height="4" rx="1" fill={GLASS} />
          <DriverSeat cx={16} cy={17} r={3.2} avatarUrl={avatarUrl} />
          <Wheel cx={12} cy={30} r={4} />
          <Wheel cx={28} cy={30} r={4} />
        </svg>
      );
    case 'car8': // 警车
      return (
        <svg {...common}>
          <rect x="5" y="20" width="30" height="10" rx="3" fill="var(--obj-planet-b)" />
          <path d="M11 20 L14 13 L24 13 L27 20 Z" fill="var(--obj-planet-b)" />
          <rect x="15" y="14" width="5" height="4" rx="1" fill={GLASS} />
          <rect x="22" y="14" width="5" height="4" rx="1" fill={GLASS} />
          <rect x="17" y="11" width="6" height="2" rx="1" fill="var(--obj-rocket)" />
          <DriverSeat cx={17.5} cy={16} r={3.2} avatarUrl={avatarUrl} />
          <Wheel cx={13} cy={31} r={4} />
          <Wheel cx={27} cy={31} r={4} />
        </svg>
      );
    case 'car9': // 白色救护车
      return (
        <svg {...common}>
          <rect x="4" y="15" width="32" height="15" rx="3" fill="#fff" />
          <rect x="6" y="17" width="6" height="5" rx="1" fill={GLASS} />
          <rect x="14" y="17" width="6" height="5" rx="1" fill={GLASS} />
          <rect x="22" y="17" width="6" height="5" rx="1" fill={GLASS} />
          <rect x="18" y="19" width="4" height="1" fill="var(--obj-rocket)" />
          <rect x={19.5} y={17.5} width="1" height="4" fill="var(--obj-rocket)" />
          <DriverSeat cx={9} cy={19.5} r={3} avatarUrl={avatarUrl} />
          <Wheel cx={12} cy={31} r={4} />
          <Wheel cx={28} cy={31} r={4} />
        </svg>
      );
    case 'car10': // 深灰老爷车
    default:
      return (
        <svg {...common}>
          <rect x="5" y="19" width="30" height="11" rx="2" fill="var(--car-charcoal)" />
          <path d="M10 19 L13 12 L24 12 L27 19 Z" fill="var(--car-charcoal)" />
          <rect x="14" y="13" width="5" height="5" rx="1" fill={GLASS} />
          <rect x="21" y="13" width="5" height="5" rx="1" fill={GLASS} />
          <DriverSeat cx={16.5} cy={15.5} r={3.3} avatarUrl={avatarUrl} />
          <Wheel cx={13} cy={31} r={4} />
          <Wheel cx={27} cy={31} r={4} />
        </svg>
      );
  }
}
