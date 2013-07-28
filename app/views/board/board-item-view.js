define(function(require){
    var Backbone = require('backbone');
    var boardItemTemplate = require('hbs!templates/board-item');

    var View = Backbone.View.extend({
        render: function(){
            return boardItemTemplate(this.model.toJSON());
        }
    });

    return View;
});