const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const mongooseIntl = require("mongoose-intl");

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  }
});

TeamSchema.plugin(timestamp);
TeamSchema.plugin(mongooseIntl, {
  languages: ["az", "en", "ru"],
});

const Team = mongoose.model(
  "Team",
  TeamSchema
);
module.exports = Team;