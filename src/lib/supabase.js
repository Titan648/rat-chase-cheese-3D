import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tgrgiiflocfxodfxdvtv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRncmdpaWZsb2NmeG9kZnhkdnR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MjUzNTksImV4cCI6MjA3ODQwMTM1OX0.zVjpeB8CjDxhWMSLF27IX5NwhkEMREgMeiMEtrkRmx8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
