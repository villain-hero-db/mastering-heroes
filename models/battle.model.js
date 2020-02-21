const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const battleSchema = new Schema({
    team1: {

        heroes: {
            type: Array,
            id: Number,
            name: String,
            imgurl: String,
            powerstats: {
                intelligence: Number,
                strenght: Number,
                speed: Number,
                durability: Number,
                power: Number,
                combat: Number
            }
        }
    },
    team2: {

        heroes: {
            type: Array,
            id: Number,
            name: String,
            imgurl: String,
            powerstats: {
                intelligence: Number,
                strenght: Number,
                speed: Number,
                durability: Number,
                power: Number,
                combat: Number
            }
        }
    },
    battleCreator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
const Battle = mongoose.model('Battle', battleSchema);
module.exports = Battle;