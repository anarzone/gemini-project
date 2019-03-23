const restify = require("restify");
const mongoose = require("mongoose");
const rjwt = require("restify-jwt-community");
const config = require("./config");

const server = restify.createServer();

// MIDDLEWARES
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({ mapParams: false }));
server.get(
  "//(.*)?.*/",
  restify.plugins.serveStatic({
    directory: `${__dirname}/../dist`,
    default: "./index.html",
    maxAge: 0
  })
);

// Protect routes
server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ["/auth"] }));

// LISTEN TO THE PORT
server.listen(config.PORT, () => {
  mongoose.set("useFindAndModify", false);
  mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true });
});

const db = mongoose.connection;

db.on("error", err => console.log(err));

db.once("open", () => {
  require("./routes/admin")(server);
  require("./routes/projects")(server);
  console.log(`SERVER STARTED ON PORT ${config.PORT}`);
});
