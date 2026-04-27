const express = require("express");
const router = express.Router();

const controller = require("../controllers/studentReviewController");

/* =========================
   ROUTES
========================= */

router.post("/create", controller.create);
router.get("/get", controller.getAll);
router.get("/get/:id", controller.getOne);
router.put("/update/:id", controller.update);
router.delete("/delete/:id", controller.delete);

module.exports = router;