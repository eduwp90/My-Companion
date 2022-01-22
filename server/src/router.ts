const router = require("express").Router();
// const controller = require("../controllers/controller");
import { saveRemainder } from "./controllers/jobs.controller";

router.post("/reminders", saveRemainder);

export default router;