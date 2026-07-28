import type { Activity, SpaceKind } from '../types';
import { SPACE_KINDS } from '../types';

/** 按 activity.id 稳定选一种物体，保证同一题每次渲染一致、不同题有变化 */
export function objKind(a: Activity): SpaceKind {
  let h = 0;
  for (const c of a.id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return SPACE_KINDS[h % SPACE_KINDS.length];
}

/** 具象化物体：用星球/火箭/星星/外星人/彗星/月亮替抽象圆点 */
export function SpaceObject({ kind, size = 40 }: { kind: SpaceKind; size?: number }) {
  const common = { viewBox: '0 0 40 40', width: size, height: size, 'aria-hidden': true } as const;
  switch (kind) {
    case 'rocket':
      return (
        <svg {...common}>
          <path d="M20 4c6 5 8 12 8 18l-4 6H16l-4-6c0-6 2-13 8-18z" fill="var(--obj-rocket)" />
          <circle cx="20" cy="16" r="4.5" fill="var(--obj-star)" />
          <path d="M12 24l-4 5 6-1zM28 24l4 5-6-1z" fill="var(--obj-planet-b)" />
          <path d="M16 30l4 6 4-6z" fill="var(--obj-comet)" />
        </svg>
      );
    case 'star':
      return (
        <svg {...common}>
          <path
            d="M20 4l4.6 9.6 10.4 1.2-7.7 7.1 2 10.4L20 35.3 10.7 32.3l2-10.4L5 14.8l10.4-1.2z"
            fill="var(--obj-star)"
            stroke="#000"
            strokeOpacity="0.12"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'alien':
      return (
        <svg {...common}>
          <line x1="14" y1="9" x2="12" y2="2" stroke="var(--obj-alien)" strokeWidth="2" strokeLinecap="round" />
          <line x1="26" y1="9" x2="28" y2="2" stroke="var(--obj-alien)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="13" cy="5" r="2.6" fill="var(--obj-alien)" />
          <circle cx="27" cy="5" r="2.6" fill="var(--obj-alien)" />
          <circle cx="20" cy="21" r="12" fill="var(--obj-alien)" />
          <circle cx="15" cy="20" r="2.6" fill="var(--space-deep)" />
          <circle cx="25" cy="20" r="2.6" fill="var(--space-deep)" />
          <path d="M16 26q4 4 8 0" stroke="var(--space-deep)" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'comet':
      return (
        <svg {...common}>
          <circle cx="14" cy="14" r="7" fill="var(--obj-comet)" />
          <path d="M18 18L34 34" stroke="var(--obj-comet)" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
          <path d="M20 15L31 26" stroke="var(--obj-star)" strokeWidth="2.6" strokeLinecap="round" opacity="0.7" />
        </svg>
      );
    case 'moon':
      return (
        <svg {...common}>
          <path d="M27 6a15 15 0 1 0 0 28 12.5 12.5 0 1 1 0-28z" fill="var(--obj-moon)" />
        </svg>
      );
    case 'planet':
    default:
      return (
        <svg {...common}>
          <ellipse cx="20" cy="20" rx="18" ry="6.5" fill="none" stroke="var(--obj-planet-b)" strokeWidth="3" transform="rotate(-20 20 20)" />
          <circle cx="20" cy="20" r="12" fill="var(--obj-planet-a)" />
          <circle cx="16" cy="17" r="3" fill="#000" opacity="0.12" />
        </svg>
      );
  }
}
