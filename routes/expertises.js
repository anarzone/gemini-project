const errors = require("restify-errors");
const mongoose = require("mongoose");
const rjwt = require('restify-jwt-community');
const fs = require("fs");
const config = require("../config");

// LOAD MODELS
const Expertise = require('../models/Expertise');

module.exports = server => {

  // Create a new expertise
  server.post('/expertises', rjwt({ secret: config.JWT_SECRET }), async(req, res, next) => {
    const name = JSON.parse(req.body.name);
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
    expertise.name = {
      az: name.az,
      en: name.en,
      ru: name.ru
    }
    expertise.content = {
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

  // Get all expertises
  server.get('/expertises', async(req, res, next) => {
    const expertises = await Expertise.find({});
    next();
    try {
      res.send(expertises);
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  })

   // Get expertise by id
   server.get('/expertises/:id', async(req, res, next) => {
    const { id } = req.params;
    await Expertise.findById(id, function(err, expertise){
      if(err) {
        return next(new errors.NotFoundError(err));
      }
      try {
        res.json(expertise)
        next()
      } catch(err) {
        return next(new errors.InvalidContentError(err));
      }
    });
   })

  // Delete expertise by id
  server.del('/expertises/:id', rjwt({ secret: config.JWT_SECRET }), async(req, res, next) => {
    try {
      const expertise = await Expertise.findOneAndRemove({
        _id: req.params.id
      });
      res.send(204);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no expertise with the id of ${req.params.id}`
        )
      );
    }
  })

 
}