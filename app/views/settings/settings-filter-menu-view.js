define(function(require){
    var Backbone = require('backbone');

    var View = Backbone.View.extend({
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
        }
    });

    return View;
});