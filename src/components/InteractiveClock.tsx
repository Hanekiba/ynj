import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { Activity } from '../types';

function angleFromPoint(px: number, py: number): number {
  // 以表盘中心(100,100)为原点，12 点方向为 0°，顺时针为正
  const deg = (Math.atan2(px - 100, -(py - 100)) * 180) / Math.PI;
  return (deg + 360) % 360;
}

function norm360(d: number): number {
  return ((d % 360) + 360) % 360;
}

/**
 * 可旋转时钟：拖动时针/分针拨出目标时间，再点「完成」核对。
 * 分针吸附到 5 分钟刻度，时针吸附到整点；适用于整时（分针对准 12）。
 */
export function InteractiveClock({
  activity,
  onSolved,
  onWrong,
}: {
  activity: Activity;
  onSolved: () => void;
  onWrong: () => void;
}) {
  const [th, tm] = activity.clockTime || [12, 0];
  const targetH = ((th % 12) + 12) % 12; // 0..11
  const targetM = tm;

  const startH = (targetH + 5) % 12; // 故意偏离，让小朋友需要拨动
  const [cur, setCur] = useState<{ h: number; m: number }>({ h: startH, m: 0 });
  const dragging = useRef<'hour' | 'min' | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    function move(e: PointerEvent) {
      const which = dragging.current;
      if (!which || !svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 200;
      const y = ((e.clientY - rect.top) / rect.height) * 200;
      const deg = angleFromPoint(x, y);
      if (which === 'hour') {
        const h = Math.round(deg / 30) % 12;
        setCur((c) => ({ ...c, h }));
      } else {
        const m = Math.round(deg / 6 / 5) * 5 % 60;
        setCur((c) => ({ ...c, m }));
      }
    }
    function up() {
      dragging.current = null;
    }
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, []);

  function down(which: 'hour' | 'min', e: ReactPointerEvent) {
    if (activity.clockTime == null) return;
    e.preventDefault();
    dragging.current = which;
  }

  function check() {
    if (cur.h === targetH && cur.m === targetM) onSolved();
    else {
      onWrong();
      setTimeout(() => setCur({ h: startH, m: 0 }), 1100);
    }
  }

  const hourDeg = cur.h * 30 + cur.m * 0.5;
  const minDeg = cur.m * 6;
  const hx = 100 + 52 * Math.sin((hourDeg * Math.PI) / 180);
  const hy = 100 - 52 * Math.cos((hourDeg * Math.PI) / 180);
  const mx = 100 + 74 * Math.sin((minDeg * Math.PI) / 180);
  const my = 100 - 74 * Math.cos((minDeg * Math.PI) / 180);

  const ticks = Array.from({ length: 12 }).map((_, i) => {
    const ang = (i * 30 * Math.PI) / 180;
    const x1 = 100 + 80 * Math.sin(ang);
    const y1 = 100 - 80 * Math.cos(ang);
    const x2 = 100 + 70 * Math.sin(ang);
    const y2 = 100 - 70 * Math.cos(ang);
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-muted)" strokeWidth={i % 3 === 0 ? 3 : 1.5} />;
  });

  const displayH = targetH === 0 ? 12 : targetH;

  return (
    <div className="clock-interactive">
      <div className="clock-instruction">把时针拨到 <b>{displayH} 时</b>，分针对准 12</div>
      <svg className="clock-face" viewBox="0 0 200 200" ref={svgRef} aria-hidden="true">
        <circle cx="100" cy="100" r="88" fill="#fff" stroke="var(--color-primary)" strokeWidth="4" />
        {ticks}
        {/* 时针（短粗，可拖） */}
        <line x1="100" y1="100" x2={hx} y2={hy} stroke="var(--color-text)" strokeWidth="7" strokeLinecap="round" />
        <line
          x1="100" y1="100" x2={hx} y2={hy}
          stroke="transparent" strokeWidth="26" strokeLinecap="round"
          style={{ pointerEvents: 'all', cursor: 'grab', touchAction: 'none' }}
          onPointerDown={(e) => down('hour', e)}
        />
        {/* 分针（细长，可拖） */}
        <line x1="100" y1="100" x2={mx} y2={my} stroke="var(--color-accent)" strokeWidth="5" strokeLinecap="round" />
        <line
          x1="100" y1="100" x2={mx} y2={my}
          stroke="transparent" strokeWidth="22" strokeLinecap="round"
          style={{ pointerEvents: 'all', cursor: 'grab', touchAction: 'none' }}
          onPointerDown={(e) => down('min', e)}
        />
        <circle cx="100" cy="100" r="7" fill="var(--color-text)" />
      </svg>
      <button type="button" className="primary-btn" onClick={check}>
        完成
      </button>
    </div>
  );
}
