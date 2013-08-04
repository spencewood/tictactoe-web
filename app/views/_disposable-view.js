define(function(require){
    var Backbone = require('backbone');
    var _ = require('underscore');

    var View = Backbone.View.extend({
        initialize: function(){
            this.subviews = [];
        },

        addSubview: function(subview){
            this.subviews.push(subview);
            return subview;
        },

        dispose: function(){
            //no-op
        },

        destroySubviews: function(){
            this.subviews.forEach(function(subview){
                subview.destroy();
            });
        },
        
        destroy: function(){
            this.destroySubviews();
            this.dispose();
            this.unbind();
            this.remove();
        }
    });

    return View;
});