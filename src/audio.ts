/** 用浏览器内置语音合成朗读中文（无需音频文件） */
type SpeakOptions = {
  rate?: number;
  pitch?: number;
  /** 朗读结束（或异常 / 环境不支持时兜底）后回调 */
  onEnd?: () => void;
};

export function speak(text: string, opts: SpeakOptions = {}) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    // 无语音合成环境：仍触发 onEnd，保证调用方流程不卡死
    if (opts.onEnd) setTimeout(opts.onEnd, 0);
    return;
  }
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN';
    u.rate = opts.rate ?? 0.8;
    u.pitch = opts.pitch ?? 1.1;
    if (opts.onEnd) u.onend = opts.onEnd;
    window.speechSynthesis.speak(u);
  } catch {
    if (opts.onEnd) setTimeout(opts.onEnd, 0);
  }
}

/** 朗读文本，读完后执行 after。
 *  环境不支持 / 朗读异常 / onend 事件丢失 时，用兜底延迟触发 after，保证流程不卡死。 */
export function speakAndThen(text: string, after: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    setTimeout(after, 500);
    return;
  }
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN';
    u.rate = 0.8;
    u.pitch = 1.1;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      after();
    };
    u.onend = finish;
    u.onerror = finish; // 朗读出错也兜底推进
    window.speechSynthesis.speak(u);
    // 双保险：部分浏览器会丢 onend 事件，超时兜底推进
    setTimeout(finish, 7000);
  } catch {
    setTimeout(after, 500);
  }
}

/** 把站内资源路径拼上 Vite 的 BASE_URL（生产环境为 /ynj/，本地为 /），
 *  解决 GitHub Pages 项目站点（base 非根）下绝对路径 /audio/... 被解析成
 *  https://user.github.io/audio/... 而 404 的问题。
 *  外链 http(s) 原样返回，空值原样返回。 */
export function resolveAsset(url: string): string {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('/')) {
    const base = import.meta.env.BASE_URL || '/';
    return base.replace(/\/$/, '') + url;
  }
  return url;
}

/** 移动端浏览器（尤其 iOS Safari）要求「首次用户手势」后才能播放声音，
 *  否则程序化 play() 会被静默拦截——这正是手机上「自动朗读没声音」的另一半根因。
 *  本函数在首个 pointerdown / touchstart / click 时「预热」一个静音 Audio，
 *  从而解锁整个页面的音频播放，使之后进题自动朗读（非手势触发）也能正常出声。
 *  幂等：多次调用只生效一次。 */
let audioUnlocked = false;
export function ensureAudioUnlocked() {
  if (audioUnlocked || typeof window === 'undefined') return;
  const unlock = () => {
    try {
      const a = new Audio();
      // 一段 44 字节的静音 WAV，仅用于解锁播放权限，不发出任何声音
      a.src =
        'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
      a.volume = 0;
      const p = a.play();
      if (p) p.catch(() => {});
    } catch {
      /* 忽略：解锁失败也不影响后续手动播放 */
    }
    audioUnlocked = true;
    window.removeEventListener('pointerdown', unlock);
    window.removeEventListener('touchstart', unlock);
    window.removeEventListener('click', unlock);
  };
  window.addEventListener('pointerdown', unlock, { once: true });
  window.addEventListener('touchstart', unlock, { once: true });
  window.addEventListener('click', unlock, { once: true });
}

/** 播放音频文件（如拼音 / 汉字真人发音 mp3），播放结束后执行 after。
 *  加载失败 / 播放异常 / onended 丢失 时，用兜底延迟触发 after，保证流程不卡死。 */
export function playAudio(url: string, after?: () => void) {
  try {
    const a = new Audio(resolveAsset(url));
    if (after) {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        after();
      };
      a.onended = finish;
      a.onerror = finish; // 文件损坏/404 也兜底推进
      setTimeout(finish, 8000); // 双保险
    }
    const p = a.play();
    if (p) p.catch(() => { /* 自动播放被浏览器拦截则忽略 */ });
  } catch {
    if (after) setTimeout(after, 0);
  }
}
