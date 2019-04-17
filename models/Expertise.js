const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const mongooseIntl = require("mongoose-intl");

const ExpertiseSchema = new mongoose.Schema({
  expertiseType: {
    type: String,
    trim: true,
    intl: true
  },
  body: {
    type: String,
    trim: true,
    intl: true
  },
  bannerImage: {
    type: String,
    required: true
  } 
});

ExpertiseSchema.plugin(timestamp);
ExpertiseSchema.plugin(mongooseIntl, {
  languages: ["az", "en", "ru"],
});

const Expertise = mongoose.model(
  "Expertise",
  ExpertiseSchema
);
module.exports = Expertise;