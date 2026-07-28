export interface Progress {
  stars: number;
  /** 每次练习（退出一个模式）赚到的星星数，用于进步曲线 */
  history: number[];
  /** 贴纸收集：每种贴纸已收集的数量（key 为贴纸种类名） */
  stickers?: Record<string, number>;
  /** 错题本：答错过的题目 id（去重） */
  wrongIds?: string[];
  /** 上传的头像图片（dataURL），用于替换贴纸图形 */
  avatar?: string;
  /** 是否用头像替换贴纸图形 */
  useAvatar?: boolean;
  /** 是否关闭自动朗读（默认 false = 开启朗读） */
  muted?: boolean;
}

const KEY = 'grade1_progress_v1';

export function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw) as Progress;
      return {
        stars: p.stars || 0,
        history: p.history || [],
        stickers: p.stickers || {},
        wrongIds: p.wrongIds || [],
        avatar: p.avatar || '',
        useAvatar: !!p.useAvatar,
        muted: !!p.muted,
      };
    }
  } catch {
    /* ignore */
  }
  return { stars: 0, history: [], stickers: {}, wrongIds: [], avatar: '', useAvatar: false, muted: false };
}

export function save(p: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}
