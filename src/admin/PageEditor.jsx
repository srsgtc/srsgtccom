import { useParams } from 'react-router-dom';
import { SCHEMA } from '../content/schema';
import SectionEditor from './SectionEditor';

export default function PageEditor() {
    const { pageKey } = useParams();
    const schema = SCHEMA[pageKey];

    if (!schema) return <div style={{ padding: 40, color: '#666' }}>Page not found in schema: {pageKey}</div>;

    return (
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h1 style={{ marginTop: 0, marginBottom: 8, fontSize: 24, color: '#222' }}>{schema.label}</h1>
            <p style={{ color: '#666', marginBottom: 32, fontSize: 15 }}>Edit content for the {schema.label} view.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                {Object.entries(schema.sections).map(([secKey, secDef]) => (
                    <SectionEditor
                        key={`${pageKey}-${secKey}`}
                        pageKey={pageKey}
                        secKey={secKey}
                        secDef={secDef}
                    />
                ))}
            </div>
        </div>
    );
}
