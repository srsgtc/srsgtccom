import { useState, useEffect } from 'react';
import { NavLink, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './Login';
import PageEditor from './PageEditor';
import { useSiteContent } from '../content/SiteContentProvider';

export default function Admin() {
    const [auth, setAuth] = useState(false);
    const { saving } = useSiteContent();

    useEffect(() => {
        const pwd = sessionStorage.getItem('admin_pwd');
        const exp = sessionStorage.getItem('admin_exp');
        if (pwd && exp && Date.now() < Number(exp)) {
            setAuth(true);
        }
    }, []);

    if (!auth) return <Login onLogin={() => setAuth(true)} />;

    const navLinkStyle = ({ isActive }) => ({
        display: 'block',
        padding: '8px 12px',
        borderRadius: 4,
        color: isActive ? '#fff' : '#aaa',
        background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
        textDecoration: 'none',
        fontWeight: isActive ? '600' : '400'
    });

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f5', fontFamily: 'system-ui, sans-serif' }}>
            <aside style={{ width: 240, background: '#1c2530', color: '#fff', padding: 24, display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontSize: 20, marginBottom: 32, color: '#FF7315', marginTop: 0 }}>Content Admin</h2>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <NavLink to="/admin/sitewide" style={navLinkStyle}>Sitewide</NavLink>
                    <NavLink to="/admin/home" style={navLinkStyle}>Home</NavLink>
                    <NavLink to="/admin/about" style={navLinkStyle}>About</NavLink>
                    <NavLink to="/admin/services" style={navLinkStyle}>Services</NavLink>
                    <NavLink to="/admin/projects" style={navLinkStyle}>Projects</NavLink>
                    <NavLink to="/admin/contact" style={navLinkStyle}>Contact</NavLink>
                </nav>
                <div style={{ marginTop: 'auto' }}>
                    <Link to="/" target="_blank" style={{ color: '#888', textDecoration: 'none', fontSize: 13, display: 'block', padding: 8 }}>↗ View Live Site</Link>
                </div>
            </aside>

            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
                <header style={{ background: '#fff', padding: '16px 32px', borderBottom: '1px solid #e1e4e8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <span style={{ color: saving ? '#FF7315' : '#10b981', fontWeight: 500, fontSize: 14 }}>
                            {saving ? '↻ Saving to Supabase...' : '✓ All changes saved.'}
                        </span>
                    </div>
                    <button onClick={() => {
                        sessionStorage.clear();
                        setAuth(false);
                    }} style={{ background: 'transparent', border: '1px solid #ddd', padding: '6px 12px', borderRadius: 4, cursor: 'pointer' }}>
                        Log Out
                    </button>
                </header>
                <div style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
                    <Routes>
                        <Route path="/admin" element={<Navigate to="/admin/sitewide" replace />} />
                        <Route path="/admin/:pageKey" element={<PageEditor />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}
