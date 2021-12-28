const tune = {
  type: "object",
  properties: {
    _id: { type: "string" },
    title: { type: "string" },
    type: { type: "string" },
    abc: { type: "string" },
    key: { type: "string" },
    composer: { type: "string" },
    note: { type: "string" },
  },
  additionalProperties: false,
};

const createTune = {
  type: "object",
  properties: {
    title: { type: "string" },
    type: { type: "string" },
    abc: { type: "string" },
    key: { type: "string" },
    composer: { type: "string" },
    note: { type: "string" },
  },
  additionalProperties: false,
};

module.exports = {
  serialization: {
    tune,
  },
  validation: {
    createTune,
  },
};
