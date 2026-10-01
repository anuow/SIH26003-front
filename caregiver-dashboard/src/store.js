const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
let currentUser = null;
const listeners = [];

export function setUser(user) { currentUser = user; }
export function getUser() { return currentUser; }

export async function addSession(session, patientName) {
  await fetch(`${BASE_URL}/api/game-sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...session, patient_id: patientName.toLowerCase().trim() }),
  });
  notify();
}

export async function getSessions(patientName) {
  try {
    const res = await fetch(`${BASE_URL}/api/patients/${patientName.toLowerCase().trim()}/game-sessions`);
    if (!res.ok) return [];
    return await res.json();
  } catch { return []; }
}

export async function addReminder(reminder, patientName) {
  await fetch(`${BASE_URL}/api/reminders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...reminder, patient_id: patientName.toLowerCase().trim() }),
  });
  notify();
}

export async function getReminders(patientName) {
  try {
    const res = await fetch(`${BASE_URL}/api/patients/${patientName.toLowerCase().trim()}/reminders`);
    if (!res.ok) return [];
    return await res.json();
  } catch { return []; }
}

export function subscribe(fn) {
  listeners.push(fn);
  return () => {
    const i = listeners.indexOf(fn);
    if (i > -1) listeners.splice(i, 1);
  };
}

function notify() {
  listeners.forEach(fn => fn());
}