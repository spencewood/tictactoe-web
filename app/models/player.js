/**
 * This will return one instance, as we will only ever have one user per client
 */

define(function(require){
    var Backbone = require('backbone');

    var Player = Backbone.Model.extend({
        defaults: function(){
            return {
                id: Math.floor(Math.random() * 100)
            };
        }
    });

    return new Player();
});