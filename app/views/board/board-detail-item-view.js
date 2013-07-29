define(function(require){
    var Backbone = require('backbone');
    var boardDetailItem = require('hbs!templates/board-detail-item');

    var View = Backbone.View.extend({
        render: function(){
            return this.$el.append(boardDetailItem(this.model.toJSON()));
        }
    });

    return View;
});