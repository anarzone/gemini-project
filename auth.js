const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Admin = mongoose.model("Admin");

exports.authenticate = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Get user by email
      const admin = await Admin.findOne({ email });

      // Match Password
      bcrypt.compare(password, admin.password, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch) throw "Password did not match";
        resolve(admin);
      });
    } catch (err) {
      // Email not found or password did not match
      reject("Authentication Failed");
    }
  });
};
