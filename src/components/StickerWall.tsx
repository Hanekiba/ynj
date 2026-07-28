import { useState } from 'react';
import {
  CAR_PRICE,
  CARS,
  CAR_STICKERS,
  StickerGlyph,
  carOwned,
  ownedCars,
  stickerTotal,
  type CarKind,
} from '../stickers';

interface StickerWallProps {
  stickers?: Record<string, number>;
  stars: number;
  avatar?: string;
  onAvatarChange: (dataUrl: string | null) => void;
  onBuyCar: (id: CarKind) => void;
}

/** 把上传图片压到 256x256，避免塞爆 localStorage */
function readAndShrink(file: File, cb: (url: string) => void) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const size = 256;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        cb(reader.result as string);
        return;
      }
      const s = Math.min(img.width, img.height);
      const sx = (img.width - s) / 2;
      const sy = (img.height - s) / 2;
      ctx.drawImage(img, sx, sy, s, s, 0, 0, size, size);
      cb(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = () => cb(reader.result as string);
    img.src = reader.result as string;
  };
  reader.readAsDataURL(file);
}

const iconStarSmall = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
  </svg>
);

const iconCheck = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12l5 5 9-10" />
  </svg>
);

/** 顶栏小徽标：已收集的汽车贴纸数 */
export function StickerCount({ stickers }: { stickers?: Record<string, number> }) {
  const total = stickerTotal(stickers);
  return (
    <span className="sticker-badge" aria-label={`贴纸 ${total}`}>
      <StickerGlyph kind="car1" size={26} />
      <span>{total}</span>
    </span>
  );
}

export function StickerWall({
  stickers,
  stars,
  avatar,
  onAvatarChange,
  onBuyCar,
}: StickerWallProps) {
  const total = stickerTotal(stickers);
  const owned = ownedCars(stickers);
  const avatarUrl = avatar || undefined;
  const [zoom, setZoom] = useState<CarKind | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) readAndShrink(file, (url) => onAvatarChange(url));
    e.target.value = '';
  }

  const zoomCar = zoom ? CARS.find((c) => c.id === zoom) : undefined;

  return (
    <div className="sticker-wall">
      <div className="sticker-summary">
        <span>已收集 {total}/{CAR_STICKERS.length} 辆</span>
        <span className="star-balance">{iconStarSmall} {stars} 颗星星</span>
      </div>

      <div className="avatar-row">
        <span className="avatar-label">驾驶员头像：</span>
        {avatarUrl ? (
          <img className="avatar-preview" src={avatarUrl} alt="驾驶员头像" width={44} height={44} />
        ) : (
          <span className="avatar-none">还没上传</span>
        )}
        <label className="avatar-upload-btn">
          上传头像
          <input type="file" accept="image/*" hidden onChange={handleFile} />
        </label>
        {avatar && (
          <button className="avatar-remove" onClick={() => onAvatarChange(null)}>
            移除头像
          </button>
        )}
      </div>
      <div className="avatar-hint">上传头像后，每辆车的车窗里都会坐上这个头像 · 点已拥有的车可放大看它开起来</div>

      <div className="car-shop-grid">
        {CARS.map((car) => {
          const owned0 = carOwned(stickers, car.id);
          const affordable = stars >= CAR_PRICE;
          return (
            <div className={`car-card ${owned0 ? 'owned' : ''}`} key={car.id}>
              <button
                type="button"
                className="car-visual"
                onClick={() => owned0 && setZoom(car.id)}
                disabled={!owned0}
                title={owned0 ? '点击放大' : '先兑换才能放大查看'}
                aria-label={owned0 ? `放大查看${car.name}` : car.name}
              >
                <StickerGlyph kind={car.id} size={72} avatarUrl={avatarUrl} />
              </button>
              <div className="car-name">{car.name}</div>
              {owned0 ? (
                <div className="car-status">
                  {iconCheck}
                  <span>已拥有 · 点图放大</span>
                </div>
              ) : (
                <>
                  <div className="car-price">{iconStarSmall} {CAR_PRICE}</div>
                  <button
                    className="buy-btn"
                    disabled={!affordable}
                    onClick={() => onBuyCar(car.id)}
                    title={affordable ? '兑换这辆小汽车' : '星星还不够，继续答题吧'}
                  >
                    兑换
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>

      {owned.length === CAR_STICKERS.length && (
        <div className="sticker-summary all-owned">小汽车贴纸全部集齐啦！</div>
      )}

      {zoom && zoomCar && (
        <div className="car-zoom-overlay" onClick={() => setZoom(null)} role="dialog" aria-modal="true">
          <div className="car-zoom-card" onClick={(e) => e.stopPropagation()}>
            <div className="car-stage">
              <div className="speed-lines" aria-hidden="true">
                <span style={{ top: '18%', animationDelay: '0s' }} />
                <span style={{ top: '48%', animationDelay: '0.2s' }} />
                <span style={{ top: '76%', animationDelay: '0.4s' }} />
              </div>
              <StickerGlyph kind={zoomCar.id} size={460} avatarUrl={avatarUrl} driving />
            </div>
            <div className="car-zoom-name">{zoomCar.name}</div>
            <button className="buy-btn" onClick={() => setZoom(null)}>收起</button>
          </div>
        </div>
      )}
    </div>
  );
}
