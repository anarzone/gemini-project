const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
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

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
