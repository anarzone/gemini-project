const errors = require("restify-errors");
const mongoose = require("mongoose");
const rjwt = require('restify-jwt-community');
const fs = require("fs");
const config = require("../config");

// LOAD MODELS
const Company = require('../models/Company');

module.exports = server => {
  
  // Add company details
  server.post('/company', rjwt({ secret: config.JWT_SECRET }), async(req, res, next) => {
    const aboutText = JSON.parse(req.body.aboutText)
    
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
      return next(new errors.InvalidContentError("Banner image for company is required"));
    }

    const company = new Company({});
    company.aboutText = {
      az: aboutText.az,
      en: aboutText.en,
      ru: aboutText.ru
    }
    company.bannerImage = `${req.files.bannerImage.name}`
    try {
      const newCompany = await company.save();
      res.send(201);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  })

}