export default function StatGrid({ sessions }) {
  if (!sessions || sessions.length === 0) {
    return null;
  }

  const latest = sessions[sessions.length - 1];
  const prevAccAvg =
    sessions.slice(0, -3).reduce((sum, s) => sum + s.accuracy, 0) /
    Math.max(1, sessions.slice(0, -3).length);
  const recentAccAvg =
    sessions.slice(-3).reduce((sum, s) => sum + s.accuracy, 0) / Math.min(3, sessions.length);
  const trendUp = recentAccAvg >= prevAccAvg;
  const streak = sessions.length; // simplified: sessions played this window

  const stats = [
    {
      label: 'Recent accuracy',
      value: `${Math.round(recentAccAvg * 100)}%`,
      trend: `${trendUp ? '▲' : '▼'} vs earlier this week`,
      trendClass: trendUp ? 'up' : 'down',
    },
    {
      label: 'Current difficulty',
      value: `Level ${latest.difficulty_level}`,
      trend: 'Auto-adjusted by AI',
      trendClass: 'up',
    },
    {
      label: 'Sessions this week',
      value: streak,
      trend: 'Consistent daily play',
      trendClass: 'up',
    },
    {
      label: 'Avg response time',
      value: `${(latest.avg_response_time_ms / 1000).toFixed(1)}s`,
      trend: latest.avg_response_time_ms < 4500 ? '▲ Faster than usual' : '▼ Slower than usual',
      trendClass: latest.avg_response_time_ms < 4500 ? 'up' : 'down',
    },
  ];

  return (
    <div className="stat-grid">
      {stats.map((s) => (
        <div className="stat-card" key={s.label}>
          <div className="stat-label">{s.label}</div>
          <div className="stat-value">{s.value}</div>
          <div className={`stat-trend ${s.trendClass}`}>{s.trend}</div>
        </div>
      ))}
    </div>
  );
}
