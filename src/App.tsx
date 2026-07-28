import { useRef, useState } from 'react';
import { mathActs, chineseActs, unitsBySubject, actsByUnit } from './data';
import type { Subject } from './types';
import { load, save } from './storage';
import { buyCar, type CarKind } from './stickers';
import { StarBar } from './components/StarBar';
import { StickerCount, StickerWall } from './components/StickerWall';
import { ProgressChart } from './components/ProgressChart';
import { RobotCompanion } from './components/RobotCompanion';
import { Starfield } from './components/Starfield';
import { Playlist } from './modes/Playlist';
import { CardMode } from './modes/CardMode';
import { FreeMode } from './modes/FreeMode';

type View = 'home' | 'level-subject' | 'level-unit' | 'level-play' | 'card' | 'free' | 'review';

const iconStar = (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="var(--color-accent)" aria-hidden="true">
    <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
  </svg>
);
const iconCard = (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="var(--color-primary)" aria-hidden="true">
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <rect x="8" y="8" width="8" height="8" rx="2" fill="#fff" />
  </svg>
);
const iconTarget = (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.4" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1.4" fill="var(--color-primary)" />
  </svg>
);
const iconMath = (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
    <path d="M5 7l6 6-6 6M13 19h6" />
  </svg>
);
const iconBook = (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 5a2 2 0 012-2h12v16H6a2 2 0 00-2 2z" />
    <path d="M20 5a2 2 0 00-2-2H6" />
  </svg>
);
const iconReview = (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8" />
    <path d="M20 4v4h-4" />
    <path d="M20 12a8 8 0 0 1-13.7 5.6L4 16" />
    <path d="M4 20v-4h4" />
  </svg>
);

