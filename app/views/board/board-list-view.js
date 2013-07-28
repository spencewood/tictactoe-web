define(function(require){
    var $ = require('jquery');
    var Backbone = require('backbone');
    var Boards = require('collections/boards');
    var BoardItemView = require('views/board/board-item-view');
    var BoardDetailView = require('views/board/board-detail-view');

    var View = Backbone.View.extend({
        collection: Boards,

        events: {
            'change': 'renderDetailList'
        },

        initialize: function(){
            this.$boardList = this.$el.find('.board-list');
            this.$boardDetail = this.$el.find('.board-detail-container');

            Boards.on('reset', this.renderList.bind(this));
            Boards.on('add', this.renderOne.bind(this));
        },

        renderOne: function(item){
            this.$boardList.append(new BoardItemView({ model: item }).render());
        },

        renderList: function(){
            this.$boardList.empty();
            this.collection.each(this.renderOne, this);
        },

        renderDetailOne: function(item){
            this.$boardDetail.append(new BoardDetailView({ model: item }).render());
        },

        renderDetailList: function(e){
            this.$boardDetail.empty();

            $(e.target).val().forEach(function(id){
                this.renderDetailOne(Boards.get(id));
            }.bind(this));
        }
    });

    return View;
});