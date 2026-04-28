// backend/models/courses/yoga300Content2model.js
const mongoose = require("mongoose");

const yoga300Content2Schema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },

    // Evolution Section - WITH DYNAMIC RIGHT IMAGE
    evolutionH2: String,
    evolutionParas: [String],
    evolutionRightImage: { type: String, default: "" },
    evolutionRightImageAlt: { type: String, default: "" },
    evolutionBadgeText: { type: String, default: "Yoga Alliance" },
    evolutionBadgeSubtext: { type: String, default: "RYT 500 Certified" },

    // Mark Distribution
    markDistH3: String,
    markDistSubText: String,
    markTotalLabel: String,
    markTotalText: String,
    markTheoryLabel: String,
    markTheoryText: String,
    markPracticalLabel: String,
    markPracticalText: String,
    markPracticalDetail: String,

    // Career
    careerH3: String,
    careerItems: [String],

    // Fee Cards
    feeCard1Title: String,
    feeCard1Items: [String],
    feeCard2Title: String,
    feeCard2Items: [String],

    // FAQ
    faqH2: String,
    faqItems: [
      {
        question: String,
        answer: String,
      },
    ],

    // Accommodation / Food
    accomH3: String,
    accomImages: [String],
    foodH3: String,
    foodImages: [String],

    // Luxury
    luxuryH2: String,
    luxuryFeatures: [String],
    luxuryImages: [String],
    yogaGardenImage: String,

    // Features & Schedule
    featuresH2: String,
    featuresList: [String],
    scheduleH3: String,
    scheduleItems: [
      {
        time: String,
        activity: String,
      },
    ],
    scheduleImages: [String],

    // Learning
    learningH2: String,
    learningItems: [String],

    // Eligibility
    eligibilityH2: String,
    eligibilityTag: String,
    eligibilityParas: [String],

    // Evaluation
    evaluationH2: String,
    evaluationParas: [String],

    // Ethics
    ethicsH2: String,
    ethicsParas: [String],
    ethicsQuote: String,
    ethicsNaturalisticPara: String,
    ethicsRules: [String],
    diplomaImage: String,

    // Misconceptions
    misconH2: String,
    misconParas: [String],
    misconItems: [String],

    // Reviews
    reviewsH2: String,
    reviewsSubtext: String,
    reviews: [
      {
        name: String,
        role: String,
        rating: Number,
        text: String,
      },
    ],

    // YouTube
    youtubeVideos: [
      {
        id: String,
        title: String,
        type: { type: String, enum: ["url", "file"] },
        videoId: String,
        videoFile: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Yoga300Content2", yoga300Content2Schema);