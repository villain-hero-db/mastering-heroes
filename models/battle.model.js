const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const battleSchema = new Schema({
    teams: Array,
    favourites: [{
        type: Schema.Types.ObjectId,
        ref: 'Heroes'
    }],
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
const Battle = mongoose.model('Battle', battleSchema);
module.exports = Battle;