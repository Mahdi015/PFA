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
  try {
    const { error } = await supabase
      .from("User")
      .insert({ ...req.body });

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

export const getStats = async (req: Request, res: Response) => {
  const { data: users, error } = await supabase.from("User").select(`
            *,
            DoorHistory (
                id,
                action,
                capture_date
            )
        `);

  const getStatistics = (data: any) => {
    const stats = {
      user_count: 0,
      granted_count: 0,
      forbidden_count: 0,
      active_user_count: 0,
      capture_date_distribution: {},
      capture_last_7_days: 0,
    } as any;

    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    data.forEach((user: any) => {
      stats.user_count += 1;
      if (user.status === "Activated") {
        stats.active_user_count += 1;
      }
      user.DoorHistory.forEach((action: any) => {
        if (action.action === "GRANTED") {
          stats.granted_count += 1;
        } else if (action.action === "FORBIDDEN") {
          stats.forbidden_count += 1;
        }

        // Extract date part from capture_date and count occurrences
        const captureDate = action.capture_date
          ? new Date(action.capture_date.split("T")[0])
          : null;
        if (captureDate) {
          const dateString = captureDate.toISOString().split("T")[0];

          if (stats.capture_date_distribution[dateString]) {
            stats.capture_date_distribution[dateString] += 1;
          } else {
            stats.capture_date_distribution[dateString] = 1;
          }

          // Check if the capture date is within the last 7 days
          if (captureDate >= sevenDaysAgo && captureDate <= now) {
            stats.capture_last_7_days += 1;
          }
        }
      });
    });

    return stats;
  };

const statsData = await getStatistics(users)
  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.json(statsData);
  }
};