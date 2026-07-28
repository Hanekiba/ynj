export function ProgressChart({ history }: { history: number[] }) {
  if (!history.length) {
    return <p className="muted">还没有记录，做完练习就会出现进步曲线～</p>;
  }
  const recent = history.slice(-10);
  const max = Math.max(...recent, 1);
  return (
    <div className="chart" aria-label="进步曲线">
      {recent.map((h, i) => (
        <div
          key={i}
          className="bar"
          style={{ height: `${Math.max(8, Math.round((h / max) * 100))}%` }}
          title={`+${h}`}
        />
      ))}
    </div>
  );
}
