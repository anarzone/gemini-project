const errors = require("restify-errors");
const mongoose = require("mongoose");
const fs = require("fs");
const config = require("../config");

// LOAD MODELS
const ProjectCategory = require("../models/ProjectCategory");
const Project = require("../models/Project");

module.exports = server => {
  // Get all projects
  server.get("/projects", async (req, res, next) => {
    const projects = await Project.find({});
    try {
      res.send(projects);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  // Create new project
  server.post("/projects", async (req, res, next) => {


        let imageLocation = [];
        for (const file of req.files) {
          imageLocation.concat(`${__dirname}/../client/public/assets/images/${file.name}`)
        }


    // Upload file to client folder
    for (var key in req.files) {
      if (req.files.hasOwnProperty(key)) {
        fs.renameSync(
          req.files[key].path,
          `${__dirname}/../client/public/assets/images/${req.files[key].name}`
        );
      }
    }
    if (!req.files) {
      return next(new errors.InvalidContentError("Project image is required"));
    }
    const name = JSON.parse(req.body.name);
    const content = JSON.parse(req.body.content);
    let project = new Project();
    // Find category by id to add new project
    ProjectCategory.findOne({ _id: req.body.cat_id })
      .then(category => {
        project.name = {
          az: name.az,
          en: name.en,
          ru: name.ru
        }
        project.content = {
          az: content.az,
          en: content.en,
          ru: content.ru
        }
        project.category = category
        project.projectImages = imageLocation
      })
      .catch(err => {
        return next(res.send( new errors.NotFoundError(err)))
      })
    try {
      await project.save();
      res.send(201);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  // Add new categories for the projects
  server.post("/projects/categories", async (req, res, next) => {
    const name = JSON.parse(req.body.name);
    
    // Upload file to client folder
    for (var key in req.files) {
      if (req.files.hasOwnProperty(key)) {
        fs.renameSync(
          req.files[key].path,
          `${__dirname}/../client/public/assets/images/projects/${req.files[key].name}`
        );
      }
    }
    if (!req.files.bannerImage) {
      return next(new errors.InvalidContentError("Banner image for category is required"));
    }
    const category = new ProjectCategory({});
    category.name = {
      az: name.az,
      en: name.en,
      ru: name.ru
    }
    category.bannerImage = `${req.files.bannerImage.name}`
    try {
      const newCategory = await category.save();
      res.send(201);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  // Get all project categories
  server.get("/projects/categories", async (req, res, next) => {
    const categories = await ProjectCategory.find({});
    try {
      res.send(categories);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err.message));
    }
  });
};
