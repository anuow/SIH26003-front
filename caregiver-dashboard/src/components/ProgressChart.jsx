import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function ProgressChart({ sessions }) {
  const data = sessions.map((s) => ({
    date: new Date(s.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
    accuracy: Math.round(s.accuracy * 100),
    score: s.score,
  }));

  return (
    <div className="panel">
      <h3 className="panel-title">Cognitive performance over time</h3>
      <p className="panel-subtitle">Accuracy per session, most recent 7 sessions</p>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e6e0d2" />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#6b6459' }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#6b6459' }} />
          <Tooltip
            contentStyle={{ borderRadius: 10, border: '1px solid #e6e0d2', fontSize: 13 }}
          />
          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#2e6f40"
            strokeWidth={3}
            dot={{ r: 4, fill: '#2e6f40' }}
            name="Accuracy %"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
