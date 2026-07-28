export type Subject = 'math' | 'chinese';

/** 太空主题贴纸种类（与 SpaceObject 的 6 种形体一一对应） */
export type SpaceKind = 'planet' | 'rocket' | 'star' | 'alien' | 'comet' | 'moon';

export const SPACE_KINDS: SpaceKind[] = ['planet', 'rocket', 'star', 'alien', 'comet', 'moon'];

export type ActivityType =
  | 'choice' // 选择（认数/比大小/加减/声母/韵母/分类…）
  | 'match' // 连线
  | 'drag-count' // 摆圆点
  | 'spell' // 拼读：声母+韵母 → 音节
  | 'tone' // 声调选择
  | 'ordinal' // 第几
  | 'split' // 分与合
  | 'shape' // 认识立体图形
  | 'clock' // 认识钟表（整时）
  | 'position'; // 位置：上下前后左右

export type ShapeKind = 'cuboid' | 'cube' | 'cylinder' | 'sphere';

export type SceneDir = 'above' | 'below' | 'left' | 'right' | 'front' | 'back';

export interface Activity {
  id: string;
  subject: Subject;
  /** 教材单元，如「数学·1~5」「语文·拼音·声母」，决定导航分组与顺序 */
  unit: string;
  /** 知识点小类，仅作数据标注（如「认数」「比大小」） */
  topic: string;
  type: ActivityType;
  prompt: string;
  /** 选择类选项 */
  options?: string[];
  /** 数点题：单组圆点数量 */
  dots?: number;
  /** 多组圆点（比大小 / 加减法 视觉辅助） */
  dotGroups?: number[];
  dotsOp?: '+' | '−' | 'vs';
  /** 语文题展示的汉字 / 带调韵母（大字） */
  char?: string;
  /** 汉字拼音标注 */
  pinyin?: string;
  /** 拼音音频 URL（认读类题目播放参考读音，取自 du.hanyupinyin.cn） */
  audio?: string;
  /** 拼读题：声母 / 韵母 片段，如 ['b','a'] 或三拼 ['j','i','a'] */
  parts?: string[];
  /** 连线题：[左, 右] 正确配对 */
  pairs?: [string, string][];
  /** 第几题：一排颜色方块，颜色名数组 */
  colors?: string[];
  /** 分与合：{ 总数, 已知部分 }，答案为 总数-已知 */
  split?: { total: number; known: number };
  /** 立体图形种类 */
  shape?: ShapeKind;
  /** 钟表题：[时, 分] */
  clockTime?: [number, number];
  /** 位置题场景：红块相对蓝块的方向 */
  scene?: SceneDir;
  /** 选择 / 拼读 / 声调 / 第几 / 分与合 / 图形 / 钟表 / 位置 的答案；连线题无单一答案，由 pairs 决定 */
  answer?: string;
  hint?: string;
}
