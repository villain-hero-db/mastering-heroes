const mongoose = require('mongoose');
const {
  Schema,
  model
} = mongoose;

const heroesSchema = new Schema({
  name: String,
  bso: String,
  idBD: Number,
});

module.exports = model('Heroes', PostSchema);