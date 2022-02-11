import type { Request, Response } from "express";
import { createReminder } from "../jobs/reminder.job";

export async function saveRemainder (req: Request, res: Response) {
  try {
    console.log(req.body);
    await createReminder(req.body);
    res.status(201);
    res.send(req.body);
  } catch (error) {
    console.log('error', error);
    res.sendStatus(500);
  }
}
