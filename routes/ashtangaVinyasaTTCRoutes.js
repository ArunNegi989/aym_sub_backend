const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const controller = require("../controllers/coursecontrollers/ashtangaVinyasaTTCController");

router.post(
  "/create",
  upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "promoImage", maxCount: 1 },
    { name: "courseDetailsImage", maxCount: 1 },
    { name: "whoCanApplyVideo", maxCount: 1 },
    { name: "certTeachersImage", maxCount: 1 },
    { name: "communityImage", maxCount: 1 },
    { name: "accommodationImage", maxCount: 1 },
  ]),
  controller.create
);

router.get("/", controller.getSingle);

router.put(
  "/update",
  upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "promoImage", maxCount: 1 },
    { name: "courseDetailsImage", maxCount: 1 },
    { name: "whoCanApplyVideo", maxCount: 1 },
    { name: "certTeachersImage", maxCount: 1 },
    { name: "communityImage", maxCount: 1 },
    { name: "accommodationImage", maxCount: 1 },
  ]),
  controller.update
);

router.delete("/", controller.delete);

module.exports = router;