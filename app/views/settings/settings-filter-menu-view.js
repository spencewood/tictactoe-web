define(function(require){
    var Backbone = require('backbone');
    var Player = require('models/player');
    var settingsFilterMenuLoggedOut = require('hbs!templates/settings/settings-filter-menu-loggedout');

    var View = Backbone.View.extend({
        template: settingsFilterMenuLoggedOut,
        route: 'active',

        initialize: function(){
            this.render();
            //$.when(Player.loginStatusKnown()).then(this.renderActive.bind(this));

            Player.on('loggedIn loggedOut', this.renderActive.bind(this));
            Backbone.Events.on('route:update', this.updateRoute.bind(this));
            Backbone.Events.on('route:update', this.renderActive.bind(this));
        },

        updateRoute: function(route){
            this.route = route;
        },

        clearActive: function(){
            this.$el.find('li.active').removeClass('active');
        },

        setActive: function($el){
            $el.addClass('active');
        },

        renderActive: function(){
            this.clearActive();
            var item = this.$el.find('li a[href=\\/' + this.route + ']').parents('li:first');
            this.setActive(item);
            Backbone.Events.trigger('boardFilter', this.route);
        }
    });

    return View;
});