'use client';

import { useEffect, useRef, useState } from 'react';
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext, useSortable, rectSortingStrategy, arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IcoPlus, IcoTrash, IcoCheck, IcoDrag } from './icons';

interface GalleryItem {
  id: number;
  filename: string;
  caption: string;
  sort_order: number;
  url: string;
}

function SortableImage({ item, onDelete, onCaptionSave }: {
  item: GalleryItem;
  onDelete: (id: number) => void;
  onCaptionSave: (item: GalleryItem, caption: string) => Promise<void>;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const [caption, setCaption] = useState(item.caption);
  const [saving, setSaving] = useState(false);
  const dirty = caption !== item.caption;

  const save = async () => {
    if (!dirty) return;
    setSaving(true);
    await onCaptionSave(item, caption);
    setSaving(false);
  };

  return (
    <div ref={setNodeRef} style={{
      transform: CSS.Transform.toString(transform), transition,
      opacity: isDragging ? 0.5 : 1,
      background: 'linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,.005))',
      border: '1px solid var(--border)', borderRadius: '14px',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ position: 'relative', aspectRatio: '16/10', background: 'rgba(0,0,0,.3)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.url} alt={item.caption || item.filename} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div {...attributes} {...listeners} title="Ziehen zum Sortieren" style={{
          position: 'absolute', top: '8px', left: '8px',
          width: '30px', height: '30px', borderRadius: '8px',
          background: 'rgba(5,6,13,.7)', border: '1px solid rgba(255,255,255,.15)',
          display: 'grid', placeItems: 'center', color: 'rgba(255,255,255,.7)',
          cursor: 'grab', touchAction: 'none', backdropFilter: 'blur(4px)',
        }}>
          <IcoDrag />
        </div>
        <button onClick={() => onDelete(item.id)} title="Löschen" style={{
          position: 'absolute', top: '8px', right: '8px',
          width: '30px', height: '30px', borderRadius: '8px',
          background: 'rgba(5,6,13,.7)', border: '1px solid rgba(255,85,119,.35)',
          display: 'grid', placeItems: 'center', color: '#ff7a93',
          cursor: 'pointer', backdropFilter: 'blur(4px)', fontFamily: 'inherit',
        }}>
          <IcoTrash />
        </button>
      </div>
      <div style={{ display: 'flex', gap: '8px', padding: '10px', alignItems: 'center' }}>
        <input
          type="text"
          value={caption}
          onChange={e => setCaption(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') save(); }}
          placeholder="Beschreibung (z.B. Bravo Hits Party 2026)"
          style={{
            flex: 1, minWidth: 0, background: 'rgba(255,255,255,.03)',
            border: '1px solid var(--border)', borderRadius: '8px',
            padding: '8px 10px', fontSize: '12px', color: 'var(--text)', fontFamily: 'inherit',
          }}
        />
        {dirty && (
          <button onClick={save} disabled={saving} title="Beschreibung speichern" style={{
            width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
            border: '1px solid rgba(14,165,255,.4)', background: 'rgba(14,165,255,.1)',
            color: 'var(--cyan)', display: 'grid', placeItems: 'center',
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            <IcoCheck />
          </button>
        )}
      </div>
    </div>
  );
}

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/gallery');
    setItems(await res.json());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const upload = async (files: FileList | File[]) => {
    const list = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (list.length === 0) { setErr('Bitte nur Bilddateien auswählen.'); return; }
    setUploading(true);
    setErr('');
    const fd = new FormData();
    list.forEach(f => fd.append('files', f));
    const res = await fetch('/api/admin/gallery', { method: 'POST', body: fd });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setErr(data.error || 'Upload fehlgeschlagen.');
    }
    setUploading(false);
    load();
  };

  const deleteItem = async (id: number) => {
    if (!confirm('Foto wirklich löschen?')) return;
    await fetch('/api/admin/gallery', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    load();
  };

  const saveCaption = async (item: GalleryItem, caption: string) => {
    await fetch('/api/admin/gallery', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, caption, sort_order: item.sort_order }),
    });
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, caption } : i));
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = items.findIndex(i => i.id === active.id);
    const newIdx = items.findIndex(i => i.id === over.id);
    const reordered = arrayMove(items, oldIdx, newIdx).map((it, i) => ({ ...it, sort_order: i }));
    setItems(reordered);
    await Promise.all(reordered.map(it =>
      fetch('/api/admin/gallery', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: it.id, caption: it.caption, sort_order: it.sort_order }),
      })
    ));
  };

  const card = { background: 'linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,.005))', border: '1px solid var(--border)', borderRadius: '14px' };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-d)', fontSize: '36px', letterSpacing: '.04em', textTransform: 'uppercase' }}>Galerie</h1>
          <p style={{ color: 'var(--dim)', fontSize: '13px', marginTop: '4px' }}>Fotos werden automatisch verkleinert &amp; komprimiert. Ziehe Fotos um die Reihenfolge zu ändern.</p>
        </div>
        <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="btn btn-primary btn-sm" style={{ fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '7px' }}>
          <IcoPlus size={14} /> {uploading ? 'Hochladen …' : 'Fotos hochladen'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={e => { if (e.target.files?.length) upload(e.target.files); e.target.value = ''; }}
        />
      </div>

      {err && <p style={{ color: '#ff7a93', fontSize: '13px', marginBottom: '16px' }}>{err}</p>}

      {/* Dropzone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files.length) upload(e.dataTransfer.files); }}
        onClick={() => fileInputRef.current?.click()}
        style={{
          ...card,
          borderStyle: 'dashed',
          borderColor: dragOver ? 'var(--cyan)' : 'var(--border)',
          background: dragOver ? 'rgba(14,165,255,.06)' : 'rgba(255,255,255,.01)',
          padding: '28px', textAlign: 'center', cursor: 'pointer',
          color: 'var(--dim)', fontSize: '13px', marginBottom: '24px',
          transition: 'border-color .2s, background .2s',
        }}
      >
        {uploading ? 'Fotos werden hochgeladen …' : 'Fotos hierher ziehen oder klicken zum Auswählen (JPG, PNG, … — max. 20 MB pro Foto)'}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--dim)' }}>Laden …</div>
      ) : items.length === 0 ? (
        <div style={{ ...card, padding: '60px', textAlign: 'center' }}>
          <p style={{ color: 'var(--dim)' }}>Noch keine Fotos. Lade das erste Foto hoch — die Galerie erscheint dann automatisch auf der Webseite.</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map(i => i.id)} strategy={rectSortingStrategy}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
              {items.map(item => (
                <SortableImage key={item.id} item={item} onDelete={deleteItem} onCaptionSave={saveCaption} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
