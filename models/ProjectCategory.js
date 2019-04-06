const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const mongooseIntl = require("mongoose-intl");

const ProjectCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    intl: true
  },
  bannerImage: {
    type: String,
    required: true
  }
});

ProjectCategorySchema.plugin(timestamp);
ProjectCategorySchema.plugin(mongooseIntl, {
  languages: ["az", "en", "ru"],
  defaultLanguage: "az"
});

const ProjectCategory = mongoose.model(
  "ProjectCategory",
  ProjectCategorySchema
);
module.exports = ProjectCategory;
