const { createClient } = require('@supabase/supabase-js');


const supabaseUrl = process.env.SUPABASE_URL_CLOUD;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY_CLOUD;


// const supabaseUrl = 'https://yvhzgbihioimlvrebfed.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2aHpnYmloaW9pbWx2cmViZmVkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NzU4NTE0NCwiZXhwIjoyMDAzMTYxMTQ0fQ.y3ndev1RwDTOTRU-DdZfvJiir-9k3GyqoaCkq4iHoks';

const supabase = createClient(supabaseUrl, supabaseKey)


module.exports = supabase;