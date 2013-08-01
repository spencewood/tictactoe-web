define(function(require){
    var Backbone = require('backbone');
    var Player = require('models/player');
    var BoardDetailItemSpotView = require('views/board/board-detail-item-spot-view');
    var boardDetailItem = require('hbs!templates/board-detail-item');

    var View = Backbone.View.extend({
        events: {
            'click .join': 'join'
        },

        initialize: function(){
            this.setElement(boardDetailItem(this.model.toJSON()));
            this.model.on('change:spots', this.rerender.bind(this));
            this.model.on('change:status', this.changeStatus.bind(this));
        },

        join: function(e){
            e.preventDefault();
            this.model.join(Player.get('id'));
        },

        render: function(){
            var $board = this.$el.find('.board');

            this.model.get('spots').forEach(function(spot, idx){
                $board.append(
                    new BoardDetailItemSpotView({
                        model: this.model,
                        idx: idx,
                        spot: spot
                    }).render().el
                );
            }.bind(this));

            return this;
        },

        rerender: function(){
            this.$el.find('.board').empty();
            this.render();
        },

        changeStatus: function(){
            var statuses = ['waiting', 'ready', 'complete'];
            this.$el.find('.board')
                .removeClass(statuses.join(' '))
                .addClass(this.model.get('status'));
        }
    });

    return View;
});