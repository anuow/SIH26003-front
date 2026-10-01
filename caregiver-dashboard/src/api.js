// Points at the same FastAPI backend the mobile app syncs to.
// TODO: replace with your deployed backend URL.
const BASE_URL = 'http://localhost:8000';

/**
 * Fetches game sessions for a patient. Falls back to null on any
 * failure (offline demo, backend not deployed yet, etc.) so the UI
 * can fall back to seeded demo data instead of crashing.
 */
export async function fetchGameSessions(patientId) {
  try {
    const res = await fetch(`${BASE_URL}/api/patients/${patientId}/game-sessions`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchReminders(patientId) {
  try {
    const res = await fetch(`${BASE_URL}/api/patients/${patientId}/reminders`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
