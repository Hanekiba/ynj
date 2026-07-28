import type { Activity, Subject } from './types';

/* =========================================================================
 * 数学 · 人教版一年级上册（整册）
 * 单元顺序：准备课 → 位置 → 1~5 → 认识图形 → 6~10 → 11~20 → 认识钟表 → 20以内进位加法
 * ========================================================================= */
export const mathActs: Activity[] = [
  // —— 准备课：数一数 / 比多少 ——
  { id: 'm-prep-count-1', subject: 'math', unit: '准备课', topic: '数一数', type: 'choice', prompt: '数一数，有几个圆点？', dots: 3, options: ['2', '3', '4'], answer: '3' },
  { id: 'm-prep-count-2', subject: 'math', unit: '准备课', topic: '数一数', type: 'choice', prompt: '数一数，有几个圆点？', dots: 7, options: ['6', '7', '8'], answer: '7' },
  { id: 'm-prep-count-3', subject: 'math', unit: '准备课', topic: '数一数', type: 'choice', prompt: '数一数，有几个圆点？', dots: 10, options: ['9', '10', '11'], answer: '10' },
  { id: 'm-prep-more-1', subject: 'math', unit: '准备课', topic: '比多少', type: 'choice', prompt: '哪边圆点更多？', dotGroups: [4, 6], dotsOp: 'vs', options: ['左边', '右边', '一样多'], answer: '右边' },
  { id: 'm-prep-more-2', subject: 'math', unit: '准备课', topic: '比多少', type: 'choice', prompt: '哪边圆点更多？', dotGroups: [8, 3], dotsOp: 'vs', options: ['左边', '右边', '一样多'], answer: '左边' },
  { id: 'm-prep-more-3', subject: 'math', unit: '准备课', topic: '比多少', type: 'choice', prompt: '两边圆点一样多吗？', dotGroups: [5, 5], dotsOp: 'vs', options: ['左边多', '右边多', '一样多'], answer: '一样多' },

  // —— 位置：上下前后左右 ——
  { id: 'm-pos-1', subject: 'math', unit: '位置', topic: '位置', type: 'position', prompt: '红块在蓝块的哪边？', scene: 'above', options: ['上', '下', '左', '右', '前', '后'], answer: '上' },
  { id: 'm-pos-2', subject: 'math', unit: '位置', topic: '位置', type: 'position', prompt: '红块在蓝块的哪边？', scene: 'below', options: ['上', '下', '左', '右', '前', '后'], answer: '下' },
  { id: 'm-pos-3', subject: 'math', unit: '位置', topic: '位置', type: 'position', prompt: '红块在蓝块的哪边？', scene: 'left', options: ['上', '下', '左', '右', '前', '后'], answer: '左' },
  { id: 'm-pos-4', subject: 'math', unit: '位置', topic: '位置', type: 'position', prompt: '红块在蓝块的哪边？', scene: 'right', options: ['上', '下', '左', '右', '前', '后'], answer: '右' },
  { id: 'm-pos-5', subject: 'math', unit: '位置', topic: '位置', type: 'position', prompt: '红块在蓝块的哪边？', scene: 'front', options: ['上', '下', '左', '右', '前', '后'], answer: '前' },
  { id: 'm-pos-6', subject: 'math', unit: '位置', topic: '位置', type: 'position', prompt: '红块在蓝块的哪边？', scene: 'back', options: ['上', '下', '左', '右', '前', '后'], answer: '后' },

  // —— 1~5 的认识和加减法 ——
  { id: 'm-15-count-1', subject: 'math', unit: '1~5的认识和加减法', topic: '认数', type: 'choice', prompt: '数一数，有几个圆点？', dots: 1, options: ['0', '1', '2'], answer: '1' },
  { id: 'm-15-count-2', subject: 'math', unit: '1~5的认识和加减法', topic: '认数', type: 'choice', prompt: '数一数，有几个圆点？', dots: 4, options: ['3', '4', '5'], answer: '4' },
  { id: 'm-15-count-3', subject: 'math', unit: '1~5的认识和加减法', topic: '认数', type: 'drag-count', prompt: '摆出 4 个圆点', answer: '4' },
  { id: 'm-15-cmp-1', subject: 'math', unit: '1~5的认识和加减法', topic: '比大小', type: 'choice', prompt: '哪边数更多？', dotGroups: [3, 5], dotsOp: 'vs', options: ['3', '5', '一样多'], answer: '5' },
  { id: 'm-15-cmp-2', subject: 'math', unit: '1~5的认识和加减法', topic: '比大小', type: 'choice', prompt: '比一比，哪个数大？', dotGroups: [5, 2], dotsOp: 'vs', options: ['5', '2', '一样大'], answer: '5' },
  { id: 'm-15-ord-1', subject: 'math', unit: '1~5的认识和加减法', topic: '第几', type: 'ordinal', prompt: '从左数，第 2 个是什么颜色？', colors: ['红', '黄', '蓝', '绿'], options: ['红', '黄', '蓝', '绿'], answer: '黄' },
  { id: 'm-15-ord-2', subject: 'math', unit: '1~5的认识和加减法', topic: '第几', type: 'ordinal', prompt: '从右数，第 2 个是什么颜色？', colors: ['黄', '绿', '红', '蓝'], options: ['黄', '绿', '红', '蓝'], answer: '红' },
  { id: 'm-15-split-1', subject: 'math', unit: '1~5的认识和加减法', topic: '分与合', type: 'split', prompt: '5 可以分成 2 和几？', split: { total: 5, known: 2 }, options: ['2', '3', '4'], answer: '3', hint: '从 5 个里去掉 2 个，还剩 3 个。' },
  { id: 'm-15-split-2', subject: 'math', unit: '1~5的认识和加减法', topic: '分与合', type: 'split', prompt: '4 可以分成 1 和几？', split: { total: 4, known: 1 }, options: ['2', '3', '4'], answer: '3' },
  { id: 'm-15-add-1', subject: 'math', unit: '1~5的认识和加减法', topic: '加法', type: 'choice', prompt: '一共有几个？', dotGroups: [2, 3], dotsOp: '+', options: ['4', '5', '6'], answer: '5', hint: '先数 2 个，再数 3 个：3、4、5。' },
  { id: 'm-15-add-2', subject: 'math', unit: '1~5的认识和加减法', topic: '加法', type: 'choice', prompt: '一共有几个？', dotGroups: [1, 4], dotsOp: '+', options: ['4', '5', '6'], answer: '5' },
  { id: 'm-15-sub-1', subject: 'math', unit: '1~5的认识和加减法', topic: '减法', type: 'choice', prompt: '去掉 2 个，还剩几个？', dotGroups: [5, 2], dotsOp: '−', options: ['2', '3', '4'], answer: '3', hint: '从 5 个里去掉 2 个，数数剩下几个。' },
  { id: 'm-15-sub-2', subject: 'math', unit: '1~5的认识和加减法', topic: '减法', type: 'choice', prompt: '盘子里有 3 个苹果，吃掉 3 个，还剩几个？', options: ['0', '1', '3'], answer: '0' },

  // —— 认识图形（一）：立体图形 ——
  { id: 'm-shape-1', subject: 'math', unit: '认识图形（一）', topic: '立体图形', type: 'shape', prompt: '这个立体图形叫什么？', shape: 'cuboid', options: ['长方体', '正方体', '圆柱', '球'], answer: '长方体' },
  { id: 'm-shape-2', subject: 'math', unit: '认识图形（一）', topic: '立体图形', type: 'shape', prompt: '这个立体图形叫什么？', shape: 'cube', options: ['长方体', '正方体', '圆柱', '球'], answer: '正方体' },
  { id: 'm-shape-3', subject: 'math', unit: '认识图形（一）', topic: '立体图形', type: 'shape', prompt: '这个立体图形叫什么？', shape: 'cylinder', options: ['长方体', '正方体', '圆柱', '球'], answer: '圆柱' },
  { id: 'm-shape-4', subject: 'math', unit: '认识图形（一）', topic: '立体图形', type: 'shape', prompt: '这个立体图形叫什么？', shape: 'sphere', options: ['长方体', '正方体', '圆柱', '球'], answer: '球' },

  // —— 6~10 的认识和加减法 ——
  { id: 'm-610-count-1', subject: 'math', unit: '6~10的认识和加减法', topic: '认数', type: 'choice', prompt: '数一数，有几个圆点？', dots: 6, options: ['5', '6', '7'], answer: '6' },
  { id: 'm-610-count-2', subject: 'math', unit: '6~10的认识和加减法', topic: '认数', type: 'choice', prompt: '数一数，有几个圆点？', dots: 9, options: ['8', '9', '10'], answer: '9' },
  { id: 'm-610-add-1', subject: 'math', unit: '6~10的认识和加减法', topic: '加法', type: 'choice', prompt: '一共有几个？', dotGroups: [5, 3], dotsOp: '+', options: ['7', '8', '9'], answer: '8' },
  { id: 'm-610-add-2', subject: 'math', unit: '6~10的认识和加减法', topic: '加法', type: 'choice', prompt: '一共有几个？', dotGroups: [6, 4], dotsOp: '+', options: ['9', '10', '11'], answer: '10' },
  { id: 'm-610-sub-1', subject: 'math', unit: '6~10的认识和加减法', topic: '减法', type: 'choice', prompt: '去掉后还剩几个？', dotGroups: [9, 4], dotsOp: '−', options: ['4', '5', '6'], answer: '5' },
  { id: 'm-610-chainadd', subject: 'math', unit: '6~10的认识和加减法', topic: '连加', type: 'choice', prompt: '连加：2 + 3 + 4 = ？', dotGroups: [2, 3, 4], dotsOp: '+', options: ['8', '9', '10'], answer: '9', hint: '先算 2+3=5，再算 5+4=9。' },
  { id: 'm-610-chainsub', subject: 'math', unit: '6~10的认识和加减法', topic: '连减', type: 'choice', prompt: '连减：10 − 3 − 2 = ？', dotGroups: [10, 3, 2], dotsOp: '−', options: ['4', '5', '6'], answer: '5' },
  { id: 'm-610-mix-1', subject: 'math', unit: '6~10的认识和加减法', topic: '加减混合', type: 'choice', prompt: '算一算：8 − 3 + 2 = ？', options: ['5', '6', '7'], answer: '7' },
  { id: 'm-610-mix-2', subject: 'math', unit: '6~10的认识和加减法', topic: '加减混合', type: 'choice', prompt: '算一算：9 + 1 − 4 = ？', options: ['5', '6', '7'], answer: '6' },

  // —— 11~20 各数的认识 ——
  { id: 'm-1120-comp-1', subject: 'math', unit: '11~20各数的认识', topic: '数的组成', type: 'choice', prompt: '13 里面有几个十和几个一？', options: ['1个十3个一', '3个十1个一', '1个十1个一'], answer: '1个十3个一' },
  { id: 'm-1120-comp-2', subject: 'math', unit: '11~20各数的认识', topic: '数的组成', type: 'choice', prompt: '20 是由几个十组成的？', options: ['1个十', '2个十', '10个十'], answer: '2个十' },
  { id: 'm-1120-write-1', subject: 'math', unit: '11~20各数的认识', topic: '读与写', type: 'choice', prompt: '十五 写作', options: ['15', '51', '50'], answer: '15' },
  { id: 'm-1120-cmp-1', subject: 'math', unit: '11~20各数的认识', topic: '比大小', type: 'choice', prompt: '比一比：12 和 19，哪个大？', options: ['12', '19', '一样大'], answer: '19' },
  { id: 'm-1120-order-1', subject: 'math', unit: '11~20各数的认识', topic: '顺序', type: 'choice', prompt: '16 后面一个数是？', options: ['15', '17', '18'], answer: '17' },
  { id: 'm-1120-comp-3', subject: 'math', unit: '11~20各数的认识', topic: '数的组成', type: 'choice', prompt: '1 个十和 7 个一是', options: ['17', '71', '10'], answer: '17' },

  // —— 认识钟表 ——
  { id: 'm-clock-1', subject: 'math', unit: '认识钟表', topic: '整时', type: 'choice', prompt: '现在是几时？', clockTime: [8, 0], options: ['7时', '8时', '9时'], answer: '8时' },
  { id: 'm-clock-2', subject: 'math', unit: '认识钟表', topic: '整时', type: 'choice', prompt: '现在是几时？', clockTime: [3, 0], options: ['2时', '3时', '4时'], answer: '3时' },
  { id: 'm-clock-3', subject: 'math', unit: '认识钟表', topic: '整时', type: 'choice', prompt: '现在是几时？', clockTime: [12, 0], options: ['11时', '12时', '1时'], answer: '12时' },
  { id: 'm-clock-4', subject: 'math', unit: '认识钟表', topic: '整时', type: 'choice', prompt: '现在是几时？', clockTime: [6, 0], options: ['5时', '6时', '7时'], answer: '6时' },
  { id: 'm-clock-5', subject: 'math', unit: '认识钟表', topic: '整时', type: 'choice', prompt: '现在是几时？', clockTime: [10, 0], options: ['9时', '10时', '11时'], answer: '10时' },

  // —— 20 以内的进位加法 ——
  { id: 'm-carry-1', subject: 'math', unit: '20以内的进位加法', topic: '9加几', type: 'choice', prompt: '9 + 5 = ？', options: ['13', '14', '15'], answer: '14' },
  { id: 'm-carry-2', subject: 'math', unit: '20以内的进位加法', topic: '9加几', type: 'choice', prompt: '9 + 7 = ？', options: ['15', '16', '17'], answer: '16' },
  { id: 'm-carry-3', subject: 'math', unit: '20以内的进位加法', topic: '8、7、6加几', type: 'choice', prompt: '8 + 5 = ？', options: ['12', '13', '14'], answer: '13' },
  { id: 'm-carry-4', subject: 'math', unit: '20以内的进位加法', topic: '8、7、6加几', type: 'choice', prompt: '7 + 6 = ？', options: ['12', '13', '14'], answer: '13' },
  { id: 'm-carry-5', subject: 'math', unit: '20以内的进位加法', topic: '8、7、6加几', type: 'choice', prompt: '6 + 8 = ？', options: ['13', '14', '15'], answer: '14' },
  { id: 'm-carry-6', subject: 'math', unit: '20以内的进位加法', topic: '9加几', type: 'choice', prompt: '9 + 9 = ？', options: ['17', '18', '19'], answer: '18' },

  // —— 准备课：补充变式 ——
  { id: 'm-prep-count-4', subject: 'math', unit: '准备课', topic: '数一数', type: 'choice', prompt: '数一数，有几个圆点？', dots: 5, options: ['4', '5', '6'], answer: '5' },
  { id: 'm-prep-count-5', subject: 'math', unit: '准备课', topic: '数一数', type: 'choice', prompt: '数一数，有几个圆点？', dots: 2, options: ['1', '2', '3'], answer: '2' },
  { id: 'm-prep-more-4', subject: 'math', unit: '准备课', topic: '比多少', type: 'choice', prompt: '两边圆点一样多吗？', dotGroups: [6, 6], dotsOp: 'vs', options: ['左边多', '右边多', '一样多'], answer: '一样多' },
  { id: 'm-prep-more-5', subject: 'math', unit: '准备课', topic: '比多少', type: 'choice', prompt: '哪边圆点更多？', dotGroups: [9, 4], dotsOp: 'vs', options: ['左边', '右边', '一样多'], answer: '左边' },

  // —— 1~5：补充变式 ——
  { id: 'm-15-count-4', subject: 'math', unit: '1~5的认识和加减法', topic: '认数', type: 'choice', prompt: '数一数，有几个圆点？', dots: 5, options: ['4', '5', '6'], answer: '5' },
  { id: 'm-15-split-3', subject: 'math', unit: '1~5的认识和加减法', topic: '分与合', type: 'split', prompt: '5 可以分成 3 和几？', split: { total: 5, known: 3 }, options: ['1', '2', '3'], answer: '2' },
  { id: 'm-15-split-4', subject: 'math', unit: '1~5的认识和加减法', topic: '分与合', type: 'split', prompt: '3 可以分成 1 和几？', split: { total: 3, known: 1 }, options: ['1', '2', '3'], answer: '2' },
  { id: 'm-15-add-3', subject: 'math', unit: '1~5的认识和加减法', topic: '加法', type: 'choice', prompt: '一共有几个？', dotGroups: [3, 2], dotsOp: '+', options: ['4', '5', '6'], answer: '5' },
  { id: 'm-15-sub-3', subject: 'math', unit: '1~5的认识和加减法', topic: '减法', type: 'choice', prompt: '去掉 1 个，还剩几个？', dotGroups: [4, 1], dotsOp: '−', options: ['2', '3', '4'], answer: '3' },
  { id: 'm-15-ord-3', subject: 'math', unit: '1~5的认识和加减法', topic: '第几', type: 'ordinal', prompt: '从左数，第 3 个是什么颜色？', colors: ['蓝', '红', '黄', '绿'], options: ['蓝', '红', '黄', '绿'], answer: '黄' },
  { id: 'm-15-ord-4', subject: 'math', unit: '1~5的认识和加减法', topic: '第几', type: 'ordinal', prompt: '从右数，第 1 个是什么颜色？', colors: ['蓝', '红', '黄', '绿'], options: ['蓝', '红', '黄', '绿'], answer: '绿' },
  { id: 'm-15-cmp-3', subject: 'math', unit: '1~5的认识和加减法', topic: '比大小', type: 'choice', prompt: '比一比，哪个数小？', dotGroups: [4, 1], dotsOp: 'vs', options: ['4', '1', '一样大'], answer: '1' },

  // —— 6~10：补充变式 ——
  { id: 'm-610-count-3', subject: 'math', unit: '6~10的认识和加减法', topic: '认数', type: 'choice', prompt: '数一数，有几个圆点？', dots: 7, options: ['6', '7', '8'], answer: '7' },
  { id: 'm-610-count-4', subject: 'math', unit: '6~10的认识和加减法', topic: '认数', type: 'choice', prompt: '数一数，有几个圆点？', dots: 10, options: ['9', '10', '11'], answer: '10' },
  { id: 'm-610-add-3', subject: 'math', unit: '6~10的认识和加减法', topic: '加法', type: 'choice', prompt: '一共有几个？', dotGroups: [4, 5], dotsOp: '+', options: ['8', '9', '10'], answer: '9' },
  { id: 'm-610-sub-2', subject: 'math', unit: '6~10的认识和加减法', topic: '减法', type: 'choice', prompt: '去掉后还剩几个？', dotGroups: [8, 3], dotsOp: '−', options: ['4', '5', '6'], answer: '5' },
  { id: 'm-610-cmp-1', subject: 'math', unit: '6~10的认识和加减法', topic: '比大小', type: 'choice', prompt: '比一比：8 和 5，哪个大？', options: ['8', '5', '一样大'], answer: '8' },
  { id: 'm-610-mix-3', subject: 'math', unit: '6~10的认识和加减法', topic: '加减混合', type: 'choice', prompt: '算一算：7 + 2 − 3 = ？', options: ['5', '6', '7'], answer: '6' },
  { id: 'm-610-chainadd-2', subject: 'math', unit: '6~10的认识和加减法', topic: '连加', type: 'choice', prompt: '连加：3 + 2 + 1 = ？', dotGroups: [3, 2, 1], dotsOp: '+', options: ['5', '6', '7'], answer: '6' },

  // —— 11~20：补充变式 ——
  { id: 'm-1120-comp-4', subject: 'math', unit: '11~20各数的认识', topic: '数的组成', type: 'choice', prompt: '14 里面有几个十和几个一？', options: ['1个十4个一', '4个十1个一', '1个十1个一'], answer: '1个十4个一' },
  { id: 'm-1120-write-2', subject: 'math', unit: '11~20各数的认识', topic: '读与写', type: 'choice', prompt: '十二 写作', options: ['12', '21', '20'], answer: '12' },
  { id: 'm-1120-write-3', subject: 'math', unit: '11~20各数的认识', topic: '读与写', type: 'choice', prompt: '二十 写作', options: ['20', '2', '200'], answer: '20' },
  { id: 'm-1120-cmp-2', subject: 'math', unit: '11~20各数的认识', topic: '比大小', type: 'choice', prompt: '比一比：15 和 11，哪个大？', options: ['15', '11', '一样大'], answer: '15' },
  { id: 'm-1120-order-2', subject: 'math', unit: '11~20各数的认识', topic: '顺序', type: 'choice', prompt: '19 后面一个数是？', options: ['18', '20', '21'], answer: '20' },
  { id: 'm-1120-order-3', subject: 'math', unit: '11~20各数的认识', topic: '顺序', type: 'choice', prompt: '13 前面一个数是？', options: ['12', '14', '11'], answer: '12' },

  // —— 认识钟表：补充整时 ——
  { id: 'm-clock-6', subject: 'math', unit: '认识钟表', topic: '整时', type: 'choice', prompt: '现在是几时？', clockTime: [1, 0], options: ['12时', '1时', '2时'], answer: '1时' },
  { id: 'm-clock-7', subject: 'math', unit: '认识钟表', topic: '整时', type: 'choice', prompt: '现在是几时？', clockTime: [5, 0], options: ['4时', '5时', '6时'], answer: '5时' },
  { id: 'm-clock-8', subject: 'math', unit: '认识钟表', topic: '整时', type: 'choice', prompt: '现在是几时？', clockTime: [7, 0], options: ['6时', '7时', '8时'], answer: '7时' },
  { id: 'm-clock-9', subject: 'math', unit: '认识钟表', topic: '整时', type: 'choice', prompt: '现在是几时？', clockTime: [11, 0], options: ['10时', '11时', '12时'], answer: '11时' },

  // —— 拨动时钟：动手拨出整时（独立于「认识钟表」的静态认读）——
  { id: 'm-clockdrag-1', subject: 'math', unit: '拨动时钟', topic: '整时', type: 'clock', prompt: '拨一拨，让时针指向：2时', clockTime: [2, 0] },
  { id: 'm-clockdrag-2', subject: 'math', unit: '拨动时钟', topic: '整时', type: 'clock', prompt: '拨一拨，让时针指向：4时', clockTime: [4, 0] },
  { id: 'm-clockdrag-3', subject: 'math', unit: '拨动时钟', topic: '整时', type: 'clock', prompt: '拨一拨，让时针指向：9时', clockTime: [9, 0] },
  { id: 'm-clockdrag-4', subject: 'math', unit: '拨动时钟', topic: '整时', type: 'clock', prompt: '拨一拨，让时针指向：10时', clockTime: [10, 0] },
  { id: 'm-clockdrag-5', subject: 'math', unit: '拨动时钟', topic: '整时', type: 'clock', prompt: '拨一拨，让时针指向：3时', clockTime: [3, 0] },
  { id: 'm-clockdrag-6', subject: 'math', unit: '拨动时钟', topic: '整时', type: 'clock', prompt: '拨一拨，让时针指向：12时', clockTime: [12, 0] },
  { id: 'm-clockdrag-7', subject: 'math', unit: '拨动时钟', topic: '整时', type: 'clock', prompt: '拨一拨，让时针指向：6时', clockTime: [6, 0] },
  { id: 'm-clockdrag-8', subject: 'math', unit: '拨动时钟', topic: '整时', type: 'clock', prompt: '拨一拨，让时针指向：1时', clockTime: [1, 0] },

  // —— 20 以内进位加法：补充变式 ——
  { id: 'm-carry-7', subject: 'math', unit: '20以内的进位加法', topic: '8、7、6加几', type: 'choice', prompt: '8 + 3 = ？', options: ['10', '11', '12'], answer: '11' },
  { id: 'm-carry-8', subject: 'math', unit: '20以内的进位加法', topic: '9加几', type: 'choice', prompt: '9 + 4 = ？', options: ['12', '13', '14'], answer: '13' },
  { id: 'm-carry-9', subject: 'math', unit: '20以内的进位加法', topic: '8、7、6加几', type: 'choice', prompt: '7 + 5 = ？', options: ['11', '12', '13'], answer: '12' },
  { id: 'm-carry-10', subject: 'math', unit: '20以内的进位加法', topic: '8、7、6加几', type: 'choice', prompt: '6 + 7 = ？', options: ['12', '13', '14'], answer: '13' },
  { id: 'm-carry-11', subject: 'math', unit: '20以内的进位加法', topic: '5、4、3、2加几', type: 'choice', prompt: '5 + 8 = ？', options: ['12', '13', '14'], answer: '13' },
  { id: 'm-carry-12', subject: 'math', unit: '20以内的进位加法', topic: '9加几', type: 'choice', prompt: '9 + 6 = ？', options: ['14', '15', '16'], answer: '15' },
];

