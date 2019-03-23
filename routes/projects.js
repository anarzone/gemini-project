const errors = require("restify-errors");
const fs = require("fs");
const config = require("../config");

// LOAD MODELS
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
    const { title, content } = req.body;
    const project = new Project({
      title,
      content,
      projectImage: `${config.URL}/${req.files.projectImage.name}`
    });

    try {
      await project.save();
      res.send(201);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });
};
