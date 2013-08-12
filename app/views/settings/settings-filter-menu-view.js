define(function(require){
    var Backbone = require('backbone');
    var Player = require('models/player');
    var settingsFilterMenuLoggedOut = require('hbs!templates/settings/settings-filter-menu-loggedout');

    var View = Backbone.View.extend({
        template: settingsFilterMenuLoggedOut,

        initialize: function(){
            $.when(Player.loginStatusKnown()).then(this.render.bind(this));

            Player.on('loggedIn loggedOut', this.render.bind(this));
        },

        clearActive: function(){
            this.$el.find('li.active').removeClass('active');
        },

        setActive: function($el){
            $el.addClass('active');
        },

        navigate: function(route){
            route = route || '';
            this.clearActive();
            var item = this.$el.find('li a[href=\\/' + route + ']').parents('li:first');
            this.setActive(item);
            Backbone.Events.trigger('boardFilter', route);
        }
    });

    return View;
});