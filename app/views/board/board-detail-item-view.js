define(function(require){
    var Backbone = require('backbone');
    var Player = require('models/player');
    var BoardDetailItemSpotView = require('views/board/board-detail-item-spot-view');
    var boardDetailItem = require('hbs!templates/board-detail-item');

    var View = Backbone.View.extend({
        events: {
            'click .join': 'join'
        },

        render: function(){
            this.setElement(boardDetailItem(this.model.toJSON()));

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

        join: function(e){
            e.preventDefault();
            this.model.join(Player.get('id'));
        }
    });

    return View;
});