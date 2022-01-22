const router = require("express").Router();
const controller = require("../controllers/controller");

router.post("/reminders", controller.saveRemainder);

export default router;