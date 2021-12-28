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
mongoose
  .connect(process.env["MONGODB_PATH"] || Config.mongodb.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Buckets for file hosting
    Object.defineProperty(mongoose, "bucket", {
      value: {
        tuneFiles: new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
          bucketName: "tuneFiles",
        }),
      },
    });
  });

// Register plugins
fastify.register(require("fastify-formbody"), {
  bodyLimit: Config.http.entityMaxSize,
});

// Register CORS middlewares
fastify.register(require("fastify-cors"), {
  maxAge: 30 * 60,
});

// Register multipart support plugin
fastify.register(require("fastify-multipart"), {
  limits: {
    // fieldNameSize: int, // Max field name size in bytes
    // fieldSize: int,     // Max field value size in bytes
    // fields: int,        // Max number of non-file fields
    fileSize: 512000000, // Max file size
    files: 1, // Max number of file fields
    // headerPairs: int    // Max number of header key=>value pairs
  },
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
