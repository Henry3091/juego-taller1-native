import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oykzaaaunfswivrnoyse.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95a3phYWF1bmZzd2l2cm5veXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNjg2OTUsImV4cCI6MjA2Nzk0NDY5NX0.Gmy-U9OnDHZxSCaTGO9RbreQD_R3jpf3l01UIbOm1Ds'; // No pongas la secreta

export const supabase = createClient(supabaseUrl, supabaseAnonKey);