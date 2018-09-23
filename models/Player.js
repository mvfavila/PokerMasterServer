var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var PlayerSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: [true, "can't be blank"] },
    username: { type: mongoose.Schema.Types.String, required: [true, "can't be blank"] },
    buyIns: { type: [] },
    active: { type: mongoose.Schema.Types.Boolean, required: [true, "can't be blank"] },
    createdAt: { type: mongoose.Schema.Types.Date },
    updatedAt: { type: mongoose.Schema.Types.Date },
}, {timestamps: true});

PlayerSchema.plugin(uniqueValidator, {message: 'is already taken.'});

PlayerSchema.methods.toJSON = function(){
  return {
    id: this._id,
    userId: this.userId,
    gameId: this.gameId,
    username: this.username,
    buyIns: this.buyIns,
    active: this.active,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model('Player', PlayerSchema);