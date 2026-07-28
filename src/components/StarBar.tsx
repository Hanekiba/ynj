export function StarBar({ stars }: { stars: number }) {
  return (
    <div className="starbar" aria-label={`星星 ${stars}`}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="var(--color-accent)" aria-hidden="true">
        <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
      </svg>
      <span>{stars}</span>
    </div>
  );
}