/* =========================================================================
 * 语文 · 人教版一年级上册（整册）
 * 单元顺序：单韵母 → 声母 → 复韵母 → 鼻韵母 → 整体认读 → 识字（一）→ 识字（二）→ 课文
 * ========================================================================= */
export const chineseActs: Activity[] = [
  // —— 汉语拼音 · 单韵母 ——
  { id: 'c-mono-1', subject: 'chinese', unit: '汉语拼音·单韵母', topic: '认读', type: 'choice', char: 'a', audio: '/audio/pinyin/a.mp3', prompt: '听一听，这是哪个单韵母？', options: ['a', 'o', 'e'], answer: 'a' },
  { id: 'c-mono-2', subject: 'chinese', unit: '汉语拼音·单韵母', topic: '认读', type: 'choice', char: 'o', audio: '/audio/pinyin/o.mp3', prompt: '听一听，这是哪个单韵母？', options: ['o', 'e', 'u'], answer: 'o' },
  { id: 'c-mono-3', subject: 'chinese', unit: '汉语拼音·单韵母', topic: '认读', type: 'choice', char: 'e', audio: '/audio/pinyin/e.mp3', prompt: '听一听，这是哪个单韵母？', options: ['e', 'a', 'o'], answer: 'e' },
  { id: 'c-mono-4', subject: 'chinese', unit: '汉语拼音·单韵母', topic: '认读', type: 'choice', char: 'i', audio: '/audio/pinyin/i.mp3', prompt: '听一听，这是哪个单韵母？', options: ['i', 'u', 'ü'], answer: 'i' },
  { id: 'c-mono-5', subject: 'chinese', unit: '汉语拼音·单韵母', topic: '认读', type: 'choice', char: 'u', audio: '/audio/pinyin/u.mp3', prompt: '听一听，这是哪个单韵母？', options: ['u', 'ü', 'o'], answer: 'u' },
  { id: 'c-mono-6', subject: 'chinese', unit: '汉语拼音·单韵母', topic: '认读', type: 'choice', char: 'ü', audio: '/audio/pinyin/v.mp3', prompt: '听一听，这是哪个单韵母？', options: ['ü', 'u', 'i'], answer: 'ü' },
  // 声调
  { id: 'c-tone-1', subject: 'chinese', unit: '汉语拼音·单韵母', topic: '声调', type: 'tone', char: 'ā', prompt: '这个音节是第几声？', options: ['一声', '二声', '三声', '四声'], answer: '一声' },
  { id: 'c-tone-2', subject: 'chinese', unit: '汉语拼音·单韵母', topic: '声调', type: 'tone', char: 'á', prompt: '这个音节是第几声？', options: ['一声', '二声', '三声', '四声'], answer: '二声' },
  { id: 'c-tone-3', subject: 'chinese', unit: '汉语拼音·单韵母', topic: '声调', type: 'tone', char: 'ǎ', prompt: '这个音节是第几声？', options: ['一声', '二声', '三声', '四声'], answer: '三声' },
  { id: 'c-tone-4', subject: 'chinese', unit: '汉语拼音·单韵母', topic: '声调', type: 'tone', char: 'à', prompt: '这个音节是第几声？', options: ['一声', '二声', '三声', '四声'], answer: '四声' },
  { id: 'c-tone-5', subject: 'chinese', unit: '汉语拼音·单韵母', topic: '标调', type: 'tone', char: 'a', prompt: 'a 的第三声是哪一个？', options: ['ā', 'á', 'ǎ', 'à'], answer: 'ǎ' },
  { id: 'c-tone-6', subject: 'chinese', unit: '汉语拼音·单韵母', topic: '标调', type: 'tone', char: 'o', prompt: 'o 的第二声是哪一个？', options: ['ō', 'ó', 'ǒ', 'ò'], answer: 'ó' },

  // —— 汉语拼音 · 声母 ——
  { id: 'c-init-1', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 'b', audio: '/audio/pinyin/b.mp3', prompt: '听一听，这是哪个声母？', options: ['b', 'p', 'd'], answer: 'b' },
  { id: 'c-init-2', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 'p', audio: '/audio/pinyin/p.mp3', prompt: '听一听，这是哪个声母？', options: ['p', 'b', 'q'], answer: 'p' },
  { id: 'c-init-3', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 'm', audio: '/audio/pinyin/m.mp3', prompt: '听一听，这是哪个声母？', options: ['m', 'n', 'f'], answer: 'm' },
  { id: 'c-init-4', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 'f', audio: '/audio/pinyin/f.mp3', prompt: '听一听，这是哪个声母？', options: ['f', 't', 'h'], answer: 'f' },
  { id: 'c-init-5', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 'd', audio: '/audio/pinyin/d.mp3', prompt: '听一听，这是哪个声母？', options: ['d', 'b', 'p'], answer: 'd' },
  { id: 'c-init-6', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 't', audio: '/audio/pinyin/t.mp3', prompt: '听一听，这是哪个声母？', options: ['t', 'f', 'd'], answer: 't' },
  { id: 'c-init-7', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 'n', audio: '/audio/pinyin/n.mp3', prompt: '听一听，这是哪个声母？', options: ['n', 'm', 'h'], answer: 'n' },
  { id: 'c-init-8', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 'l', audio: '/audio/pinyin/l.mp3', prompt: '听一听，这是哪个声母？', options: ['l', 'i', 'n'], answer: 'l' },
  { id: 'c-init-9', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 'g', audio: '/audio/pinyin/g.mp3', prompt: '听一听，这是哪个声母？', options: ['g', 'k', 'h'], answer: 'g' },
  { id: 'c-init-10', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 'k', audio: '/audio/pinyin/k.mp3', prompt: '听一听，这是哪个声母？', options: ['k', 'g', 'h'], answer: 'k' },
  { id: 'c-init-11', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 'h', audio: '/audio/pinyin/h.mp3', prompt: '听一听，这是哪个声母？', options: ['h', 'n', 'k'], answer: 'h' },
  { id: 'c-init-12', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 'j', audio: '/audio/pinyin/j.mp3', prompt: '听一听，这是哪个声母？', options: ['j', 'i', 'q'], answer: 'j' },
  { id: 'c-init-13', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 'q', audio: '/audio/pinyin/q.mp3', prompt: '听一听，这是哪个声母？', options: ['q', 'p', 'j'], answer: 'q' },
  { id: 'c-init-14', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 'x', audio: '/audio/pinyin/x.mp3', prompt: '听一听，这是哪个声母？', options: ['x', 'y', 'k'], answer: 'x' },
  { id: 'c-init-15', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 'zh', audio: '/audio/pinyin/zh.mp3', prompt: '听一听，这是哪个声母？', options: ['zh', 'z', 'zr'], answer: 'zh' },
  { id: 'c-init-16', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 'ch', audio: '/audio/pinyin/ch.mp3', prompt: '听一听，这是哪个声母？', options: ['ch', 'c', 'sh'], answer: 'ch' },
  { id: 'c-init-17', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 'sh', audio: '/audio/pinyin/sh.mp3', prompt: '听一听，这是哪个声母？', options: ['sh', 's', 'ch'], answer: 'sh' },
  { id: 'c-init-18', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 'r', audio: '/audio/pinyin/r.mp3', prompt: '听一听，这是哪个声母？', options: ['r', 'l', 'n'], answer: 'r' },
  { id: 'c-init-19', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 'z', audio: '/audio/pinyin/z.mp3', prompt: '听一听，这是哪个声母？', options: ['z', 'zh', 's'], answer: 'z' },
  { id: 'c-init-20', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 'c', audio: '/audio/pinyin/c.mp3', prompt: '听一听，这是哪个声母？', options: ['c', 'ch', 'z'], answer: 'c' },
  { id: 'c-init-21', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 's', audio: '/audio/pinyin/s.mp3', prompt: '听一听，这是哪个声母？', options: ['s', 'sh', 'c'], answer: 's' },
  { id: 'c-init-22', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 'y', audio: '/audio/pinyin/y.mp3', prompt: '听一听，这是哪个声母？', options: ['y', 'w', 'i'], answer: 'y' },
  { id: 'c-init-23', subject: 'chinese', unit: '汉语拼音·声母', topic: '认读', type: 'choice', char: 'w', audio: '/audio/pinyin/w.mp3', prompt: '听一听，这是哪个声母？', options: ['w', 'y', 'u'], answer: 'w' },
  // 拼读
  { id: 'c-spell-1', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：b — a → ？', parts: ['b', 'a'], options: ['ba', 'pa', 'ma', 'da'], answer: 'ba' },
  { id: 'c-spell-2', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：p — a → ？', parts: ['p', 'a'], options: ['pa', 'ba', 'ma', 'fa'], answer: 'pa' },
  { id: 'c-spell-3', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：m — a → ？', parts: ['m', 'a'], options: ['ma', 'na', 'la', 'ha'], answer: 'ma' },
  { id: 'c-spell-4', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：f — u → ？', parts: ['f', 'u'], options: ['fu', 'tu', 'lu', 'hu'], answer: 'fu' },
  { id: 'c-spell-5', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：d — a → ？', parts: ['d', 'a'], options: ['da', 'ta', 'ba', 'la'], answer: 'da' },
  { id: 'c-spell-6', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：t — u → ？', parts: ['t', 'u'], options: ['tu', 'du', 'nu', 'lu'], answer: 'tu' },
  { id: 'c-spell-7', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：n — i → ？', parts: ['n', 'i'], options: ['ni', 'li', 'mi', 'di'], answer: 'ni' },
  { id: 'c-spell-8', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：l — a → ？', parts: ['l', 'a'], options: ['la', 'na', 'ba', 'fa'], answer: 'la' },
  { id: 'c-spell-9', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：g — e → ？', parts: ['g', 'e'], options: ['ge', 'ke', 'he', 'le'], answer: 'ge' },
  { id: 'c-spell-10', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：k — e → ？', parts: ['k', 'e'], options: ['ke', 'ge', 'he', 'te'], answer: 'ke' },
  { id: 'c-spell-11', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：h — e → ？', parts: ['h', 'e'], options: ['he', 'ke', 'ge', 'me'], answer: 'he' },
  { id: 'c-spell-12', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：j — i → ？', parts: ['j', 'i'], options: ['ji', 'qi', 'xi', 'li'], answer: 'ji' },
  { id: 'c-spell-13', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：q — i → ？', parts: ['q', 'i'], options: ['qi', 'pi', 'ji', 'xi'], answer: 'qi' },
  { id: 'c-spell-14', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：x — i → ？', parts: ['x', 'i'], options: ['xi', 'yi', 'ki', 'mi'], answer: 'xi' },
  { id: 'c-spell-15', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：z — u → ？', parts: ['z', 'u'], options: ['zu', 'cu', 'su', 'lu'], answer: 'zu' },
  { id: 'c-spell-16', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：c — u → ？', parts: ['c', 'u'], options: ['cu', 'zu', 'chu', 'su'], answer: 'cu' },
  { id: 'c-spell-17', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：s — u → ？', parts: ['s', 'u'], options: ['su', 'shu', 'chu', 'ru'], answer: 'su' },
  { id: 'c-spell-18', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：zh — u → ？', parts: ['zh', 'u'], options: ['zhu', 'chu', 'shu', 'ru'], answer: 'zhu' },
  { id: 'c-spell-19', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：ch — u → ？', parts: ['ch', 'u'], options: ['chu', 'zhu', 'shu', 'cu'], answer: 'chu' },
  { id: 'c-spell-20', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：sh — u → ？', parts: ['sh', 'u'], options: ['shu', 'su', 'chu', 'ru'], answer: 'shu' },
  { id: 'c-spell-21', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：r — u → ？', parts: ['r', 'u'], options: ['ru', 'lu', 'nu', 'hu'], answer: 'ru' },
  { id: 'c-spell-22', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：y — a → ？', parts: ['y', 'a'], options: ['ya', 'wa', 'ba', 'ma'], answer: 'ya' },
  { id: 'c-spell-23', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '拼一拼：w — a → ？', parts: ['w', 'a'], options: ['wa', 'ya', 'pa', 'fa'], answer: 'wa' },
  { id: 'c-spell-24', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '三拼音：j — i — a → ？', parts: ['j', 'i', 'a'], options: ['jia', 'qia', 'xia'], answer: 'jia' },
  { id: 'c-spell-25', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '三拼音：q — i — a → ？', parts: ['q', 'i', 'a'], options: ['qia', 'jia', 'xia'], answer: 'qia' },
  { id: 'c-spell-26', subject: 'chinese', unit: '汉语拼音·声母', topic: '拼读', type: 'spell', prompt: '三拼音：x — i — a → ？', parts: ['x', 'i', 'a'], options: ['xia', 'jia', 'qia'], answer: 'xia' },
  // 连线
  { id: 'c-match-1', subject: 'chinese', unit: '汉语拼音·声母', topic: '连线', type: 'match', prompt: '把声母和汉字连起来', pairs: [['b', '爸'], ['m', '妈'], ['h', '花']] },
  { id: 'c-match-2', subject: 'chinese', unit: '汉语拼音·声母', topic: '连线', type: 'match', prompt: '把声母和汉字连起来', pairs: [['d', '大'], ['t', '土'], ['n', '你']] },

  // —— 汉语拼音 · 复韵母 ——
  { id: 'c-comp-1', subject: 'chinese', unit: '汉语拼音·复韵母', topic: '认读', type: 'choice', char: 'ai', audio: '/audio/pinyin/ai.mp3', prompt: '听一听，这是哪个复韵母？', options: ['ai', 'ei', 'ui'], answer: 'ai' },
  { id: 'c-comp-2', subject: 'chinese', unit: '汉语拼音·复韵母', topic: '认读', type: 'choice', char: 'ei', audio: '/audio/pinyin/ei.mp3', prompt: '听一听，这是哪个复韵母？', options: ['ei', 'ie', 'ui'], answer: 'ei' },
  { id: 'c-comp-3', subject: 'chinese', unit: '汉语拼音·复韵母', topic: '认读', type: 'choice', char: 'ui', audio: '/audio/pinyin/ui.mp3', prompt: '听一听，这是哪个复韵母？', options: ['ui', 'iu', 'ai'], answer: 'ui' },
  { id: 'c-comp-4', subject: 'chinese', unit: '汉语拼音·复韵母', topic: '认读', type: 'choice', char: 'ao', audio: '/audio/pinyin/ao.mp3', prompt: '听一听，这是哪个复韵母？', options: ['ao', 'ou', 'an'], answer: 'ao' },
  { id: 'c-comp-5', subject: 'chinese', unit: '汉语拼音·复韵母', topic: '认读', type: 'choice', char: 'ou', audio: '/audio/pinyin/ou.mp3', prompt: '听一听，这是哪个复韵母？', options: ['ou', 'ao', 'iu'], answer: 'ou' },
  { id: 'c-comp-6', subject: 'chinese', unit: '汉语拼音·复韵母', topic: '认读', type: 'choice', char: 'iu', audio: '/audio/pinyin/iu.mp3', prompt: '听一听，这是哪个复韵母？', options: ['iu', 'ui', 'ou'], answer: 'iu' },
  { id: 'c-comp-7', subject: 'chinese', unit: '汉语拼音·复韵母', topic: '认读', type: 'choice', char: 'ie', audio: '/audio/pinyin/ie.mp3', prompt: '听一听，这是哪个复韵母？', options: ['ie', 'ei', 'üe'], answer: 'ie' },
  { id: 'c-comp-8', subject: 'chinese', unit: '汉语拼音·复韵母', topic: '认读', type: 'choice', char: 'üe', audio: '/audio/pinyin/ve.mp3', prompt: '听一听，这是哪个复韵母？', options: ['üe', 'ie', 'er'], answer: 'üe' },
  { id: 'c-comp-9', subject: 'chinese', unit: '汉语拼音·复韵母', topic: '认读', type: 'choice', char: 'er', audio: '/audio/pinyin/er.mp3', prompt: '听一听，这是哪个复韵母？', options: ['er', 'en', 'ei'], answer: 'er' },
  { id: 'c-comp-spell-1', subject: 'chinese', unit: '汉语拼音·复韵母', topic: '拼读', type: 'spell', prompt: '拼一拼：b — ai → ？', parts: ['b', 'ai'], options: ['bai', 'pai', 'mai'], answer: 'bai' },
  { id: 'c-comp-spell-2', subject: 'chinese', unit: '汉语拼音·复韵母', topic: '拼读', type: 'spell', prompt: '拼一拼：m — ei → ？', parts: ['m', 'ei'], options: ['mei', 'fei', 'lei'], answer: 'mei' },
  { id: 'c-comp-spell-3', subject: 'chinese', unit: '汉语拼音·复韵母', topic: '拼读', type: 'spell', prompt: '拼一拼：h — ui → ？', parts: ['h', 'ui'], options: ['hui', 'dui', 'tui'], answer: 'hui' },
  { id: 'c-comp-spell-4', subject: 'chinese', unit: '汉语拼音·复韵母', topic: '拼读', type: 'spell', prompt: '拼一拼：h — ao → ？', parts: ['h', 'ao'], options: ['hao', 'gao', 'bao'], answer: 'hao' },
  { id: 'c-comp-spell-5', subject: 'chinese', unit: '汉语拼音·复韵母', topic: '拼读', type: 'spell', prompt: '拼一拼：l — ou → ？', parts: ['l', 'ou'], options: ['lou', 'zhou', 'kou'], answer: 'lou' },
  { id: 'c-comp-spell-6', subject: 'chinese', unit: '汉语拼音·复韵母', topic: '拼读', type: 'spell', prompt: '拼一拼：n — iu → ？', parts: ['n', 'iu'], options: ['niu', 'liu', 'diu'], answer: 'niu' },
  { id: 'c-comp-spell-7', subject: 'chinese', unit: '汉语拼音·复韵母', topic: '拼读', type: 'spell', prompt: '拼一拼：x — ie → ？', parts: ['x', 'ie'], options: ['xie', 'jie', 'qie'], answer: 'xie' },
  { id: 'c-comp-spell-8', subject: 'chinese', unit: '汉语拼音·复韵母', topic: '拼读', type: 'spell', prompt: '拼一拼：n — üe → ？', parts: ['n', 'üe'], options: ['nüe', 'lüe', 'jue'], answer: 'nüe' },
  { id: 'c-comp-match-1', subject: 'chinese', unit: '汉语拼音·复韵母', topic: '连线', type: 'match', prompt: '把复韵母和含它的音节连起来', pairs: [['ai', 'bai'], ['ei', 'mei'], ['ao', 'hao']] },

  // —— 汉语拼音 · 鼻韵母 ——
  { id: 'c-nasal-1', subject: 'chinese', unit: '汉语拼音·鼻韵母', topic: '认读', type: 'choice', char: 'an', audio: '/audio/pinyin/an.mp3', prompt: '听一听，这是哪个鼻韵母？', options: ['an', 'ang', 'en'], answer: 'an' },
  { id: 'c-nasal-2', subject: 'chinese', unit: '汉语拼音·鼻韵母', topic: '认读', type: 'choice', char: 'en', audio: '/audio/pinyin/en.mp3', prompt: '听一听，这是哪个鼻韵母？', options: ['en', 'eng', 'in'], answer: 'en' },
  { id: 'c-nasal-3', subject: 'chinese', unit: '汉语拼音·鼻韵母', topic: '认读', type: 'choice', char: 'in', audio: '/audio/pinyin/in.mp3', prompt: '听一听，这是哪个鼻韵母？', options: ['in', 'ing', 'un'], answer: 'in' },
  { id: 'c-nasal-4', subject: 'chinese', unit: '汉语拼音·鼻韵母', topic: '认读', type: 'choice', char: 'un', audio: '/audio/pinyin/un.mp3', prompt: '听一听，这是哪个鼻韵母？', options: ['un', 'ün', 'en'], answer: 'un' },
  { id: 'c-nasal-5', subject: 'chinese', unit: '汉语拼音·鼻韵母', topic: '认读', type: 'choice', char: 'ün', audio: '/audio/pinyin/vn.mp3', prompt: '听一听，这是哪个鼻韵母？', options: ['ün', 'un', 'in'], answer: 'ün' },
  { id: 'c-nasal-6', subject: 'chinese', unit: '汉语拼音·鼻韵母', topic: '认读', type: 'choice', char: 'ang', audio: '/audio/pinyin/ang.mp3', prompt: '听一听，这是哪个鼻韵母？', options: ['ang', 'an', 'eng'], answer: 'ang' },
  { id: 'c-nasal-7', subject: 'chinese', unit: '汉语拼音·鼻韵母', topic: '认读', type: 'choice', char: 'eng', audio: '/audio/pinyin/eng.mp3', prompt: '听一听，这是哪个鼻韵母？', options: ['eng', 'en', 'ing'], answer: 'eng' },
  { id: 'c-nasal-8', subject: 'chinese', unit: '汉语拼音·鼻韵母', topic: '认读', type: 'choice', char: 'ing', audio: '/audio/pinyin/ing.mp3', prompt: '听一听，这是哪个鼻韵母？', options: ['ing', 'in', 'ong'], answer: 'ing' },
  { id: 'c-nasal-9', subject: 'chinese', unit: '汉语拼音·鼻韵母', topic: '认读', type: 'choice', char: 'ong', audio: '/audio/pinyin/ong.mp3', prompt: '听一听，这是哪个鼻韵母？', options: ['ong', 'ing', 'ang'], answer: 'ong' },
  { id: 'c-nasal-spell-1', subject: 'chinese', unit: '汉语拼音·鼻韵母', topic: '拼读', type: 'spell', prompt: '拼一拼：b — an → ？', parts: ['b', 'an'], options: ['ban', 'pan', 'man'], answer: 'ban' },
  { id: 'c-nasal-spell-2', subject: 'chinese', unit: '汉语拼音·鼻韵母', topic: '拼读', type: 'spell', prompt: '拼一拼：m — en → ？', parts: ['m', 'en'], options: ['men', 'fen', 'ben'], answer: 'men' },
  { id: 'c-nasal-spell-3', subject: 'chinese', unit: '汉语拼音·鼻韵母', topic: '拼读', type: 'spell', prompt: '拼一拼：j — in → ？', parts: ['j', 'in'], options: ['jin', 'qin', 'xin'], answer: 'jin' },
  { id: 'c-nasal-spell-4', subject: 'chinese', unit: '汉语拼音·鼻韵母', topic: '拼读', type: 'spell', prompt: '拼一拼：h — un → ？', parts: ['h', 'un'], options: ['hun', 'dun', 'tun'], answer: 'hun' },
  { id: 'c-nasal-spell-5', subject: 'chinese', unit: '汉语拼音·鼻韵母', topic: '拼读', type: 'spell', prompt: '拼一拼：q — ün → ？', parts: ['q', 'un'], options: ['qun', 'jun', 'xun'], answer: 'qun' },
  { id: 'c-nasal-spell-6', subject: 'chinese', unit: '汉语拼音·鼻韵母', topic: '拼读', type: 'spell', prompt: '拼一拼：f — ang → ？', parts: ['f', 'ang'], options: ['fang', 'tang', 'bang'], answer: 'fang' },
  { id: 'c-nasal-spell-7', subject: 'chinese', unit: '汉语拼音·鼻韵母', topic: '拼读', type: 'spell', prompt: '拼一拼：d — eng → ？', parts: ['d', 'eng'], options: ['deng', 'teng', 'feng'], answer: 'deng' },
  { id: 'c-nasal-spell-8', subject: 'chinese', unit: '汉语拼音·鼻韵母', topic: '拼读', type: 'spell', prompt: '拼一拼：m — ing → ？', parts: ['m', 'ing'], options: ['ming', 'ping', 'ding'], answer: 'ming' },
  { id: 'c-nasal-spell-9', subject: 'chinese', unit: '汉语拼音·鼻韵母', topic: '拼读', type: 'spell', prompt: '拼一拼：h — ong → ？', parts: ['h', 'ong'], options: ['hong', 'tong', 'long'], answer: 'hong' },

  // —— 汉语拼音 · 整体认读 ——
  { id: 'c-zhi-1', subject: 'chinese', unit: '汉语拼音·整体认读', topic: '认读', type: 'choice', char: 'zhi', audio: '/audio/pinyin/zhi1.mp3', prompt: '听一听，这是哪个整体认读音节？', options: ['zhi', 'zi', 'chi'], answer: 'zhi' },
  { id: 'c-zhi-2', subject: 'chinese', unit: '汉语拼音·整体认读', topic: '认读', type: 'choice', char: 'chi', audio: '/audio/pinyin/chi1.mp3', prompt: '听一听，这是哪个整体认读音节？', options: ['chi', 'ci', 'shi'], answer: 'chi' },
  { id: 'c-zhi-3', subject: 'chinese', unit: '汉语拼音·整体认读', topic: '认读', type: 'choice', char: 'shi', audio: '/audio/pinyin/shi1.mp3', prompt: '听一听，这是哪个整体认读音节？', options: ['shi', 'si', 'ri'], answer: 'shi' },
  { id: 'c-zhi-4', subject: 'chinese', unit: '汉语拼音·整体认读', topic: '认读', type: 'choice', char: 'ri', audio: '/audio/pinyin/ri1.mp3', prompt: '听一听，这是哪个整体认读音节？', options: ['ri', 'r', 'i'], answer: 'ri' },
  { id: 'c-zhi-5', subject: 'chinese', unit: '汉语拼音·整体认读', topic: '认读', type: 'choice', char: 'zi', audio: '/audio/pinyin/zi1.mp3', prompt: '听一听，这是哪个整体认读音节？', options: ['zi', 'zhi', 'ci'], answer: 'zi' },
  { id: 'c-zhi-6', subject: 'chinese', unit: '汉语拼音·整体认读', topic: '认读', type: 'choice', char: 'ci', audio: '/audio/pinyin/ci1.mp3', prompt: '听一听，这是哪个整体认读音节？', options: ['ci', 'chi', 'si'], answer: 'ci' },
  { id: 'c-zhi-7', subject: 'chinese', unit: '汉语拼音·整体认读', topic: '认读', type: 'choice', char: 'si', audio: '/audio/pinyin/si1.mp3', prompt: '听一听，这是哪个整体认读音节？', options: ['si', 'shi', 'zi'], answer: 'si' },
  { id: 'c-zhi-8', subject: 'chinese', unit: '汉语拼音·整体认读', topic: '认读', type: 'choice', char: 'yi', audio: '/audio/pinyin/yi1.mp3', prompt: '听一听，这是哪个整体认读音节？', options: ['yi', 'y', 'wu'], answer: 'yi' },
  { id: 'c-zhi-9', subject: 'chinese', unit: '汉语拼音·整体认读', topic: '认读', type: 'choice', char: 'wu', audio: '/audio/pinyin/wu1.mp3', prompt: '听一听，这是哪个整体认读音节？', options: ['wu', 'yu', 'y'], answer: 'wu' },
  { id: 'c-zhi-10', subject: 'chinese', unit: '汉语拼音·整体认读', topic: '认读', type: 'choice', char: 'yu', audio: '/audio/pinyin/yu1.mp3', prompt: '听一听，这是哪个整体认读音节？', options: ['yu', 'yue', 'wu'], answer: 'yu' },
  { id: 'c-zhi-11', subject: 'chinese', unit: '汉语拼音·整体认读', topic: '认读', type: 'choice', char: 'ye', audio: '/audio/pinyin/ye1.mp3', prompt: '听一听，这是哪个整体认读音节？', options: ['ye', 'yue', 'yi'], answer: 'ye' },
  { id: 'c-zhi-12', subject: 'chinese', unit: '汉语拼音·整体认读', topic: '认读', type: 'choice', char: 'yue', audio: '/audio/pinyin/yue1.mp3', prompt: '听一听，这是哪个整体认读音节？', options: ['yue', 'ye', 'yuan'], answer: 'yue' },
  { id: 'c-zhi-13', subject: 'chinese', unit: '汉语拼音·整体认读', topic: '认读', type: 'choice', char: 'yuan', audio: '/audio/pinyin/yuan1.mp3', prompt: '听一听，这是哪个整体认读音节？', options: ['yuan', 'yue', 'yun'], answer: 'yuan' },
  { id: 'c-zhi-14', subject: 'chinese', unit: '汉语拼音·整体认读', topic: '认读', type: 'choice', char: 'yin', audio: '/audio/pinyin/yin1.mp3', prompt: '听一听，这是哪个整体认读音节？', options: ['yin', 'ying', 'yun'], answer: 'yin' },
  { id: 'c-zhi-15', subject: 'chinese', unit: '汉语拼音·整体认读', topic: '认读', type: 'choice', char: 'yun', audio: '/audio/pinyin/yun1.mp3', prompt: '听一听，这是哪个整体认读音节？', options: ['yun', 'yin', 'ying'], answer: 'yun' },
  { id: 'c-zhi-16', subject: 'chinese', unit: '汉语拼音·整体认读', topic: '认读', type: 'choice', char: 'ying', audio: '/audio/pinyin/ying1.mp3', prompt: '听一听，这是哪个整体认读音节？', options: ['ying', 'yin', 'ing'], answer: 'ying' },
  { id: 'c-zhi-match-1', subject: 'chinese', unit: '汉语拼音·整体认读', topic: '连线', type: 'match', prompt: '把音节和汉字连起来', pairs: [['zhi', '织'], ['chi', '吃'], ['shi', '狮']] },
  { id: 'c-zhi-match-2', subject: 'chinese', unit: '汉语拼音·整体认读', topic: '连线', type: 'match', prompt: '把音节和汉字连起来', pairs: [['yi', '衣'], ['wu', '屋'], ['yu', '鱼']] },

  // —— 识字（一） ——
  { id: 'c-lit1-1', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '天', audio: '/audio/c-lit1-1.mp3', pinyin: 'tiān', prompt: '这个字读什么？', options: ['tiān', 'dì', 'rén'], answer: 'tiān' },
  { id: 'c-lit1-2', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '地', audio: '/audio/c-lit1-2.mp3', pinyin: 'dì', prompt: '这个字读什么？', options: ['dì', 'tiān', 'rén'], answer: 'dì' },
  { id: 'c-lit1-3', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '人', audio: '/audio/c-lit1-3.mp3', pinyin: 'rén', prompt: '这个字读什么？', options: ['rén', 'tiān', 'kǒu'], answer: 'rén' },
  { id: 'c-lit1-4', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '日', audio: '/audio/c-lit1-4.mp3', pinyin: 'rì', prompt: '这个字读什么？', options: ['rì', 'yuè', 'shuǐ'], answer: 'rì' },
  { id: 'c-lit1-5', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '月', audio: '/audio/c-lit1-5.mp3', pinyin: 'yuè', prompt: '这个字读什么？', options: ['yuè', 'rì', 'shuǐ'], answer: 'yuè' },
  { id: 'c-lit1-6', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '水', audio: '/audio/c-lit1-6.mp3', pinyin: 'shuǐ', prompt: '这个字读什么？', options: ['shuǐ', 'huǒ', 'mù'], answer: 'shuǐ' },
  { id: 'c-lit1-7', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '火', audio: '/audio/c-lit1-7.mp3', pinyin: 'huǒ', prompt: '这个字读什么？', options: ['huǒ', 'shuǐ', 'mù'], answer: 'huǒ' },
  { id: 'c-lit1-8', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '口', audio: '/audio/c-lit1-8.mp3', pinyin: 'kǒu', prompt: '这个字读什么？', options: ['kǒu', 'ěr', 'mù'], answer: 'kǒu' },
  { id: 'c-lit1-9', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '耳', audio: '/audio/c-lit1-9.mp3', pinyin: 'ěr', prompt: '这个字读什么？', options: ['ěr', 'kǒu', 'shǒu'], answer: 'ěr' },
  { id: 'c-lit1-10', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '目', audio: '/audio/c-lit1-10.mp3', pinyin: 'mù', prompt: '这个字读什么？', options: ['mù', 'ěr', 'kǒu'], answer: 'mù' },
  { id: 'c-lit1-11', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '手', audio: '/audio/c-lit1-11.mp3', pinyin: 'shǒu', prompt: '这个字读什么？', options: ['shǒu', 'zú', 'kǒu'], answer: 'shǒu' },
  { id: 'c-lit1-12', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '木', audio: '/audio/c-lit1-12.mp3', pinyin: 'mù', prompt: '树木的“木”读什么？', options: ['mù', 'shù', 'lín'], answer: 'mù' },
  { id: 'c-lit1-13', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '山', audio: '/audio/c-lit1-13.mp3', pinyin: 'shān', prompt: '这个字读什么？', options: ['shān', 'chuān', 'shí'], answer: 'shān' },
  { id: 'c-lit1-14', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '川', audio: '/audio/c-lit1-14.mp3', pinyin: 'chuān', prompt: '这个字读什么？', options: ['chuān', 'shān', 'tián'], answer: 'chuān' },
  { id: 'c-lit1-15', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '田', audio: '/audio/c-lit1-15.mp3', pinyin: 'tián', prompt: '这个字读什么？', options: ['tián', 'hé', 'shān'], answer: 'tián' },
  { id: 'c-lit1-16', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '禾', audio: '/audio/c-lit1-16.mp3', pinyin: 'hé', prompt: '这个字读什么？', options: ['hé', 'tián', 'mù'], answer: 'hé' },
  { id: 'c-lit1-match-1', subject: 'chinese', unit: '识字（一）', topic: '字义', type: 'match', prompt: '把字和意思连起来', pairs: [['日', '太阳'], ['月', '月亮'], ['水', '水流']] },

  // —— 识字（二） ——
  { id: 'c-lit2-1', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '画', audio: '/audio/c-lit2-1.mp3', pinyin: 'huà', prompt: '这个字读什么？', options: ['huà', 'shān', 'tián'], answer: 'huà' },
  { id: 'c-lit2-2', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '大', audio: '/audio/c-lit2-2.mp3', pinyin: 'dà', prompt: '这个字读什么？', options: ['dà', 'xiǎo', 'duō'], answer: 'dà' },
  { id: 'c-lit2-3', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '小', audio: '/audio/c-lit2-3.mp3', pinyin: 'xiǎo', prompt: '这个字读什么？', options: ['xiǎo', 'dà', 'shǎo'], answer: 'xiǎo' },
  { id: 'c-lit2-4', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '多', audio: '/audio/c-lit2-4.mp3', pinyin: 'duō', prompt: '这个字读什么？', options: ['duō', 'shǎo', 'dà'], answer: 'duō' },
  { id: 'c-lit2-5', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '少', audio: '/audio/c-lit2-5.mp3', pinyin: 'shǎo', prompt: '这个字读什么？', options: ['shǎo', 'duō', 'xiǎo'], answer: 'shǎo' },
  { id: 'c-lit2-6', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '书', audio: '/audio/c-lit2-6.mp3', pinyin: 'shū', prompt: '这个字读什么？', options: ['shū', 'bāo', 'běn'], answer: 'shū' },
  { id: 'c-lit2-7', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '包', audio: '/audio/c-lit2-7.mp3', pinyin: 'bāo', prompt: '这个字读什么？', options: ['bāo', 'shū', 'xué'], answer: 'bāo' },
  { id: 'c-lit2-8', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '明', audio: '/audio/c-lit2-8.mp3', pinyin: 'míng', prompt: '“日月明”的“明”读什么？', options: ['míng', 'liàng', 'guāng'], answer: 'míng' },
  { id: 'c-lit2-9', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '林', audio: '/audio/c-lit2-9.mp3', pinyin: 'lín', prompt: '这个字读什么？', options: ['lín', 'sēn', 'shù'], answer: 'lín' },
  { id: 'c-lit2-10', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '森', audio: '/audio/c-lit2-10.mp3', pinyin: 'sēn', prompt: '这个字读什么？', options: ['sēn', 'lín', 'mù'], answer: 'sēn' },
  { id: 'c-lit2-11', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '从', audio: '/audio/c-lit2-11.mp3', pinyin: 'cóng', prompt: '这个字读什么？', options: ['cóng', 'zhòng', 'rén'], answer: 'cóng' },
  { id: 'c-lit2-12', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '众', audio: '/audio/c-lit2-12.mp3', pinyin: 'zhòng', prompt: '这个字读什么？', options: ['zhòng', 'cóng', 'rén'], answer: 'zhòng' },
  { id: 'c-lit2-13', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '旗', audio: '/audio/c-lit2-13.mp3', pinyin: 'qí', prompt: '“国旗”的“旗”读什么？', options: ['qí', 'hóng', 'xīng'], answer: 'qí' },
  { id: 'c-lit2-14', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '红', audio: '/audio/c-lit2-14.mp3', pinyin: 'hóng', prompt: '这个字读什么？', options: ['hóng', 'qí', 'lǜ'], answer: 'hóng' },

  // —— 课文（词语认读） ——
  { id: 'c-text-1', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '秋', audio: '/audio/c-text-1.mp3', pinyin: 'qiū', prompt: '这个字读什么？', options: ['qiū', 'chūn', 'dōng'], answer: 'qiū' },
  { id: 'c-text-2', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '船', audio: '/audio/c-text-2.mp3', pinyin: 'chuán', prompt: '这个字读什么？', options: ['chuán', 'xiǎo', 'yuè'], answer: 'chuán' },
  { id: 'c-text-3', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '星', audio: '/audio/c-text-3.mp3', pinyin: 'xīng', prompt: '这个字读什么？', options: ['xīng', 'yuè', 'tiān'], answer: 'xīng' },
  { id: 'c-text-4', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '江', audio: '/audio/c-text-4.mp3', pinyin: 'jiāng', prompt: '这个字读什么？', options: ['jiāng', 'hé', 'hǎi'], answer: 'jiāng' },
  { id: 'c-text-5', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '南', audio: '/audio/c-text-5.mp3', pinyin: 'nán', prompt: '这个字读什么？', options: ['nán', 'běi', 'dōng'], answer: 'nán' },
  { id: 'c-text-6', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '可', audio: '/audio/c-text-6.mp3', pinyin: 'kě', prompt: '这个字读什么？', options: ['kě', 'yǐ', 'shì'], answer: 'kě' },
  { id: 'c-text-7', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '鱼', audio: '/audio/c-text-7.mp3', pinyin: 'yú', prompt: '这个字读什么？', options: ['yú', 'niǎo', 'chóng'], answer: 'yú' },
  { id: 'c-text-8', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '东', audio: '/audio/c-text-8.mp3', pinyin: 'dōng', prompt: '“东边”的“东”读什么？', options: ['dōng', 'xī', 'nán'], answer: 'dōng' },
  { id: 'c-text-9', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '冬', audio: '/audio/c-text-9.mp3', pinyin: 'dōng', prompt: '“冬天”的“冬”读什么？', options: ['dōng', 'tóng', 'dòng'], answer: 'dōng' },
  { id: 'c-text-10', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '春', audio: '/audio/c-text-10.mp3', pinyin: 'chūn', prompt: '这个字读什么？', options: ['chūn', 'xià', 'qiū'], answer: 'chūn' },
  { id: 'c-text-11', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '夏', audio: '/audio/c-text-11.mp3', pinyin: 'xià', prompt: '这个字读什么？', options: ['xià', 'chūn', 'dōng'], answer: 'xià' },
  { id: 'c-text-12', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '风', audio: '/audio/c-text-12.mp3', pinyin: 'fēng', prompt: '这个字读什么？', options: ['fēng', 'yǔ', 'xuě'], answer: 'fēng' },

  // —— 识字（一）：补充常用字 ——
  { id: 'c-lit1-17', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '你', audio: '/audio/c-lit1-17.mp3', pinyin: 'nǐ', prompt: '这个字读什么？', options: ['nǐ', 'wǒ', 'tā'], answer: 'nǐ' },
  { id: 'c-lit1-18', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '我', audio: '/audio/c-lit1-18.mp3', pinyin: 'wǒ', prompt: '这个字读什么？', options: ['wǒ', 'nǐ', 'tā'], answer: 'wǒ' },
  { id: 'c-lit1-19', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '他', audio: '/audio/c-lit1-19.mp3', pinyin: 'tā', prompt: '这个字读什么？', options: ['tā', 'nǐ', 'wǒ'], answer: 'tā' },
  { id: 'c-lit1-20', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '金', audio: '/audio/c-lit1-20.mp3', pinyin: 'jīn', prompt: '这个字读什么？', options: ['jīn', 'mù', 'shuǐ'], answer: 'jīn' },
  { id: 'c-lit1-21', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '石', audio: '/audio/c-lit1-21.mp3', pinyin: 'shí', prompt: '这个字读什么？', options: ['shí', 'tǔ', 'huǒ'], answer: 'shí' },
  { id: 'c-lit1-22', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '土', audio: '/audio/c-lit1-22.mp3', pinyin: 'tǔ', prompt: '这个字读什么？', options: ['tǔ', 'shí', 'mù'], answer: 'tǔ' },
  { id: 'c-lit1-23', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '上', audio: '/audio/c-lit1-23.mp3', pinyin: 'shàng', prompt: '这个字读什么？', options: ['shàng', 'xià', 'xiǎo'], answer: 'shàng' },
  { id: 'c-lit1-24', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '下', audio: '/audio/c-lit1-24.mp3', pinyin: 'xià', prompt: '这个字读什么？', options: ['xià', 'shàng', 'dà'], answer: 'xià' },
  { id: 'c-lit1-25', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '十', audio: '/audio/c-lit1-25.mp3', pinyin: 'shí', prompt: '这个字读什么？', options: ['shí', 'bǎi', 'yī'], answer: 'shí' },
  { id: 'c-lit1-26', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '雨', audio: '/audio/c-lit1-26.mp3', pinyin: 'yǔ', prompt: '这个字读什么？', options: ['yǔ', 'xuě', 'yún'], answer: 'yǔ' },
  { id: 'c-lit1-27', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '雪', audio: '/audio/c-lit1-27.mp3', pinyin: 'xuě', prompt: '这个字读什么？', options: ['xuě', 'yǔ', 'fēng'], answer: 'xuě' },
  { id: 'c-lit1-28', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '风', audio: '/audio/c-lit1-28.mp3', pinyin: 'fēng', prompt: '这个字读什么？', options: ['fēng', 'yún', 'huā'], answer: 'fēng' },
  { id: 'c-lit1-29', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '云', audio: '/audio/c-lit1-29.mp3', pinyin: 'yún', prompt: '这个字读什么？', options: ['yún', 'yǔ', 'huā'], answer: 'yún' },
  { id: 'c-lit1-30', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '花', audio: '/audio/c-lit1-30.mp3', pinyin: 'huā', prompt: '这个字读什么？', options: ['huā', 'shù', 'niǎo'], answer: 'huā' },
  { id: 'c-lit1-31', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '树', audio: '/audio/c-lit1-31.mp3', pinyin: 'shù', prompt: '这个字读什么？', options: ['shù', 'huā', 'niǎo'], answer: 'shù' },
  { id: 'c-lit1-32', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '鸟', audio: '/audio/c-lit1-32.mp3', pinyin: 'niǎo', prompt: '这个字读什么？', options: ['niǎo', 'chóng', 'yú'], answer: 'niǎo' },
  { id: 'c-lit1-33', subject: 'chinese', unit: '识字（一）', topic: '认字', type: 'choice', char: '虫', audio: '/audio/c-lit1-33.mp3', pinyin: 'chóng', prompt: '这个字读什么？', options: ['chóng', 'niǎo', 'yú'], answer: 'chóng' },

  // —— 识字（二）：补充常用字 ——
  { id: 'c-lit2-15', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '力', audio: '/audio/c-lit2-15.mp3', pinyin: 'lì', prompt: '这个字读什么？', options: ['lì', 'qì', 'xīn'], answer: 'lì' },
  { id: 'c-lit2-16', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '尘', audio: '/audio/c-lit2-16.mp3', pinyin: 'chén', prompt: '“尘土”的“尘”读什么？', options: ['chén', 'tǔ', 'xiǎo'], answer: 'chén' },
  { id: 'c-lit2-17', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '双', audio: '/audio/c-lit2-17.mp3', pinyin: 'shuāng', prompt: '这个字读什么？', options: ['shuāng', 'dān', 'liǎng'], answer: 'shuāng' },
  { id: 'c-lit2-18', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '心', audio: '/audio/c-lit2-18.mp3', pinyin: 'xīn', prompt: '这个字读什么？', options: ['xīn', 'shǒu', 'lì'], answer: 'xīn' },
  { id: 'c-lit2-19', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '升', audio: '/audio/c-lit2-19.mp3', pinyin: 'shēng', prompt: '“上升”的“升”读什么？', options: ['shēng', 'shēn', 'qí'], answer: 'shēng' },
  { id: 'c-lit2-20', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '国', audio: '/audio/c-lit2-20.mp3', pinyin: 'guó', prompt: '“中国”的“国”读什么？', options: ['guó', 'jiā', 'zhōng'], answer: 'guó' },
  { id: 'c-lit2-21', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '中', audio: '/audio/c-lit2-21.mp3', pinyin: 'zhōng', prompt: '这个字读什么？', options: ['zhōng', 'guó', 'wài'], answer: 'zhōng' },
  { id: 'c-lit2-22', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '起', audio: '/audio/c-lit2-22.mp3', pinyin: 'qǐ', prompt: '“起来”的“起”读什么？', options: ['qǐ', 'lì', 'zǒu'], answer: 'qǐ' },
  { id: 'c-lit2-23', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '么', audio: '/audio/c-lit2-23.mp3', pinyin: 'me', prompt: '“什么”的“么”读什么？', options: ['me', 'shén', 'mó'], answer: 'me' },
  { id: 'c-lit2-24', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '丽', audio: '/audio/c-lit2-24.mp3', pinyin: 'lì', prompt: '“美丽”的“丽”读什么？', options: ['lì', 'měi', 'hǎo'], answer: 'lì' },
  { id: 'c-lit2-25', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '立', audio: '/audio/c-lit2-25.mp3', pinyin: 'lì', prompt: '“立正”的“立”读什么？', options: ['lì', 'zhàn', 'zuò'], answer: 'lì' },
  { id: 'c-lit2-26', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '尺', audio: '/audio/c-lit2-26.mp3', pinyin: 'chǐ', prompt: '这个字读什么？', options: ['chǐ', 'bǐ', 'dāo'], answer: 'chǐ' },
  { id: 'c-lit2-27', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '笔', audio: '/audio/c-lit2-27.mp3', pinyin: 'bǐ', prompt: '这个字读什么？', options: ['bǐ', 'chǐ', 'mò'], answer: 'bǐ' },
  { id: 'c-lit2-28', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '刀', audio: '/audio/c-lit2-28.mp3', pinyin: 'dāo', prompt: '这个字读什么？', options: ['dāo', 'bǐ', 'chǐ'], answer: 'dāo' },
  { id: 'c-lit2-29', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '早', audio: '/audio/c-lit2-29.mp3', pinyin: 'zǎo', prompt: '“早上”的“早”读什么？', options: ['zǎo', 'wǎn', 'shàng'], answer: 'zǎo' },
  { id: 'c-lit2-30', subject: 'chinese', unit: '识字（二）', topic: '认字', type: 'choice', char: '校', audio: '/audio/c-lit2-30.mp3', pinyin: 'xiào', prompt: '“学校”的“校”读什么？', options: ['xiào', 'xué', 'mén'], answer: 'xiào' },

  // —— 课文：补充常用字（含真人发音） ——
  { id: 'c-text-13', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '气', audio: '/audio/c-text-13.mp3', pinyin: 'qì', prompt: '这个字读什么？', options: ['qì', 'qí', 'xī'], answer: 'qì' },
  { id: 'c-text-14', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '树', audio: '/audio/c-text-14.mp3', pinyin: 'shù', prompt: '这个字读什么？', options: ['shù', 'mù', 'huā'], answer: 'shù' },
  { id: 'c-text-15', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '叶', audio: '/audio/c-text-15.mp3', pinyin: 'yè', prompt: '这个字读什么？', options: ['yè', 'huā', 'cǎo'], answer: 'yè' },
  { id: 'c-text-16', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '飞', audio: '/audio/c-text-16.mp3', pinyin: 'fēi', prompt: '这个字读什么？', options: ['fēi', 'zǒu', 'pǎo'], answer: 'fēi' },
  { id: 'c-text-17', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '两', audio: '/audio/c-text-17.mp3', pinyin: 'liǎng', prompt: '这个字读什么？', options: ['liǎng', 'èr', 'yī'], answer: 'liǎng' },
  { id: 'c-text-18', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '头', audio: '/audio/c-text-18.mp3', pinyin: 'tóu', prompt: '这个字读什么？', options: ['tóu', 'jiǎo', 'shǒu'], answer: 'tóu' },
  { id: 'c-text-19', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '里', audio: '/audio/c-text-19.mp3', pinyin: 'lǐ', prompt: '这个字读什么？', options: ['lǐ', 'wài', 'zhōng'], answer: 'lǐ' },
  { id: 'c-text-20', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '见', audio: '/audio/c-text-20.mp3', pinyin: 'jiàn', prompt: '这个字读什么？', options: ['jiàn', 'tīng', 'kàn'], answer: 'jiàn' },
  { id: 'c-text-21', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '采', audio: '/audio/c-text-21.mp3', pinyin: 'cǎi', prompt: '“采莲”的“采”读什么？', options: ['cǎi', 'cài', 'lián'], answer: 'cǎi' },
  { id: 'c-text-22', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '莲', audio: '/audio/c-text-22.mp3', pinyin: 'lián', prompt: '这个字读什么？', options: ['lián', 'cǎi', 'yú'], answer: 'lián' },
  { id: 'c-text-23', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '西', audio: '/audio/c-text-23.mp3', pinyin: 'xī', prompt: '这个字读什么？', options: ['xī', 'dōng', 'nán'], answer: 'xī' },
  { id: 'c-text-24', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '北', audio: '/audio/c-text-24.mp3', pinyin: 'běi', prompt: '这个字读什么？', options: ['běi', 'nán', 'dōng'], answer: 'běi' },
  { id: 'c-text-25', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '青', audio: '/audio/c-text-25.mp3', pinyin: 'qīng', prompt: '这个字读什么？', options: ['qīng', 'qíng', 'lǜ'], answer: 'qīng' },
  { id: 'c-text-26', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '蛙', audio: '/audio/c-text-26.mp3', pinyin: 'wā', prompt: '这个字读什么？', options: ['wā', 'yú', 'niǎo'], answer: 'wā' },
  { id: 'c-text-27', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '地', audio: '/audio/c-text-27.mp3', pinyin: 'dì', prompt: '“土地”的“地”读什么？', options: ['dì', 'tián', 'tǔ'], answer: 'dì' },
  { id: 'c-text-28', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '尖', audio: '/audio/c-text-28.mp3', pinyin: 'jiān', prompt: '这个字读什么？', options: ['jiān', 'dà', 'xiǎo'], answer: 'jiān' },
  { id: 'c-text-29', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '弯', audio: '/audio/c-text-29.mp3', pinyin: 'wān', prompt: '这个字读什么？', options: ['wān', 'zhí', 'yuán'], answer: 'wān' },
  { id: 'c-text-30', subject: 'chinese', unit: '课文', topic: '词语', type: 'choice', char: '皮', audio: '/audio/c-text-30.mp3', pinyin: 'pí', prompt: '这个字读什么？', options: ['pí', 'ròu', 'máo'], answer: 'pí' },
];

export const allActs: Activity[] = [...mathActs, ...chineseActs];

export interface UnitGroup {
  unit: string;
  acts: Activity[];
}

/** 按出现顺序返回某学科下的单元分组（整册导航用） */
export function unitsBySubject(s: Subject): UnitGroup[] {
  const groups: UnitGroup[] = [];
  for (const a of allActs) {
    if (a.subject !== s) continue;
    const found = groups.find((g) => g.unit === a.unit);
    if (found) found.acts.push(a);
    else groups.push({ unit: a.unit, acts: [a] });
  }
  return groups;
}

export function actsByUnit(s: Subject, unit: string): Activity[] {
  return allActs.filter((a) => a.subject === s && a.unit === unit);
}
