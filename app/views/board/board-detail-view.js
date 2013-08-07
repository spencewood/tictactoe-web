define(function(require){
    var Backbone = require('backbone');
    var Boards = require('collections/boards');
    var isotope = require('isotope');
    var DisposableView = require('views/_disposable-view');
    var BoardDetailItemView = require('views/board/board-detail-item-view');

    var View = DisposableView.extend({
        collection: Boards,
        events: {
            'change .board-list': 'filterBySelection'
        },

        initialize: function(){
            DisposableView.prototype.initialize.call(this);

            this.$el.isotope({
                itemSelector: '.board-container',
                layoutMode: 'fitRows'
            });

            Boards.on('reset', this.renderList.bind(this));
            Boards.on('add', this.renderOne.bind(this));
        },

        dispose: function(){
            Boards.off('reset');
            Boards.off('add');
        },

        reload: function(){
            this.$el.isotope('reloadItems');
        },

        insert: function(markup){
            this.$el.isotope('insert', markup);
        },

        filter: function(ids){
            this.$el.isotope({ filter: ids.map(function(id){
                return '[data-id=' + id + ']';
            }).join(', ')});
        },

        renderOne: function(item){
            this.insert(this.addSubview(
                new BoardDetailItemView({ model: item })
            ).render().$el);
        },

        renderList: function(){
            this.destroySubviews();

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