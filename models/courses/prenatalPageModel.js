const mongoose = require("mongoose");

/* =========================
   SUB SCHEMAS
========================= */
const heroGridImageSchema = new mongoose.Schema({
  url: String,
  alt: String,
});

const scheduleSchema = new mongoose.Schema({
  time: String,
  activity: String,
});

const curriculumSchema = new mongoose.Schema({
  title: String,
  hours: String,
});

const hoursSummarySchema = new mongoose.Schema({
  label: String,
  value: String,
});

/* =========================
   MAIN SCHEMA
========================= */
const prenatalPageSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    /* HERO */
    pageTitleH1: String,
    heroImage: String,
    heroImgAlt: String,

    /* INTRO */
    introSectionTitle: String,
    introPara1: String,
    introPara2: String,
    introPara3: String,
    introExtraParagraphs: [String],

    /* HERO GRID */
    heroGridImages: [heroGridImageSchema],

    /* FEATURES */
    featuresSectionTitle: String,
    featuresSuperLabel: String,
    featuresPara1: String,
    featuresPara2: String,
    featuresExtraParagraphs: [String],
    
    // NEW - Features Video (Local file)
    featuresVideoFile: String,  // Store video file path
    featuresVideoLabel: { type: String, default: "Watch Our Prenatal Yoga Sessions" },
    featuresPills: { type: Array, default: [
      "Garbh Sanskar", "Pranayama", "Meditation", "Anatomy", "Teaching Practice", "Postnatal Care"
    ] },
    featuresStats: { type: Array, default: [
      { num: "85+", label: "Hours Training" },
      { num: "500+", label: "Graduates" },
      { num: "15+", label: "Years Experience" }
    ] },

    /* LOCATION */
    locationSubTitle: String,
    locationPara: String,
    locationImage: String,
    schedule: [scheduleSchema],
    
    // NEW - Location Badges
    locationBadges: { type: Array, default: [
      "📍 Tapovan, Rishikesh",
      "🏔️ Himalayan Foothills",
      "🌊 12 min to Laxman Jhula",
      "🧘 Peaceful Ashram Setting"
    ] },
    locationMapEmbedUrl: { type: String, default: "" },
    locationMapLabel: { type: String, default: "📍 Tapovan, Rishikesh, Uttarakhand" },

    /* BATCH */
    batchSectionTitle: String,
    joinBtnText: String,
    joinBtnUrl: String,

    /* COST */
    costsSectionTitle: String,
    costsPara: String,
    costsExtraParagraphs: [String],

    /* ONLINE */
    onlineSectionTitle: String,
    onlinePara: String,
    onlineExtraParagraphs: [String],

    curriculum: [curriculumSchema],
    hoursSummary: [hoursSummarySchema],

    /* SEO */
    metaTitle: String,
    metaDescription: String,

    /* Course Info Card Fields */
    courseInfoCardTitle: { type: String, default: "COURSE DETAILS" },
    courseInfoFeeLabel: { type: String, default: "COURSE FEE" },
    courseInfoFeeFromText: { type: String, default: "starting from" },
    courseInfoBookBtnText: { type: String, default: "BOOK NOW" },
    courseInfoUsdPrice: { type: Number, default: 399 },
    courseInfoInrPrice: { type: Number, default: 33000 },
    courseInfoOriginalUsdPrice: { type: Number, default: 799 },
    courseInfoOriginalInrPrice: { type: Number, default: 66000 },
    courseInfoDetails: { type: Array, default: [
      { label: "DURATION", value: "24 Days", sub: "" },
      { label: "LEVEL", value: "Beginner to Advanced", sub: "" },
      { label: "CERTIFICATION", value: "85 Hour", sub: "" },
      { label: "STYLE", value: "Prenatal Yoga", sub: "Hatha & Kundalini Based" },
      { label: "LANGUAGE", value: "English & Hindi", sub: "" },
      { label: "DATE", value: "Check batches below", sub: "" },
    ] },
    onlineVideoFile: String,
    onlineVideoLabel: { type: String, default: "Course Preview" },
    onlineBonusIcon: { type: String, default: "🎁" },
    onlineBonusTitle: { type: String, default: "Bonus Included" },
    onlineBonusText: { type: String, default: "Free access to prenatal yoga community & monthly workshops" },
    onlineCtaLabel: { type: String, default: "Ready to begin your journey?" },
    onlineCtaSub: { type: String, default: "Join our next online batch · Flexible schedule · Globally certified" },
    onlineCtaBtnText: { type: String, default: "Enrol Now" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PrenatalPage", prenatalPageSchema);