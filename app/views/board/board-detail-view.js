define(function(require){
    var Backbone = require('backbone');
    var Boards = require('collections/boards');
    var isotope = require('isotope');
    var BoardDetailItemView = require('views/board/board-detail-item-view');

    var View = Backbone.View.extend({
        collection: Boards,
        events: {
            'change .board-list': 'filterBySelection'
        },

        initialize: function(){
            this.$boardDetail = this.$el.find('.board-detail-container');
            this.$boardDetail.isotope({
                itemSelector: '.board-container',
                layoutMode: 'fitRows',
                filter: '.all'
            });

            Boards.on('reset', this.renderList.bind(this));
            Boards.on('add', this.renderOne.bind(this));
        },

        reload: function(){
            this.$boardDetail.isotope('reloadItems');
        },

        insert: function(markup){
            this.$boardDetail.isotope('insert', markup);
        },

        filter: function(ids){
            this.$boardDetail.isotope({ filter: ids.map(function(id){
                return '[data-id=' + id + ']';
            }).join(', ')});
        },

        getItem: function(item){
            return new BoardDetailItemView({ model: item }).render().$el;
        },

        renderOne: function(item){
            this.insert(this.getItem(item));
        },

        renderList: function(){
            this.$boardDetail.empty();

            this.collection.forEach(function(b){
                this.renderOne(b);
            }.bind(this));
        },

        filterBySelection: function(e){
            this.filter($(e.target).val());
        }
    });

    return View;
});