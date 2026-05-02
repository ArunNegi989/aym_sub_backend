const Model = require("../../models/courses/Yoga200Content");

/* ================= HELPERS ================= */
const getSingle = (val) => {
  if (Array.isArray(val)) return val[0];
  return val || "";
};

const parseJSON = (val, def = []) => {
  try {
    return val ? JSON.parse(val) : def;
  } catch {
    return def;
  }
};

const normalizePath = (filePath) => {
  if (!filePath) return "";
  return "/" + filePath.replace(/\\/g, "/");
};

/**
 * 🔥 KEY FIX: Decode HTML rich-text fields that were JSON.stringify'd on the frontend.
 *
 * WHY: HTML content sent via multipart/form-data can get corrupted or truncated
 * when it contains special characters like <, >, &, newlines, etc. The frontend
 * wraps these in JSON.stringify() before appending to FormData, which escapes all
 * special characters into safe \uXXXX / \" sequences. This function reverses that.
 *
 * Before fix: body.visaPassportDesc might arrive as truncated or corrupted HTML
 * After fix:  body.visaPassportDesc arrives as '\"<p>full html...</p>\"' which
 *             JSON.parse() correctly restores to '<p>full html...</p>'
 */
const decodeHtml = (val) => {
  if (!val) return "";
  const raw = Array.isArray(val) ? val[0] : val;
  if (!raw) return "";
  // Try JSON.parse first (frontend encoded it)
  try {
    const parsed = JSON.parse(raw);
    // JSON.parse of a JSON string returns the original string
    if (typeof parsed === "string") return parsed;
    return raw;
  } catch {
    // If it's not JSON-encoded (legacy data or plain text), return as-is
    return raw;
  }
};

