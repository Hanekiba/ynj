import { useMemo, useState } from 'react';
import type { Subject } from '../types';
import { unitsBySubject, actsByUnit } from '../data';
import { Playlist } from './Playlist';

export function FreeMode({
  onExit,
  onSolved,
  onWrong,
  read,
}: {
  onExit: () => void;
  onSolved: () => void;
  onWrong?: (id: string) => void;
  /** 是否自动朗读题目与答案 */
  read?: boolean;
}) {
  const [subject, setSubject] = useState<Subject | null>(null);
  const [unit, setUnit] = useState<string | null>(null);

  const units = useMemo(() => (subject ? unitsBySubject(subject) : []), [subject]);

  if (!subject) {
    return (
      <div className="app" style={{ padding: 0 }}>
        <div className="topbar">
          <button className="back-btn" onClick={onExit}>
            返回
          </button>
          <span className="title">自由练习</span>
          <span style={{ width: 56 }} />
        </div>
        <div className="mode-grid">
          <button className="mode-card" onClick={() => setSubject('math')}>
            数学
            <span className="sub">数与运算</span>
          </button>
          <button className="mode-card" onClick={() => setSubject('chinese')}>
            语文
            <span className="sub">拼音 / 识字</span>
          </button>
        </div>
      </div>
    );
  }

  if (!unit) {
    return (
      <div className="app" style={{ padding: 0 }}>
        <div className="topbar">
          <button className="back-btn" onClick={() => setSubject(null)}>
            返回
          </button>
          <span className="title">选单元</span>
          <span style={{ width: 56 }} />
        </div>
        <div className="level-list">
          {units.map((u) => (
            <button key={u.unit} className="level-item" onClick={() => setUnit(u.unit)}>
              {u.unit}
              <span className="sub">{u.acts.length} 题</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Playlist
      items={actsByUnit(subject, unit)}
      title={unit}
      onExit={onExit}
      onSolved={onSolved}
      onWrong={onWrong}
      read={read}
    />
  );
}
