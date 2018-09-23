var mongoose = require('mongoose');
var router = require('express').Router();
var Game = mongoose.model('Game');
var auth = require('../auth');
var jwt = require("jsonwebtoken");

/*
 * POST
 * Create a new game
 * Expected errors:
 * 403: The user already has an active game
*/
router.post('/games', auth.required, function(req, res, next){
    
    // get data from user.token
    var token = decodeFromReq(req);

    Game.find({ userId: token.id, active: true }).then(function(game){
        if(Array.isArray(game) && game.length > 0){
            return res.status(403).send({ error: "Game already in progress" });
        }
        else{
            // create new game
            var game = new Game();

            game.userId = token.id;
            game.admins = [token.id];
            game.groupId = '';
            game.players = new Array();
            game.active = true;

            game.save().then(function(){
                return res.json({game: game.toJSON()});
            }).catch(next);
        }
    }).catch(next);
});

/*
 * GET
 * Gets the active game of an user
 * Expected errors:
 * 204: No active game found
*/
router.get('/game', auth.required, function(req, res, next){
    var token = decodeFromReq(req);
    
    Game.findOne({ userId: token.id, active: true }).then(function(game){
      if(!game){ return res.status(204).send({ error: "No active game found" }); }
  
      return res.json({user: game.toJSON()});
    }).catch(next);
});

/*
 * GET (Admin function)
 * Gets all the existing games
 * Expected errors:
 * 204: No active game found
*/
router.get('/games', auth.required, function(req, res, next){
    var token = decodeFromReq(req);
    
    Game.find().then(function(games){
      if(!games){ return res.status(204).send({ error: "No game found" }); }

      var gamesJson = [];
      games.forEach(game => {
          gamesJson.push(game.toJSON());
      });
  
      return res.json({ games: gamesJson });
    }).catch(next);
});

function decodeFromReq(req) {
    //TODO: check for null values here
    
    var token = req.headers.authorization.split(' ')[1];
    return jwt.decode(token);
}

module.exports = router;