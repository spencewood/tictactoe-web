define(function(require){
    var Backbone = require('backbone');
    var Player = require('models/player');
    var settingsFilterMenuLoggedOut = require('hbs!templates/settings/settings-filter-menu-loggedout');
    var settingsFilterMenuLoggedIn = require('hbs!templates/settings/settings-filter-menu-loggedin');

    var View = Backbone.View.extend({
        template: settingsFilterMenuLoggedOut,
        filter: 'active',

        initialize: function(){
            $.when(Player.loginStatusKnown()).then(this.render.bind(this));

            Player.on('loggedIn loggedOut', this.render.bind(this));
            Backbone.Events.on('route:update', this.updateFilter.bind(this));
            Backbone.Events.on('route:update', this.render.bind(this));
        },

        beforeRender: function(){
            //FIX: this is rendering twice on load because of event setup
            this.template = Player.isLoggedIn() ?
                settingsFilterMenuLoggedIn :
                settingsFilterMenuLoggedOut;
        },

        updateFilter: function(filter){
            this.filter = filter;
        },

        clearActive: function(){
            this.$el.find('li.active').removeClass('active');
        },

        setActive: function($el){
            $el.addClass('active');
        },

        afterRender: function(){
            var item = this.$el.find('li a[href=\\/' + this.filter + ']');
            var parent = item.parents('li:first');
            var filters = item.data('filters');
            Backbone.Events.trigger('filter:update', typeof filters !== 'undefined' ? filters.split(' ') : []);
            this.clearActive();
            this.setActive(parent);
        }
    });

    return View;
});