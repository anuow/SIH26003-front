import { useEffect, useState } from 'react';
import { getReminders } from '../store.js';

const TYPE_ICONS = {
  medicine: '💊',
  hydration: '💧',
  activity: '🚶',
  appointment: '📅',
};

const TYPE_COLORS = {
  medicine: '#E8F5E9',
  hydration: '#E3F2FD',
  activity: '#FFF8E1',
  appointment: '#FCE4EC',
};

export default function PatientReminders({ patientName }) {
  const [reminders, setReminders] = useState([]);

  async function load() {
    const data = await getReminders(patientName);
    setReminders(data);
  }

  useEffect(() => {
    load();
    // Poll every 10 seconds for new reminders from caregiver
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, [patientName]);

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 16px 48px' }}>
      <div style={{
        background: 'var(--accent)',
        borderRadius: 20, padding: '24px',
        marginBottom: 24, color: 'white',
      }}>
        <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'var(--font-display)' }}>🔔 Reminders</div>
        <div style={{ fontSize: 14, opacity: 0.85, marginTop: 6 }}>
          Messages and reminders set by your caregiver.
        </div>
      </div>

      {reminders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
          <p style={{ fontSize: 16 }}>No reminders yet from your caregiver.</p>
          <p style={{ fontSize: 13, marginTop: 8 }}>Check back later!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {reminders.map(r => (
            <div key={r.id} style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '18px 20px',
              background: TYPE_COLORS[r.type] || '#f9f9f9',
              borderRadius: 16,
              border: '1.5px solid var(--border)',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, flexShrink: 0,
                boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
              }}>
                {TYPE_ICONS[r.type] || '🔔'}
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-dark)', textTransform: 'capitalize' }}>
                  {r.type}
                </div>
                <div style={{ fontSize: 15, color: 'var(--text-muted)', marginTop: 2 }}>
                  {r.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}