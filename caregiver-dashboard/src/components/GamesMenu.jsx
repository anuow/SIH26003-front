import PatientGame from './PatientGame.jsx';
import { useState } from 'react';

const GAMES = [
  { id: 'pattern_match', icon: '🔍', title: 'Find the Match', description: 'Spot the matching object from a group. Trains focus and recognition.' },
  { id: 'coming_soon_1', icon: '🧩', title: 'Memory Pairs', description: 'Flip cards and find matching pairs. Coming soon.', disabled: true },
  { id: 'coming_soon_2', icon: '🔢', title: 'Number Sequence', description: 'Remember and repeat a sequence of numbers. Coming soon.', disabled: true },
];

export default function GamesMenu({ patientName, onBack }) {
  const [activeGame, setActiveGame] = useState(null);

  if (activeGame === 'pattern_match') {
    return (
      <div>
        <button className="patient-back" onClick={() => setActiveGame(null)}>← Back to Games</button>
        <PatientGame patientName={patientName} onFinish={() => setActiveGame(null)} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 16px 48px' }}>
      <div style={{
        background: 'var(--primary)',
        borderRadius: 20, padding: '24px',
        marginBottom: 24, color: 'white',
      }}>
        <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'var(--font-display)' }}>🎮 Games</div>
        <div style={{ fontSize: 14, opacity: 0.8, marginTop: 6 }}>
          Playing games keeps your mind sharp. Pick one to start.
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {GAMES.map(game => (
          <button
            key={game.id}
            onClick={() => !game.disabled && setActiveGame(game.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 18,
              padding: '18px 20px',
              background: game.disabled ? '#f5f5f5' : 'var(--surface)',
              border: '1.5px solid var(--border)',
              borderRadius: 16, cursor: game.disabled ? 'not-allowed' : 'pointer',
              textAlign: 'left', opacity: game.disabled ? 0.6 : 1,
            }}
          >
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: game.disabled ? '#e0e0e0' : 'var(--primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, flexShrink: 0,
            }}>{game.icon}</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-dark)' }}>
                {game.title}
                {game.disabled && <span style={{ fontSize: 11, marginLeft: 8, color: 'var(--text-muted)', fontWeight: 400 }}>Coming soon</span>}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 3 }}>{game.description}</div>
            </div>
            {!game.disabled && <div style={{ marginLeft: 'auto', fontSize: 20, color: 'var(--text-muted)', opacity: 0.4 }}>›</div>}
          </button>
        ))}
      </div>
    </div>
  );
}