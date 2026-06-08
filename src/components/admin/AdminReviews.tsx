'use client';

import { useEffect, useState } from 'react';
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext, useSortable, verticalListSortingStrategy, arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';
import { IcoPlus, IcoEdit, IcoTrash, IcoSave, IcoClose, IcoImage } from './icons';

interface Review {
  id: number;
  text: string;
  author: string;
  role: string;
  image_url: string;
  sort_order: number;
}

const EMPTY: Omit<Review, 'id' | 'sort_order'> = { text: '', author: '', role: '', image_url: '' };

function SortableReview({ review, onEdit, onDelete }: { review: Review; onEdit: (r: Review) => void; onDelete: (id: number) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: review.id });
  return (
    <div ref={setNodeRef} style={{
      transform: CSS.Transform.toString(transform), transition,
      opacity: isDragging ? 0.5 : 1,
      background: 'linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,.005))',
      border: '1px solid var(--border)', borderRadius: '14px',
      padding: '18px 20px', display: 'flex', gap: '16px', alignItems: 'flex-start',
    }}>
      {/* drag handle */}
      <div {...attributes} {...listeners} style={{ cursor:'grab', color:'var(--muted)', paddingTop:'4px', flexShrink:0, touchAction:'none' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <rect x="4" y="3" width="2" height="2" rx="1"/><rect x="10" y="3" width="2" height="2" rx="1"/>
          <rect x="4" y="7" width="2" height="2" rx="1"/><rect x="10" y="7" width="2" height="2" rx="1"/>
          <rect x="4" y="11" width="2" height="2" rx="1"/><rect x="10" y="11" width="2" height="2" rx="1"/>
        </svg>
      </div>

      {/* avatar */}
      <div style={{ flexShrink: 0 }}>
        {review.image_url ? (
          <div style={{ width:52,height:52,borderRadius:'50%',overflow:'hidden',border:'2px solid var(--border2)' }}>
            <Image src={review.image_url} alt={review.author} width={52} height={52} style={{ objectFit:'cover' }} />
          </div>
        ) : (
          <div style={{ width:52,height:52,borderRadius:'50%',background:'var(--grad)',display:'grid',placeItems:'center',fontFamily:'var(--font-d)',fontSize:'24px',color:'#fff' }}>
            {review.author.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight:600, fontSize:'15px', marginBottom:'2px' }}>{review.author}</div>
        {review.role && <div style={{ fontSize:'12px', color:'var(--muted)', marginBottom:'8px' }}>{review.role}</div>}
        <p style={{ fontSize:'13px', color:'var(--dim)', lineHeight:1.6, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
          {review.text}
        </p>
      </div>

      <div style={{ display:'flex', gap:'8px', flexShrink:0 }}>
        <button onClick={() => onEdit(review)} style={{ display:'flex',alignItems:'center',gap:'6px',padding:'6px 14px',borderRadius:'8px',border:'1px solid var(--border)',color:'var(--dim)',fontSize:'12px',cursor:'pointer',background:'transparent',fontFamily:'inherit' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.color='var(--text)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--dim)'; }}>
          <IcoEdit /> Bearbeiten
        </button>
        <button onClick={() => onDelete(review.id)} style={{ display:'flex',alignItems:'center',gap:'6px',padding:'6px 14px',borderRadius:'8px',border:'1px solid rgba(255,85,119,.2)',color:'#ff7a93',fontSize:'12px',cursor:'pointer',background:'transparent',fontFamily:'inherit' }}>
          <IcoTrash /> Löschen
        </button>
      </div>
    </div>
  );
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<(Review | typeof EMPTY) | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/reviews');
    setReviews(await res.json());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing({ ...EMPTY }); setEditId(null); setErr(''); };
  const openEdit = (r: Review) => { setEditing({ text: r.text, author: r.author, role: r.role, image_url: r.image_url }); setEditId(r.id); setErr(''); };
  const closeEdit = () => { setEditing(null); setEditId(null); };

  const saveEdit = async () => {
    if (!editing) return;
    if (!editing.text.trim() || !editing.author.trim()) { setErr('Text und Name sind Pflichtfelder.'); return; }
    setSaving(true);
    setErr('');
    if (editId === null) {
      await fetch('/api/admin/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
    } else {
      const orig = reviews.find(r => r.id === editId);
      await fetch('/api/admin/reviews', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...editing, id: editId, sort_order: orig?.sort_order ?? 0 }) });
    }
    setSaving(false);
    closeEdit();
    load();
  };

  const deleteReview = async (id: number) => {
    if (!confirm('Bewertung wirklich löschen?')) return;
    await fetch('/api/admin/reviews', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    load();
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = reviews.findIndex(r => r.id === active.id);
    const newIdx = reviews.findIndex(r => r.id === over.id);
    const reordered = arrayMove(reviews, oldIdx, newIdx);
    setReviews(reordered);
    // Save new order
    await Promise.all(reordered.map((r, i) =>
      fetch('/api/admin/reviews', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...r, sort_order: i }) })
    ));
  };

  const card = { background:'linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,.005))', border:'1px solid var(--border)', borderRadius:'14px' };

  return (
    <div>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px',flexWrap:'wrap',gap:'12px' }}>
        <div>
          <h1 style={{ fontFamily:'var(--font-d)',fontSize:'36px',letterSpacing:'.04em',textTransform:'uppercase' }}>Bewertungen</h1>
          <p style={{ color:'var(--dim)',fontSize:'13px',marginTop:'4px' }}>Ziehe Bewertungen um die Reihenfolge zu ändern.</p>
        </div>
        <button onClick={openNew} className="btn btn-primary btn-sm" style={{ fontFamily:'inherit', display:'flex', alignItems:'center', gap:'7px' }}><IcoPlus size={14} /> Neue Bewertung</button>
      </div>

      {loading ? (
        <div style={{ textAlign:'center',padding:'60px',color:'var(--dim)' }}>Laden …</div>
      ) : reviews.length === 0 ? (
        <div style={{ ...card, padding:'60px', textAlign:'center' }}>
          <p style={{ color:'var(--dim)',marginBottom:'16px' }}>Noch keine Bewertungen.</p>
          <button onClick={openNew} className="btn btn-primary btn-sm" style={{ fontFamily:'inherit', display:'flex', alignItems:'center', gap:'7px', margin:'0 auto' }}><IcoPlus size={14} /> Erste Bewertung erstellen</button>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={reviews.map(r => r.id)} strategy={verticalListSortingStrategy}>
            <div style={{ display:'flex',flexDirection:'column',gap:'8px' }}>
              {reviews.map(r => (
                <SortableReview key={r.id} review={r} onEdit={openEdit} onDelete={deleteReview} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Edit / New Modal */}
      {editing !== null && (
        <div style={{ position:'fixed',inset:0,background:'rgba(5,6,13,.92)',zIndex:200,display:'flex',alignItems:'flex-start',justifyContent:'center',overflowY:'auto',padding:'40px 16px' }} onClick={e => { if (e.target === e.currentTarget) closeEdit(); }}>
          <div style={{ background:'var(--bg1)',border:'1px solid var(--border)',borderRadius:'var(--rl)',maxWidth:'560px',width:'100%',padding:'36px',position:'relative',margin:'auto' }}>
            <button onClick={closeEdit} style={{ position:'absolute',top:'16px',right:'16px',width:'36px',height:'36px',borderRadius:'50%',border:'1px solid rgba(255,255,255,.1)',background:'rgba(255,255,255,.04)',color:'var(--text)',display:'grid',placeItems:'center',cursor:'pointer',fontFamily:'inherit' }}><IcoClose /></button>

            <h2 style={{ fontFamily:'var(--font-d)',fontSize:'28px',letterSpacing:'.04em',textTransform:'uppercase',marginBottom:'24px' }}>
              {editId === null ? 'Neue Bewertung' : 'Bewertung bearbeiten'}
            </h2>

            <div style={{ display:'flex',flexDirection:'column',gap:'16px' }}>
              <div className="field">
                <label>Bewertungstext <span className="req">*</span></label>
                <textarea
                  value={editing.text}
                  onChange={e => setEditing(v => v ? { ...v, text: e.target.value } : v)}
                  placeholder="Was hat der Kunde gesagt?"
                  style={{ color:'var(--text)', minHeight:'120px' }}
                />
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
                <div className="field">
                  <label>Name <span className="req">*</span></label>
                  <input type="text" value={editing.author} onChange={e => setEditing(v => v ? { ...v, author: e.target.value } : v)} placeholder="Max Mustermann" style={{ color:'var(--text)' }} />
                </div>
                <div className="field">
                  <label>Rolle / Funktion</label>
                  <input type="text" value={editing.role} onChange={e => setEditing(v => v ? { ...v, role: e.target.value } : v)} placeholder="z.B. Veranstalterin" style={{ color:'var(--text)' }} />
                </div>
              </div>
              <div className="field">
                <label>Bild-URL <span style={{ color:'var(--muted)',fontWeight:400,fontSize:'9px',letterSpacing:'.1em' }}>(optional – leer = Initialen)</span></label>
                <input type="url" value={editing.image_url} onChange={e => setEditing(v => v ? { ...v, image_url: e.target.value } : v)} placeholder="https://beispiel.at/foto.jpg" style={{ color:'var(--text)' }} />
              </div>

              {/* Preview */}
              {editing.image_url && (
                <div style={{ display:'flex',alignItems:'center',gap:'12px',padding:'12px',background:'rgba(255,255,255,.02)',borderRadius:'10px',border:'1px solid rgba(255,255,255,.06)' }}>
                  <div style={{ width:48,height:48,borderRadius:'50%',overflow:'hidden',border:'2px solid var(--border2)',flexShrink:0 }}>
                    <img src={editing.image_url} alt="Vorschau" style={{ width:'100%',height:'100%',objectFit:'cover' }} onError={e => (e.currentTarget.style.display='none')} />
                  </div>
                  <span style={{ fontSize:'12px',color:'var(--muted)' }}>Bild-Vorschau</span>
                </div>
              )}

              {err && <p style={{ color:'#ff7a93',fontSize:'13px' }}>{err}</p>}

              <div style={{ display:'flex',gap:'12px',justifyContent:'flex-end',marginTop:'4px' }}>
                <button onClick={closeEdit} style={{ display:'flex',alignItems:'center',gap:'6px',padding:'10px 18px',borderRadius:'8px',border:'1px solid var(--border)',color:'var(--dim)',fontSize:'12px',cursor:'pointer',background:'transparent',fontFamily:'inherit' }}>
                  <IcoClose size={13} /> Abbrechen
                </button>
                <button onClick={saveEdit} disabled={saving} className="btn btn-primary btn-sm" style={{ display:'flex',alignItems:'center',gap:'7px',fontFamily:'inherit' }}>
                  <IcoSave size={13} /> {saving ? 'Speichern …' : (editId === null ? 'Hinzufügen' : 'Speichern')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
