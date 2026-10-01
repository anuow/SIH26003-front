export default function ActivityLog({ sessions }) {
  return (
    <div className="panel">
      <h3 className="panel-title">Session log</h3>
      <p className="panel-subtitle">Every game session, most recent first</p>
      {sessions.length === 0 ? (
        <div className="empty-state">No sessions recorded yet.</div>
      ) : (
        <table className="log-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Game</th>
              <th>Score</th>
              <th>Accuracy</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {[...sessions].reverse().map((s) => (
              <tr key={s.id}>
                <td>{new Date(s.timestamp).toLocaleString('en-IN', {
                  day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
                })}</td>
                <td><span className="pill">{s.game_type.replace('_', ' ')}</span></td>
                <td>{s.score}</td>
                <td>{Math.round(s.accuracy * 100)}%</td>
                <td>Level {s.difficulty_level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
