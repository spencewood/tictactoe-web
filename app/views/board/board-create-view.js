define(function(require){
    var Backbone = require('backbone');
    var Player = require('models/player');
    var BoardCreateActiveView = require('views/board/board-create-active-view');
    var BoardCreateInactiveView = require('views/board/board-create-inactive-view');

    var View = Backbone.View.extend({
        initialize: function(){
            $.when(Player.loginStatusKnown()).then(this.render.bind(this));

            Player.on('loggedIn loggedOut', this.render.bind(this));
        },

        beforeRender: function(){
            this.setView(Player.isLoggedIn() ?
                new BoardCreateActiveView() :
                new BoardCreateInactiveView()
            );
        }
    });

    return View;
});