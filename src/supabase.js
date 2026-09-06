import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function fetchContent() {
    const { data, error } = await supabase.from('site_content').select('content').eq('id', 1).maybeSingle();
    if (error) {
        console.error('Error fetching content:', error);
        return null;
    }
    return data ? data.content : {};
}

export async function saveContent(content, pwd) {
    if (!pwd) {
        console.error('Save error: no admin password provided');
        return false;
    }
    try {
        const { data, error } = await supabase.rpc('update_site_content', {
            new_content: content,
            admin_pwd: pwd
        });

        if (error) {
            console.error('Save error:', error);
            return false;
        }
        return data === true;
    } catch (err) {
        console.error('Function error:', err);
        return false;
    }
}
export async function uploadImage(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    return data.publicUrl;
}

export async function supabaseKeepAlive() {
    try {
        const { error } = await supabase
            .from('site_content')
            .select('id')
            .limit(1);

        if (error) {
            console.error('Supabase keep-alive failed:', error);
            return false;
        }

        console.log('Supabase keep-alive successful:', new Date().toISOString());
        return true;
    } catch (err) {
        console.error('Supabase keep-alive error:', err);
        return false;
    }
}
