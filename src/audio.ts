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

/** 播放音频文件（如拼音 / 汉字真人发音 mp3），播放结束后执行 after。
 *  加载失败 / 播放异常 / onended 丢失 时，用兜底延迟触发 after，保证流程不卡死。 */
export function playAudio(url: string, after?: () => void) {
  try {
    const a = new Audio(url);
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
