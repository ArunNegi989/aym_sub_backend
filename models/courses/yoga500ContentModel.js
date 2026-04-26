const mongoose = require("mongoose");

// Clear cache if model exists
if (mongoose.models.Yoga500Content) {
  delete mongoose.models.Yoga500Content;
}

// Schema for intro items
const IntroItemSchema = new mongoose.Schema({
  paragraph: { type: String, required: true },
  media: { type: String, default: "" },
  mediaAlt: { type: String, default: "" },
  mediaType: { type: String, enum: ["image", "video"], default: "image" },
});

// Schema for stand apart stats
const StandApartStatSchema = new mongoose.Schema({
  num: { type: String, default: "" },
  label: { type: String, default: "" },
});

// Syllabus module schema
const SyllabusModuleSchema = new mongoose.Schema({
  label: { type: String, default: "" },
  text: { type: String, default: "" },
});

// Review schema
const ReviewSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  platform: { type: String, default: "" },
  initial: { type: String, default: "" },
  rating: { type: Number, default: 5 },
  text: { type: String, default: "" },
});

// Course Info Card Details Schema
const CourseInfoDetailSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  sub: { type: String, default: "" },
});

const Yoga500Schema = new mongoose.Schema(
  {
    // Basic Info
    slug: { type: String, required: true, unique: true, default: "500-hour-yoga-teacher-training-india" },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },

    // Hero Section
    pageMainH1: { type: String, default: "500 Hour Yoga Teacher Training Course in Rishikesh" },
    heroImgAlt: { type: String, default: "Yoga Students Group" },
    heroImage: { type: String, default: "" },

    // Images
    shivaImage: { type: String, default: "" },
    evalImage: { type: String, default: "" },
    evalImageAlt: { type: String, default: "Evaluation process" },

    // Section Headings
    standApartH2: { type: String, default: "What makes AYM School's Yoga Teachers Training Courses stand apart from the rest?" },
    gainsH2: { type: String, default: "What do I gain from the 500 Hour Yoga Teacher Training Course in Rishikesh?" },
    seatSectionH2: { type: String, default: "500 Hour Yoga Teacher Training India – Upcoming Batches" },
    seatSectionSubtext: { type: String, default: "" },
    credibilityH2: { type: String, default: "What is The Credibility of This Course?" },
    durationH2: { type: String, default: "How Long is The Duration of The Course?" },
    syllabusH2: { type: String, default: "Overview of Syllabus" },
    eligibilityH3: { type: String, default: "What are the Eligibility Criteria?" },
    evaluationH3: { type: String, default: "Is there an Evaluation Process for the Course?" },
    includedTitle: { type: String, default: "Included in the package of 500-Hour Courses in India" },
    includedNote: { type: String, default: "" },
    notIncludedTitle: { type: String, default: "Not Included" },
    fictionH3: { type: String, default: "500 Hour Yoga Teacher Training in Rishikesh, India: Separating Fact from Fiction" },
    reviewsSectionH2: { type: String, default: "Student's Reviews" },
    refundH3: { type: String, default: "What are the Refund Rules for the Course Fee?" },
    refundPara: { type: String, default: "" },
    applyH3: { type: String, default: "How to Apply for the Course?" },
    applyPara: { type: String, default: "" },
    indianFeeH3: { type: String, default: "500 Hour Course Fee for Indian Students" },

    // Table Notes
    tableNoteText: { type: String, default: "" },
    tableNoteEmail: { type: String, default: "" },
    tableNoteAirportText: { type: String, default: "" },

    // Content Arrays
    introItems: [IntroItemSchema],
    introParas: [String],
    standApartParas: [String],
    gainsParas: [String],
    credibilityParas: [String],
    durationParas: [String],
    syllabusParas: [String],
    eligibilityParas: [String],
    evaluationParas: [String],
    fictionParas: [String],
    includedItems: [String],
    notIncludedItems: [String],
    indianFees: [String],
    syllabusModules: [SyllabusModuleSchema],
    reviews: [ReviewSchema],
    accomImages: [String],
    foodImages: [String],

    // NEW FIELDS - Stand Apart Section
    standApartPills: { type: [String], default: [] },
    standApartStats: { type: [StandApartStatSchema], default: [] },

    // NEW FIELDS - Gains Section
    imgBadgeText: { type: String, default: "500 Hr Advanced TTC" },

    // NEW FIELDS - Video Section
    videoUrl: { type: String, default: "" },
    videoBadgeText: { type: String, default: "✦ Featured Video ✦" },
    videoTitle: { type: String, default: "Experience the Journey of 500 Hour Yoga Teacher Training" },
    videoSubtitle: { type: String, default: "Watch Our Students' Transformation" },

    // NEW FIELDS - Course Info Card
    courseInfoDetails: { type: [CourseInfoDetailSchema], default: [
      { label: "DURATION", value: "24 Days", sub: "" },
      { label: "LEVEL", value: "Advanced", sub: "" },
      { label: "CERTIFICATION", value: "500 Hour", sub: "" },
      { label: "YOGA STYLE", value: "Multistyle", sub: "Ashtanga, Vinyasa & Hatha" },
      { label: "LANGUAGE", value: "English & Hindi", sub: "" },
      { label: "DATE", value: "Check batches below", sub: "" },
    ] },
    courseInfoCardTitle: { type: String, default: "COURSE DETAILS" },
    courseInfoFeeLabel: { type: String, default: "COURSE FEE" },
    courseInfoFeeFromText: { type: String, default: "starting from" },
    courseInfoBookBtnText: { type: String, default: "BOOK NOW" },
    courseInfoOriginalPriceMultiplier: { type: Number, default: 1.8 },
    
    // NEW FIELDS - Course Info Card Pricing (Independent of seats)
    courseInfoUsdPrice: { type: Number, default: 1649 },
    courseInfoInrPrice: { type: Number, default: 135000 },
    courseInfoOriginalUsdPrice: { type: Number, default: 2950 },
    courseInfoOriginalInrPrice: { type: Number, default: 240000 },
  },
  { 
    timestamps: true 
  }
);

// Create the model
const Yoga500Content = mongoose.model("Yoga500Content", Yoga500Schema);

module.exports = Yoga500Content;