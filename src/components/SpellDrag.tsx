import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { Activity } from '../types';

/** 可作风拼读拖拽干扰项的拼音片段池（声母 + 单/复/鼻韵母） */
const PHONEME_POOL = [
  'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x',
  'zh', 'ch', 'sh', 'z', 'c', 's', 'y', 'w',
  'a', 'o', 'e', 'i', 'u', 'ü', 'ai', 'ei', 'ui', 'ao', 'ou', 'iu',
  'ie', 'üe', 'er', 'an', 'en', 'in', 'un', 'ün', 'ang', 'eng', 'ing', 'ong',
];

function shuffle<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** 从片段池里挑 n 个不在 parts 里的干扰项（用于拼读拖拽） */
function pickDistractors(parts: string[], n = 2): string[] {
  const used = new Set(parts);
  const cands = PHONEME_POOL.filter((p) => !used.has(p));
  // 用 parts 字符串长度做确定性偏移，避免每次挂载都换干扰项造成跳动
  const seed = parts.join('').length || 1;
  for (let i = cands.length - 1; i > 0; i--) {
    const j = (i * 31 + seed) % (i + 1);
    [cands[i], cands[j]] = [cands[j], cands[i]];
  }
  return cands.slice(0, n);
}

interface DragState {
  val: string;
  from: 'pool' | number;
  x: number;
  y: number;
  moved: boolean;
}

/**
 * 拼读拖拽：把声母/韵母片段拖进槽位，拼出正确音节。
 * 支持指针拖拽（鼠标 + 触屏），也支持「点一下池子里的块→自动进下一个空槽」的轻量模式。
 */
export function SpellDrag({
  activity,
  onSolved,
  onWrong,
}: {
  activity: Activity;
  onSolved: () => void;
  onWrong: () => void;
}) {
  const parts = activity.parts || [];
  const initPool = useRef<string[]>([]);

  const build = () => {
    const pool = shuffle([...parts, ...pickDistractors(parts, 2)]);
    initPool.current = pool;
    return { pool, slots: Array<string | null>(parts.length).fill(null) };
  };

  const [state, setState] = useState<{ pool: string[]; slots: (string | null)[] }>(build);
  const [drag, setDrag] = useState<DragState | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!drag) return;
    function move(e: PointerEvent) {
      setDrag((d) => (d ? { ...d, x: e.clientX, y: e.clientY, moved: true } : d));
    }
    function up(e: PointerEvent) {
      const d = dragRef.current;
      setDrag(null);
      dragRef.current = null;
      if (!d) return;
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const slotEl = el?.closest('.spell-slot') as HTMLElement | null;
      const idxAttr = slotEl?.getAttribute('data-slot');
      const targetIdx = idxAttr != null ? Number(idxAttr) : null;
      applyPlace(d.val, d.from, targetIdx, !d.moved);
    }
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [drag]);

  function startDrag(e: ReactPointerEvent, val: string, from: 'pool' | number) {
    if (activity.answer == null) return;
    e.preventDefault();
    const d: DragState = { val, from, x: e.clientX, y: e.clientY, moved: false };
    dragRef.current = d;
    setDrag(d);
  }

  function applyPlace(val: string, from: 'pool' | number, targetIdx: number | null, isTap: boolean) {
    setState((s) => {
      const pool = [...s.pool];
      const slots = [...s.slots];
      // 先从原位置取出
      if (from === 'pool') {
        const i = pool.indexOf(val);
        if (i >= 0) pool.splice(i, 1);
      } else {
        slots[from] = null;
      }
      // 决定落点
      let tgt = targetIdx;
      if (tgt == null && isTap && from === 'pool') tgt = slots.findIndex((x) => x == null);
      if (tgt != null && tgt >= 0 && tgt < slots.length) {
        const occupant = slots[tgt];
        slots[tgt] = val;
        if (occupant) pool.push(occupant);
      } else {
        pool.push(val); // 没落到有效槽位 → 退回池子
      }
      return { pool, slots };
    });
  }

  function check() {
    if (state.slots.some((x) => x == null)) return;
    if (state.slots.join('') === activity.answer) {
      onSolved();
    } else {
      onWrong();
      setTimeout(() => setState({ pool: [...initPool.current], slots: Array(parts.length).fill(null) }), 1100);
    }
  }

  const allFilled = state.slots.every((x) => x != null);

  return (
    <div className="spell-drag">
      <div className="spell-slots">
        {state.slots.map((t, i) => (
          <div
            key={i}
            className={`spell-slot ${t ? 'filled' : ''}`}
            data-slot={i}
            ref={(el) => (slotRefs.current[i] = el)}
          >
            {t && (
              <button
                type="button"
                className={`spell-tile in-slot ${drag && drag.from === i ? 'dragging' : ''}`}
                onPointerDown={(e) => startDrag(e, t, i)}
              >
                {t}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="spell-pool">
        {state.pool.map((t, i) => (
          <button
            type="button"
            key={`${t}-${i}`}
            className={`spell-tile ${drag && drag.from === 'pool' && drag.val === t ? 'dragging' : ''}`}
            onPointerDown={(e) => startDrag(e, t, 'pool')}
          >
            {t}
          </button>
        ))}
      </div>

      <button type="button" className="primary-btn" onClick={check} disabled={!allFilled}>
        完成
      </button>

      {drag && (
        <div className="spell-drag-clone" style={{ left: drag.x, top: drag.y }}>
          {drag.val}
        </div>
      )}
    </div>
  );
}
