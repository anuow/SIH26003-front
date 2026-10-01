export default function PatientHome({ onNavigate, patientName }) {
  const displayName = patientName
    ? patientName.charAt(0).toUpperCase() + patientName.slice(1)
    : 'Friend';

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 16px 48px' }}>

      {/* Header */}
      <div style={{
        background: 'var(--primary)',
        borderRadius: 24,
        padding: '32px 28px',
        marginBottom: 28,
        color: 'white',
      }}>
        <div style={{ fontSize: 15, opacity: 0.85, marginBottom: 6 }}>Good day,</div>
        <div style={{ fontSize: 36, fontWeight: 700, fontFamily: 'var(--font-display)', lineHeight: 1.1 }}>
          {displayName} 👋
        </div>
        <div style={{ fontSize: 14, opacity: 0.75, marginTop: 10 }}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </div>

      {/* Nav tiles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        <NavTile
          icon="🎮"
          label="Games"
          description="Play memory and thinking games"
          color="var(--primary)"
          onClick={() => onNavigate('games')}
        />

        <NavTile
          icon="✅"
          label="My Tasks"
          description="Things to do today"
          color="#5B8DD9"
          onClick={() => onNavigate('tasks')}
        />

        <NavTile
          icon="📝"
          label="My Notes"
          description="Write down anything you want to remember"
          color="#8B6FCE"
          onClick={() => onNavigate('notes')}
        />

        <NavTile
          icon="🔔"
          label="Reminders"
          description="Messages from your caregiver"
          color="var(--accent)"
          onClick={() => onNavigate('reminders')}
        />

      </div>
    </div>
  );
}

function NavTile({ icon, label, description, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        width: '100%',
        padding: '20px 24px',
        background: 'var(--surface)',
        border: `2px solid ${color}20`,
        borderRadius: 20,
        cursor: 'pointer',
        textAlign: 'left',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{
        width: 56, height: 56, borderRadius: 16,
        background: `${color}18`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 28, flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 3 }}>
          {label}
        </div>
        <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          {description}
        </div>
      </div>
      <div style={{ marginLeft: 'auto', fontSize: 20, color: 'var(--text-muted)', opacity: 0.4 }}>›</div>
    </button>
  );
}