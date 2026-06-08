'use client';

import { useEffect, useState, useRef } from 'react';
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
  DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier,
} from '@dnd-kit/core';
import {
  SortableContext, useSortable, verticalListSortingStrategy, arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CmsField {
  id: string;
  label: string;
  key: string;
  type: 'text' | 'textarea';
  group: string;
  isCustom?: boolean;
}

interface CmsGroup {
  id: string;
  label: string;
  fields: CmsField[];
  isCustom?: boolean;
}

const BUILT_IN_FIELDS: CmsField[] = [
  { id: 'f1',  label: 'Titel',         key: 'hero_title',           type: 'text',     group: 'Hero' },
  { id: 'f2',  label: 'Untertitel',    key: 'hero_subtitle',        type: 'textarea', group: 'Hero' },
  { id: 'f3',  label: 'Zitat',         key: 'hero_quote',           type: 'text',     group: 'Hero' },
  { id: 'f4',  label: 'Stat – Events', key: 'hero_stats_events',    type: 'text',     group: 'Hero' },
  { id: 'f5',  label: 'Stat – Genres', key: 'hero_stats_genres',    type: 'text',     group: 'Hero' },
  { id: 'f6',  label: 'Stat – Verfügbar', key: 'hero_stats_available', type: 'text', group: 'Hero' },
  { id: 'f7',  label: 'Laufband',      key: 'marquee_text',         type: 'textarea', group: 'Marquee' },
  { id: 'f8',  label: 'Feature 1 – Titel', key: 'feat1_title',      type: 'text',     group: 'Features' },
  { id: 'f9',  label: 'Feature 1 – Text',  key: 'feat1_body',       type: 'textarea', group: 'Features' },
  { id: 'f10', label: 'Feature 2 – Titel', key: 'feat2_title',      type: 'text',     group: 'Features' },
  { id: 'f11', label: 'Feature 2 – Text',  key: 'feat2_body',       type: 'textarea', group: 'Features' },
  { id: 'f12', label: 'Feature 3 – Titel', key: 'feat3_title',      type: 'text',     group: 'Features' },
  { id: 'f13', label: 'Feature 3 – Text',  key: 'feat3_body',       type: 'textarea', group: 'Features' },
  { id: 'f14', label: 'Zitat',         key: 'why_quote',            type: 'text',     group: 'Warum ich' },
  { id: 'f15', label: 'Absatz 1',      key: 'why_text1',            type: 'textarea', group: 'Warum ich' },
  { id: 'f16', label: 'Absatz 2',      key: 'why_text2',            type: 'textarea', group: 'Warum ich' },
  { id: 'f17', label: 'Absatz 1',      key: 'about_text1',          type: 'textarea', group: 'Über mich' },
  { id: 'f18', label: 'Absatz 2',      key: 'about_text2',          type: 'textarea', group: 'Über mich' },
  { id: 'f19', label: 'E-Mail',        key: 'contact_email',        type: 'text',     group: 'Kontakt' },
  { id: 'f20', label: 'Telefon',       key: 'contact_phone',        type: 'text',     group: 'Kontakt' },
  { id: 'f21', label: 'Adresse',       key: 'contact_address',      type: 'textarea', group: 'Kontakt' },
  { id: 'f22', label: 'Erreichbarkeit', key: 'contact_hours',       type: 'text',     group: 'Kontakt' },
];

const GROUP_ORDER = ['Hero', 'Marquee', 'Features', 'Warum ich', 'Über mich', 'Kontakt'];

const GROUP_ICONS: Record<string, React.ReactNode> = {
  'Hero': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  'Marquee': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  'Features': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  'Warum ich': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  'Über mich': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  'Kontakt': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>,
};

// ── Single editable field row ──────────────────────────────────────────────
function FieldRow({
  field, value, onChange, isDirty, onDelete, dragHandle,
}: {
  field: CmsField; value: string; onChange: (v: string) => void;
  isDirty: boolean; onDelete?: () => void; dragHandle?: React.ReactNode;
}) {
  const inputRef = useRef<HTMLTextAreaElement & HTMLInputElement>(null);
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '24px 1fr auto',
      gap: '10px',
      alignItems: 'flex-start',
      padding: '12px 14px',
      borderBottom: '1px solid rgba(255,255,255,.04)',
    }}>
      {/* drag handle */}
      <div style={{ paddingTop: field.type === 'textarea' ? '14px' : '10px', color: 'rgba(255,255,255,.15)', cursor: 'grab', userSelect: 'none', touchAction: 'none' }}>
        {dragHandle ?? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <rect x="3" y="2" width="2" height="2" rx="1"/>
            <rect x="9" y="2" width="2" height="2" rx="1"/>
            <rect x="3" y="6" width="2" height="2" rx="1"/>
            <rect x="9" y="6" width="2" height="2" rx="1"/>
            <rect x="3" y="10" width="2" height="2" rx="1"/>
            <rect x="9" y="10" width="2" height="2" rx="1"/>
          </svg>
        )}
      </div>

      {/* label + input */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
          <span style={{
            fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 700,
            color: isDirty ? '#0EA5FF' : 'rgba(255,255,255,.35)',
          }}>
            {field.label}
          </span>
          {field.isCustom && (
            <span style={{ fontSize: '9px', color: '#7C3AFF', background: 'rgba(124,58,255,.15)', padding: '1px 6px', borderRadius: '4px', letterSpacing: '.1em', textTransform: 'uppercase' }}>
              eigenes feld
            </span>
          )}
          {isDirty && (
            <span style={{ fontSize: '9px', color: '#0EA5FF', background: 'rgba(14,165,255,.12)', padding: '1px 6px', borderRadius: '4px', letterSpacing: '.1em', textTransform: 'uppercase' }}>
              geändert
            </span>
          )}
        </div>

        {field.type === 'textarea' ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={value}
            onChange={e => onChange(e.target.value)}
            rows={3}
            style={{
              display: 'block', width: '100%',
              background: isDirty ? 'rgba(14,165,255,.04)' : 'rgba(255,255,255,.03)',
              border: `1px solid ${isDirty ? 'rgba(14,165,255,.25)' : 'rgba(255,255,255,.07)'}`,
              borderRadius: '8px', padding: '9px 11px',
              color: 'var(--text)', fontSize: '13px', lineHeight: 1.65,
              fontFamily: 'var(--font-b)', resize: 'vertical', outline: 'none',
              transition: 'border-color .15s, background .15s',
            }}
            onFocus={e => { e.target.style.borderColor = '#0EA5FF'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,255,.12)'; }}
            onBlur={e => { e.target.style.borderColor = isDirty ? 'rgba(14,165,255,.25)' : 'rgba(255,255,255,.07)'; e.target.style.boxShadow = 'none'; }}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            style={{
              display: 'block', width: '100%',
              background: isDirty ? 'rgba(14,165,255,.04)' : 'rgba(255,255,255,.03)',
              border: `1px solid ${isDirty ? 'rgba(14,165,255,.25)' : 'rgba(255,255,255,.07)'}`,
              borderRadius: '8px', padding: '9px 11px',
              color: 'var(--text)', fontSize: '13px',
              fontFamily: 'var(--font-b)', outline: 'none',
              transition: 'border-color .15s, background .15s',
            }}
            onFocus={e => { e.target.style.borderColor = '#0EA5FF'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,255,.12)'; }}
            onBlur={e => { e.target.style.borderColor = isDirty ? 'rgba(14,165,255,.25)' : 'rgba(255,255,255,.07)'; e.target.style.boxShadow = 'none'; }}
          />
        )}
        {field.isCustom && (
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,.2)', marginTop: '3px' }}>
            key: <code style={{ color: '#00D4FF', background: 'rgba(0,212,255,.08)', padding: '1px 5px', borderRadius: '4px' }}>{field.key}</code>
          </p>
        )}
      </div>

      {/* delete */}
      <div style={{ paddingTop: field.type === 'textarea' ? '12px' : '8px' }}>
        {field.isCustom && onDelete ? (
          <button
            onClick={onDelete}
            title="Feld löschen"
            style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid rgba(255,85,119,.2)', background: 'transparent', color: '#ff7a93', fontSize: '13px', cursor: 'pointer', display: 'grid', placeItems: 'center', fontFamily: 'inherit' }}
          >✕</button>
        ) : <div style={{ width: 28 }} />}
      </div>
    </div>
  );
}

