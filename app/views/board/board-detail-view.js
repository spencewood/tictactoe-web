define(function(require){
    var Backbone = require('backbone');
    var boardDetail = require('hbs!templates/board-detail');

    var View = Backbone.View.extend({
        render: function(){
            return this.$el.append(boardDetail(this.model.toJSON()));
        }
    });

    return View;
});