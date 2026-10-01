import { useState, useEffect } from 'react';
import { setUser } from './store.js';
import CaregiverDashboard from './components/CaregiverDashboard.jsx';
import PatientHome from './components/PatientHome.jsx';
import GamesMenu from './components/GamesMenu.jsx';
import PatientTasks from './components/PatientTasks.jsx';
import PatientNotes from './components/PatientNotes.jsx';
import PatientReminders from './components/PatientReminders.jsx';

// ── Styles ─────────────────────────────────────────────────────────
const inputStyle = {
  display: 'block', width: '100%',
  padding: '14px 16px', marginBottom: 12,
  fontSize: 16, borderRadius: 12,
  border: '1px solid var(--border)',
  fontFamily: 'var(--font-body)',
  boxSizing: 'border-box',
  background: 'var(--background)',
  color: 'var(--text-dark)',
};

const overlayStyle = {
  minHeight: '100vh',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'var(--background)',
};

const cardStyle = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 24, padding: '48px 40px',
  maxWidth: 480, width: '90%',
  textAlign: 'center',
  boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
};

// ── Components ──────────────────────────────────────────────────────
function LogoMark() {
  return (
    <div style={{
      width: 56, height: 56, borderRadius: 14,
      background: 'var(--primary)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      margin: '0 auto 20px',
      color: 'white', fontWeight: 700, fontSize: 20,
      fontFamily: 'var(--font-display)',
    }}>NE</div>
  );
}

function RoleScreen({ onSelect }) {
  return (
    <div style={overlayStyle}>
      <div style={cardStyle}>
        <LogoMark />
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: 'var(--text-dark)', margin: '0 0 8px' }}>
          Welcome
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-muted)', margin: '0 0 36px', lineHeight: 1.5 }}>
          Who is using this app?
        </p>
        <button onClick={() => onSelect('caregiver')} style={{
          display: 'block', width: '100%', padding: '20px 24px', marginBottom: 16,
          background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 16,
          fontSize: 18, fontWeight: 600, cursor: 'pointer', textAlign: 'left',
        }}>
          👨‍⚕️ &nbsp; I am a Caregiver / Doctor
          <div style={{ fontSize: 12, fontWeight: 400, opacity: 0.85, marginTop: 4 }}>
            View patient progress, alerts, and dashboard
          </div>
        </button>
        <button onClick={() => onSelect('patient')} style={{
          display: 'block', width: '100%', padding: '20px 24px',
          background: 'var(--accent)', color: 'white', border: 'none', borderRadius: 16,
          fontSize: 18, fontWeight: 600, cursor: 'pointer', textAlign: 'left',
        }}>
          🧓 &nbsp; I am a Patient
          <div style={{ fontSize: 12, fontWeight: 400, opacity: 0.85, marginTop: 4 }}>
            Play games, set reminders, stay active
          </div>
        </button>
      </div>
    </div>
  );
}

