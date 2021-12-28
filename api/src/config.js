const DefaultConfig = {
  clientUrl: "http://saig.fonfon.ninja",

  mongodb: {
    uri: "mongodb://localhost/tunebook",
  },

  listen: {
    port: 3001,
    host: undefined,
  },
};

try {
  module.exports = {
    ...DefaultConfig,
    ...require("../config"),
  };
} catch (e) {
  console.warn("Failed to load global configuration, using defaults...");
  module.exports = DefaultConfig;
}
