import { useEffect, useState } from 'react';
import StatGrid from './StatGrid.jsx';
import ProgressChart from './ProgressChart.jsx';
import AlertsPanel from './AlertsPanel.jsx';
import ActivityLog from './ActivityLog.jsx';
import { getSessions, getReminders, subscribe } from '../store.js';

export default function CaregiverDashboard({ patientName }) {
  const [sessions, setSessions] = useState([]);
  const [reminders, setReminders] = useState([]);

  async function loadData() {
    const [s, r] = await Promise.all([
      getSessions(patientName),
      getReminders(patientName),
    ]);
    setSessions(s);
    setReminders(r);
  }

  useEffect(() => {
    loadData();
    // Re-fetch whenever patient writes something
    const unsub = subscribe(() => loadData());
    return unsub;
  }, [patientName]);

  return (
    <div>
      <div className="top-bar">
        <div className="brand">
          <div className="brand-mark">NE</div>
          <div>
            <div className="brand-title">Caregiver Dashboard</div>
            <div className="brand-subtitle">
              Viewing data for:{' '}
              <strong style={{ color: 'var(--primary)' }}>
                {patientName.charAt(0).toUpperCase() + patientName.slice(1)}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px 20px',
          color: 'var(--text-muted)', fontSize: 16,
        }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>📊</div>
          <p>No sessions yet for <strong>{patientName}</strong>.</p>
          <p style={{ fontSize: 14, marginTop: 8 }}>
            Ask the patient to log in as <strong>"{patientName}"</strong> and play a game —
            their data will appear here instantly.
          </p>
        </div>
      ) : (
        <>
          <StatGrid sessions={sessions} />
          <div className="two-col">
            <ProgressChart sessions={sessions} />
            <AlertsPanel sessions={sessions} reminders={reminders} />
          </div>
          <ActivityLog sessions={sessions} />
        </>
      )}
    </div>
  );
}