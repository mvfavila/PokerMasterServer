var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var GameSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, "can't be blank"] },
    admins: { type: [], required: [true, "can't be blank"] },
    groupId: String,
    players: { type: [] },
    active: { type: mongoose.Schema.Types.Boolean, required: [true, "can't be blank"] }
}, {timestamps: true});

GameSchema.plugin(uniqueValidator, {message: 'is already taken.'});

GameSchema.methods.toJSON = function(){
  return {
    userId: this.userId,
    admins: this.admins,
    groupId: this.groupId,
    players: this.players,
    active: this.active
  };
};

mongoose.model('Game', GameSchema);