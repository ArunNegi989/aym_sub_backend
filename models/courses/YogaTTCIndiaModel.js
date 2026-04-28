const mongoose = require("mongoose");

const ImageSchema = {
  image: String,
};

const AccredBadgeSchema = new mongoose.Schema({
  label: String,
  imgUrl: String,
  image: String,
});

const CourseCardSchema = new mongoose.Schema({
  hours: String,
  title: String,
  desc: String,
  linkLabel: String,
  href: String,
  imgUrl: String,
  image: String,
});

const QuoteCardSchema = new mongoose.Schema({
  quote: String,
  imgAlt: String,
  imgUrl: String,
  image: String,
});

const LocationSchema = new mongoose.Schema({
  name: String,
  desc: String,
  image: String,
  imageAlt: String,
});

const YogaTTCIndiaSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },

    // HERO
    heroImage: String,
    heroImgAlt: String,

    heroTitle: String,
    heroSubTitle: String,

    // TEXT CONTENT
    introPara: String,
    whoWeArePara: String,
    yytPara: String,
    whyAYMPara1: String,
    whyAYMPara2: String,
    whyAYMPara3: String,
    rishikeshDetailPara: String,
    goaDetailPara: String,

    // ARRAYS
    introParagraphs: [String],
    whyAYMParagraphs: [String],
    rishikeshParagraphs: [String],
    goaParagraphs: [String],

    arrivalList: [String],
    feeList: [String],

    // SECTIONS
    accredBadges: [AccredBadgeSchema],
    courseCards: [CourseCardSchema],
    quoteCards: [QuoteCardSchema],
    locations: [LocationSchema],

    // TITLES
    whoWeAreTitle: String,
    yytTitle: String,
    rishikeshTitle: String,
    goaTitle: String,
    whyAYMTitle: String,
    arrivalTitle: String,
    feeTitle: String,

    // ===== YOGA HOLIDAYS FIELDS =====
    mainTitle: { type: String, default: "Yoga Holidays in India / Yoga Vacations in India, Rishikesh at AYM Yoga Holiday Retreats" },
    mediaImage: String,
    mediaImageAlt: { type: String, default: "Stunning View of Rishikesh - AYM Yoga Center" },
    mediaImageCaption: { type: String, default: "Stunning View of Rishikesh — AYM Yoga Center" },
    videoUrl: { type: String, default: "" },
    videoPlaceholderText: { type: String, default: "Watch: Life at AYM Rishikesh" },
    videoEnabled: { type: Boolean, default: false },
    ayurvedaCalloutText: { type: String, default: "Many things can be combined with Yoga Holidays in Rishikesh, such as meditation and Ayurveda. Yoga and Ayurveda Spa will enhance your well-being — stimulating your mind and transforming your body. Meditation will calm your mind and body, reducing anxiety and tension. Practising Yoga with Ayurveda will restore your inner vitality and give you a healthy mind, body and soul." },
    ayurvedaLinkText: { type: String, default: "Yoga with Ayurveda" },
    ayurvedaLinkUrl: { type: String, default: "#" },
    benefitsHeading: { type: String, default: "The benefits of our Yoga Holiday in Rishikesh :" },
    benefitsList: [String],
    ctaText: { type: String, default: "For more detail about yoga holiday packages / vacations in Rishikesh, India." },
    ctaButtonText: { type: String, default: "Click Here to See Yoga Holidays Packages" },
    ctaButtonUrl: { type: String, default: "#" },

    // ===== WHO WE ARE VIDEO FIELDS =====
    whoWeAreVideo: { type: String, default: "" },
    whoWeAreVideoEnabled: { type: Boolean, default: false },
    whoWeAreVideoPoster: { type: String, default: "" },

    // ===== RISHIKESH & GOA SECTION IMAGES =====
    rishikeshImage: { type: String, default: "" },
    rishikeshImageAlt: { type: String, default: "Yoga Teacher Training in Rishikesh" },
    rishikeshImageBadge: { type: String, default: "Rishikesh, India" },
    
    goaImage: { type: String, default: "" },
    goaImageAlt: { type: String, default: "Yoga Teacher Training in Goa" },
    goaImageBadge: { type: String, default: "Goa, India" },

    // ===== WHY AYM SECTION IMAGE =====
    whyAYMImage: { type: String, default: "" },
    whyAYMImageAlt: { type: String, default: "Why AYM Yoga School" },
    whyAYMImageBadge: { type: String, default: "Excellence in Yoga" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("YogaTTCIndia", YogaTTCIndiaSchema);