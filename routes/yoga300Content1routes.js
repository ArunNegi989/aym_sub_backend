const express = require("express");
const router = express.Router();
const controller = require("../controllers/coursecontrollers/yoga300Content1controller");
const upload = require("../middleware/upload");

const uploadFields = upload.fields([
  { name: "heroImage", maxCount: 1 },
  { name: "rightSideImage", maxCount: 1 },
  { name: "thumbnail_0", maxCount: 1 },
  { name: "thumbnail_1", maxCount: 1 },
  { name: "thumbnail_2", maxCount: 1 },
  { name: "thumbnail_3", maxCount: 1 },
  { name: "thumbnail_4", maxCount: 1 },
  { name: "thumbnail_5", maxCount: 1 },
]);

router.post("/create", uploadFields, controller.create);
router.get("/", controller.get);
router.get("/:id", controller.getSingle);
router.put("/update/:id", uploadFields, controller.update);
router.delete("/delete/:id", controller.delete);

module.exports = router;