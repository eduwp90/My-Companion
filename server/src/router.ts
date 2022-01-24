const router = require("express").Router();
import { saveRemainder } from "./controllers/jobs.controller";

router.post("/reminders", saveRemainder);

export default router;