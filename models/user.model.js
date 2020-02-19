const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  password: String,
  teams: Array,
  favourites: [{ type: Schema.Types.ObjectId, ref: 'Heroes' }],
  avatarPath: {
    type: String,
    default: "https://www.superherodb.com/pictures2/portraits/10/100/10255.jpg"
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
const User = mongoose.model('User', userSchema);
module.exports = User;