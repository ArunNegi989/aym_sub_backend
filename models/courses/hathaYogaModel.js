const mongoose = require("mongoose");

const certCardSchema = new mongoose.Schema({
  hours: String,
  sub: String,
  href: String,
  imgUrl: String,
  image: String,
});

/* ── NEW: What-section feature cards ── */
const whatCardSchema = new mongoose.Schema({
  icon:  String,
  title: String,
  desc:  String,
});

const hathaYogaSchema = new mongoose.Schema(
  {
    slug:   String,
    status: String,

    /* ─── Hero ─── */
    heroImgAlt: String,
    heroImage:  String,

    /* ─── Intro ─── */
    introSectionTitle: String,
    introSideImgAlt:   String,
    introSideImage:    String,

    /* ─── What is Hatha ─── */
    whatSuperLabel: String,
    whatTitle:      String,

    /* ─── Benefits ─── */
    benefitsSuperLabel:  String,
    benefitsTitle:       String,
    benefitsSideImgAlt:  String,
    benefitsSideImage:   String,
    pullQuote:           String,

    /* ─── Certification ─── */
    certSuperLabel: String,
    certTitle:      String,

    /* ─── Ashram ─── */
    ashramSuperLabel: String,
    ashramTitle:      String,
    ashramImgAlt:     String,
    ashramImage:      String,

    /* ─── Curriculum ─── */
    curriculumSuperLabel: String,
    curriculumTitle:      String,

    /* ─── Pricing / Enrolment ─── */
    pricingSuperLabel:    String,
    pricingTitle:         String,
    pricingIntroPara:     String,
    registrationFormLink: String,
    tableNote:            String,
    joinBtnLabel:         String,
    joinBtnHref:          String,

    /* ─── Footer CTA ─── */
    footerTitle:      String,
    footerSubtitle:   String,
    applyBtnLabel:    String,
    applyBtnHref:     String,
    contactBtnLabel:  String,
    contactEmail:     String,

    /* ─── Arrays ─── */
    introParagraphs:     [String],
    whatParagraphs:      [String],
    ashramParagraphs:    [String],
    programmeParagraphs: [String],
    certParagraphs:      [String],   // replaces old certPara
    accreditations:      [String],
    benefitsList:        [String],
    courseDetailsList:   [String],

    /* ─── Rich-text singles ─── */
    benefitsIntroPara:    String,
    pricingProgrammePara: String,

    /* ─── Backward compat ─── */
    certPara: String,

    /* ─── Sub-docs ─── */
    certCards: [certCardSchema],

    /* ══════════════════════════════════════════════
       NEW FIELDS  (static content made editable)
    ══════════════════════════════════════════════ */

    /* Course Info Card */
    courseInfoTitle:       String,   // "COURSE DETAILS"
    courseDuration:        String,   // "13 Days"
    courseLevel:           String,   // "Beginner"
    courseCertLabel:       String,   // "Hatha Yoga"  (cert row value)
    courseYogaStyle:       String,   // "Hatha Yoga"
    courseYogaStyleSub:    String,   // "Traditional & Classical"
    courseLanguage:        String,   // "English & Hindi"
    courseDates:           String,   // "1st to 13th of every month"

    /* Premium Seat Booking section */
    seatSectionTag:      String,   // "Upcoming Batches · 2026–2027"
    seatSectionTitle:    String,   // "Hatha Yoga Training in Rishikesh"
    seatSectionSubtitle: String,   // "Choose your dates & preferred accommodation…"
    seatDurationLocation: String,  // "13 Days · Rishikesh, India"

    /* Programme section (was fully hardcoded) */
    programmeSuperLabel: String,   // "Programme Overview"
    programmeTitle:      String,   // "Our Hatha Yoga Programmes"

    /* What-section feature cards */
    whatCards: [whatCardSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("HathaYoga", hathaYogaSchema);