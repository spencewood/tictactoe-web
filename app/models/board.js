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
                turn: 0,
                status: 'waiting'
            };
        },

        toJSON: function(){
            var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
            json.isReady = this.get('players').length === 2;
            return json;
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