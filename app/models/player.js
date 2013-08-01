/**
 * This will return one instance, as we will only ever have one user per client
 */

define(function(require){
    var Backbone = require('backbone');

    var Player = Backbone.Model.extend({
        defaults: function(){
            return {
                id: 2
            };
        }
    });

    return new Player();
});