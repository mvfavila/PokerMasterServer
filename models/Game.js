var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var GameSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, "can't be blank"] },
    admins: { type: [], required: [true, "can't be blank"] },
    groupId: String,
    players: { type: [] },
    active: { type: mongoose.Schema.Types.Boolean, required: [true, "can't be blank"] },
    createdAt: { type: mongoose.Schema.Types.Date },
    updatedAt: { type: mongoose.Schema.Types.Date },
}, {timestamps: true});

GameSchema.plugin(uniqueValidator, {message: 'is already taken.'});

GameSchema.methods.toJSON = function(){
  return {
    id: this._id,
    userId: this.userId,
    admins: this.admins,
    groupId: this.groupId,
    players: this.players,
    active: this.active,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

mongoose.model('Game', GameSchema);