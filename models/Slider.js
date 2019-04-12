const mongoose = require("mongoose");
require('mongoose-type-url');
const timestamp = require("mongoose-timestamp");
const mongooseIntl = require("mongoose-intl");


const SliderSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    intl: true
  },
  coverImage: {
    type: String,
    required: true
  },
  url: {
    videoUrl: {type: mongoose.SchemaTypes.Url, required: true} 
  }
});

SliderSchema.plugin(timestamp);
SliderSchema.plugin(mongooseIntl, {
  languages: ["az", "en", "ru"],
});

const Slider = mongoose.model("Slider", SliderSchema);
module.exports = Slider;
