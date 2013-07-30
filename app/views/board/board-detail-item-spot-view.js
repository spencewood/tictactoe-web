define(function(require){
    var Backbone = require('backbone');
    var Player = require('models/player');
    var boardDetailItemSpot = require('hbs!templates/board-detail-item-spot');

    var View = Backbone.View.extend({
        events: {
            'click': 'play'
        },

        render: function(){
            this.setElement(
                boardDetailItemSpot({
                    spot: this.spot,
                    idx: this.idx
                })
            );
            return this;
        },

        play: function(e){
            e.preventDefault();
            this.model.play(Player.get('id'), this.options.spot);
        }
    });

    return View;
});