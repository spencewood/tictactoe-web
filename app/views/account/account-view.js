define(function(require){
    var Backbone = require('backbone');
    var Player = require('models/player');
    var AccountLogoutView = require('views/account/account-logout-view');
    var AccountLoginView = require('views/account/account-login-view');

    var View = Backbone.View.extend({
        initialize: function(){
            Player.on('loggedIn', this.renderLoggedIn.bind(this));
            Player.on('loggedOut', this.renderLoggedOut.bind(this));
        },

        renderLoggedIn: function(){
            this.setView(new AccountLogoutView());
            this.render();
        },

        renderLoggedOut: function(){
            this.setView(new AccountLoginView());
            this.render();
        }
    });

    return View;
});