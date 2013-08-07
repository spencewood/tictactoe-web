define(function(require){
    var Backbone = require('backbone');

    var View = Backbone.View.extend({
        events: {
            'click a': 'navigate'
        },

        initialize: function(options){
            this.navigateByHash(options.hash || '');
        },

        getMenuItems: function(){
            return this.$el.find('li');
        },

        clearActive: function(){
            this.getMenuItems().filter('.active').removeClass('active');
        },

        setActive: function($el){
            $el.addClass('active');

        },

        navigate: function(e){
            //e.preventDefault();

            this.clearActive();
            this.setActive($(e.currentTarget).parents('li:first'));
        },

        navigateByHash: function(hash){
            var item = this.getMenuItems()
                .find('a[href=#' + hash + ']').parents('li:first');
            this.setActive(item);
        }
    });

    return View;
});