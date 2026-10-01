function buildAlerts(sessions, reminders) {
  const alerts = [];

  const missed = (reminders || []).filter((r) => r.status === 'missed');
  missed.forEach((r) => {
    alerts.push({
      type: 'alert',
      text: `Missed ${r.type} reminder scheduled for ${r.time}`,
    });
  });

  if (sessions && sessions.length >= 4) {
    const early = sessions.slice(0, Math.floor(sessions.length / 2));
    const recent = sessions.slice(Math.floor(sessions.length / 2));
    const earlyAvg = early.reduce((s, x) => s + x.accuracy, 0) / early.length;
    const recentAvg = recent.reduce((s, x) => s + x.accuracy, 0) / recent.length;
    if (earlyAvg - recentAvg > 0.15) {
      alerts.push({
        type: 'alert',
        text: `Accuracy dropped ${Math.round((earlyAvg - recentAvg) * 100)}% over the last few sessions — may be worth a check-in`,
      });
    } else {
      alerts.push({
        type: 'info',
        text: 'Cognitive performance is stable or improving this week',
      });
    }
  }

  const completedToday = (reminders || []).filter((r) => r.status === 'completed').length;
  if (completedToday > 0) {
    alerts.push({
      type: 'info',
      text: `${completedToday} reminder${completedToday > 1 ? 's' : ''} completed on schedule`,
    });
  }

  return alerts;
}

export default function AlertsPanel({ sessions, reminders }) {
  const alerts = buildAlerts(sessions, reminders);

  return (
    <div className="panel">
      <h3 className="panel-title">Alerts & notes</h3>
      <p className="panel-subtitle">Auto-generated from activity and reminder data</p>
      {alerts.length === 0 ? (
        <div className="empty-state">No alerts right now.</div>
      ) : (
        <div className="alert-list">
          {alerts.map((a, i) => (
            <div className={`alert-item ${a.type}`} key={i}>
              <div className="alert-dot" />
              <div className="alert-text">{a.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
