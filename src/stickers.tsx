import { CarSticker, CAR_STICKERS, type CarKind } from './components/CarSticker';

export type { CarKind };
export { CAR_STICKERS };

/** 每辆小汽车贴纸的价格（星星数） */
export const CAR_PRICE = 5;

export interface CarInfo {
  id: CarKind;
  name: string;
}

/** 10 款小汽车贴纸清单 */
export const CARS: CarInfo[] = [
  { id: 'car1', name: '红色小轿车' },
  { id: 'car2', name: '蓝色面包车' },
  { id: 'car3', name: '黄色校车' },
  { id: 'car4', name: '绿色赛车' },
  { id: 'car5', name: '橙色 SUV' },
  { id: 'car6', name: '青色敞篷车' },
  { id: 'car7', name: '薄荷迷你车' },
  { id: 'car8', name: '警车' },
  { id: 'car9', name: '白色救护车' },
  { id: 'car10', name: '深灰老爷车' },
];

/** 已收集的汽车贴纸总数 */
export function stickerTotal(stickers?: Record<string, number>): number {
  return Object.values(stickers || {}).reduce((a, b) => a + (b || 0), 0);
}

/** 是否已拥有某辆车 */
export function carOwned(stickers: Record<string, number> | undefined, id: CarKind): boolean {
  return (stickers?.[id] || 0) > 0;
}

/** 已拥有的汽车 id 列表 */
export function ownedCars(stickers: Record<string, number> | undefined): CarKind[] {
  return CAR_STICKERS.filter((id) => carOwned(stickers, id));
}

/** 当前星星够不够买车 */
export function canBuyCar(stars: number): boolean {
  return stars >= CAR_PRICE;
}

/**
 * 购买一辆小汽车贴纸。
 * 返回更新后的 stickers 和 stars；余额不足时返回 null。
 */
export function buyCar(
  stickers: Record<string, number>,
  stars: number,
  id: CarKind,
): { stickers: Record<string, number>; stars: number } | null {
  if (stars < CAR_PRICE) return null;
  return {
    stickers: { ...stickers, [id]: (stickers[id] || 0) + 1 },
    stars: stars - CAR_PRICE,
  };
}

/** 统一贴纸图形：小汽车驾驶座坐上头像 */
export function StickerGlyph({
  kind,
  size = 48,
  avatarUrl,
  driving,
}: {
  kind: CarKind;
  size?: number;
  avatarUrl?: string;
  driving?: boolean;
}) {
  return <CarSticker kind={kind} size={size} avatarUrl={avatarUrl} driving={driving} />;
}
