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
                itemSelector: '.item',
                layoutMode: 'fitRows'
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
            console.log('filter by', ids);
        },

        getItemMarkup: function(item){
            return (new BoardDetailItemView({ model: item })).render().html();
        },

        renderOne: function(item){
            var markup =this.getItemMarkup(item);
            this.insert(markup);
        },

        renderList: function(e){
            this.$boardDetail.empty();

            this.insert($(this.collection.map(function(b){
                return this.getItemMarkup(b);
            }.bind(this)).join('')));
        },

        filterBySelection: function(e){
            this.filter($(e.target).val());
        }
    });

    return View;
});