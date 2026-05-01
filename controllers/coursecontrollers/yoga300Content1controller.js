// controllers/coursecontrollers/yoga300Content1controller.js
const Yoga300 = require("../../models/courses/yoga300Content1model");

const parseData = (req, existingHeroImage = "", existingRightSideImage = "") => {
  const body = req.body;

  // Hero Image
  let heroImage = existingHeroImage;
  if (req.files && req.files.heroImage) {
    heroImage = "/uploads/" + req.files.heroImage[0].filename;
  }

  // Right Side Image
  let rightSideImage = existingRightSideImage;
  if (req.files && req.files.rightSideImage) {
    rightSideImage = "/uploads/" + req.files.rightSideImage[0].filename;
  }

  // Handle thumbnails - FIXED
  let bottomThumbnails = [];
  try {
    const parsedThumbnails = JSON.parse(body.bottomThumbnails || "[]");
    
    // Match uploaded files with thumbnails
    if (req.files) {
      // Find all thumbnail files
      const thumbnailKeys = Object.keys(req.files).filter(key => key.startsWith('thumbnail_'));
      
      parsedThumbnails.forEach((thumb, idx) => {
        const fileKey = `thumbnail_${idx}`;
        if (req.files[fileKey] && req.files[fileKey][0]) {
          thumb.src = "/uploads/" + req.files[fileKey][0].filename;
        }
      });
    }
    bottomThumbnails = parsedThumbnails;
  } catch(e) {
    console.error("Error parsing thumbnails:", e);
    bottomThumbnails = [];
  }

  // Handle fees
  let includedFee = [];
  let notIncludedFee = [];
  
  try {
    includedFee = Array.isArray(body.includedFee)
      ? body.includedFee
      : body.includedFee ? [body.includedFee] : [];
      
    notIncludedFee = Array.isArray(body.notIncludedFee)
      ? body.notIncludedFee
      : body.notIncludedFee ? [body.notIncludedFee] : [];
  } catch(e) {
    includedFee = [];
    notIncludedFee = [];
  }

  // Handle paragraphs
  const introParagraphs = [];
  const topParagraphs = [];
  const introCount = Number(body.introParagraphCount || 0);
  const topCount = Number(body.topParagraphCount || 0);

  for (let i = 1; i <= introCount; i++) {
    const val = body[`introPara${i}`];
    if (val && val.trim()) introParagraphs.push(val);
  }

  for (let i = 1; i <= topCount; i++) {
    const val = body[`topPara${i}`];
    if (val && val.trim()) topParagraphs.push(val);
  }

  // Handle overview fields
  let overviewFields = [];
  try {
    overviewFields = JSON.parse(body.overviewFields || "[]");
  } catch { overviewFields = []; }

  // Handle modules
  let modules = [];
  try {
    modules = JSON.parse(body.modules || "[]");
  } catch { modules = []; }

  // Return parsed data
  return {
    slug: body.slug,
    status: body.status,
    pageMainH1: body.pageMainH1,
    heroImgAlt: body.heroImgAlt,
    heroImage,
    rightSideImage,
    rightSideImageAlt: body.rightSideImageAlt || "",
    introParagraphs,
    topSectionH2: body.topSectionH2 || "",
    topParagraphs,
    overviewH2: body.overviewH2 || "",
    overviewFields,
    upcomingDatesH3: body.upcomingDatesH3 || "",
    upcomingDatesSubtext: body.upcomingDatesSubtext || "",
    feeIncludedTitle: body.feeIncludedTitle || "",
    includedFee,
    feeNotIncludedTitle: body.feeNotIncludedTitle || "",
    notIncludedFee,
    syllabusH2: body.syllabusH2 || "",
    syllabusIntro: body.syllabusIntro || "",
    modules,
    bottomThumbnails,
  };
};

exports.create = async (req, res) => {
  try {
    const existing = await Yoga300.findOne();
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Record already exists. Please edit or delete first.",
      });
    }

    const parsedData = parseData(req);
    const data = new Yoga300(parsedData);
    await data.save();

    res.status(201).json({ success: true, message: "Created successfully", data });
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};

exports.get = async (req, res) => {
  try {
    const data = await Yoga300.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    console.error("Get error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Yoga300.findById(id);
    if (!data) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }
    res.json({ success: true, data });
  } catch (err) {
    console.error("GetSingle error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Yoga300.findById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "No record found" });
    }

    const parsedData = parseData(req, existing.heroImage, existing.rightSideImage);
    const updated = await Yoga300.findByIdAndUpdate(id, parsedData, { new: true, runValidators: false });

    res.json({ success: true, message: "Updated successfully", data: updated });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Yoga300.findById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "No record found" });
    }
    await Yoga300.findByIdAndDelete(id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: err.message });
  }
};