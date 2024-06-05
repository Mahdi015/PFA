import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const seedUsers = async () => {
  const users = [
    { fullName: 'John Doe' },
    { fullName: 'Jane Smith' },
    { fullName: 'Bob Johnson' },
  ];

  for (const user of users) {
    const { data, error } = await supabase.from('User').insert([user]);
    if (error) {
      console.error('Error inserting user:', user, error.message);
    } else {
      console.log('Inserted user:', data);
    }
  }
};

seedUsers()
  .then(() => {
    console.log('Seeding completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding error:', error);
    process.exit(1);
  });
