define(function(require){
    var $ = require('jquery');
    var Backbone = require('backbone');
    var settings = require('settings');

    var Board = Backbone.Model.extend({
        idAttribute: '_id',
        url: settings.baseApiUrl + '/boards',

        defaults: function(){
            return {
                isComplete: false,
                players: [],
                spots: [2, 2, 2, 2, 2, 2, 2, 2, 2],
                turn: 0
            };
        },

        toJSON: function(){
            var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
            json.status = this.getStatus();
            return json;
        },

        getStatus: function(){
            if(this.get('isComplete')){
                return 'completed';
            }
            else if(this.canPlay()){
                return 'ready';
            }
            else{
                return 'waiting';
            }
        },

        canJoin: function(playerId){
            var players = this.get('players');
            return ! this.get('isComplete') &&
                players.length < 2 &&
                players.indexOf(playerId) === -1;
        },

        canPlay: function(playerId){
            var players = this.get('players');
            var index = players.indexOf(playerId);
            return players.length === 2 &&
                index >= 0 &&
                this.get('turn') % 2 === index;
        },

        play: function(playerId, spot){
            return $.ajax({
                type: 'POST',
                url: settings.baseApiUrl + '/boards/play',
                data: {
                    boardId: this.id,
                    playerId: playerId,
                    spot: spot
                }
            });
        },

        join: function(playerId){
            return $.ajax({
                type: 'POST',
                url: settings.baseApiUrl + '/boards/join',
                data: {
                    boardId: this.id,
                    playerId: playerId
                }
            });
        }
    });

    return Board;
});