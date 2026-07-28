import { useEffect, useState } from 'react';
import type { Activity } from '../types';
import { speak, playAudio } from '../audio';
import { ActivityVisual } from '../components/ActivityVisual';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function answerText(a: Activity): string {
  if (a.type === 'match' && a.pairs) return a.pairs.map(([l, r]) => `${l} → ${r}`).join('，');
  if (a.type === 'drag-count') return `摆出 ${a.answer} 个`;
  return String(a.answer);
}

export function CardMode({
  items,
  onExit,
  read,
}: {
  items: Activity[];
  onExit: () => void;
  /** 是否自动朗读题目与答案 */
  read?: boolean;
}) {
  const [deck] = useState<Activity[]>(() => shuffle(items));
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);
  const [known, setKnown] = useState(0);

  const a = deck[i];

  // 切到一张新卡片时朗读题目（read 开启时）；认读题由 mp3 自动播放，跳过 TTS 避免重叠
  useEffect(() => {
    if (read && a?.prompt && !(a.topic === '认读' && a.audio)) speak(a.prompt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, read]);

  // 翻面看答案时朗读答案（read 开启时）；含真人录音的题（认读/识字/课文）用 mp3，避免 TTS 读错拼音
  useEffect(() => {
    if (read && flipped && a) {
      if (a.audio) playAudio(a.audio);
      else speak(answerText(a));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipped, i, read]);

  function next() {
    if (i + 1 < items.length) {
      setI(i + 1);
      setFlipped(false);
    } else {
      setDone(true);
    }
  }

  if (done) {
    return (
      <div className="app">
        <div className="topbar">
          <button className="back-btn" onClick={onExit}>
            返回
          </button>
          <span className="title">卡片翻翻看</span>
          <span style={{ width: 56 }} />
        </div>
        <div className="panel done-screen">
          <h2>翻牌完成！</h2>
          <p className="muted">
            你会了 {known} / {deck.length} 张
          </p>
          <button className="primary-btn" onClick={onExit}>
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="topbar">
        <button className="back-btn" onClick={onExit}>
          返回
        </button>
        <span className="title">
          卡片 {i + 1}/{items.length}
        </span>
        <span style={{ width: 56 }} />
      </div>
      <div className="panel">
        <div className="card-scene">
          <div className={`flip-card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped((f) => !f)}>
            <div className="flip-face flip-front">
              <ActivityVisual activity={a} />
              {a.type === 'match' && a.pairs && (
                <div className="match-preview">
                  {a.pairs.map(([l, r]) => (
                    <span key={l} className="match-preview-item">
                      {l} ↔ {r}
                    </span>
                  ))}
                </div>
              )}
              <span>{a.prompt}</span>
              <span className="flip-hint">点击卡片翻面看答案</span>
            </div>
            <div className="flip-face flip-back">
              <span>{answerText(a)}</span>
            </div>
          </div>
        </div>
        {!flipped ? (
          <button className="primary-btn" onClick={() => setFlipped(true)}>
            看答案
          </button>
        ) : (
          <div className="card-actions">
            <button
              className="primary-btn"
              style={{ background: 'var(--color-correct)' }}
              onClick={() => {
                setKnown((k) => k + 1);
                next();
              }}
            >
              会了
            </button>
            <button className="primary-btn" style={{ background: 'var(--color-muted)' }} onClick={next}>
              再练练
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
