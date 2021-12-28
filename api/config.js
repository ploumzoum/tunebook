/**
 * Default minimal configuration. See `src/config.js` for all the possible
 * configuration options that can be tweaked.
 */
module.exports = {
  // clientUrl: "https://www.saig.org",

  mongodb: {
    uri: "mongodb://tunebook-db/tunebook",
  },

  listen: {
    port: 3000,
    host: "::",
  },
  logger: true,
  http: {
    entityMaxSize: 16 * 1024 * 1024, // 16MB
  },
};
