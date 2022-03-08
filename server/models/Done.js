const { Schema } = require('mongoose');

const doneSchema = new Schema({
    text: {
      type: String,
      required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    }
    // completed : {
    //   type: Boolean,
    //   required: true
    // }
  });

module.exports = doneSchema;
