const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: String,
  from: String,
  initials: String,
  quote: String,
});

const courseInfoDetailSchema = new mongoose.Schema({
  label: String,
  value: String,
  sub: String,
});

const ashtangaSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },

    // Images
    heroImage: String,
    promoImage: String,
    heroImgAlt: String,

    // Intro
    pageH1Title: String,
    introMainPara: String,

    // Course Details
    courseDetailsTitle: String,
    courseDetailsIntro1: String,
    courseDetailsIntro2: String,
    courseDetailsImage: String,
    courseDetailsImageAlt: String,
    learnItems: { type: [String], default: [] },

    // Who can apply
    whoCanApplyTitle: String,
    whoCanApplyPara1: String,
    whoCanApplyPara2: String,
    whoCanApplyVideo: String,
    whoItems: { type: [String], default: [] },

    // Promo
    promoSchoolLabel: String,
    promoHeading: String,
    promoLocation: String,
    promoFeeLabel: String,
    promoFeeAmount: String,
    promoBtnLabel: String,
    promoBtnHref: String,

    // Teachers
    certTeachersTitle: String,
    certTeachersPara: String,
    certTeachersPara2: String,
    certTeachersParagraphs: { type: [String], default: [] },
    certTeachersImage: String,
    certTeachersImageAlt: String,

    // Community
    communityTitle: String,
    communityPara: String,
    communityParagraphs: { type: [String], default: [] },
    communityImage: String,
    communityImageAlt: String,

    // Accommodation
    accommodationTitle: String,
    accommodationPara1: String,
    accommodationParagraphs: { type: [String], default: [] },
    accommodationImage: String,
    accommodationImageAlt: String,

    // Certification
    certCardTitle: String,
    certCardPara: String,
    certDeepTitle: String,
    certDeepPara: String,

    // Schedule
    schedBookLabel: String,
    schedRegisterText: String,
    schedPayText: String,
    schedDepositAmount: String,
    schedPayBtnLabel: String,
    schedPayBtnHref: String,

    // Testimonials
    testimSectionTitle: String,
    testimIntroText: String,
    testimonials: { type: [testimonialSchema], default: [] },

    // Course Info Card Fields
    courseInfoCardTitle: { type: String, default: "COURSE DETAILS" },
    courseInfoFeeLabel: { type: String, default: "COURSE FEE" },
    courseInfoFeeFromText: { type: String, default: "starting from" },
    courseInfoBookBtnText: { type: String, default: "BOOK NOW" },
    courseInfoUsdPrice: { type: Number, default: 699 },
    courseInfoInrPrice: { type: Number, default: 58000 },
    courseInfoOriginalUsdPrice: { type: Number, default: 1250 },
    courseInfoOriginalInrPrice: { type: Number, default: 105000 },
    courseInfoDetails: { type: [courseInfoDetailSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AshtangaVinyasaTTC", ashtangaSchema);