/* ================= CREATE ================= */
exports.create = async (req, res) => {
  try {
    const body = req.body;
    const files = req.files || [];

    const getFile = (name) => {
      const file = files.find((f) => f.fieldname === name);
      return file ? normalizePath(file.path) : "";
    };

    /* ── Dynamic intro paragraphs ── */
    const introParaCount = parseInt(getSingle(body.introParaCount)) || 0;
    const introParaFields = {};
    for (let i = 1; i <= Math.max(introParaCount, 10); i++) {
      if (body[`introPara${i}`] !== undefined) {
        introParaFields[`introPara${i}`] = getSingle(body[`introPara${i}`]);
      }
    }

    /* ── Program images ── */
    const parsedPrograms = parseJSON(body.programs);
    const programsWithImages = parsedPrograms.map((p, i) => {
      const progImgFile = files.find((f) => f.fieldname === `programImage${i}`);
      return {
        ...p,
        image: progImgFile ? normalizePath(progImgFile.path) : p.image || "",
      };
    });

    const data = {
      ...body,
      ...introParaFields,
      introParaCount: introParaCount,

      /*
       * 🔥 CRITICAL FIX: Use decodeHtml() for ALL rich-text HTML fields.
       * These were JSON.stringify'd on the frontend to prevent multipart corruption.
       * decodeHtml() safely JSON.parse()'s them back to the original HTML string.
       *
       * Fields that were BROKEN before this fix:
       * - visaPassportDesc  (partial save - HTML truncated at special chars)
       * - globalCert1/2     (partial save)
       * - bookingStep1-4Desc (not saving at all)
       * - req1-4            (partial save)
       * - best200Hr         (partial save)
       * - schedDesc         (partial save)
       * - aimsOutro, ashtangaDesc, hathaDesc, evalDesc, primaryIntro (precaution)
       */
      aimsOutro: decodeHtml(body.aimsOutro),
      ashtangaDesc: decodeHtml(body.ashtangaDesc),
      primaryIntro: decodeHtml(body.primaryIntro),
      hathaDesc: decodeHtml(body.hathaDesc),
      evalDesc: decodeHtml(body.evalDesc),
      schedDesc: decodeHtml(body.schedDesc),
      visaPassportDesc: decodeHtml(body.visaPassportDesc),
      globalCert1: decodeHtml(body.globalCert1),
      globalCert2: decodeHtml(body.globalCert2),
      req1: decodeHtml(body.req1),
      req2: decodeHtml(body.req2),
      req3: decodeHtml(body.req3),
      req4: decodeHtml(body.req4),
      best200Hr: decodeHtml(body.best200Hr),
      bookingStep1Desc: decodeHtml(body.bookingStep1Desc),
      bookingStep2Desc: decodeHtml(body.bookingStep2Desc),
      bookingStep3Desc: decodeHtml(body.bookingStep3Desc),
      bookingStep4Desc: decodeHtml(body.bookingStep4Desc),

      /* IMAGES */
      heroImage: getFile("heroImage"),
      ashtangaImage: getFile("ashtangaImage"),
      hathaImage: getFile("hathaImage"),
      reqImage: getFile("reqImage"),
      aimsImage: getFile("aimsImage"),
      primarySeriesImage: getFile("primarySeriesImage"),

      luxImages: files
        .filter((f) => f.fieldname === "luxImages")
        .map((f) => normalizePath(f.path)),

      schedImages: files
        .filter((f) => f.fieldname === "schedImages")
        .map((f) => normalizePath(f.path)),

      /* STATS */
      stats: [1, 2, 3, 4].map((i) => ({
        icon: getSingle(body[`stat${i}Icon`]),
        value: getSingle(body[`stat${i}Val`]),
        title: getSingle(body[`stat${i}Title`]),
        desc: getSingle(body[`stat${i}Desc`]),
      })),

      /* DYNAMIC ARRAY PARAGRAPHS */
      aimsIntro: Object.keys(body)
        .filter((k) => /^aimsIntro\d+$/.test(k))
        .sort(
          (a, b) =>
            parseInt(a.replace("aimsIntro", "")) -
            parseInt(b.replace("aimsIntro", ""))
        )
        .map((k) => getSingle(body[k])),

      syllabusIntro: Object.keys(body)
        .filter((k) => /^syllabusIntro\d+$/.test(k))
        .sort(
          (a, b) =>
            parseInt(a.replace("syllabusIntro", "")) -
            parseInt(b.replace("syllabusIntro", ""))
        )
        .map((k) => getSingle(body[k])),

      /* ARRAY FIELDS */
      aimsBullets: [].concat(body.aimsBullets || []),
      includedFee: [].concat(body.includedFee || []),
      notIncludedFee: [].concat(body.notIncludedFee || []),
      foundationItems: [].concat(body.foundationItems || []),

      /* JSON FIELDS */
      modules: parseJSON(body.modules),
      programs: programsWithImages,
      hatha43: parseJSON(body.hatha43),
      weekGrid: parseJSON(body.weekGrid),
      luxFeatures: parseJSON(body.luxFeatures),
      whatIncl: parseJSON(body.whatIncl),
      instrLangs: parseJSON(body.instrLangs),
      indianFees: parseJSON(body.indianFees),
      schedRows: parseJSON(body.schedRows),
      faqItems: parseJSON(body.faqItems),
      knowQA: parseJSON(body.knowQA),
    };

    /* Remove individual stat fields from root */
    for (let i = 1; i <= 4; i++) {
      delete data[`stat${i}Icon`];
      delete data[`stat${i}Val`];
      delete data[`stat${i}Title`];
      delete data[`stat${i}Desc`];
    }

    const doc = await Model.create(data);

    res.status(201).json({
      success: true,
      message: "Created successfully",
      data: doc,
    });
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET ALL ================= */
exports.getAll = async (req, res) => {
  try {
    const data = await Model.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET ONE ================= */
exports.getOne = async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE ================= */
exports.update = async (req, res) => {
  try {
    const body = req.body;
    const files = req.files || [];

    const getSingle = (val) => {
      if (Array.isArray(val)) return val[0];
      return val || "";
    };

    const parseJSON = (val, def = []) => {
      try {
        return val ? JSON.parse(val) : def;
      } catch {
        return def;
      }
    };

    const normalizePath = (filePath) => {
      if (!filePath) return "";
      return "/" + filePath.replace(/\\/g, "/");
    };

    /**
     * 🔥 CRITICAL FIX: Same decodeHtml helper for UPDATE handler.
     * Identical logic — JSON.parse the frontend-encoded HTML strings.
     */
    const decodeHtml = (val) => {
      if (!val) return "";
      const raw = Array.isArray(val) ? val[0] : val;
      if (!raw) return "";
      try {
        const parsed = JSON.parse(raw);
        if (typeof parsed === "string") return parsed;
        return raw;
      } catch {
        return raw;
      }
    };

    const getFile = (name) => {
      const file = files.find((f) => f.fieldname === name);
      return file ? normalizePath(file.path) : undefined;
    };

    /* ── Dynamic intro paragraphs ── */
    const introParaCount = parseInt(getSingle(body.introParaCount)) || 0;
    const introParaFields = {};

    for (let i = 1; i <= Math.max(introParaCount, 10); i++) {
      if (body[`introPara${i}`] !== undefined) {
        introParaFields[`introPara${i}`] = getSingle(body[`introPara${i}`]);
      }
    }

    /* ── Program images ── */
    const parsedPrograms = parseJSON(body.programs);
    const programsWithImages = parsedPrograms.map((p, i) => {
      const progImgFile = files.find((f) => f.fieldname === `programImage${i}`);
      return {
        ...p,
        image: progImgFile ? normalizePath(progImgFile.path) : p.image || "",
      };
    });

    /* ── MAIN UPDATE OBJECT ── */
    const updateData = {
      ...body,
      ...introParaFields,
      introParaCount,

      /*
       * 🔥 CRITICAL FIX: Decode all HTML rich-text fields.
       *
       * visaPassportDesc - was saving partial content (truncated at HTML special chars)
       * globalCert1/2    - was saving partial content
       * bookingStep1-4Desc - was NOT saving at all
       * req1-4           - was saving partial content
       * best200Hr        - was saving partial content
       * schedDesc        - was saving partial content
       * All others       - preventive fix
       */
      aimsOutro: decodeHtml(body.aimsOutro),
      ashtangaDesc: decodeHtml(body.ashtangaDesc),
      primaryIntro: decodeHtml(body.primaryIntro),
      hathaDesc: decodeHtml(body.hathaDesc),
      evalDesc: decodeHtml(body.evalDesc),
      schedDesc: decodeHtml(body.schedDesc),
      visaPassportDesc: decodeHtml(body.visaPassportDesc),
      globalCert1: decodeHtml(body.globalCert1),
      globalCert2: decodeHtml(body.globalCert2),
      req1: decodeHtml(body.req1),
      req2: decodeHtml(body.req2),
      req3: decodeHtml(body.req3),
      req4: decodeHtml(body.req4),
      best200Hr: decodeHtml(body.best200Hr),
      bookingStep1Desc: decodeHtml(body.bookingStep1Desc),
      bookingStep2Desc: decodeHtml(body.bookingStep2Desc),
      bookingStep3Desc: decodeHtml(body.bookingStep3Desc),
      bookingStep4Desc: decodeHtml(body.bookingStep4Desc),

      /* STATS */
      stats: [1, 2, 3, 4].map((i) => ({
        icon: getSingle(body[`stat${i}Icon`]),
        value: getSingle(body[`stat${i}Val`]),
        title: getSingle(body[`stat${i}Title`]),
        desc: getSingle(body[`stat${i}Desc`]),
      })),

      /* DYNAMIC PARAGRAPHS */
      aimsIntro: Object.keys(body)
        .filter((k) => /^aimsIntro\d+$/.test(k))
        .sort(
          (a, b) =>
            parseInt(a.replace("aimsIntro", "")) -
            parseInt(b.replace("aimsIntro", ""))
        )
        .map((k) => getSingle(body[k])),

      syllabusIntro: Object.keys(body)
        .filter((k) => /^syllabusIntro\d+$/.test(k))
        .sort(
          (a, b) =>
            parseInt(a.replace("syllabusIntro", "")) -
            parseInt(b.replace("syllabusIntro", ""))
        )
        .map((k) => getSingle(body[k])),

      /* ARRAY FIELDS */
      aimsBullets: [].concat(body.aimsBullets || []),
      includedFee: [].concat(body.includedFee || []),
      notIncludedFee: [].concat(body.notIncludedFee || []),
      foundationItems: [].concat(body.foundationItems || []),

      /* JSON FIELDS */
      modules: parseJSON(body.modules),
      programs: programsWithImages,
      hatha43: parseJSON(body.hatha43),
      weekGrid: parseJSON(body.weekGrid),
      luxFeatures: parseJSON(body.luxFeatures),
      whatIncl: parseJSON(body.whatIncl),
      instrLangs: parseJSON(body.instrLangs),
      indianFees: parseJSON(body.indianFees),
      schedRows: parseJSON(body.schedRows),
      faqItems: parseJSON(body.faqItems),
      knowQA: parseJSON(body.knowQA),
    };

    /* ── Remove raw stat fields ── */
    for (let i = 1; i <= 4; i++) {
      delete updateData[`stat${i}Icon`];
      delete updateData[`stat${i}Val`];
      delete updateData[`stat${i}Title`];
      delete updateData[`stat${i}Desc`];
    }

    /* ── FILE UPDATE (only if new file uploaded) ── */
    if (getFile("heroImage")) updateData.heroImage = getFile("heroImage");
    if (getFile("ashtangaImage")) updateData.ashtangaImage = getFile("ashtangaImage");
    if (getFile("hathaImage")) updateData.hathaImage = getFile("hathaImage");
    if (getFile("reqImage")) updateData.reqImage = getFile("reqImage");
    if (getFile("aimsImage")) updateData.aimsImage = getFile("aimsImage");
    if (getFile("primarySeriesImage")) updateData.primarySeriesImage = getFile("primarySeriesImage");

    const luxImgs = files
      .filter((f) => f.fieldname === "luxImages")
      .map((f) => normalizePath(f.path));
    if (luxImgs.length) updateData.luxImages = luxImgs;

    const schedImgs = files
      .filter((f) => f.fieldname === "schedImages")
      .map((f) => normalizePath(f.path));
    if (schedImgs.length) updateData.schedImages = schedImgs;

    /* ── UPDATE DB ── */
    const updated = await Model.findByIdAndUpdate(req.params.id, updateData, { new: true });

    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE ================= */
exports.delete = async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};