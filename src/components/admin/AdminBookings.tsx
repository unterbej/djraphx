'use client';

import { useEffect, useState } from 'react';
import { IcoClose, IcoTrash, IcoSave } from './icons';

interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  event_date: string;
  event_type: string;
  message: string;
  status: string;
  created_at: string;
  notes: string;
}

const STATUS_COLORS: Record<string, string> = {
  new: '#0EA5FF',
  confirmed: '#22c55e',
  cancelled: '#ff5577',
  done: '#9aa0c4',
};

const STATUS_LABELS: Record<string, string> = {
  new: 'Neu',
  confirmed: 'Bestätigt',
  cancelled: 'Abgesagt',
  done: 'Erledigt',
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState('all');

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/bookings');
    const data = await res.json();
    setBookings(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openBooking = (b: Booking) => {
    setSelected(b);
    setEditNotes(b.notes || '');
    setEditStatus(b.status);
  };

  const saveBooking = async () => {
    if (!selected) return;
    setSaving(true);
    await fetch('/api/admin/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selected.id, status: editStatus, notes: editNotes }),
    });
    setSaving(false);
    setSelected(null);
    load();
  };

  const deleteBooking = async (id: number) => {
    if (!confirm('Buchung wirklich löschen?')) return;
    await fetch('/api/admin/bookings', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setSelected(null);
    load();
  };

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  const card = (style?: React.CSSProperties) => ({
    background: 'linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,.005))',
    border: '1px solid var(--border)',
    borderRadius: '14px',
    ...style,
  });

  return (
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px',flexWrap:'wrap',gap:'12px'}}>
        <h1 style={{fontFamily:'var(--font-d)',fontSize:'36px',letterSpacing:'.04em',textTransform:'uppercase'}}>
          Buchungen
        </h1>
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
          {['all', 'new', 'confirmed', 'cancelled', 'done'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding:'6px 14px',borderRadius:'8px',fontSize:'12px',cursor:'pointer',fontFamily:'inherit',
              border: filter === f ? '1px solid var(--border2)' : '1px solid var(--border)',
              background: filter === f ? 'rgba(14,165,255,.1)' : 'transparent',
              color: filter === f ? 'var(--cyan)' : 'var(--dim)',
            }}>
              {f === 'all' ? 'Alle' : STATUS_LABELS[f]}
              {f !== 'all' && <span style={{marginLeft:'6px',background:'rgba(255,255,255,.1)',borderRadius:'999px',padding:'1px 7px',fontSize:'10px'}}>
                {bookings.filter(b => b.status === f).length}
              </span>}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'12px',marginBottom:'28px'}}>
        {[
          { label: 'Gesamt', value: bookings.length, color: 'var(--blue)' },
          { label: 'Neu', value: bookings.filter(b => b.status === 'new').length, color: '#0EA5FF' },
          { label: 'Bestätigt', value: bookings.filter(b => b.status === 'confirmed').length, color: '#22c55e' },
          { label: 'Abgesagt', value: bookings.filter(b => b.status === 'cancelled').length, color: '#ff5577' },
        ].map(s => (
          <div key={s.label} style={{...card({padding:'16px 20px'})}}>
            <div style={{fontFamily:'var(--font-d)',fontSize:'36px',color:s.color,lineHeight:1}}>{s.value}</div>
            <div style={{fontSize:'11px',letterSpacing:'.2em',textTransform:'uppercase',color:'var(--muted)',marginTop:'4px'}}>{s.label}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div style={{textAlign:'center',padding:'60px',color:'var(--dim)'}}>Laden …</div>
      ) : filtered.length === 0 ? (
        <div style={{...card({padding:'60px',textAlign:'center'})}}>
          <p style={{color:'var(--dim)'}}>Keine Buchungen gefunden.</p>
        </div>
      ) : (
        <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
          {filtered.map(b => (
            <div key={b.id} onClick={() => openBooking(b)} style={{
              ...card({padding:'16px 20px'}),
              cursor:'pointer',
              transition:'all .2s',
              display:'flex',
              alignItems:'center',
              gap:'16px',
              flexWrap:'wrap',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(14,165,255,.3)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <div style={{flex:1,minWidth:'200px'}}>
                <div style={{fontWeight:600,fontSize:'15px',marginBottom:'3px'}}>{b.name}</div>
                <div style={{fontSize:'13px',color:'var(--dim)'}}>{b.email} {b.phone && `· ${b.phone}`}</div>
              </div>
              <div style={{minWidth:'120px'}}>
                <div style={{fontSize:'13px',color:'var(--text)',fontWeight:500}}>{new Date(b.event_date).toLocaleDateString('de-AT', {day:'2-digit',month:'2-digit',year:'numeric'})}</div>
                <div style={{fontSize:'11px',color:'var(--muted)',marginTop:'2px'}}>{b.event_type}</div>
              </div>
              <div style={{minWidth:'90px',textAlign:'right'}}>
                <span style={{
                  padding:'4px 12px',
                  borderRadius:'999px',
                  fontSize:'11px',
                  fontWeight:600,
                  letterSpacing:'.1em',
                  textTransform:'uppercase',
                  background:`${STATUS_COLORS[b.status]}22`,
                  color: STATUS_COLORS[b.status],
                  border:`1px solid ${STATUS_COLORS[b.status]}44`,
                }}>
                  {STATUS_LABELS[b.status]}
                </span>
              </div>
              <div style={{fontSize:'11px',color:'var(--muted)',minWidth:'80px',textAlign:'right'}}>
                {new Date(b.created_at).toLocaleDateString('de-AT')}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div style={{position:'fixed',inset:0,background:'rgba(5,6,13,.92)',zIndex:200,display:'flex',alignItems:'flex-start',justifyContent:'center',overflowY:'auto',padding:'40px 16px'}} onClick={e => { if (e.target === e.currentTarget) setSelected(null); }}>
          <div style={{background:'var(--bg1)',border:'1px solid var(--border)',borderRadius:'var(--rl)',maxWidth:'600px',width:'100%',padding:'36px',position:'relative',margin:'auto'}}>
            <button onClick={() => setSelected(null)} style={{position:'absolute',top:'16px',right:'16px',width:'36px',height:'36px',borderRadius:'50%',border:'1px solid rgba(255,255,255,.1)',background:'rgba(255,255,255,.04)',color:'var(--text)',display:'grid',placeItems:'center',cursor:'pointer',fontFamily:'inherit'}}><IcoClose /></button>
            <h2 style={{fontFamily:'var(--font-d)',fontSize:'28px',letterSpacing:'.04em',textTransform:'uppercase',marginBottom:'20px'}}>Buchung #{selected.id}</h2>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'20px'}}>
              {[
                ['Name', selected.name],
                ['E-Mail', selected.email],
                ['Telefon', selected.phone || '—'],
                ['Event-Datum', new Date(selected.event_date).toLocaleDateString('de-AT', {weekday:'long',day:'2-digit',month:'long',year:'numeric'})],
                ['Eventtyp', selected.event_type],
                ['Eingegangen', new Date(selected.created_at).toLocaleString('de-AT')],
              ].map(([l, v]) => (
                <div key={l} style={{background:'rgba(255,255,255,.02)',borderRadius:'10px',padding:'12px 16px',border:'1px solid rgba(255,255,255,.05)'}}>
                  <div style={{fontSize:'10px',letterSpacing:'.22em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'4px'}}>{l}</div>
                  <div style={{fontSize:'14px',fontWeight:500}}>{v}</div>
                </div>
              ))}
            </div>

            {selected.message && (
              <div style={{marginBottom:'20px'}}>
                <div style={{fontSize:'10px',letterSpacing:'.22em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'8px'}}>Nachricht</div>
                <div style={{background:'rgba(255,255,255,.02)',borderRadius:'10px',padding:'14px 16px',border:'1px solid rgba(255,255,255,.05)',fontSize:'14px',color:'var(--dim)',lineHeight:1.65}}>{selected.message}</div>
              </div>
            )}

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'20px'}}>
              <div className="field">
                <label>Status</label>
                <select value={editStatus} onChange={e => setEditStatus(e.target.value)} style={{color:'var(--text)'}}>
                  <option value="new">Neu</option>
                  <option value="confirmed">Bestätigt</option>
                  <option value="cancelled">Abgesagt</option>
                  <option value="done">Erledigt</option>
                </select>
              </div>
              <div />
            </div>
            <div className="field" style={{marginBottom:'20px'}}>
              <label>Interne Notizen</label>
              <textarea value={editNotes} onChange={e => setEditNotes(e.target.value)} placeholder="Notizen zur Buchung …" style={{color:'var(--text)',minHeight:'80px'}} />
            </div>

            <div style={{display:'flex',gap:'12px',justifyContent:'flex-end'}}>
              <button onClick={() => deleteBooking(selected.id)} style={{display:'flex',alignItems:'center',gap:'7px',padding:'10px 18px',borderRadius:'8px',border:'1px solid rgba(255,85,119,.3)',background:'rgba(255,85,119,.08)',color:'#ff7a93',fontSize:'12px',cursor:'pointer',fontFamily:'inherit',letterSpacing:'.08em',textTransform:'uppercase'}}>
                <IcoTrash /> Löschen
              </button>
              <button onClick={saveBooking} className="btn btn-primary btn-sm" disabled={saving} style={{display:'flex',alignItems:'center',gap:'7px',fontFamily:'inherit'}}>
                <IcoSave size={13} /> {saving ? 'Speichern …' : 'Speichern'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
