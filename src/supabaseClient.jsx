import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xetnowppaiqsvtisebkz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhldG5vd3BwYWlxc3Z0aXNlYmt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxNTc1MDksImV4cCI6MjAyOTczMzUwOX0._XYzWxMonaC1iMwgb_A6p4AvA4vM9dh29rg9zWUtkks';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
