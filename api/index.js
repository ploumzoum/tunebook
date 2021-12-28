// Load configuration
const Config = require("./config");

// Load fastify server
const fastify = require("fastify")({
  logger: Config.logger,
  ajv: {
    customOptions: {
      coerceTypes: "array",
    },
  },
});

// Load mongoose ODM
const mongoose = require("mongoose");

// remove deprecation warnings when using Model.findOneAndX()
mongoose.set("useFindAndModify", false);

// Connect database
mongoose.connect(process.env["MONGODB_PATH"] || Config.mongodb.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Register plugins
fastify.register(require("fastify-formbody"), {
  bodyLimit: Config.http.entityMaxSize,
});

// Register CORS middlewares
fastify.register(require("fastify-cors"), {
  maxAge: 30 * 60,
});

// Register routes
fastify.register(require("./src/endpoints/tunes"), { prefix: "/v1" });

// Start up server
fastify.listen(Config.listen.port, Config.listen.host, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
