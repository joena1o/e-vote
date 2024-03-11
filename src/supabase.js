
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://uzcpjimscgomsmbxorho.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6Y3BqaW1zY2dvbXNtYnhvcmhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NTYzNDIsImV4cCI6MjAyNTIzMjM0Mn0.dVyPkk0vMOEWRqwPGONn_H0vI16Kh81mo3lEKT6xI2I';

export const supabase = createClient(supabaseUrl, supabaseKey);
        