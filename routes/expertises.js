const errors = require("restify-errors");
const mongoose = require("mongoose");
const rjwt = require('restify-jwt-community');
const fs = require("fs");
const config = require("../config");

// LOAD MODELS
const Expertise = require('../models/Expertise');

module.exports = server => {
  server.post('/expertises', rjwt({ secret: config.JWT_SECRET }), async(req, res, next) => {
    const type = JSON.parse(req.body.type);
    const content = JSON.parse(req.body.content)
    
    // Upload file to client folder
    for (var key in req.files) {
      if (req.files.hasOwnProperty(key)) {
        fs.renameSync(
          req.files[key].path,
          `${__dirname}/../client/public/assets/images/${req.files[key].name}`
        );
      }
    }
    if (!req.files.bannerImage) {
      return next(new errors.InvalidContentError("Banner image for expertise is required"));
    }

    const expertise = new Expertise({});
    expertise.expertiseType = {
      az: type.az,
      en: type.en,
      ru: type.ru
    }
    expertise.body = {
      az: content.az,
      en: content.en,
      ru: content.ru
    }
    expertise.bannerImage = `${req.files.bannerImage.name}`
    try {
      const newExpertise = await expertise.save();
      res.send(201);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  })
}