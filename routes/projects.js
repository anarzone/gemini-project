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
    for (var key in req.files) {
      if (req.files.hasOwnProperty(key)) {
        fs.renameSync(
          req.files[key].path,
          `${__dirname}/../uploads/${req.files[key].name}`
        );
      }
    }
    const { title, content, cat_id } = req.body;
    let project;
    // Find category by id to add new project
    await ProjectCategory.findOne({ _id: cat_id }, (err, result) => {
      if (!result) {
        return next(
          res.send(
            new errors.NotFoundError("There is no any category with this id")
          )
        );
      } else {
        project = new Project({
          category: result,
          title,
          content,
          projectImage: `${config.URL}/${req.files.projectImage.name}`
        });
      }
    });

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
    const { name } = req.body;
    for (var key in req.files) {
      if (req.files.hasOwnProperty(key)) {
        fs.renameSync(
          req.files[key].path,
          `${__dirname}/../uploads/${req.files[key].name}`
        );
      }
    }
    const category = new ProjectCategory({
      name,
      category_image: `${config.URL}/${req.files.category_image.name}`
    });
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