export default function App() {
  const [view, setView] = useState<View>('home');
  const [levelSubject, setLevelSubject] = useState<Subject | null>(null);
  const [levelUnit, setLevelUnit] = useState<string | null>(null);
  const [progress, setProgress] = useState(load);
  const sessionStars = useRef(0);

  const hasWrong = (progress.wrongIds?.length || 0) > 0;

  function handleSolved() {
    sessionStars.current += 1;
    // 每答对一题奖励 1 颗星星；小汽车贴纸需要到贴纸墙用星星兑换
    setProgress((p) => {
      const np = { ...p, stars: p.stars + 1 };
      save(np);
      return np;
    });
  }

  /** 上传/移除驾驶员头像（所有小汽车车窗里都会显示） */
  function setAvatar(dataUrl: string | null) {
    setProgress((p) => {
      const np = { ...p, avatar: dataUrl || '' };
      save(np);
      return np;
    });
  }

  /** 切换自动朗读开关（默认开启，存入进度） */
  function setMuted(muted: boolean) {
    setProgress((p) => {
      const np = { ...p, muted };
      save(np);
      return np;
    });
  }

  /** 用星星兑换小汽车贴纸 */
  function handleBuyCar(id: CarKind) {
    setProgress((p) => {
      const result = buyCar(p.stickers || {}, p.stars, id);
      if (!result) return p;
      const np = { ...p, stickers: result.stickers, stars: result.stars };
      save(np);
      return np;
    });
  }

  /** 记录错题：把答错的题目 id 写入错题本（去重） */
  function recordWrong(id: string) {
    setProgress((p) => {
      const set0 = new Set(p.wrongIds || []);
      if (set0.has(id)) return p;
      set0.add(id);
      const np = { ...p, wrongIds: [...set0] };
      save(np);
      return np;
    });
  }

  function clearWrong() {
    setProgress((p) => {
      const np = { ...p, wrongIds: [] };
      save(np);
      return np;
    });
    setView('home');
  }

  function handleExit() {
    if (sessionStars.current > 0) {
      setProgress((p) => {
        const np = { ...p, history: [...p.history, sessionStars.current] };
        save(np);
        return np;
      });
      sessionStars.current = 0;
    }
    setView('home');
  }

  let content: JSX.Element;
  if (view !== 'home') {
    if (view === 'level-subject') {
      content = (
        <div className="app" style={{ padding: 0 }}>
          <div className="topbar">
            <button className="back-btn" onClick={() => setView('home')}>
              返回
            </button>
            <span className="title">闯关</span>
            <StarBar stars={progress.stars} />
          </div>
          <div className="mode-grid">
            <button className="mode-card" onClick={() => { setLevelSubject('math'); setLevelUnit(null); setView('level-unit'); }}>
              {iconMath}
              数学
              <span className="sub">{mathActs.length} 题</span>
            </button>
            <button className="mode-card" onClick={() => { setLevelSubject('chinese'); setLevelUnit(null); setView('level-unit'); }}>
              {iconBook}
              语文
              <span className="sub">{chineseActs.length} 题</span>
            </button>
          </div>
        </div>
      );
    }
    if (view === 'level-unit' && levelSubject) {
      const units = unitsBySubject(levelSubject);
      content = (
        <div className="app" style={{ padding: 0 }}>
          <div className="topbar">
            <button className="back-btn" onClick={() => setView('level-subject')}>
              返回
            </button>
            <span className="title">{levelSubject === 'math' ? '数学' : '语文'} · 选单元</span>
            <span style={{ width: 56 }} />
          </div>
          <div className="level-list">
            {units.map((u) => (
              <button
                key={u.unit}
                className="level-item"
                onClick={() => { setLevelUnit(u.unit); setView('level-play'); }}
              >
                {u.unit}
                <span className="sub">{u.acts.length} 题</span>
              </button>
            ))}
          </div>
        </div>
      );
    }
    if (view === 'level-play' && levelSubject && levelUnit) {
      content = (
        <Playlist
          items={actsByUnit(levelSubject, levelUnit)}
          title={levelUnit}
          onExit={handleExit}
          onSolved={handleSolved}
          onWrong={recordWrong}
          read={!progress.muted}
        />
      );
    }
    if (view === 'card') {
      content = <CardMode items={[...mathActs, ...chineseActs]} onExit={handleExit} read={!progress.muted} />;
    }
    if (view === 'free') {
      content = <FreeMode onExit={handleExit} onSolved={handleSolved} onWrong={recordWrong} read={!progress.muted} />;
    }
    if (view === 'review' && hasWrong) {
      const wrongActs = [...mathActs, ...chineseActs].filter((a) => (progress.wrongIds || []).includes(a.id));
      content = (
        <Playlist
          items={wrongActs}
          title="错题复习"
          doneTitle="复习完成！"
          onExit={() => setView('home')}
          onSolved={handleSolved}
          onWrong={recordWrong}
          onClear={clearWrong}
          clearLabel="清空错题本"
          read={!progress.muted}
        />
      );
    }
  } else {
    content = (
    <div className="app">
      <div className="topbar">
        <span className="title">一年级小课堂</span>
        <div className="topbar-right">
          <StarBar stars={progress.stars} />
          <StickerCount stickers={progress.stickers} />
        </div>
      </div>

      <div className="home-hero">
        <RobotCompanion mood="idle" />
        <h1>一起来玩中学</h1>
        <p>按人教版一年级上册，数学和语文分单元闯关、翻卡片、自由练，攒星星和贴纸不扣分～</p>
        <button
          type="button"
          className={`read-toggle ${progress.muted ? '' : 'on'}`}
          onClick={() => setMuted(!progress.muted)}
          aria-pressed={!progress.muted}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4 9v6h4l5 5V4L8 9H4z" />
            <path d="M16 8.5a4 4 0 010 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M18.5 6a7 7 0 010 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          自动朗读：{progress.muted ? '关' : '开'}
        </button>
      </div>

      <div className="mode-grid">
        <button className="mode-card" onClick={() => { setLevelSubject(null); setLevelUnit(null); setView('level-subject'); }}>
          {iconStar}
          闯关
          <span className="sub">分单元一关一关走</span>
        </button>
        <button className="mode-card" onClick={() => setView('card')}>
          {iconCard}
          卡片翻翻看
          <span className="sub">复习不怕错</span>
        </button>
        <button
          className={`mode-card ${hasWrong ? '' : 'disabled'}`}
          disabled={!hasWrong}
          onClick={() => hasWrong && setView('review')}
        >
          {iconReview}
          错题复习本
          <span className="sub">{hasWrong ? `${progress.wrongIds!.length} 道要复习` : '做错题才会出现'}</span>
        </button>
        <button className="mode-card wide" onClick={() => setView('free')}>
          {iconTarget}
          自由练习
          <span className="sub">想练哪科哪点，自己选</span>
        </button>
      </div>

      <div className="panel">
        <div className="prompt" style={{ fontSize: 18 }}>
          我的进步
        </div>
        <ProgressChart history={progress.history} />
        <div className="divider" />
        <div className="prompt" style={{ fontSize: 18 }}>
          我的贴纸
        </div>
        <StickerWall
          stickers={progress.stickers}
          stars={progress.stars}
          avatar={progress.avatar}
          onAvatarChange={setAvatar}
          onBuyCar={handleBuyCar}
        />
      </div>
    </div>
  );
  }

  return (
    <>
      <Starfield />
      {content}
    </>
  );
}
