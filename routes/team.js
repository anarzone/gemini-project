const errors = require("restify-errors");
const mongoose = require("mongoose");
const rjwt = require('restify-jwt-community');
const fs = require("fs");
const config = require("../config");

// LOAD MODELS
const Team = require('../models/Team');

module.exports = server => {
  
  // Add a new team member
  server.post('/team', rjwt({ secret: config.JWT_SECRET }), async(req, res, next) => {
    const name = JSON.parse(req.body.name);
    const position = JSON.parse(req.body.position);
    
    // Upload file to client folder
    for (var key in req.files) {
      if (req.files.hasOwnProperty(key)) {
        fs.renameSync(
          req.files[key].path,
          `${__dirname}/../client/public/assets/images/${req.files[key].name}`
        );
      }
    }
    if (!req.files.avatar) {
      return next(new errors.InvalidContentError("Banner image for company is required"));
    }

    const team = new Team({});
    team.name = name;
    team.position = position;
    team.avatar = `${req.files.avatar.name}`
    try {
      const newTeam = await team.save();
      res.send(201);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  })

  // Get all team member
  server.get('/team', async(req, res, next) => {
    const team = await Team.find({});
    next();
    try {
      res.send(team);
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  })

  // Delete member of the team by id
  server.del('/team/:id', rjwt({ secret: config.JWT_SECRET }), async(req, res, next) => {
    try {
      const team = await Team.findOneAndRemove({
        _id: req.params.id
      });
      res.send(204);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no team member with the id of ${req.params.id}`
        )
      );
    }
  })

}