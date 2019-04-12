const errors = require("restify-errors");
const mongoose = require("mongoose");
const fs = require("fs");
const config = require("../config");

// LOAD MODELS
const Slider = require('../models/Slider');

module.exports = server => {
  // Create new slider
  server.post('/slider', async (req, res, next) => {
    // Upload file to client folder
    for (var key in req.files) {
      if (req.files.hasOwnProperty(key)) {
        fs.renameSync(
          req.files[key].path,
          `${__dirname}/../client/public/assets/images/${req.files[key].name}`
        );
      }
    }
    const title = JSON.parse(req.body.title);
    if (!req.files.coverImage) {
      return next(new errors.InvalidContentError("Cover image for slider is required"));
    }
    const slider = new Slider({});
    slider.title = {
      az: title.az,
      en: title.en,
      ru: title.ru
    }
    slider.coverImage = `${req.files.coverImage.name}`;
    slider.url.videoUrl = req.body.videoUrl

    try {
      const newSlider = await slider.save();
      res.send(201);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  })

  // Get all slider from db
  server.get('/slider', async(req, res, next) => {
    const slider = await Slider.find({});
    try {
      res.send(slider);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err.message));
    }
  })

  // Delete a slider by id
  server.del('/slider/:id', async(req, res, next) => {
    await Slider.findByIdAndDelete({ _id: req.params.id });
    try {
      res.send(204)
    } catch (err) {
      return next(new Errors.InvalidContentError)
    }
  })
}