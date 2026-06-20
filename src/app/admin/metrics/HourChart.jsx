export const HourChart = ({ hourly = [] }) => {
  const total = hourly.reduce((a, b) => a + b, 0);
  if (total === 0) {
    return <p className="text-xs text-text-muted">Još nema dovoljno poseta.</p>;
  }

  const max = Math.max(1, ...hourly);

  return (
    <div>
      <div className="flex items-end gap-[2px] h-28">
        {hourly.map((count, h) => (
          <div
            key={h}
            className="group relative flex-1 flex flex-col justify-end h-full"
            title={`${String(h).padStart(2, '0')}:00 — ${count} poseta`}
          >
            <div
              className="w-full bg-accent/70 rounded-t-[2px] transition-colors group-hover:bg-accent"
              style={{ height: `${(count / max) * 100}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-text-muted">
        {[0, 6, 12, 18, 23].map((h) => (
          <span key={h}>{String(h).padStart(2, '0')}h</span>
        ))}
      </div>
    </div>
  );
};
