'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminBookings from './AdminBookings';
import AdminCalendar from './AdminCalendar';
import AdminCMS from './AdminCMS';
import AdminReviews from './AdminReviews';

type Tab = 'bookings' | 'calendar' | 'reviews' | 'cms';

const IconBookings = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const IconReviews = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconCMS = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const IconLogout = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const IconExternal = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const tabs: { id: Tab; label: string; Icon: React.FC }[] = [
  { id: 'bookings', label: 'Buchungen', Icon: IconBookings },
  { id: 'calendar', label: 'Kalender',  Icon: IconCalendar },
  { id: 'reviews',  label: 'Bewertungen', Icon: IconReviews },
  { id: 'cms',      label: 'Inhalte',   Icon: IconCMS },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('bookings');
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-b)', color: 'var(--text)' }}>
      <nav style={{
        background: 'rgba(8,10,20,.97)', borderBottom: '1px solid rgba(255,255,255,.07)',
        padding: '0', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(20px)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', gap: '8px', height: '56px' }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: 'var(--font-d)', fontSize: '18px', letterSpacing: '.12em', whiteSpace: 'nowrap' }}>
              DJ RAPH<span style={{ color: 'var(--cyan)' }}>X</span>
              <span style={{ color: 'rgba(255,255,255,.25)', fontSize: '11px', fontFamily: 'var(--font-b)', letterSpacing: '.25em', textTransform: 'uppercase', marginLeft: '10px', fontWeight: 500 }}>Admin</span>
            </span>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', alignItems: 'stretch', gap: '2px' }}>
            {tabs.map(({ id, label, Icon }) => {
              const active = tab === id;
              return (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '7px',
                    padding: '0 16px', height: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: active ? '2px solid var(--cyan)' : '2px solid transparent',
                    color: active ? 'var(--cyan)' : 'rgba(255,255,255,.4)',
                    fontSize: '12px', fontWeight: active ? 600 : 400,
                    letterSpacing: '.08em', textTransform: 'uppercase',
                    cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'color .15s, border-color .15s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,.7)'; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,.4)'; }}
                >
                  <Icon />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <a
              href="/"
              target="_blank"
              style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'rgba(255,255,255,.3)', letterSpacing: '.1em', textTransform: 'uppercase', textDecoration: 'none', padding: '6px 10px', borderRadius: '6px', transition: 'color .15s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,.6)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.3)'}
            >
              Webseite <IconExternal />
            </a>
            <button
              onClick={logout}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 14px', borderRadius: '8px',
                border: '1px solid rgba(255,85,119,.2)',
                background: 'rgba(255,85,119,.06)',
                color: 'rgba(255,120,140,.8)',
                fontSize: '11px', letterSpacing: '.08em', textTransform: 'uppercase',
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'background .15s, border-color .15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,85,119,.12)'; e.currentTarget.style.borderColor = 'rgba(255,85,119,.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,85,119,.06)'; e.currentTarget.style.borderColor = 'rgba(255,85,119,.2)'; }}
            >
              <IconLogout />
              Abmelden
            </button>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '36px 24px' }}>
        {tab === 'bookings' && <AdminBookings />}
        {tab === 'calendar' && <AdminCalendar />}
        {tab === 'reviews'  && <AdminReviews />}
        {tab === 'cms'      && <AdminCMS />}
      </main>
    </div>
  );
}
