import { useEffect, useRef, useState } from 'react';
import { resolveAsset } from '../audio';

/** 纯 SVG 喇叭按钮（不使用 emoji），点击播放拼音参考读音 */
export function SpeakerButton({
  src,
  label = '播放读音',
  autoPlay = false,
}: {
  src: string;
  label?: string;
  autoPlay?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoPlayed = useRef(false);

  useEffect(() => {
    if (autoPlay && src && !autoPlayed.current) {
      autoPlayed.current = true;
      play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, src]);

  function play() {
    if (!src) return;
    const url = resolveAsset(src);
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
    } else {
      audioRef.current.src = url;
    }
    setPlaying(true);
    const p = audioRef.current.play();
    if (p) p.catch(() => setPlaying(false));
    audioRef.current.onended = () => setPlaying(false);
  }

  return (
    <button
      type="button"
      className={`speaker-btn ${playing ? 'playing' : ''}`}
      onClick={play}
      aria-label={`${label}`}
    >
      <svg className="speaker-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
        <path d="M16 8.5a4 4 0 0 1 0 7" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M18.6 6a7 7 0 0 1 0 12" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
      <span>听</span>
    </button>
  );
}
