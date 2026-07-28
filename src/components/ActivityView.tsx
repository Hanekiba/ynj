import { useEffect, useMemo, useRef, useState } from 'react';
import type { Activity } from '../types';
import { speak, speakAndThen, playAudio } from '../audio';
import { ActivityVisual } from './ActivityVisual';
import { RobotCompanion } from './RobotCompanion';
import { SpellDrag } from './SpellDrag';
import { InteractiveClock } from './InteractiveClock';

type Feedback = 'idle' | 'correct' | 'wrong';

/** 根据题目类型，生成一段适合朗读的答案文本 */
function answerText(a: Activity): string {
  if (a.type === 'match' && a.pairs) {
    return '答案是：' + a.pairs.map(([l, r]) => `${l} 连 ${r}`).join('，');
  }
  if (a.type === 'clock' && a.clockTime) {
    const [h, m] = a.clockTime;
    return m === 0 ? `答案是：${h} 时` : `答案是：${h} 时 ${m} 分`;
  }
  if (a.type === 'drag-count') {
    return `答案是：${a.answer} 个`;
  }
  if (a.type === 'spell' && a.parts) {
    return `读音是：${a.parts.join('')}`;
  }
  if (a.answer) {
    return `答案是：${a.answer}`;
  }
  return '';
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function ActivityView({
  activity,
  onSolved,
  onWrong,
  read,
}: {
  activity: Activity;
  onSolved: () => void;
  onWrong?: (id: string) => void;
  /** 是否自动朗读题目与答案（首页「自动朗读」开关控制） */
  read?: boolean;
}) {
  const [feedback, setFeedback] = useState<Feedback>('idle');
  const [selected, setSelected] = useState<string | null>(null);
  // 答错次数计数器：每次答错 +1，用于驱动「再试一次」语音在重复答错时也重新朗读
  // （选择题 feedback 会停留在 'wrong' 不再变化，仅靠 feedback 状态无法触发重复朗读）
  const [wrongTick, setWrongTick] = useState(0);

  // 拖拽点数
  const [count, setCount] = useState(0);

  // 进入题目时自动朗读题干（read 开启时）；用 ref 防止 StrictMode 重复朗读同一题
  const spokenRef = useRef<string | null>(null);
  useEffect(() => {
    if (!read || !activity.prompt) return;
    // 认读题(听音选字)由 mp3 自动播放目标读音，这里不再 TTS 题干，避免两个声音重叠
    if (activity.topic === '认读' && activity.audio) return;
    if (spokenRef.current === activity.id) return;
    spokenRef.current = activity.id;
    speak(activity.prompt);
  }, [activity.id, read, activity.prompt, activity.topic, activity.audio]);

  // 答错时机器人读出鼓励语（与 RobotCompanion 的 wrong 气泡文案一致）
  // 用 wrongTick 触发：选择题 feedback 会停在 'wrong' 不再变化，重复答错需靠计数重新朗读
  useEffect(() => {
    if (read && wrongTick > 0) speak('再试一次，你可以的！');
  }, [wrongTick, read]);

  // 连线
  const rightItems = useMemo(
    () => shuffle((activity.pairs || []).map((p) => p[1])),
    [activity.id],
  );
  const [pairs, setPairs] = useState<Record<string, string>>({});
  const [sel, setSel] = useState<{ side: 'L' | 'R'; val: string } | null>(null);

  // 选项顺序随机化（每次进入题目重新洗牌），避免正确答案总在第一/固定位置
  const [opts] = useState<string[]>(() => shuffle(activity.options ? [...activity.options] : []));

  function solved() {
    setFeedback('correct');
    // 答对后朗读答案，读完（或超时兜底）再进入下一题
    if (read) {
      // 含真人发音录音的题（认读声韵母、识字/课文汉字）：答案用 mp3 播放，
      // 避免 TTS 把拼音/声韵母读错（如把 b/p/m 读成英文字母、把 tiān 读偏）
      if (activity.audio) {
        playAudio(activity.audio, onSolved);
        return;
      }
      const ans = answerText(activity);
      if (ans) {
        speakAndThen(ans, onSolved);
        return;
      }
    }
    setTimeout(onSolved, 850);
  }

  function handleWrong() {
    setFeedback('wrong');
    setTimeout(() => setFeedback('idle'), 1000);
  }

  /** 记录答错：把本题 id 上报给上层（写入错题本），并 +1 触发「再试一次」语音 */
  function reportWrong() {
    onWrong?.(activity.id);
    setWrongTick((t) => t + 1);
  }

  function choose(val: string) {
    if (feedback === 'correct' || !activity.options) return;
    setSelected(val);
    if (val === activity.answer) solved();
    else {
      setFeedback('wrong');
      reportWrong();
    }
  }

  function dragCheck() {
    if (feedback !== 'idle') return;
    if (count === Number(activity.answer)) solved();
    else {
      setFeedback('wrong');
      reportWrong();
      setTimeout(() => setFeedback('idle'), 900);
    }
  }

  function matchTap(side: 'L' | 'R', val: string) {
    if (feedback !== 'idle') return;
    if (sel && sel.side !== side) {
      setPairs({ ...pairs, [sel.val]: val });
      setSel(null);
    } else if (sel && sel.side === side) {
      setSel(null);
    } else {
      setSel({ side, val });
    }
  }

  function matchCheck() {
    if (feedback !== 'idle') return;
    const correct = (activity.pairs || []).every(([l, r]) => pairs[l] === r);
    if (correct) solved();
    else {
      setFeedback('wrong');
      reportWrong();
      setTimeout(() => {
        setFeedback('idle');
        setPairs({});
        setSel(null);
      }, 1100);
    }
  }

  const showHint = feedback === 'wrong' && activity.hint;

  return (
    <div className="panel">
      <RobotCompanion mood={feedback} />

      <div className="prompt">
        {activity.prompt}
        <button
          type="button"
          className="read-btn"
          onClick={() => (activity.audio ? playAudio(activity.audio) : speak(activity.prompt))}
          aria-label="听题目"
          title="听题目"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4 9v6h4l5 5V4L8 9H4z" />
            <path d="M16 8.5a4 4 0 010 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M18.5 6a7 7 0 010 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          听题目
        </button>
      </div>

      {activity.type !== 'clock' && <ActivityVisual activity={activity} />}

      {/* choice / listen-choice：选项已随机洗牌（拼读题改用拖拽、钟表题改可拨动，均不渲染选项按钮） */}
      {opts.length > 0 && activity.type !== 'spell' && activity.type !== 'clock' && (
        <div className="options">
          {opts.map((opt) => {
            const cls =
              feedback === 'correct' && selected === opt
                ? 'opt correct'
                : feedback === 'wrong' && selected === opt
                  ? 'opt wrong'
                  : 'opt';
            return (
              <button key={opt} className={cls} onClick={() => choose(opt)} disabled={feedback === 'correct'}>
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {/* drag-count */}
      {activity.type === 'drag-count' && (
        <>
          <div className="counter-area">
            {Array.from({ length: count }).map((_, i) => (
              <span className="counter-dot" key={i} />
            ))}
          </div>
          <div className="stepper">
            <button className="step-btn" onClick={() => setCount((c) => Math.max(0, c - 1))} aria-label="减少">
              −
            </button>
            <button className="step-btn" onClick={() => setCount((c) => c + 1)} aria-label="增加">
              +
            </button>
          </div>
          <button className="primary-btn" onClick={dragCheck} disabled={feedback === 'correct'}>
            完成
          </button>
        </>
      )}

      {/* spell：拖拽拼读（指针拖拽 + 点按轻量模式） */}
      {activity.type === 'spell' && activity.parts && (
        <SpellDrag
          activity={activity}
          onSolved={solved}
          onWrong={() => {
            handleWrong();
            reportWrong();
          }}
        />
      )}

      {/* clock：可旋转时钟（拖动指针拨出目标时间） */}
      {activity.type === 'clock' && activity.clockTime && (
        <InteractiveClock
          activity={activity}
          onSolved={solved}
          onWrong={() => {
            handleWrong();
            reportWrong();
          }}
        />
      )}

      {/* match */}
      {activity.type === 'match' && activity.pairs && (
        <>
          <div className="match-cols">
            <div className="match-col">
              {activity.pairs.map(([l]) => (
                <button
                  key={l}
                  className={`match-item ${sel?.side === 'L' && sel.val === l ? 'sel' : ''} ${pairs[l] ? 'matched' : ''}`}
                  onClick={() => matchTap('L', l)}
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="match-col">
              {rightItems.map((r) => {
                const matchedL = Object.entries(pairs).find(([, v]) => v === r)?.[0];
                return (
                  <button
                    key={r}
                    className={`match-item ${sel?.side === 'R' && sel.val === r ? 'sel' : ''} ${matchedL ? 'matched' : ''}`}
                    onClick={() => matchTap('R', r)}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>
          <button
            className="primary-btn"
            onClick={matchCheck}
            disabled={feedback === 'correct' || Object.keys(pairs).length !== activity.pairs.length}
          >
            完成
          </button>
        </>
      )}

      {showHint && <div className="hint">再想想：{activity.hint}</div>}
    </div>
  );
}
