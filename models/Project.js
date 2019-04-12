const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const mongooseIntl = require("mongoose-intl");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    intl: true
  },
  content: {
    type: String,
    intl: true
  },
  projectImages: {
    type: Array,
    required: true
  },
  category: {
    type: Object
  }
});

ProjectSchema.plugin(timestamp);
ProjectSchema.plugin(mongooseIntl, {
  languages: ["az", "en", "ru"],
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
