'use client';

import { useEffect, useState } from 'react';
import type { PricingCardsConfig, PackageItem } from '@/lib/blocks/types';

interface Block {
  id: number;
  type: string;
  config: string;
}

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,.03)', border: '1px solid var(--border)',
  borderRadius: '8px', padding: '9px 11px', color: 'var(--text)', fontSize: '13px',
  fontFamily: 'inherit', outline: 'none',
};

const labelStyle: React.CSSProperties = {
  fontSize: '10px', letterSpacing: '.15em', textTransform: 'uppercase', fontWeight: 600,
  color: 'var(--dim)', marginBottom: '5px', display: 'block',
};

function PackageEditor({ pkg, onChange }: { pkg: PackageItem; onChange: (p: PackageItem) => void }) {
  const set = <K extends keyof PackageItem>(key: K, value: PackageItem[K]) => onChange({ ...pkg, [key]: value });

  return (
    <div style={{
      background: 'linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,.005))',
      border: '1px solid var(--border)', borderRadius: '14px', padding: '20px',
      display: 'flex', flexDirection: 'column', gap: '14px',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label style={labelStyle}>Name</label>
          <input style={inputStyle} value={pkg.name} onChange={e => set('name', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Badge (optional)</label>
          <input style={inputStyle} value={pkg.badge} onChange={e => set('badge', e.target.value)} placeholder="z.B. ⭐ Beliebt" />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Untertitel</label>
        <input style={inputStyle} value={pkg.subtitle} onChange={e => set('subtitle', e.target.value)} />
      </div>
      <div>
        <label style={labelStyle}>Leistungen (eine pro Zeile)</label>
        <textarea
          style={{ ...inputStyle, minHeight: '120px', resize: 'vertical', lineHeight: 1.6 }}
          value={pkg.features.join('\n')}
          onChange={e => set('features', e.target.value.split('\n'))}
        />
      </div>
      <div>
        <label style={labelStyle}>Hinweis (optional)</label>
        <input style={inputStyle} value={pkg.note} onChange={e => set('note', e.target.value)} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--dim)', cursor: 'pointer' }}>
          <input type="checkbox" checked={pkg.popular} onChange={e => set('popular', e.target.checked)} />
          Hervorgehoben (Beliebt-Stil)
        </label>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Button-Text</label>
          <input style={inputStyle} value={pkg.ctaLabel} onChange={e => set('ctaLabel', e.target.value)} />
        </div>
      </div>
    </div>
  );
}

export default function AdminPackagesSimple() {
  const [block, setBlock] = useState<Block | null>(null);
  const [config, setConfig] = useState<PricingCardsConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/admin/blocks');
      const blocks: Block[] = await res.json();
      const pricing = blocks.find(b => b.type === 'pricing-cards');
      if (pricing) {
        setBlock(pricing);
        setConfig(JSON.parse(pricing.config));
      }
      setLoading(false);
    })();
  }, []);

  const updatePackage = (index: number, pkg: PackageItem) => {
    if (!config) return;
    const packages = [...config.packages];
    packages[index] = pkg;
    setConfig({ ...config, packages });
  };

  const save = async () => {
    if (!block || !config) return;
    setSaving(true);
    await fetch(`/api/admin/blocks/${block.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ config }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '60px', color: 'var(--dim)' }}>Laden …</div>;
  if (!config) return <div style={{ textAlign: 'center', padding: '60px', color: 'var(--dim)' }}>Kein Pakete-Baustein gefunden.</div>;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-d)', fontSize: '36px', letterSpacing: '.04em', textTransform: 'uppercase' }}>Pakete (Testlauf)</h1>
          <p style={{ color: 'var(--dim)', fontSize: '13px', marginTop: '4px' }}>Vorläufiges Formular — die richtige Bau-Oberfläche mit Ziehen &amp; Live-Vorschau kommt in einer späteren Etappe.</p>
        </div>
        <button onClick={save} disabled={saving} className="btn btn-primary btn-sm" style={{ fontFamily: 'inherit' }}>
          {saving ? 'Speichern …' : saved ? 'Gespeichert ✓' : 'Speichern'}
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Abschnitt-Überschrift</label>
        <input style={inputStyle} value={config.title} onChange={e => setConfig({ ...config, title: e.target.value })} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {config.packages.map((pkg, i) => (
          <PackageEditor key={i} pkg={pkg} onChange={p => updatePackage(i, p)} />
        ))}
      </div>
    </div>
  );
}
