const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const toDoSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false
  }
},
{ timestamps: true }
);



// maybe alternative solution with an array of objects for todo, completed etc?



module.exports = toDoSchema;
