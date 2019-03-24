const errors = require("restify-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
// LOAD MODELS
const Admin = require("../models/Admin");
const auth = require("../auth");

module.exports = server => {
  // Register admin to the database
  server.post("/register", (req, res, next) => {
    const { email, password } = req.body;
    const admin = new Admin({
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(admin.password, salt, async (err, hash) => {
        // Hash password
        admin.password = hash;
        // Save admin
        try {
          const newAdmin = await admin.save();
          res.send(201);
          next();
        } catch (err) {
          return next(new errors.InternalError(err.message));
        }
      });
    });
  });

  // Login to the database [ADMIN]
  server.post("/auth", async (req, res, next) => {
    const { email, password } = req.body;

    try {
      // Authenticate user
      const admin = await auth.authenticate(email, password);
      // Create JWT
      const token = jwt.sign(admin.toJSON(), config.JWT_SECRET, {
        expiresIn: "3600m"
      });
      const { iat, exp } = jwt.decode(token);
      // Respond with token
      res.send({ iat, exp, token });
      next();
    } catch (err) {
      // User unautherized
      return next(new errors.UnauthorizedError(err));
    }
  });
};
