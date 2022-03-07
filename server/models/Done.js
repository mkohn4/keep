const { Schema } = require('mongoose');

const doneSchema = new Schema({
    // saved book id from GoogleBooks
    doneId: {
      type: String,
      required: true,
    },
    Text: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      required: true,
      default: Date.now
    },
    // completed : {
    //   type: Boolean,
    //   required: true
    // }
  });

module.exports = doneSchema;
