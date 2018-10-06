var mongoose = require('mongoose');
var router = require('express').Router();
var Game = mongoose.model('Game');
var Player = mongoose.model('Player');
var auth = require('../auth');
var jwt = require("jsonwebtoken");

/*
 * POST
 * Create a new player
 * Expected errors:
 * 204: No active game found
 * 422: Not possible to process player
*/
router.post('/players', auth.required, function(req, res, next){
    
    // get data from user.token
    var token = decodeFromReq(req);

    Game.find({ userId: token.id, active: true }).then(function(game){
        if(!Array.isArray(game) || !game.length){
            return res.status(204).send({ error: "No active game found" });
        }
        else{
            //TODO: create logError function
            //if(game.length > 1)
            //    logError('Multiple active games for user: ' + token.id);

            if(!req.body.player.username)
                return res.status(422).json({errors: {username: "can't be blank"}});
                
            if(req.body.player.username.length < 2)
                return res.status(422).json({errors: {username: "needs more than 2 characteres"}});

            var player = new Player();
            player.gameId = game[0].id;            
            player.username = req.body.player.username; 
            player.buyIns = req.body.player.buyIns || [];
            player.active = true;
            
            // todo: check how to link player to 3rd user (not the user who added the player)

            player.save().then(function(){
                return res.json({ player: player.toJSON() });
            }).catch(next);
        }
    }).catch(next);
});

/*
 * GET (Admin function)
 * Gets all the existing players
 * Expected errors:
 * 204: No active player found
*/
router.get('/players', auth.required, function(req, res, next){
    var token = decodeFromReq(req);
    
    Player.find().then(function(players){
      if(!players){ return res.status(204).send({ error: "No player found" }); }

      var playersJson = [];
      players.forEach(player => {
          playersJson.push(player.toJSON());
      });
  
      return res.json({ players: playersJson });
    }).catch(next);
});

/*
 * Gets the decoded json of the JSON Web Token
*/
function decodeFromReq(req) {
    // todo: check for null values here
    
    var token = req.headers.authorization.split(' ')[1];
    return jwt.decode(token);
}

/*
 * DELETE
 * DELETE all players
*/
router.delete('/players/deleteall', auth.optional, function(req, res, next){
    Player.deleteMany({})
    .then((res) => {})
    .catch(next);
});

module.exports = router;