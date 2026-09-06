import { useState } from 'react';

export default function Login({ onLogin }) {
    const [pwd, setPwd] = useState('');
    const [error, setError] = useState(false);

    const submit = e => {
        e.preventDefault();
        if (pwd === import.meta.env.VITE_ADMIN_PASSWORD || !import.meta.env.VITE_ADMIN_PASSWORD) {
            sessionStorage.setItem('admin_pwd', pwd);
            sessionStorage.setItem('admin_exp', String(Date.now() + 3600000));
            onLogin();
        } else {
            setError(true);
            setPwd('');
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '120px auto', padding: 30, background: '#fff', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginTop: 0 }}>Admin Access</h2>
            <p style={{ color: '#555', marginBottom: 20 }}>Enter the master password to edit site content.</p>
            <form onSubmit={submit}>
                <div className="fld" style={{ marginBottom: 20 }}>
                    <label>Password</label>
                    <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} required />
                    {error && <p className="err" style={{ display: 'block' }}>Incorrect password.</p>}
                </div>
                <button className="btn btn-p" style={{ width: '100%' }} type="submit">Log in</button>
            </form>
        </div>
    );
}
