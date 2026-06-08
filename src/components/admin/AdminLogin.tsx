'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || 'Falsches Passwort');
      setLoading(false);
    }
  };

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg)',fontFamily:'var(--font-b)'}}>
      <div style={{width:'100%',maxWidth:'400px',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'40px'}}>
          <div style={{fontFamily:'var(--font-d)',fontSize:'32px',letterSpacing:'.1em',color:'var(--text)',marginBottom:'8px'}}>
            DJ RAPH<span style={{color:'var(--cyan)'}}>X</span>
          </div>
          <p style={{color:'var(--muted)',fontSize:'13px',letterSpacing:'.2em',textTransform:'uppercase'}}>Admin Bereich</p>
        </div>
        <div style={{background:'linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,.005))',border:'1px solid var(--border)',borderRadius:'var(--rl)',padding:'32px'}}>
          <form onSubmit={handleLogin}>
            <div className="field" style={{marginBottom:'20px'}}>
              <label htmlFor="pw">Passwort</label>
              <input
                type="password"
                id="pw"
                value={pw}
                onChange={e => setPw(e.target.value)}
                placeholder="Admin-Passwort"
                autoFocus
                style={{color:'var(--text)'}}
              />
            </div>
            {error && <p style={{color:'#ff7a93',fontSize:'13px',marginBottom:'16px'}}>{error}</p>}
            <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center'}} disabled={loading}>
              {loading ? 'Anmelden …' : 'Anmelden'}
            </button>
          </form>
        </div>
        <p style={{textAlign:'center',marginTop:'20px',fontSize:'12px',color:'var(--muted)'}}>
          <a href="/" style={{color:'var(--cyan)'}}>← Zurück zur Webseite</a>
        </p>
      </div>
    </div>
  );
}
