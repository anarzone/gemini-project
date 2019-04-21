const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const mongooseIntl = require("mongoose-intl");

const ExpertiseSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    intl: true
  },
  content: {
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