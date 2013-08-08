/**
 * This will return one instance, as we will only ever have one user per client
 */

define(function(require){
    var $ = require('jquery');
    var Backbone = require('backbone');
    var guid = require('helpers/guid');
    var settings = require('settings');

    var isLoggedIn = false;
    var loginStatusKnown = $.Deferred();

    var Player = Backbone.Model.extend({
        defaults: function(){
            return {
                id: guid.new()
            };
        },

        initialize: function(){
            this.whoAmI();
        },

        loginStatusKnown: function(){
            return loginStatusKnown.promise();
        },

        isLoggedIn: function(){
            return isLoggedIn;
        },

        whoAmI: function(){
            loginStatusKnown.resolve();
        },

        requestLogin: function(email){
            return $.ajax({
                type: 'POST',
                url: settings.baseApiUrl + '/accounts/requestLogin',
                data: {
                    email: email
                }
            });
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