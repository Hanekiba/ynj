export type Mood = 'idle' | 'correct' | 'wrong';

const MESSAGES: Record<Mood, string> = {
  idle: '想一想，你最棒！',
  correct: '答对啦！太棒了！',
  wrong: '再试一次，你可以的！',
};

/** 机器人伙伴：用 SVG 表情替代冷冰冰的绿勾红叉，给一年级孩子情绪化反馈 */
export function RobotCompanion({ mood = 'idle' }: { mood?: Mood }) {
  return (
    <div className={`companion companion-${mood}`}>
      <div className="companion-bot">
        <svg viewBox="0 0 120 130" width="84" height="92" role="img" aria-label="机器人伙伴">
          {/* 天线 */}
          <line x1="60" y1="34" x2="60" y2="14" stroke="var(--robot-body)" strokeWidth="4" strokeLinecap="round" />
          <circle className="bot-light" cx="60" cy="11" r="6" fill="var(--color-accent)" />
          {/* 头 */}
          <rect x="26" y="34" width="68" height="58" rx="22" fill="var(--robot-body)" />
          {/* 屏幕脸 */}
          <rect x="36" y="44" width="48" height="38" rx="14" fill="var(--robot-screen)" />
          {/* 眼睛 */}
          {mood === 'correct' ? (
            <>
              <path d="M46 56q4 -6 8 0" stroke="var(--robot-eye)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M66 56q4 -6 8 0" stroke="var(--robot-eye)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="50" cy={mood === 'wrong' ? 60 : 58} r="4.5" fill="var(--robot-eye)" />
              <circle cx="70" cy={mood === 'wrong' ? 60 : 58} r="4.5" fill="var(--robot-eye)" />
            </>
          )}
          {/* 腮红 */}
          <circle cx="42" cy="68" r="4" fill="var(--robot-cheek)" opacity={mood === 'correct' ? 0.75 : 0.3} />
          <circle cx="78" cy="68" r="4" fill="var(--robot-cheek)" opacity={mood === 'correct' ? 0.75 : 0.3} />
          {/* 嘴 */}
          {mood === 'correct' ? (
            <path d="M48 66q12 14 24 0z" fill="var(--color-accent)" />
          ) : mood === 'wrong' ? (
            <path d="M50 72q10 -8 20 0" stroke="var(--robot-eye)" strokeWidth="3" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M52 68q8 7 16 0" stroke="var(--robot-eye)" strokeWidth="3" fill="none" strokeLinecap="round" />
          )}
          {/* 身体 */}
          <rect x="44" y="92" width="32" height="26" rx="10" fill="var(--robot-body)" />
          <circle cx="60" cy="104" r="4" fill="var(--robot-screen)" />
          {/* 手臂 */}
          <rect x="12" y="96" width="14" height="10" rx="5" fill="var(--robot-body)" />
          <rect x="94" y="96" width="14" height="10" rx="5" fill="var(--robot-body)" />
        </svg>
      </div>
      <div className="companion-bubble">{MESSAGES[mood]}</div>
    </div>
  );
}
