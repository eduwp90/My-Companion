import type { Request, Response } from "express";
import { createReminder } from "../jobs/reminder.job";
// const jobs = require("../../jobs/jobs");

export function saveRemainder (req: Request, res: Response) {
  try {
    console.log(req.body);
    createReminder(req.body);
    res.status(201);
    res.send(req.body);
  } catch (e) {
    console.log('e', e);
    res.sendStatus(500);
  }
}
