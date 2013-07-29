define(function(require){
    var $ = require('jquery');
    var Backbone = require('backbone');
    var Boards = require('collections/boards');
    var BoardItemView = require('views/board/board-item-view');

    var View = Backbone.View.extend({
        collection: Boards,

        initialize: function(){
            Boards.on('reset', this.renderList.bind(this));
            Boards.on('add', this.renderOne.bind(this));
        },

        renderOne: function(item){
            this.$el.append(new BoardItemView({ model: item }).render());
        },

        renderList: function(){
            this.$el.empty();
            this.collection.each(this.renderOne, this);
        }
    });

    return View;
});