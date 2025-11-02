// Supabase anon key and URL are public client values — put them in config.js or .env and do not commit service_role keys.
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Avoid throwing at import time so the app doesn't fully crash when env vars
// are not set (for example, when deployed to GitHub Pages without a build
// step that injects VITE_* variables). We still warn the developer and
// provide a lightweight stub client that surfaces helpful errors when used.
let _supabase;
if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    'Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your build environment.'
  );

  // Minimal stub that mirrors the supabase client surface used in this app.
  _supabase = {
    from: () => ({ insert: async () => ({ error: new Error('Supabase not configured') }) }),
    rpc: async () => ({ error: new Error('Supabase not configured') }),
    channel: () => ({ on: () => ({}) , subscribe: () => ({}) }),
    removeChannel: () => {},
  } as unknown as ReturnType<typeof createClient>;
} else {
  _supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = _supabase;

// Configurable badWords array in code/DB — sanitize before saving (replace with '***').
export const badWords = [
  'badword1',
  'badword2',
  'offensive',
  // Add more words as needed
];

// Linkless reviews: client uses regex /(https?:\/\/|www\.)/i to reject URLs. Server policies also reject them.
export const containsUrl = (text: string): boolean => {
  return /(https?:\/\/|www\.)/i.test(text);
};

export const sanitizeBadWords = (text: string): string => {
  let sanitized = text;
  badWords.forEach(word => {
    const regex = new RegExp(word, 'gi');
    sanitized = sanitized.replace(regex, '***');
  });
  return sanitized;
};
