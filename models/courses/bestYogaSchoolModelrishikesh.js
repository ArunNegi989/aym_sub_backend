const mongoose = require("mongoose");

const BestYogaSchoolSchema = new mongoose.Schema(
  {
    status: { type: String, default: "Active" },

    heroTitle: String,
    heroImage: String,

    accrSectionTitle: String,
    coursesSectionTitle: String,
    specialtySectionTitle: String,

    bodyParagraphs1: [String],
    bodyParagraphs2: [String],

    accredBadges: Array,
    courseCards: Array,
    specialtyCourses: Array,

    inlineLinks: Array,
    inlineLinks2: Array,

    // Course Info Card Fields
    courseInfoCardTitle: { type: String, default: "COURSE DETAILS" },
    courseInfoFeeLabel: { type: String, default: "COURSE FEE" },
    courseInfoFeeFromText: { type: String, default: "starting from" },
    courseInfoBookBtnText: { type: String, default: "BOOK NOW" },
    courseInfoUsdPrice: { type: Number, default: 999 },
    courseInfoInrPrice: { type: Number, default: 82000 },
    courseInfoOriginalUsdPrice: { type: Number, default: 1799 },
    courseInfoOriginalInrPrice: { type: Number, default: 148000 },
    courseInfoDetails: { type: Array, default: [
      { label: "DURATION", value: "24 Days", sub: "" },
      { label: "LEVEL", value: "Advanced", sub: "" },
      { label: "CERTIFICATION", value: "500 Hour", sub: "" },
      { label: "YOGA STYLE", value: "Multistyle", sub: "Ashtanga, Vinyasa & Hatha" },
      { label: "LANGUAGE", value: "English & Hindi", sub: "" },
      { label: "DATE", value: "Check batches below", sub: "" },
    ] },
    
    // NEW - Media Gallery Fields
    contentBadgeText: { type: String, default: "Welcome to AYM Yoga School" },
    contentTitleHighlight: { type: String, default: "Rishikesh" },
    mediaMainImage: String,
    mediaMainImageAlt: { type: String, default: "Yoga Teacher Training" },
    mediaMainVideoUrl: String,
    mediaSmallImages: { type: Array, default: [] },
    trainingTags: { type: Array, default: [
      { icon: "🧘", text: "200 Hour TTC" },
      { icon: "🕉️", text: "300 Hour TTC" },
      { icon: "✨", text: "500 Hour TTC" }
    ] },
    pillsItems: { type: Array, default: [
      { text: "✓ Yoga Alliance Certified" },
      { text: "✓ 6000+ Graduates" },
      { text: "✓ Since 2009" },
      { text: "✓ Top Rated School" }
    ] },
    accrEyebrowText: { type: String, default: "Certified & Recognised" },
    accrTaglineText: { type: String, default: "Yoga Alliance USA & Ministry of AYUSH, Government of India" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BestYogaSchool", BestYogaSchoolSchema);