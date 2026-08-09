import dotenv from 'dotenv';

dotenv.config();

let cachedClient: any = null;

export const getSupabase = () => {
  if (!cachedClient) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing Supabase credentials. Add SUPABASE_URL and SUPABASE_ANON_KEY to .env');
      return null;
    }

    try {
      const { createClient } = require('@supabase/supabase-js');
      cachedClient = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      });
    } catch (error: any) {
      console.error('Failed to load Supabase SDK:', error.message);
      return null;
    }
  }

  return cachedClient;
};

export default getSupabase;
