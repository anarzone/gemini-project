const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const mongooseIntl = require("mongoose-intl");

const CompanySchema = new mongoose.Schema({
  aboutText: {
    type: String,
    trim: true,
    intl: true
  },
  bannerImage: {
    type: String,
    required: true
  }
});

CompanySchema.plugin(timestamp);
CompanySchema.plugin(mongooseIntl, {
  languages: ["az", "en", "ru"],
});

const Company = mongoose.model(
  "Company",
  CompanySchema
);
module.exports = Company;