import { Fragment } from 'react';
import type { Activity, ShapeKind } from '../types';
import { SpaceObject, objKind } from './SpaceObject';
import { SpeakerButton } from './SpeakerButton';

const COLOR_HEX: Record<string, string> = {
  红: '#e26d6d',
  黄: '#f2c14e',
  蓝: '#5b8def',
  绿: '#2f9e78',
  橙: '#f2913c',
  紫: '#9b6dd6',
  粉: '#ef9bb6',
};

function ShapeSvg({ kind }: { kind: ShapeKind }) {
  if (kind === 'cuboid') {
    return (
      <svg className="shape-svg" viewBox="0 0 160 120" aria-hidden="true">
        <polygon points="30,40 110,40 130,55 50,55" fill="#bfe3d4" />
        <polygon points="30,40 50,55 50,95 30,80" fill="#8fcdb4" />
        <rect x="50" y="55" width="80" height="40" fill="var(--color-primary)" />
      </svg>
    );
  }
  if (kind === 'cube') {
    return (
      <svg className="shape-svg" viewBox="0 0 120 120" aria-hidden="true">
        <polygon points="35,35 85,35 100,48 50,48" fill="#bfe3d4" />
        <polygon points="35,35 50,48 50,98 35,85" fill="#8fcdb4" />
        <rect x="50" y="48" width="50" height="50" fill="var(--color-primary)" />
      </svg>
    );
  }
  if (kind === 'cylinder') {
    return (
      <svg className="shape-svg" viewBox="0 0 120 130" aria-hidden="true">
        <ellipse cx="60" cy="100" rx="45" ry="14" fill="#8fcdb4" />
        <rect x="15" y="30" width="90" height="70" fill="var(--color-primary)" />
        <ellipse cx="60" cy="30" rx="45" ry="14" fill="#bfe3d4" />
      </svg>
    );
  }
  // sphere
  return (
    <svg className="shape-svg" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="48" fill="var(--color-primary)" />
      <ellipse cx="46" cy="44" rx="16" ry="10" fill="#bfe3d4" opacity="0.8" />
    </svg>
  );
}

function ClockSvg({ h, m }: { h: number; m: number }) {
  const hourDeg = ((h % 12) + m / 60) * 30;
  const minDeg = m * 6;
  const ticks = Array.from({ length: 12 }).map((_, i) => {
    const ang = (i * 30 * Math.PI) / 180;
    const x1 = 100 + 78 * Math.sin(ang);
    const y1 = 100 - 78 * Math.cos(ang);
    const x2 = 100 + 70 * Math.sin(ang);
    const y2 = 100 - 70 * Math.cos(ang);
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-muted)" strokeWidth={i % 3 === 0 ? 3 : 1.5} />;
  });
  return (
    <svg className="clock-face" viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="100" cy="100" r="88" fill="#fff" stroke="var(--color-primary)" strokeWidth="4" />
      {ticks}
      <line x1="100" y1="100" x2="100" y2="58" stroke="var(--color-text)" strokeWidth="6" strokeLinecap="round" transform={`rotate(${hourDeg} 100 100)`} />
      <line x1="100" y1="100" x2="100" y2="38" stroke="var(--color-accent)" strokeWidth="4" strokeLinecap="round" transform={`rotate(${minDeg} 100 100)`} />
      <circle cx="100" cy="100" r="7" fill="var(--color-text)" />
    </svg>
  );
}

function PositionScene({ dir }: { dir: Activity['scene'] }) {
  const layout: Record<string, string> = {
    above: 'column-reverse',
    below: 'column',
    left: 'row-reverse',
    right: 'row',
    front: 'row',
    back: 'row',
  };
  const showFront = dir === 'front';
  const showBack = dir === 'back';
  return (
    <div className="position-scene" style={{ flexDirection: layout[dir || 'above'] as 'row' | 'column' }}>
      <div className="pos-block blue" style={showBack ? { zIndex: 2, marginRight: -18 } : undefined} />
      <div className="pos-block red" style={showFront ? { zIndex: 2, marginLeft: -18 } : undefined} />
    </div>
  );
}

/** 共享组件：渲染题目的视觉辅助（圆点、多组圆点、汉字大字、拼读、第几、分与合、图形、钟表、位置） */
export function ActivityVisual({ activity }: { activity: Activity }) {
  const op = activity.dotGroups ? (activity.dotsOp === 'vs' ? '' : activity.dotsOp || '+') : '';
  const kind = objKind(activity);

  return (
    <>
      {activity.dots && (
        <div className="obj-row">
          {Array.from({ length: activity.dots }).map((_, i) => (
            <SpaceObject key={i} kind={kind} />
          ))}
        </div>
      )}

      {/* 听力型拼音认读：隐藏目标字符，仅播读音，避免答案写在题目里 */}
      {activity.audio && activity.topic === '认读' && (
        <div className="listen-stage">
          <SpeakerButton src={activity.audio} label={`播放 ${activity.char || '拼音'} 的读音`} autoPlay />
        </div>
      )}

      {/* 普通大字显示：识字(带读音按钮) / 声调 / 无音频题目 */}
      {activity.char && activity.topic !== '认读' && (
        <div className="big-char">
          <span className="hanzi">{activity.char}</span>
          {/* 识字题的 pinyin 就是答案，不能写在谜面上；其他情况可显示拼音提示 */}
          {activity.pinyin && activity.pinyin !== activity.answer && (
            <span className="pinyin">{activity.pinyin}</span>
          )}
          {activity.audio && (
            <SpeakerButton src={activity.audio} label={`播放 ${activity.char} 的读音`} />
          )}
        </div>
      )}

      {activity.dotGroups && (
        <div className="dot-groups">
          {activity.dotGroups.map((n, gi) => (
            <Fragment key={gi}>
              {gi > 0 && <span className={`dot-op ${op ? '' : 'gap'}`}>{op}</span>}
              <span className="dot-group">
                {Array.from({ length: n }).map((_, k) => (
                  <SpaceObject key={k} kind={kind} size={36} />
                ))}
              </span>
            </Fragment>
          ))}
        </div>
      )}

      {activity.parts && (
        <div className="spell-parts">
          {activity.parts.map((p, i) => (
            <Fragment key={i}>
              {i > 0 && <span className="spell-op">+</span>}
              <span className="spell-part">{p}</span>
            </Fragment>
          ))}
          <span className="spell-op">=</span>
          <span className="spell-part q">?</span>
        </div>
      )}

      {activity.colors && (
        <div className="colors-row">
          {activity.colors.map((c, i) => (
            <div className="color-block" key={i} style={{ background: COLOR_HEX[c] || '#ccc' }}>
              <span>{c}</span>
            </div>
          ))}
        </div>
      )}

      {activity.split && (
        <div className="split-diagram">
          <div className="split-top">{activity.split.total}</div>
          <div className="split-branches">
            <div className="split-node">{activity.split.known}</div>
            <div className="split-node q">?</div>
          </div>
        </div>
      )}

      {activity.shape && <ShapeSvg kind={activity.shape} />}

      {activity.clockTime && <ClockSvg h={activity.clockTime[0]} m={activity.clockTime[1]} />}

      {activity.scene && <PositionScene dir={activity.scene} />}
    </>
  );
}
