const errors = require("restify-errors");
const Multi = require("multi-rest");
const multer = require("multer");

// LOAD MODELS
const Project = require("../models/Project");

// Init storage to upload images
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

// File filtering while upload image to storage
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter
});

const upload_disk = new Multi({
  driver: {
    type: "local",
    path: "./uploads/"
  },
  filename: name => {
    // the extention will be added automaticlly
    return uuid.v4();
  },
  filefields: {
    image: {
      type: "picture",
      thumbnail: {
        width: 400,
        height: 300
      },
      required: false,
      extensions: ["png", "jpg"]
    }
  }
});

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
  server.post(
    "/projects",
    upload.single("projectImage"),
    async (req, res, next) => {
      // Check for JSON
      // if (!req.is("application/json")) {
      //   return next(
      //     new errors.InvalidContentError("Expects 'application/json'")
      //   );
      // }
      console.log(req.files.projectImage);
      const { title, content } = req.body;
      const project = new Project({
        title,
        content,
        projectImage: req.files.projectImage
      });

      try {
        await project.save();
        res.send(201);
        next();
      } catch (err) {
        return next(new errors.InvalidContentError(err));
      }
    }
  );
};