function LoginScreen({ role, onLogin, onBack }) {
  const [name, setName] = useState('');
  const [patientName, setPatientName] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    const trimmedName = name.trim();
    if (!trimmedName) { setError('Please enter your name.'); return; }

    if (role === 'caregiver') {
      const trimmedPatient = patientName.trim();
      if (!trimmedPatient) { setError("Please enter your patient's name."); return; }
      const user = { name: trimmedName, role, patientName: trimmedPatient.toLowerCase() };
      setUser(user);
      onLogin(user);
    } else {
      const user = { name: trimmedName, role, patientName: trimmedName.toLowerCase() };
      setUser(user);
      onLogin(user);
    }
  }

  return (
    <div style={overlayStyle}>
      <div style={cardStyle}>
        <LogoMark />
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--text-dark)', margin: '0 0 6px' }}>
          {role === 'caregiver' ? '👨‍⚕️ Caregiver Login' : '🧓 Patient Login'}
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '0 0 24px' }}>
          {role === 'caregiver'
            ? "Enter your name and your patient's name to see their data"
            : 'Enter your name to continue'}
        </p>

        <input
          style={inputStyle}
          placeholder={role === 'caregiver' ? 'Your name (e.g. Dr. Priya)' : 'Your name (e.g. John)'}
          value={name}
          onChange={e => { setName(e.target.value); setError(''); }}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          autoFocus
        />

        {role === 'caregiver' && (
          <input
            style={inputStyle}
            placeholder="Patient's name (e.g. John)"
            value={patientName}
            onChange={e => { setPatientName(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
        )}

        {error && (
          <p style={{ color: 'var(--alert)', fontSize: 13, margin: '-4px 0 12px' }}>{error}</p>
        )}

        {role === 'caregiver' && patientName.trim() && (
          <p style={{ fontSize: 13, color: 'var(--primary)', margin: '0 0 16px', background: 'var(--primary-light, #e8f2ec)', padding: '8px 12px', borderRadius: 8 }}>
            You will see data for: <strong>{patientName.trim()}</strong>
          </p>
        )}

        <button onClick={handleLogin} style={{
          display: 'block', width: '100%', padding: '16px',
          background: role === 'caregiver' ? 'var(--primary)' : 'var(--accent)',
          color: 'white', border: 'none', borderRadius: 14,
          fontSize: 17, fontWeight: 600, cursor: 'pointer', marginBottom: 12,
        }}>
          Continue →
        </button>

        <button onClick={onBack} style={{
          background: 'none', border: 'none', fontSize: 13,
          color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline',
        }}>
          ← Go back
        </button>
      </div>
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────────
function getSavedUser() {
  try {
    const saved = sessionStorage.getItem('ner_user');
    return saved ? JSON.parse(saved) : null;
  } catch { return null; }
}

export default function App() {
  const savedUser = getSavedUser();

  const [step, setStep] = useState(savedUser ? 'app' : 'role');
  const [role, setRole] = useState(savedUser?.role || null);
  const [user, setUserState] = useState(savedUser);
  const [patientScreen, setPatientScreen] = useState('home');

  useEffect(() => {
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  function handleRoleSelect(r) { setRole(r); setStep('login'); }

  function handleLogin(u) {
    setUserState(u);
    sessionStorage.setItem('ner_user', JSON.stringify(u));
    setStep('app');
  }

  function handleSwitchUser() {
    sessionStorage.removeItem('ner_user');
    setRole(null); setUserState(null);
    setPatientScreen('home'); setStep('role');
  }

  if (step === 'role') return <RoleScreen onSelect={handleRoleSelect} />;
  if (step === 'login') return <LoginScreen role={role} onLogin={handleLogin} onBack={() => setStep('role')} />;

  return (
    <div className="app-shell">
      {/* Top bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 20,
        paddingBottom: 14, borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          Logged in as &nbsp;
          <strong style={{ color: 'var(--text-dark)' }}>{user?.name}</strong>
          &nbsp;·&nbsp;
          <span style={{ color: role === 'caregiver' ? 'var(--primary)' : 'var(--accent)', fontWeight: 600 }}>
            {role === 'caregiver' ? `Caregiver for ${user?.patientName}` : 'Patient'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {role === 'patient' && patientScreen !== 'home' && (
            <button
              onClick={() => setPatientScreen('home')}
              style={{ background: 'none', border: 'none', fontSize: 13, color: 'var(--primary)', cursor: 'pointer' }}
            >
              ← Home
            </button>
          )}
          <button onClick={handleSwitchUser} style={{
            background: 'none', border: 'none', fontSize: 13,
            color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline',
          }}>
            Switch user
          </button>
        </div>
      </div>

      {/* Caregiver view */}
      {role === 'caregiver' && <CaregiverDashboard patientName={user?.patientName} />}

      {/* Patient views */}
      {role === 'patient' && patientScreen === 'home' && (
        <PatientHome onNavigate={setPatientScreen} patientName={user?.patientName} />
      )}
      {role === 'patient' && patientScreen === 'games' && (
        <GamesMenu patientName={user?.patientName} onBack={() => setPatientScreen('home')} />
      )}
      {role === 'patient' && patientScreen === 'tasks' && <PatientTasks />}
      {role === 'patient' && patientScreen === 'notes' && <PatientNotes />}
      {role === 'patient' && patientScreen === 'reminders' && (
        <PatientReminders patientName={user?.patientName} />
      )}
    </div>
  );
}