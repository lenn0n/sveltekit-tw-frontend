
import { createClient } from "@supabase/supabase-js";
// const supabaseUrl = process.env.SUPABASE_URL; 
// const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient('https://hvnydrfnekqopyjrvgsv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2bnlkcmZuZWtxb3B5anJ2Z3N2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2NDAzNTIsImV4cCI6MjA0NDIxNjM1Mn0.W9Iavv4b17rgF0WkUXI9p4wRcZdydWbgJn5bAakpka8');
// console.log(supabaseUrl)
export default supabase
