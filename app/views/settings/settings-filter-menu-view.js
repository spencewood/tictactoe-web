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

            //Player.on('loggedIn loggedOut', this.renderActive.bind(this));
            Backbone.Events.on('route:update', this.updateFilter.bind(this));
            Backbone.Events.on('route:update', this.renderActive.bind(this));
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

        renderActive: function(){
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