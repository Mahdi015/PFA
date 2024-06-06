import { Request, Response } from "express";
import supabase from "../supabaseClient";

export const getDoorHistory = async (req: Request, res: Response) => {
  const { data: users, error } = await supabase.from("DoorHistory").select(`
            *,
            User (
                id,
                fullName
            )
        `);
  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.json(users);
  }
};

export const deleteDoorHistory = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "DoorHistory ID is required" });
  }

  try {
    const { error } = await supabase.from("DoorHistory").delete().eq("id", id);

    if (error) {
      throw error;
    }

    res.status(200).json({ message: "DoorHistory deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// export const addUser = async (req: Request, res: Response) => {
//   const { fullName } = req.body;

//   if (!fullName) {
//     return res.status(400).json({ error: "Username is required" });
//   }

//   try {
//     const { error } = await supabase
//       .from("User")
//       .insert({ fullName, status: "Activated" });

//     if (error) {
//       throw error;
//     }

//     res.status(200).json({ message: "User added successfully" });
//   } catch (error: any) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const updateUser = async (req: Request, res: Response) => {
//   const { fullName, status, userId } = req.body;

//   if (!req.body) {
//     return res.status(400).json({ error: "Fiels missing" });
//   }

//   try {
//     const { error } = await supabase
//       .from("User")
//       .update({ fullName, status })
//       .eq("id", userId);

//     if (error) {
//       throw error;
//     }

//     res.status(200).json({ message: "User updated successfully" });
//   } catch (error: any) {
//     res.status(400).json({ error: error.message });
//   }
// };
