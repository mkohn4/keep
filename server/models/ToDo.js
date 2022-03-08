const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const toDoSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  }
  // optional due date for ToDo
  // date: {
  //   type: Date,
  // }
  // optional alternative to two schemas with just boolean being updated
    // not used as this would nt give a created_at for the done schema
  // completed : {
  //   type: Boolean,
  //   required: true
  // }
});



// maybe alternative solution with an array of objects for todo, completed etc?



module.exports = toDoSchema;
