/**
 * This will return one instance, as we will only ever have one user per client
 */

define(function(require){
    var Backbone = require('backbone');
    var guid = require('helpers/guid');

    var Player = Backbone.Model.extend({
        defaults: function(){
            return {
                id: guid.new()
            };
        },

        leave: function(){
            return $.ajax({
                type: 'POST',
                url: '/players/leave',
                async: false,
                data: {
                    playerId: this.id
                }
            });
        }
    });

    return new Player();
});