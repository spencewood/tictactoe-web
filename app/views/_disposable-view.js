define(function(require){
    var Backbone = require('backbone');

    var View = Backbone.View.extend({
        
        
        dispose: function(){
            this.unbind();
            this.remove();
        }
    });
});