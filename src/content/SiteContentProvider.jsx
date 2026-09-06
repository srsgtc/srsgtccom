import { createContext, useContext, useState, useEffect } from 'react';
import { fetchContent, saveContent } from '../supabase';
import { SCHEMA } from './schema';

const SiteContentContext = createContext();

export function useSiteContent() {
    return useContext(SiteContentContext);
}

// Deep merge helper that fully replaces arrays
function deepMerge(target, source) {
    if (typeof target !== 'object' || target === null) return source;
    if (typeof source !== 'object' || source === null) return target;
    if (Array.isArray(target) && Array.isArray(source)) return source;

    const output = { ...target };
    Object.keys(source).forEach(key => {
        if (source[key] !== undefined) {
            if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                output[key] = deepMerge(target[key], source[key]);
            } else {
                output[key] = source[key];
            }
        }
    });
    return output;
}

function extractDefaults() {
    const defaults = {};
    for (const [pageKey, pageDef] of Object.entries(SCHEMA)) {
        defaults[pageKey] = {};
        for (const [secKey, secDef] of Object.entries(pageDef.sections)) {
            defaults[pageKey][secKey] = secDef.defaultContent;
        }
    }
    return defaults;
}

const DEFAULT_TREE = extractDefaults();

export function SiteContentProvider({ children }) {
    const [dbData, setDbData] = useState(() => {
        try {
            const cached = localStorage.getItem('srs-content-cache');
            return cached ? JSON.parse(cached) : {};
        } catch { return {}; }
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                const data = await fetchContent();
                if (data && Object.keys(data).length > 0) {
                    setDbData(data);
                    localStorage.setItem('srs-content-cache', JSON.stringify(data));
                } else if (data) {
                    setDbData((prev) => deepMerge(prev, data));
                }
            } catch (err) {
                console.error("Failed to load content from Supabase", err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const content = deepMerge(DEFAULT_TREE, dbData);

    const getPage = (pageKey) => content[pageKey] || {};
    const getSection = (pageKey, sectionKey) => (content[pageKey] || {})[sectionKey] || {};

    const getAdminPwd = () => sessionStorage.getItem('admin_pwd');

    const saveContentFull = async (newData) => {
        setSaving(true);
        try {
            const updatedDbData = deepMerge(dbData, newData);
            const ok = await saveContent(updatedDbData, getAdminPwd());
            if (!ok) {
                throw new Error('Save failed — content was not written to Supabase (check that you are logged in as admin).');
            }
            setDbData(updatedDbData);
            localStorage.setItem('srs-content-cache', JSON.stringify(updatedDbData));
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            setSaving(false);
        }
    };

    const updateSection = (pageKey, secKey, data) => {
        const newData = { [pageKey]: { [secKey]: data } };
        return saveContentFull(newData);
    };

    const resetSection = (pageKey, secKey) => {
        const newDbData = { ...dbData };
        if (newDbData[pageKey] && newDbData[pageKey][secKey]) {
            const pageClone = { ...newDbData[pageKey] };
            delete pageClone[secKey];
            newDbData[pageKey] = pageClone;
        }
        setSaving(true);
        return saveContent(newDbData, getAdminPwd())
            .then((ok) => {
                if (!ok) {
                    throw new Error('Save failed — content was not written to Supabase (check that you are logged in as admin).');
                }
                setDbData(newDbData);
                localStorage.setItem('srs-content-cache', JSON.stringify(newDbData));
            })
            .finally(() => setSaving(false));
    };

    return (
        <SiteContentContext.Provider value={{
            content, getPage, getSection, updateSection, resetSection, loading, saving
        }}>
            {children}
        </SiteContentContext.Provider>
    );
}
