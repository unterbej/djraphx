'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminBookings from './AdminBookings';
import AdminCalendar from './AdminCalendar';
import AdminCMS from './AdminCMS';
import AdminReviews from './AdminReviews';

type Tab = 'bookings' | 'calendar' | 'reviews' | 'cms';

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('bookings');
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'bookings', label: 'Buchungen', icon: '📋' },
    { id: 'calendar', label: 'Kalender', icon: '📅' },
    { id: 'reviews', label: 'Bewertungen', icon: '⭐' },
    { id: 'cms', label: 'Inhalte', icon: '✏️' },
  ];

  return (
    <div style={{minHeight:'100vh',background:'var(--bg)',fontFamily:'var(--font-b)',color:'var(--text)'}}>
      <nav style={{background:'rgba(10,12,24,.95)',borderBottom:'1px solid var(--border)',padding:'14px 0',position:'sticky',top:0,zIndex:50,backdropFilter:'blur(16px)'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'16px',flexWrap:'wrap'}}>
          <span style={{fontFamily:'var(--font-d)',fontSize:'22px',letterSpacing:'.1em'}}>
            DJ RAPH<span style={{color:'var(--cyan)'}}>X</span>{' '}
            <span style={{color:'var(--muted)',fontSize:'14px',fontFamily:'var(--font-b)',letterSpacing:'.2em',textTransform:'uppercase',fontWeight:500}}>Admin</span>
          </span>
          <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding:'8px 14px', borderRadius:'8px', fontSize:'12px', fontWeight:600,
                letterSpacing:'.08em', transition:'all .2s',
                border: tab === t.id ? '1px solid var(--border2)' : '1px solid transparent',
                background: tab === t.id ? 'rgba(14,165,255,.1)' : 'transparent',
                color: tab === t.id ? 'var(--cyan)' : 'var(--dim)',
                cursor:'pointer', fontFamily:'inherit',
              }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
          <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
            <a href="/" target="_blank" style={{fontSize:'12px',color:'var(--dim)',letterSpacing:'.1em',textTransform:'uppercase'}}>Webseite →</a>
            <button onClick={logout} style={{padding:'8px 16px',borderRadius:'8px',border:'1px solid rgba(255,85,119,.3)',background:'rgba(255,85,119,.08)',color:'#ff7a93',fontSize:'12px',cursor:'pointer',fontFamily:'inherit',letterSpacing:'.08em',textTransform:'uppercase'}}>
              Abmelden
            </button>
          </div>
        </div>
      </nav>
      <main style={{maxWidth:'1200px',margin:'0 auto',padding:'32px 24px'}}>
        {tab === 'bookings' && <AdminBookings />}
        {tab === 'calendar' && <AdminCalendar />}
        {tab === 'reviews' && <AdminReviews />}
        {tab === 'cms' && <AdminCMS />}
      </main>
    </div>
  );
}
