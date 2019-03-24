const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const mongooseIntl = require("mongoose-intl");

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    intl: true
  },
  content: {
    type: String,
    required: true,
    intl: true
  },
  projectImage: {
    type: String,
    required: true
  },
  category: {
    type: Object
  }
});

ProjectSchema.plugin(timestamp);
ProjectSchema.plugin(mongooseIntl, {
  languages: ["az", "en", "ru"],
  defaultLanguage: "az"
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
