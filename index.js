const restify = require("restify");
const mongoose = require("mongoose");
const config = require("./config");

const server = restify.createServer();

// MIDDLEWARE
server.use(restify.plugins.multipartBodyParser());

// LISTEN TO THE PORT
server.listen(config.PORT, () => {
  mongoose.set("useFindAndModify", false);
  mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true });
});

const db = mongoose.connection;

db.on("error", err => console.log(err));

db.once("open", () => {
  require("./routes/projects")(server);
  console.log(`SERVER STARTED ON PORT ${config.PORT}`);
});
