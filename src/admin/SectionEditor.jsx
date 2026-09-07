import { useState, useEffect } from 'react';
import { useSiteContent } from '../content/SiteContentProvider';
import { uploadImage } from '../supabase';

function FieldEditor({ field, value, onChange }) {
    if (field.type === 'object') {
        const objVal = (value && typeof value === 'object') ? value : {};
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 16, border: '1px solid #e5e7eb', background: '#f9fafb', borderRadius: 4 }}>
                {field.objectFields && field.objectFields.map(of => (
                    <div key={of.name}>
                        <label style={{ display: 'block', fontSize: 12, marginBottom: 6, fontWeight: 500, color: '#374151' }}>{of.label}</label>
                        <FieldEditor
                            field={of}
                            value={objVal[of.name]}
                            onChange={v => {
                                onChange({ ...objVal, [of.name]: v });
                            }}
                        />
                    </div>
                ))}
            </div>
        );
    }

    if (field.type === 'textarea') {
        return (
            <textarea
                style={{ width: '100%', minHeight: 120, padding: 10, fontFamily: 'inherit', border: '1px solid #ccc', borderRadius: 4, lineHeight: 1.5 }}
                value={value || ''}
                onChange={e => onChange(e.target.value)}
            />
        );
    }

    if (field.type === 'image') {
        const [uploading, setUploading] = useState(false);
        return (
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                {value && <img src={value} style={{ height: 100, maxWidth: 200, objectFit: 'contain', background: '#e5e7eb', borderRadius: 4 }} alt="" />}
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'block', marginBottom: 8 }}
                        onChange={async e => {
                            const f = e.target.files?.[0];
                            if (!f) return;
                            setUploading(true);
                            try {
                                const url = await uploadImage(f);
                                if (url) onChange(url);
                            } catch (err) {
                                alert('Upload failed: ' + err.message);
                            } finally {
                                setUploading(false);
                            }
                        }}
                    />
                    {uploading && <span style={{ fontSize: 12, color: '#f59e0b', fontWeight: 600 }}>Uploading...</span>}
                </div>
            </div>
        );
    }

    if (field.type === 'list') {
        const listVal = Array.isArray(value) ? value : [];
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {listVal.map((item, idx) => (
                    <div key={idx} style={{ padding: 16, border: '1px solid #e5e7eb', background: '#f9fafb', borderRadius: 4 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #e5e7eb' }}>
                            <strong style={{ fontSize: 13, color: '#4b5563' }}>Item {idx + 1}</strong>
                            <button
                                onClick={() => {
                                    const n = [...listVal];
                                    n.splice(idx, 1);
                                    onChange(n);
                                }}
                                style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}
                            >Remove</button>
                        </div>
                        {field.itemFields && field.itemFields.map(isf => (
                            <div key={isf.name} style={{ marginBottom: 12 }}>
                                <label style={{ display: 'block', fontSize: 12, marginBottom: 6, fontWeight: 500, color: '#374151' }}>{isf.label}</label>
                                <FieldEditor
                                    field={isf}
                                    value={item[isf.name]}
                                    onChange={v => {
                                        const n = [...listVal];
                                        n[idx] = { ...n[idx], [isf.name]: v };
                                        onChange(n);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                ))}
                <div>
                    <button
                        onClick={() => {
                            const newItem = {};
                            if (field.itemFields) field.itemFields.forEach(isf => newItem[isf.name] = '');
                            onChange([...listVal, newItem]);
                        }}
                        style={{ padding: '8px 16px', background: '#fff', border: '1px solid #d1d5db', borderRadius: 4, cursor: 'pointer', fontWeight: 500, color: '#374151' }}
                    >
                        + Add Item
                    </button>
                </div>
            </div>
        );
    }

    // Default text
    return (
        <input
            type="text"
            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, fontFamily: 'inherit' }}
            value={value || ''}
            onChange={e => onChange(e.target.value)}
        />
    );
}

export default function SectionEditor({ pageKey, secKey, secDef }) {
    const { getSection, updateSection, resetSection } = useSiteContent();
    const liveData = getSection(pageKey, secKey);
    const [localData, setLocalData] = useState(liveData);
    const [dirty, setDirty] = useState(false);

    useEffect(() => {
        if (!dirty) setLocalData(liveData);
    }, [liveData, dirty]);

    const handleChange = (key, val) => {
        setLocalData(prev => ({ ...prev, [key]: val }));
        setDirty(true);
    };

    const handleSave = async () => {
        try {
            await updateSection(pageKey, secKey, localData);
            setDirty(false);
        } catch (err) {
            alert('Save failed: ' + err.message);
        }
    };

    const handleReset = async () => {
        if (confirm('Reset this section to source code defaults?')) {
            try {
                await resetSection(pageKey, secKey);
                setDirty(false);
            } catch (err) {
                alert('Reset failed: ' + err.message);
            }
        }
    };

    return (
        <div style={{ background: '#fff', border: '1px solid #e1e4e8', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <header style={{ background: '#f8f9fa', padding: '12px 24px', borderBottom: '1px solid #e1e4e8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: 16, color: '#111827' }}>{secDef.label}</h3>
                {dirty && <span style={{ color: '#d97706', fontSize: 13, fontWeight: 600 }}>Unsaved changes (Save required to push remote)</span>}
            </header>

            <div style={{ padding: 24 }}>
                {secDef.fields.map(f => (
                    <div key={f.name} style={{ marginBottom: 24 }}>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 14, color: '#374151' }}>
                            {f.label}
                        </label>
                        <FieldEditor
                            field={f}
                            value={localData[f.name]}
                            onChange={val => handleChange(f.name, val)}
                        />
                    </div>
                ))}
            </div>

            <footer style={{ background: '#f9fafb', padding: '16px 24px', borderTop: '1px solid #e1e4e8', display: 'flex', gap: 12 }}>
                <button className="btn btn-p btn-sm" onClick={handleSave} disabled={!dirty} style={{ opacity: dirty ? 1 : 0.5 }}>Save Changes</button>
                <button className="btn btn-g btn-sm" onClick={handleReset}>Reset to Defaults</button>
            </footer>
        </div>
    );
}
