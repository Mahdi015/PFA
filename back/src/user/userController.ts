import { Request, Response } from 'express';
import supabase from '../supabaseClient';

export const getUsers = async (req: Request, res: Response) => {
    const { data: users, error } = await supabase.from('User').select('*');
    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      res.json(users);
    }
  };

