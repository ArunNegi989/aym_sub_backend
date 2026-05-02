const mongoose = require("mongoose");

const Yoga200CombinedSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    status: { type: String, default: "Active" },

    /* HERO */
    pageMainH1: String,
    heroImgAlt: String,
    heroImage: String,

    /* INTRO */
    introPara1: String,
    introPara2: String,
    introPara3: String,
    introPara4: String,

    /* COURSE CARD */
    courseCardHeaderLabel: String,
    courseCardItem1Label: String,
    courseCardItem1Value: String,
    courseCardItem2Label: String,
    courseCardItem2Value: String,
    courseCardItem3Label: String,
    courseCardItem3Value: String,
    courseCardItem4Label: String,
    courseCardItem4Value: String,
    courseCardItem4Sub: String,
    courseCardItem5Label: String,
    courseCardItem5Value: String,
    courseCardItem6Label: String,
    courseCardItem6Value: String,

    courseCardFeeLabel: String,
    courseCardFeeFrom: String,
    courseCardOldPrice: String,
    courseCardNewPrice: String,
    courseCardPriceCurrency: String,
    courseCardBookBtnText: String,
    courseCardBookBtnUrl: String,

    /* VIDEO */
    videoUrl: String,
    videoFile: String,
    videoBadgeText: String,

    /* STATS */
    stats: [
      {
        icon: String,
        value: String,
        title: String,
        desc: String,
      },
    ],

    /* AIMS */
    aimsIntro: [String],
    aimsBullets: [String],
    aimsOutro: String,

    /* SYLLABUS */
    syllabusIntro: [String],

    /* FEES */
    includedFee: [String],
    notIncludedFee: [String],

    /* MODULES */
    modules: [
      {
        title: String,
        intro: String,
        items: [String],
        body: String,
      },
    ],

    /* ASHTANGA */
    ashtangaDesc: String,
    ashtangaImage: String,

    /* PRIMARY */
    primaryIntro: String,
    foundationItems: [String],
    weekGrid: Array,

    /* HATHA */
    hathaDesc: String,
    hathaImage: String,
    hatha43: Array,

    /* PROGRAMS */
    programs: [
      {
        title: String,
        duration: String,
        start: String,
        oldPrice: String,
        price: String,
        desc: String,
        image: String,
      },
    ],

    /* CONTENT 2 */
    evalDesc: String,
    schedDesc: String,
    visaPassportDesc: String,
    globalCert1: String,
    globalCert2: String,
    req1: String,
    req2: String,
    req3: String,
    req4: String,
    best200Hr: String,

    /* LIST DATA */
    luxFeatures: [String],
    whatIncl: [String],
    instrLangs: Array,
    indianFees: Array,
    schedRows: Array,
    faqItems: Array,
    knowQA: Array,

    /* IMAGES */
    reqImage: String,
    luxImages: [String],
    schedImages: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Yoga200Combined", Yoga200CombinedSchema);