// ── Sortable wrapper for a field ──────────────────────────────────────────
function SortableFieldRow(props: {
  field: CmsField; value: string; onChange: (v: string) => void;
  isDirty: boolean; onDelete?: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: props.field.id });
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0 : 1 }}>
      <FieldRow
        {...props}
        dragHandle={
          <div {...attributes} {...listeners} style={{ cursor: 'grab', color: 'rgba(255,255,255,.15)', touchAction: 'none' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <rect x="3" y="2" width="2" height="2" rx="1"/>
              <rect x="9" y="2" width="2" height="2" rx="1"/>
              <rect x="3" y="6" width="2" height="2" rx="1"/>
              <rect x="9" y="6" width="2" height="2" rx="1"/>
              <rect x="3" y="10" width="2" height="2" rx="1"/>
              <rect x="9" y="10" width="2" height="2" rx="1"/>
            </svg>
          </div>
        }
      />
    </div>
  );
}

// ── Sortable group card (drag the header to reorder groups) ───────────────
function SortableGroup({
  group, values, original, onChange, onDeleteField, onAddField, openGroups, toggleGroup,
}: {
  group: CmsGroup;
  values: Record<string, string>;
  original: Record<string, string>;
  onChange: (key: string, val: string) => void;
  onDeleteField: (field: CmsField) => void;
  onAddField: (groupId: string) => void;
  openGroups: Set<string>;
  toggleGroup: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: group.id });
  const isOpen = openGroups.has(group.id);
  const dirtyInGroup = group.fields.filter(f => (values[f.key] ?? '') !== (original[f.key] ?? '')).length;
  const icon = GROUP_ICONS[group.label] ?? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;

  const fieldSensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform), transition,
        opacity: isDragging ? 0.4 : 1,
        background: 'rgba(255,255,255,.02)',
        border: '1px solid rgba(255,255,255,.07)',
        borderRadius: '14px',
        overflow: 'hidden',
        marginBottom: '10px',
        boxShadow: isDragging ? '0 0 0 2px rgba(14,165,255,.4)' : 'none',
      }}
    >
      {/* Group header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '14px 16px',
        background: isOpen ? 'rgba(255,255,255,.03)' : 'transparent',
        borderBottom: isOpen ? '1px solid rgba(255,255,255,.06)' : 'none',
        cursor: 'pointer',
        userSelect: 'none',
      }}>
        {/* drag handle for the group */}
        <div
          {...attributes} {...listeners}
          onClick={e => e.stopPropagation()}
          style={{ color: 'rgba(255,255,255,.18)', cursor: 'grab', flexShrink: 0, touchAction: 'none', display: 'flex', alignItems: 'center' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <rect x="3" y="2" width="2" height="2" rx="1"/>
            <rect x="9" y="2" width="2" height="2" rx="1"/>
            <rect x="3" y="6" width="2" height="2" rx="1"/>
            <rect x="9" y="6" width="2" height="2" rx="1"/>
            <rect x="3" y="10" width="2" height="2" rx="1"/>
            <rect x="9" y="10" width="2" height="2" rx="1"/>
          </svg>
        </div>

        <div onClick={() => toggleGroup(group.id)} style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          <span style={{ color: 'rgba(255,255,255,.35)', display: 'flex', alignItems: 'center' }}>{icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontFamily: 'var(--font-d)', fontSize: '15px', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                {group.label}
              </span>
              {group.isCustom && (
                <span style={{ fontSize: '9px', color: '#7C3AFF', background: 'rgba(124,58,255,.15)', padding: '2px 7px', borderRadius: '4px', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                  eigene sektion
                </span>
              )}
              {dirtyInGroup > 0 && (
                <span style={{ fontSize: '9px', color: '#0EA5FF', background: 'rgba(14,165,255,.12)', padding: '2px 7px', borderRadius: '4px', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                  {dirtyInGroup} geändert
                </span>
              )}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.25)', marginTop: '2px' }}>
              {group.fields.length} Feld{group.fields.length !== 1 ? 'er' : ''}
            </div>
          </div>
          <div style={{ color: 'rgba(255,255,255,.3)', fontSize: '12px', transition: 'transform .2s', transform: isOpen ? 'rotate(90deg)' : 'none' }}>
            ▶
          </div>
        </div>
      </div>

      {/* Fields */}
      {isOpen && (
        <DndContext
          sensors={fieldSensors}
          collisionDetection={closestCenter}
          onDragEnd={() => {}}
        >
          <SortableContext items={group.fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
            <div>
              {group.fields.map(field => (
                <SortableFieldRow
                  key={field.id}
                  field={field}
                  value={values[field.key] ?? ''}
                  onChange={val => onChange(field.key, val)}
                  isDirty={(values[field.key] ?? '') !== (original[field.key] ?? '')}
                  onDelete={field.isCustom ? () => onDeleteField(field) : undefined}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Add field button inside group */}
      {isOpen && (
        <div style={{ padding: '10px 16px', borderTop: '1px solid rgba(255,255,255,.04)' }}>
          <button
            onClick={() => onAddField(group.id)}
            style={{
              fontSize: '11px', color: 'rgba(255,255,255,.3)', background: 'transparent',
              border: '1px dashed rgba(255,255,255,.12)', borderRadius: '8px',
              padding: '7px 14px', cursor: 'pointer', fontFamily: 'inherit',
              letterSpacing: '.1em', textTransform: 'uppercase',
              transition: 'color .15s, border-color .15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#7C3AFF'; e.currentTarget.style.borderColor = 'rgba(124,58,255,.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.3)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)'; }}
          >
            + Feld hinzufügen
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function AdminCMS() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [original, setOriginal] = useState<Record<string, string>>({});
  const [groups, setGroups] = useState<CmsGroup[]>([]);
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  // New field/group modal
  const [modal, setModal] = useState<null | { targetGroupId: string | null }>(null);
  const [newLabel, setNewLabel] = useState('');
  const [newKey, setNewKey] = useState('');
  const [newType, setNewType] = useState<'text' | 'textarea'>('text');
  const [newGroup, setNewGroup] = useState('');
  const [newGroupMode, setNewGroupMode] = useState<'existing' | 'new'>('existing');
  const [newGroupTarget, setNewGroupTarget] = useState('');
  const [modalErr, setModalErr] = useState('');

  const groupSensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const buildGroups = (data: Record<string, string>, customFields: CmsField[]) => {
    const builtInKeys = new Set(BUILT_IN_FIELDS.map(f => f.key));
    const allFields = [...BUILT_IN_FIELDS, ...customFields];
    const groupMap: Record<string, CmsField[]> = {};
    for (const f of allFields) {
      if (!groupMap[f.group]) groupMap[f.group] = [];
      groupMap[f.group].push(f);
    }
    const orderedGroupNames = [
      ...GROUP_ORDER.filter(g => groupMap[g]),
      ...Object.keys(groupMap).filter(g => !GROUP_ORDER.includes(g)),
    ];
    return orderedGroupNames.map(name => ({
      id: `group_${name}`,
      label: name,
      fields: groupMap[name] ?? [],
      isCustom: !GROUP_ORDER.includes(name),
    }));
  };

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/cms');
    const data = await res.json();
    setValues(data);
    setOriginal(data);

    const builtInKeys = new Set(BUILT_IN_FIELDS.map(f => f.key));
    const customFields: CmsField[] = Object.keys(data)
      .filter(k => !builtInKeys.has(k) && !k.startsWith('review_'))
      .map(k => ({
        id: `custom_${k}`,
        label: k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        key: k,
        type: ((data[k] as string)?.length ?? 0) > 80 ? 'textarea' : 'text' as 'text' | 'textarea',
        group: 'Eigene Felder',
        isCustom: true,
      }));

    setGroups(buildGroups(data, customFields));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggleGroup = (id: string) => {
    setOpenGroups(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const expandAll = () => setOpenGroups(new Set(groups.map(g => g.id)));
  const collapseAll = () => setOpenGroups(new Set());

  const handleGroupDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over || active.id === over.id) return;
    setGroups(items => {
      const oi = items.findIndex(g => g.id === active.id);
      const ni = items.findIndex(g => g.id === over.id);
      return arrayMove(items, oi, ni);
    });
  };

  const handleChange = (key: string, val: string) => {
    setValues(v => ({ ...v, [key]: val }));
  };

  const save = async () => {
    setSaving(true); setSaved(false);
    const changed: Record<string, string> = {};
    for (const [k, v] of Object.entries(values)) {
      if (v !== (original[k] ?? '')) changed[k] = v;
    }
    if (Object.keys(changed).length > 0) {
      await fetch('/api/admin/cms', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(changed) });
      setOriginal({ ...values });
    }
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const openAddFieldModal = (groupId: string | null) => {
    setModal({ targetGroupId: groupId });
    setNewLabel(''); setNewKey(''); setNewType('text');
    setNewGroupMode(groupId ? 'existing' : 'new');
    setNewGroupTarget(groupId ? (groups.find(g => g.id === groupId)?.label ?? '') : '');
    setModalErr('');
  };

  const submitNewField = async () => {
    setModalErr('');
    if (!newLabel.trim()) { setModalErr('Bezeichnung ist Pflicht.'); return; }
    const key = newKey.trim() || newLabel.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    if (!key) { setModalErr('Schlüssel konnte nicht generiert werden.'); return; }
    const allKeys = groups.flatMap(g => g.fields.map(f => f.key));
    if (allKeys.includes(key)) { setModalErr('Dieser Schlüssel existiert bereits.'); return; }

    const targetGroup = newGroupMode === 'existing'
      ? (newGroupTarget || groups.find(g => g.id === modal?.targetGroupId)?.label || 'Eigene Felder')
      : (newGroup.trim() || 'Eigene Felder');

    await fetch('/api/admin/cms', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ [key]: '' }) });

    const newField: CmsField = {
      id: `custom_${key}`,
      label: newLabel.trim(),
      key,
      type: newType,
      group: targetGroup,
      isCustom: true,
    };
    setGroups(prev => {
      const existing = prev.find(g => g.label === targetGroup);
      if (existing) {
        return prev.map(g => g.label === targetGroup ? { ...g, fields: [...g.fields, newField] } : g);
      }
      return [...prev, { id: `group_${targetGroup}`, label: targetGroup, fields: [newField], isCustom: true }];
    });
    setValues(v => ({ ...v, [key]: '' }));
    setOriginal(v => ({ ...v, [key]: '' }));
    setOpenGroups(prev => new Set([...prev, `group_${targetGroup}`]));
    setModal(null);
  };

  const deleteField = (field: CmsField) => {
    if (!confirm(`Feld "${field.label}" wirklich löschen?`)) return;
    setGroups(prev => prev.map(g => ({ ...g, fields: g.fields.filter(f => f.id !== field.id) })).filter(g => g.fields.length > 0 || !g.isCustom));
    setValues(v => { const n = { ...v }; delete n[field.key]; return n; });
    setOriginal(v => { const n = { ...v }; delete n[field.key]; return n; });
  };

  const dirtyCount = Object.entries(values).filter(([k, v]) => v !== (original[k] ?? '')).length;
  const activeGroup = activeId ? groups.find(g => g.id === activeId) : null;

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', color: 'rgba(255,255,255,.3)', fontSize: '13px', letterSpacing: '.15em', textTransform: 'uppercase' }}>
      Laden …
    </div>
  );

  return (
    <div style={{ maxWidth: '860px' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-d)', fontSize: '34px', letterSpacing: '.05em', textTransform: 'uppercase', margin: 0 }}>
            Inhalte
          </h1>
          <p style={{ color: 'rgba(255,255,255,.3)', fontSize: '12px', marginTop: '4px', letterSpacing: '.05em' }}>
            Sektionen verschieben · Felder bearbeiten · Eigene Felder anlegen
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={expandAll} style={ghostBtn}>Alle öffnen</button>
          <button onClick={collapseAll} style={ghostBtn}>Alle schließen</button>
          <button
            onClick={() => openAddFieldModal(null)}
            style={{ ...ghostBtn, color: '#7C3AFF', borderColor: 'rgba(124,58,255,.35)', background: 'rgba(124,58,255,.07)' }}
          >
            + Neues Feld
          </button>
          {saved && (
            <span style={{ fontSize: '12px', color: '#22c55e', background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.2)', padding: '6px 14px', borderRadius: '8px' }}>
              ✓ Gespeichert
            </span>
          )}
          <button
            onClick={save}
            disabled={saving || dirtyCount === 0}
            style={{
              padding: '8px 20px', borderRadius: '8px', fontSize: '12px', letterSpacing: '.1em', textTransform: 'uppercase',
              fontWeight: 700, cursor: dirtyCount === 0 ? 'default' : 'pointer', fontFamily: 'inherit',
              background: dirtyCount > 0 ? 'linear-gradient(135deg,#0EA5FF,#7C3AFF)' : 'rgba(255,255,255,.06)',
              border: 'none', color: dirtyCount > 0 ? '#fff' : 'rgba(255,255,255,.3)',
              opacity: saving ? 0.7 : 1, transition: 'all .2s',
            }}
          >
            {saving ? 'Speichern …' : dirtyCount > 0 ? `Speichern (${dirtyCount})` : 'Speichern'}
          </button>
        </div>
      </div>

      {/* ── Group drag list ── */}
      <DndContext
        sensors={groupSensors}
        collisionDetection={closestCenter}
        onDragStart={(e: DragStartEvent) => setActiveId(e.active.id)}
        onDragEnd={handleGroupDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <SortableContext items={groups.map(g => g.id)} strategy={verticalListSortingStrategy}>
          {groups.map(group => (
            <SortableGroup
              key={group.id}
              group={group}
              values={values}
              original={original}
              onChange={handleChange}
              onDeleteField={deleteField}
              onAddField={openAddFieldModal}
              openGroups={openGroups}
              toggleGroup={toggleGroup}
            />
          ))}
        </SortableContext>

        <DragOverlay>
          {activeGroup ? (
            <div style={{
              background: 'rgba(14,20,40,.95)', border: '1px solid rgba(14,165,255,.4)',
              borderRadius: '14px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px',
              boxShadow: '0 16px 48px rgba(0,0,0,.5)',
            }}>
              <span style={{ color: 'rgba(255,255,255,.35)', display: 'flex', alignItems: 'center' }}>{GROUP_ICONS[activeGroup.label] ?? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}</span>
              <span style={{ fontFamily: 'var(--font-d)', fontSize: '15px', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                {activeGroup.label}
              </span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* ── Sticky save bar ── */}
      {dirtyCount > 0 && (
        <div style={{
          position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(8,10,20,.97)', border: '1px solid rgba(14,165,255,.25)',
          borderRadius: '12px', padding: '12px 20px',
          display: 'flex', alignItems: 'center', gap: '14px',
          boxShadow: '0 8px 40px rgba(0,0,0,.6)', backdropFilter: 'blur(20px)', zIndex: 50,
        }}>
          <span style={{ fontSize: '12px', color: '#0EA5FF', letterSpacing: '.08em' }}>
            {dirtyCount} ungespeicherte Änderung{dirtyCount !== 1 ? 'en' : ''}
          </span>
          <button onClick={() => setValues({ ...original })} style={ghostBtn}>Zurücksetzen</button>
          <button onClick={save} disabled={saving} style={{
            padding: '8px 18px', borderRadius: '8px', fontSize: '12px', letterSpacing: '.1em',
            textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            background: 'linear-gradient(135deg,#0EA5FF,#7C3AFF)', border: 'none', color: '#fff',
          }}>
            {saving ? 'Speichern …' : 'Jetzt speichern'}
          </button>
        </div>
      )}

      {/* ── Add field modal ── */}
      {modal && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(5,6,13,.93)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
          onClick={e => { if (e.target === e.currentTarget) setModal(null); }}
        >
          <div style={{
            background: '#0d0f1c', border: '1px solid rgba(255,255,255,.1)',
            borderRadius: '16px', maxWidth: '500px', width: '100%',
            padding: '32px', position: 'relative',
          }}>
            <button onClick={() => setModal(null)} style={{
              position: 'absolute', top: '16px', right: '16px',
              width: '32px', height: '32px', borderRadius: '8px',
              border: '1px solid rgba(255,255,255,.1)', background: 'rgba(255,255,255,.04)',
              color: 'rgba(255,255,255,.5)', fontSize: '16px', cursor: 'pointer',
              display: 'grid', placeItems: 'center', fontFamily: 'inherit',
            }}>✕</button>

            <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '24px', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: '6px' }}>
              Neues Feld
            </h2>
            <p style={{ color: 'rgba(255,255,255,.3)', fontSize: '12px', marginBottom: '24px' }}>
              Lege ein eigenes Inhaltsfeld an, das du im CMS bearbeiten kannst.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <ModalField label="Bezeichnung *">
                <input
                  autoFocus type="text" value={newLabel}
                  onChange={e => setNewLabel(e.target.value)}
                  placeholder="z.B. Sonderangebot Text"
                  style={modalInput}
                />
              </ModalField>

              <ModalField label={<>Schlüssel <span style={{ color: 'rgba(255,255,255,.25)', fontWeight: 400, fontSize: '9px' }}>(auto-generiert falls leer)</span></>}>
                <input
                  type="text" value={newKey}
                  onChange={e => setNewKey(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_'))}
                  placeholder={newLabel ? newLabel.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '') : 'eigener_schluessel'}
                  style={{ ...modalInput, fontFamily: 'monospace', fontSize: '12px' }}
                />
              </ModalField>

              <ModalField label="Feldtyp">
                <div style={{ display: 'flex', gap: '8px' }}>
                  {(['text', 'textarea'] as const).map(t => (
                    <button key={t} onClick={() => setNewType(t)} style={{
                      flex: 1, padding: '9px', borderRadius: '8px', border: `1px solid ${newType === t ? 'rgba(14,165,255,.5)' : 'rgba(255,255,255,.1)'}`,
                      background: newType === t ? 'rgba(14,165,255,.1)' : 'rgba(255,255,255,.03)',
                      color: newType === t ? '#0EA5FF' : 'rgba(255,255,255,.5)',
                      fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '.08em',
                    }}>
                      {t === 'text' ? 'Einzeilig' : 'Mehrzeilig'}
                    </button>
                  ))}
                </div>
              </ModalField>

              <ModalField label="Sektion">
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  {(['existing', 'new'] as const).map(m => (
                    <button key={m} onClick={() => setNewGroupMode(m)} style={{
                      flex: 1, padding: '7px', borderRadius: '8px', border: `1px solid ${newGroupMode === m ? 'rgba(124,58,255,.5)' : 'rgba(255,255,255,.1)'}`,
                      background: newGroupMode === m ? 'rgba(124,58,255,.1)' : 'rgba(255,255,255,.03)',
                      color: newGroupMode === m ? '#7C3AFF' : 'rgba(255,255,255,.5)',
                      fontSize: '11px', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '.08em',
                    }}>
                      {m === 'existing' ? 'Bestehende Sektion' : 'Neue Sektion'}
                    </button>
                  ))}
                </div>
                {newGroupMode === 'existing' ? (
                  <select
                    value={newGroupTarget}
                    onChange={e => setNewGroupTarget(e.target.value)}
                    style={{ ...modalInput, appearance: 'none', cursor: 'pointer' }}
                  >
                    {groups.map(g => <option key={g.id} value={g.label}>{g.label}</option>)}
                  </select>
                ) : (
                  <input
                    type="text" value={newGroup}
                    onChange={e => setNewGroup(e.target.value)}
                    placeholder="Name der neuen Sektion"
                    style={modalInput}
                  />
                )}
              </ModalField>
            </div>

            {modalErr && (
              <p style={{ color: '#ff7a93', fontSize: '12px', marginTop: '12px' }}>{modalErr}</p>
            )}

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button onClick={() => setModal(null)} style={ghostBtn}>Abbrechen</button>
              <button onClick={submitNewField} style={{
                padding: '10px 22px', borderRadius: '8px', fontSize: '12px', letterSpacing: '.1em',
                textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                background: 'linear-gradient(135deg,#0EA5FF,#7C3AFF)', border: 'none', color: '#fff',
              }}>
                Feld anlegen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ModalField({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)', fontWeight: 700, marginBottom: '6px' }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const ghostBtn: React.CSSProperties = {
  padding: '7px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,.12)',
  background: 'rgba(255,255,255,.04)', color: 'rgba(255,255,255,.45)',
  fontSize: '11px', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '.08em',
  textTransform: 'uppercase', whiteSpace: 'nowrap',
};

const modalInput: React.CSSProperties = {
  display: 'block', width: '100%',
  background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)',
  borderRadius: '8px', padding: '10px 12px',
  color: '#fff', fontSize: '13px', fontFamily: 'var(--font-b)', outline: 'none',
};
