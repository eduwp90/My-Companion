import { Request, Response } from "express";
// import { createReminder } from "../../jobs/jobs";
const jobs = require("../../jobs/jobs");

export function saveRemainder (req: Request, res: Response) {
  try {
    console.log(req.body);
    jobs.createReminder(req.body);
    res.status(201);
    res.send(req.body);
  } catch (e) {
    console.log('e', e);
    res.sendStatus(500);
  }
}
