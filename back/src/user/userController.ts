import { Request, Response } from "express";
import supabase from "../supabaseClient";

export const getUsers = async (req: Request, res: Response) => {
  const { data: users, error } = await supabase.from("User").select("*");
  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.json(users);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const { error } = await supabase.from("User").delete().eq("id", id);

    if (error) {
      throw error;
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    console.log('HERE')
    res.status(400).json({ error: error.message });
  }
};

export const addUser = async (req: Request, res: Response) => {
  const { fullName } = req.body;

  if (!fullName) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const { error } = await supabase
      .from("User")
      .insert({ fullName, status: "Activated" });

    if (error) {
      throw error;
    }

    res.status(200).json({ message: "User added successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { fullName, status, userId, start_time, end_time } = req.body;

  if (!req.body) {
    return res.status(400).json({ error: "Fiels missing" });
  }

  try {
    const { error } = await supabase
      .from("User")
      .update({ fullName, status, start_time: start_time?.length > 0 ? start_time : null, end_time: end_time?.length > 0 ? end_time : null })
      .eq("id", userId);

    if (error) {
      throw error;
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
