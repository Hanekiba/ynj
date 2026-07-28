import { useState } from 'react';
import type { Activity } from '../types';
import { ActivityView } from '../components/ActivityView';

export function Playlist({
  items,
  title,
  onExit,
  onSolved,
  onWrong,
  doneTitle,
  onClear,
  clearLabel,
  read,
}: {
  items: Activity[];
  title: string;
  onExit: () => void;
  onSolved: () => void;
  onWrong?: (id: string) => void;
  doneTitle?: string;
  onClear?: () => void;
  clearLabel?: string;
  /** 是否自动朗读题目与答案 */
  read?: boolean;
}) {
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);
  const [earned, setEarned] = useState(0);

  if (done) {
    return (
      <div className="panel done-screen">
        <svg width="72" height="72" viewBox="0 0 24 24" fill="var(--color-accent)" aria-hidden="true">
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
        </svg>
        <h2>{doneTitle || '过关啦！'}</h2>
        <p className="muted">这一关你得了 {earned} 颗星星</p>
        <button className="primary-btn" onClick={onExit}>
          返回首页
        </button>
        {onClear && (
          <button className="ghost-btn" onClick={onClear}>
            {clearLabel || '清空'}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="app" style={{ padding: 0 }}>
      <div className="topbar">
        <button className="back-btn" onClick={onExit}>
          返回
        </button>
        <span className="title">
          {title} {i + 1}/{items.length}
        </span>
        <span style={{ width: 56 }} />
      </div>
      <ActivityView
        key={items[i].id}
        activity={items[i]}
        read={read}
        onSolved={() => {
          onSolved();
          setEarned((e) => e + 1);
          if (i + 1 < items.length) setI(i + 1);
          else setDone(true);
        }}
        onWrong={onWrong}
      />
    </div>
  );
}
