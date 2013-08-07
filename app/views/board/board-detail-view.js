define(function(require){
    var Backbone = require('backbone');
    var Boards = require('collections/boards');
    var BoardDetailItemView = require('views/board/board-detail-item-view');
    require('isotope');

    var View = Backbone.View.extend({
        collection: Boards,

        initialize: function(){
            this.$el.isotope({
                itemSelector: '.board-container',
                layoutMode: 'fitRows'
            });

            this.collection.on('reset', this.render.bind(this));
            this.collection.on('add', this.add.bind(this));
        },

        reload: function(){
            this.$el.isotope('reloadItems');
        },

        insertIsotope: function(view){
            if(typeof view.$el !== 'undefined'){
                this.$el.isotope('insert', view.$el);
            }
            return view;
        },

        addView: function(model, render){
            var view = this.insertIsotope(this.insertView(
                new BoardDetailItemView({ model: model })
            ));

            //only here for rendering created items
            if(render === true){
                view.render();
            }
        },

        add: function(model){
            console.log('calling add');
            this.addView(model, true);
        },

        beforeRender: function(){
            this.collection.each(this.addView.bind(this));
        }
    });

    return View;
});