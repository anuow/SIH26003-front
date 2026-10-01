// Seeded so the dashboard is demoable even before the backend
// is deployed or reachable. Shape matches exactly what
// GameSession.toJson() sends from the Flutter app.
export const demoPatients = [
  { id: 'p1', name: 'Ambika Devi', age: 74, region: 'Guwahati, Assam' },
  { id: 'p2', name: 'Tenzin Norbu', age: 79, region: 'Itanagar, Arunachal Pradesh' },
];

export const demoSessions = {
  p1: [
    { id: 's1', game_type: 'pattern_match', score: 40, accuracy: 0.9, avg_response_time_ms: 3200, difficulty_level: 2, timestamp: '2026-08-22T09:10:00' },
    { id: 's2', game_type: 'pattern_match', score: 45, accuracy: 0.85, avg_response_time_ms: 3400, difficulty_level: 2, timestamp: '2026-08-23T09:05:00' },
    { id: 's3', game_type: 'pattern_match', score: 30, accuracy: 0.6, avg_response_time_ms: 5200, difficulty_level: 3, timestamp: '2026-08-24T09:15:00' },
    { id: 's4', game_type: 'pattern_match', score: 25, accuracy: 0.5, avg_response_time_ms: 6100, difficulty_level: 2, timestamp: '2026-08-25T09:00:00' },
    { id: 's5', game_type: 'pattern_match', score: 35, accuracy: 0.7, avg_response_time_ms: 4800, difficulty_level: 2, timestamp: '2026-08-26T09:20:00' },
    { id: 's6', game_type: 'pattern_match', score: 38, accuracy: 0.75, avg_response_time_ms: 4200, difficulty_level: 2, timestamp: '2026-08-27T09:05:00' },
    { id: 's7', game_type: 'pattern_match', score: 42, accuracy: 0.8, avg_response_time_ms: 3900, difficulty_level: 2, timestamp: '2026-08-28T09:10:00' },
  ],
  p2: [
    { id: 's1', game_type: 'pattern_match', score: 50, accuracy: 0.95, avg_response_time_ms: 2800, difficulty_level: 3, timestamp: '2026-08-22T08:30:00' },
    { id: 's2', game_type: 'pattern_match', score: 52, accuracy: 0.92, avg_response_time_ms: 2700, difficulty_level: 3, timestamp: '2026-08-23T08:35:00' },
    { id: 's3', game_type: 'pattern_match', score: 55, accuracy: 0.94, avg_response_time_ms: 2600, difficulty_level: 4, timestamp: '2026-08-24T08:40:00' },
    { id: 's4', game_type: 'pattern_match', score: 58, accuracy: 0.9, avg_response_time_ms: 2900, difficulty_level: 4, timestamp: '2026-08-25T08:30:00' },
    { id: 's5', game_type: 'pattern_match', score: 60, accuracy: 0.93, avg_response_time_ms: 2500, difficulty_level: 4, timestamp: '2026-08-26T08:25:00' },
  ],
};

export const demoReminders = {
  p1: [
    { id: 'r1', type: 'medicine', time: '8:00 AM', status: 'missed' },
    { id: 'r2', type: 'hydration', time: '11:00 AM', status: 'completed' },
    { id: 'r3', type: 'appointment', time: 'Fri, 2:00 PM', status: 'pending' },
  ],
  p2: [
    { id: 'r1', type: 'medicine', time: '9:00 AM', status: 'completed' },
    { id: 'r2', type: 'activity', time: '5:00 PM', status: 'completed' },
  ],
};
