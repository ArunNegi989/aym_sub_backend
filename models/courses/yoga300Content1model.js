// backend/models/courses/yoga300Content1model.js

const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  num: Number,
  label: String,
  title: String,
  content: String,
  subTitle: String,
  listItems: [String],
  twoCol: Boolean,
});

const overviewSchema = new mongoose.Schema({
  label: String,
  value: String,
  multiline: Boolean,
});

// ADD THIS NEW SCHEMA
const thumbnailSchema = new mongoose.Schema({
  src: String,
  alt: String,
});

const yoga300Content1Schema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    status: { type: String, default: "Active" },

    pageMainH1: String,
    heroImage: String,
    heroImgAlt: String,

    introParagraphs: [String],
    topSectionH2: String,
    topParagraphs: [String],

    overviewH2: String,
    overviewFields: [overviewSchema],

    upcomingDatesH3: String,
    upcomingDatesSubtext: String,

    feeIncludedTitle: String,
    includedFee: [String],

    feeNotIncludedTitle: String,
    notIncludedFee: [String],

    syllabusH2: String,
    syllabusIntro: String,

    modules: [moduleSchema],

    // ===== ADD THESE 3 NEW FIELDS =====
    rightSideImage: { type: String, default: "" },
    rightSideImageAlt: { type: String, default: "" },
    bottomThumbnails: [thumbnailSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Yoga300Content1", yoga300Content1Schema);