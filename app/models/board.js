define(function(require){
    var Backbone = require('backbone');
    var settings = require('settings');

    var Board = Backbone.Model.extend({
        idAttribute: '_id',
        url: settings.baseApiUrl + '/boards',

        defaults: function(){
            return {
                isComplete: false,
                players: [],
                turn: 0
            };
        },

        toJSON: function(){
            var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
            json.isReady = this.get('players').length === 2;
            return json;
        }
    });

    return Board;
});