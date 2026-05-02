const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const controller = require("../controllers/coursecontrollers/yoga200controller");

// CREATE
router.post("/create", upload.any(), controller.create);

// GET ALL
router.get("/", controller.getAll);

// GET ONE
router.get("/:id", controller.getOne);

// UPDATE
router.put("/update/:id", upload.any(), controller.update);

// DELETE
router.delete("/delete/:id", controller.delete);

module.exports = router;