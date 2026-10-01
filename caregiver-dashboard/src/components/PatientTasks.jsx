import { useState } from 'react';

const PRESET_TASKS = [
  { id: 'pre1', text: 'Take morning medicine', done: false },
  { id: 'pre2', text: 'Drink a glass of water', done: false },
  { id: 'pre3', text: 'Go for a short walk', done: false },
];

export default function PatientTasks() {
  const [tasks, setTasks] = useState(PRESET_TASKS);
  const [newTask, setNewTask] = useState('');

  function toggleTask(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  function addTask() {
    if (!newTask.trim()) return;
    setTasks(prev => [...prev, { id: Date.now().toString(), text: newTask.trim(), done: false }]);
    setNewTask('');
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  const remaining = tasks.filter(t => !t.done).length;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 16px 48px' }}>
      <div style={{
        background: '#5B8DD9',
        borderRadius: 20, padding: '24px',
        marginBottom: 24, color: 'white',
      }}>
        <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'var(--font-display)' }}>✅ My Tasks</div>
        <div style={{ fontSize: 14, opacity: 0.85, marginTop: 6 }}>
          {remaining === 0 ? 'All done for today! 🎉' : `${remaining} task${remaining > 1 ? 's' : ''} left`}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {tasks.map(task => (
          <div key={task.id} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '16px 18px',
            background: task.done ? '#f0f7f2' : 'var(--surface)',
            border: `1.5px solid ${task.done ? 'var(--primary)' : 'var(--border)'}`,
            borderRadius: 14,
          }}>
            <button
              onClick={() => toggleTask(task.id)}
              style={{
                width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                border: `2px solid ${task.done ? 'var(--primary)' : 'var(--border)'}`,
                background: task.done ? 'var(--primary)' : 'white',
                cursor: 'pointer', fontSize: 14, color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {task.done ? '✓' : ''}
            </button>
            <span style={{
              fontSize: 16, flex: 1,
              color: task.done ? 'var(--text-muted)' : 'var(--text-dark)',
              textDecoration: task.done ? 'line-through' : 'none',
            }}>
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              style={{
                background: 'none', border: 'none',
                fontSize: 16, cursor: 'pointer', color: 'var(--text-muted)',
                opacity: 0.5, padding: 4,
              }}
            >✕</button>
          </div>
        ))}
      </div>

      {/* Add task */}
      <div style={{ display: 'flex', gap: 10 }}>
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          placeholder="Add a new task..."
          style={{
            flex: 1, padding: '14px 16px', fontSize: 15,
            borderRadius: 12, border: '1.5px solid var(--border)',
            fontFamily: 'var(--font-body)', background: 'var(--surface)',
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: '14px 20px', borderRadius: 12, border: 'none',
            background: '#5B8DD9', color: 'white',
            fontSize: 20, cursor: 'pointer',
          }}
        >+</button>
      </div>
    </div>
  );
}