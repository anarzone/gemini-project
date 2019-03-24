const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const ProjectCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  bannerImage: {
    type: String,
    required: true
  }
});

ProjectCategorySchema.plugin(timestamp);

const ProjectCategory = mongoose.model(
  "ProjectCategory",
  ProjectCategorySchema
);
module.exports = ProjectCategory;
