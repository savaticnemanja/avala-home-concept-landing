// Lightweight dependency-free bar chart for the daily visits series.
// `series` is [{ day: 'YYYY-MM-DD', visits }] oldest-first.

const fmtDay = (d) => {
  const [, mm, dd] = d.split('-');
  return `${dd}.${mm}`;
};

export const TrendChart = ({ series = [] }) => {
  if (series.length === 0) {
    return <p className="text-xs text-text-muted">Još nema zabeleženih poseta.</p>;
  }

  const max = Math.max(1, ...series.map((d) => d.visits));
  // Label every ~6th day to avoid crowding.
  const step = Math.ceil(series.length / 6);

  return (
    <div>
      <div className="flex items-end gap-[3px] h-40">
        {series.map((d) => (
          <div
            key={d.day}
            className="group relative flex-1 flex flex-col justify-end h-full"
            title={`${fmtDay(d.day)} — ${d.visits} poseta`}
          >
            <div
              className="w-full bg-accent rounded-t-[2px] transition-colors group-hover:bg-accent/80"
              style={{ height: `${(d.visits / max) * 100}%` }}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-2 text-[10px] text-text-muted">
        {series.map((d, i) => (
          <span key={d.day} className="flex-1 text-center">
            {i % step === 0 ? fmtDay(d.day) : ''}
          </span>
        ))}
      </div>
    </div>
  );
};
