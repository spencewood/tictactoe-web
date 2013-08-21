define(function(require){
    var Backbone = require('backbone');
    var Player = require('models/player');
    var settingsFilterMenuLoggedOut = require('hbs!templates/settings/settings-filter-menu-loggedout');

    var View = Backbone.View.extend({
        template: settingsFilterMenuLoggedOut,
        filter: 'active',

        initialize: function(){
            this.render();
            //$.when(Player.loginStatusKnown()).then(this.renderActive.bind(this));

            Player.on('loggedIn loggedOut', this.renderActive.bind(this));
            Backbone.Events.on('filter:update', this.updateRoute.bind(this));
            Backbone.Events.on('filter:update', this.renderActive.bind(this));
        },

        updateRoute: function(filter){
            this.filter = filter;
        },

        clearActive: function(){
            this.$el.find('li.active').removeClass('active');
        },

        setActive: function($el){
            $el.addClass('active');
        },

        renderActive: function(){
            this.clearActive();
            var item = this.$el.find('li a[href=\\/' + this.filter + ']').parents('li:first');
            this.setActive(item);
        }
    });

    return View;
});