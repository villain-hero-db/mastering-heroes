const mongoose = require('mongoose');
const {
  Schema,
  model
} = mongoose;

const heroesSchema = new Schema({
  name: String,
  idBD: Number,
  image: {
    type: String,
    default: ''
  },
  fullName: String,
  publisher: String,
  firstAppearance: String
});

module.exports = model('Heroes', heroesSchema);