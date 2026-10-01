import { useState } from 'react';

export default function PatientNotes() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');

  function saveNote() {
    if (!text.trim()) return;
    setNotes(prev => [{
      id: Date.now().toString(),
      text: text.trim(),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    }, ...prev]);
    setText('');
  }

  function deleteNote(id) {
    setNotes(prev => prev.filter(n => n.id !== id));
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 16px 48px' }}>
      <div style={{
        background: '#8B6FCE',
        borderRadius: 20, padding: '24px',
        marginBottom: 24, color: 'white',
      }}>
        <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'var(--font-display)' }}>📝 My Notes</div>
        <div style={{ fontSize: 14, opacity: 0.8, marginTop: 6 }}>Write down anything you want to remember.</div>
      </div>

      {/* Input */}
      <div style={{ marginBottom: 20 }}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write something here..."
          rows={3}
          style={{
            width: '100%', padding: '14px 16px', fontSize: 15,
            borderRadius: 14, border: '1.5px solid var(--border)',
            fontFamily: 'var(--font-body)', resize: 'none',
            boxSizing: 'border-box', background: 'var(--surface)',
          }}
        />
        <button
          onClick={saveNote}
          style={{
            marginTop: 10, padding: '12px 28px',
            background: '#8B6FCE', color: 'white',
            border: 'none', borderRadius: 12,
            fontSize: 15, fontWeight: 600, cursor: 'pointer',
          }}
        >
          Save Note
        </button>
      </div>

      {notes.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: 40 }}>
          No notes yet. Write something above!
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {notes.map(note => (
            <div key={note.id} style={{
              padding: '16px 18px',
              background: '#f5f0ff',
              border: '1.5px solid #d4bfff',
              borderRadius: 14,
              position: 'relative',
            }}>
              <div style={{ fontSize: 15, color: 'var(--text-dark)', lineHeight: 1.5 }}>{note.text}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>Saved at {note.time}</div>
              <button
                onClick={() => deleteNote(note.id)}
                style={{
                  position: 'absolute', top: 12, right: 12,
                  background: 'none', border: 'none',
                  fontSize: 14, cursor: 'pointer',
                  color: 'var(--text-muted)', opacity: 0.5,
                }}
              >✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}