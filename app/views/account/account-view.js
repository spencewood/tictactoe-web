define(function(require){
    var $ = require('jquery');
    var Backbone = require('backbone');
    var Player = require('models/player');
    var AccountLogoutView = require('views/account/account-logout-view');
    var AccountLoginView = require('views/account/account-login-view');

    var View = Backbone.View.extend({
        initialize: function(){
            $.when(Player.loginStatusKnown()).then(this.render.bind(this));

            Player.on('loggedIn loggedOut', this.render.bind(this));
        },

        beforeRender: function(){
            this.setView(Player.isLoggedIn() ?
                new AccountLogoutView({ model: Player }) :
                new AccountLoginView()
            );
        }
    });

    return View;
});