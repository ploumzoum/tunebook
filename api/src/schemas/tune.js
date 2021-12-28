const file = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
    },
    filename: { type: 'string' },
    metadata: {
      type: 'object',
      properties: {
        encoding: { type: 'string' },
        mimetype: { type: 'string' },
      },
      additionalProperties: false,
    },
    uploadDate: {
      type: 'string',
      format: 'date-time',
    },
    size: { type: 'number' },
    url: { type: 'string' },
  },
  additionalProperties: false,
}

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
    files: {
      type: "array",
      items: file
    }
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
