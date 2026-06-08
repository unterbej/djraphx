'use client';

import { useEffect, useState } from 'react';
import { IcoPlus, IcoEdit, IcoTrash, IcoSave, IcoClose } from './icons';

interface CalEvent { id: number; date: string; title: string; }

export default function AdminCalendar() {
  const [events, setEvents] = useState<CalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [newDate, setNewDate] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editDate, setEditDate] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/calendar');
    const data = await res.json();
    setEvents(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const addEvent = async () => {
    if (!newDate || !newTitle.trim()) { setError('Datum und Titel erforderlich'); return; }
    setAdding(true); setError('');
    const res = await fetch('/api/admin/calendar', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: newDate, title: newTitle }),
    });
    if (res.ok) { setNewDate(''); setNewTitle(''); load(); }
    else { const d = await res.json(); setError(d.error || 'Fehler'); }
    setAdding(false);
  };

  const startEdit = (ev: CalEvent) => { setEditId(ev.id); setEditDate(ev.date); setEditTitle(ev.title); };

  const saveEdit = async () => {
    if (!editDate || !editTitle.trim()) return;
    setSaving(true);
    await fetch('/api/admin/calendar', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editId, date: editDate, title: editTitle }),
    });
    setEditId(null); setSaving(false); load();
  };

  const deleteEvent = async (id: number) => {
    if (!confirm('Event wirklich löschen?')) return;
    await fetch('/api/admin/calendar', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    load();
  };

  const card = { background: 'linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,.005))', border: '1px solid var(--border)', borderRadius: '14px' };
  const iconBtn = (color = 'var(--dim)', borderColor = 'var(--border)'): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: '6px',
    padding: '7px 14px', borderRadius: '8px', border: `1px solid ${borderColor}`,
    color, fontSize: '12px', cursor: 'pointer', background: 'transparent',
    fontFamily: 'inherit', letterSpacing: '.06em', transition: 'all .15s',
  });

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-d)', fontSize: '36px', letterSpacing: '.04em', textTransform: 'uppercase', marginBottom: '24px' }}>
        Kalender
      </h1>

      {/* Add new event */}
      <div style={{ ...card, padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '18px', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: '16px', color: 'var(--cyan)' }}>
          Neues Event
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr auto', gap: '12px', alignItems: 'end' }}>
          <div className="field">
            <label>Datum</label>
            <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} style={{ color: 'var(--text)' }} />
          </div>
          <div className="field">
            <label>Titel</label>
            <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="z.B. Privat ausgebucht" style={{ color: 'var(--text)' }} />
          </div>
          <button onClick={addEvent} disabled={adding} className="btn btn-primary btn-sm" style={{ fontFamily: 'inherit', height: '46px', display: 'flex', alignItems: 'center', gap: '7px' }}>
            <IcoPlus size={14} /> {adding ? 'Hinzufügen …' : 'Hinzufügen'}
          </button>
        </div>
        {error && <p style={{ color: '#ff7a93', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
      </div>

      {/* Event list */}
      <div style={{ ...card, overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '18px', letterSpacing: '.06em', textTransform: 'uppercase' }}>
            Events ({events.length})
          </h3>
        </div>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--dim)' }}>Laden …</div>
        ) : events.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--dim)' }}>Keine Events.</div>
        ) : (
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {events.map(ev => (
              <div key={ev.id} style={{ padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,.04)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                {editId === ev.id ? (
                  <>
                    <input type="date" value={editDate} onChange={e => setEditDate(e.target.value)} style={{ background: 'rgba(255,255,255,.05)', border: '1px solid var(--border2)', color: 'var(--text)', padding: '8px 12px', borderRadius: '8px', fontFamily: 'inherit', fontSize: '13px', width: '160px' }} />
                    <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} style={{ background: 'rgba(255,255,255,.05)', border: '1px solid var(--border2)', color: 'var(--text)', padding: '8px 12px', borderRadius: '8px', fontFamily: 'inherit', fontSize: '13px', flex: 1 }} />
                    <button onClick={saveEdit} disabled={saving} style={{ ...iconBtn('var(--cyan)', 'var(--border2)'), background: 'rgba(14,165,255,.08)' }}>
                      <IcoSave /> {saving ? 'Speichern …' : 'Speichern'}
                    </button>
                    <button onClick={() => setEditId(null)} style={iconBtn()}>
                      <IcoClose size={13} /> Abbrechen
                    </button>
                  </>
                ) : (
                  <>
                    <span style={{ fontFamily: 'var(--font-d)', fontSize: '17px', color: 'var(--cyan)', letterSpacing: '.05em', minWidth: '120px' }}>
                      {new Date(ev.date + 'T12:00:00').toLocaleDateString('de-AT', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </span>
                    <span style={{ flex: 1, fontSize: '14px', color: 'var(--text)' }}>{ev.title}</span>
                    <button
                      onClick={() => startEdit(ev)}
                      style={iconBtn()}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--dim)'; }}
                    >
                      <IcoEdit /> Bearbeiten
                    </button>
                    <button onClick={() => deleteEvent(ev.id)} style={iconBtn('#ff7a93', 'rgba(255,85,119,.2)')}>
                      <IcoTrash /> Löschen
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
