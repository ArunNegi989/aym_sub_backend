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

// Windows backslash fix + leading slash add
const normalizePath = (filePath) => {
  if (!filePath) return "";
  return "/" + filePath.replace(/\\/g, "/");
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

    const data = {
      ...body,

      /* IMAGES */
      heroImage: getFile("heroImage"),
      ashtangaImage: getFile("ashtangaImage"),
      hathaImage: getFile("hathaImage"),
      reqImage: getFile("reqImage"),

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

      /* DYNAMIC PARAGRAPHS */
      aimsIntro: Object.keys(body)
        .filter((k) => k.startsWith("aimsIntro"))
        .map((k) => getSingle(body[k])),

      syllabusIntro: Object.keys(body)
        .filter((k) => k.startsWith("syllabusIntro"))
        .map((k) => getSingle(body[k])),

      /* ARRAY FIELDS */
      aimsBullets: [].concat(body.aimsBullets || []),
      includedFee: [].concat(body.includedFee || []),
      notIncludedFee: [].concat(body.notIncludedFee || []),
      foundationItems: [].concat(body.foundationItems || []),

      /* JSON FIELDS */
      modules: parseJSON(body.modules),
      programs: parseJSON(body.programs),
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

    const getFile = (name) => {
      const file = files.find((f) => f.fieldname === name);
      return file ? normalizePath(file.path) : undefined;
    };

    const updateData = {
      ...body,

      /* STATS */
      stats: [1, 2, 3, 4].map((i) => ({
        icon: getSingle(body[`stat${i}Icon`]),
        value: getSingle(body[`stat${i}Val`]),
        title: getSingle(body[`stat${i}Title`]),
        desc: getSingle(body[`stat${i}Desc`]),
      })),

      /* JSON FIELDS */
      modules: parseJSON(body.modules),
      programs: parseJSON(body.programs),
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

    /* FILE UPDATE ONLY IF NEW FILE UPLOADED */
    if (getFile("heroImage")) updateData.heroImage = getFile("heroImage");
    if (getFile("ashtangaImage")) updateData.ashtangaImage = getFile("ashtangaImage");
    if (getFile("hathaImage")) updateData.hathaImage = getFile("hathaImage");
    if (getFile("reqImage")) updateData.reqImage = getFile("reqImage");

    const luxImgs = files
      .filter((f) => f.fieldname === "luxImages")
      .map((f) => normalizePath(f.path));

    if (luxImgs.length) updateData.luxImages = luxImgs;

    const schedImgs = files
      .filter((f) => f.fieldname === "schedImages")
      .map((f) => normalizePath(f.path));

    if (schedImgs.length) updateData.schedImages = schedImgs;

    const updated = await Model.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

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