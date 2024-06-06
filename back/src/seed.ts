import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const seedUsers = async () => {
  const users = [
    { fullName: 'John Doe', role: 'user', status: 'Activated', start_time: '08:00:00', end_time: '17:00:00' },
    { fullName: 'Jane Smith', role: 'user', status: 'Activated', start_time: '09:00:00', end_time: '18:00:00' },
    { fullName: 'Bob Johnson', role: 'user', status: 'Activated', start_time: '07:30:00', end_time: '16:30:00' },
    { fullName: 'Alex Inox', role: 'user', status: 'Deactivated', start_time: '07:30:00', end_time: '16:30:00' },
    { fullName: 'Bob Marley', role: 'user', status: 'Deactivated', start_time: '07:30:00', end_time: '16:30:00' },
    { fullName: 'Sam Sulek', role: 'user', status: 'Deactivated', start_time: '07:30:00', end_time: '16:30:00' },
    { fullName: 'Nithan Carlson', role: 'user', status: 'Activated', start_time: null, end_time: null },
  ];

  for (const user of users) {
    const { error } = await supabase.from('User').insert([user]);
    if (error) {
      console.error('Error inserting user:', user, error.message);
    } else {
      console.log('Inserted user:', user.fullName);
    }
  }
};

export const seedDoorHistory = async () => {
  const users = await supabase.from('User').select('*');

  const doorHistory = [];
  if (users.data) {
    for (let i = 0; i < 100; i++) {
      const randomUser = users.data[Math.floor(Math.random() * users.data.length)];
      const captureDate = new Date();
      captureDate.setDate(captureDate.getDate() - i);
      const action = i % 2 === 0 ? 'GRANTED' : 'FORBIDDEN';
  
      const historyEntry = {
        capture_date: captureDate.toISOString(),
        action: action,
        image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        user_id: randomUser.id,
      };
      doorHistory.push(historyEntry);
    }
  }

  const { error } = await supabase.from('DoorHistory').insert(doorHistory);
  if (error) {
    console.error('Error inserting door history:', error.message);
  } else {
    console.log(`Inserted ${doorHistory.length} rows in door history`);
  }
};