define(function(require){
    var Backbone = require('backbone');
    var Player = require('models/player');
    var boardDetailItemSpot = require('hbs!templates/board-detail-item-spot');
    var settings = require('settings');

    var View = Backbone.View.extend({
        events: {
            'click a': 'play'
        },

        render: function(){
            this.setElement(
                boardDetailItemSpot({
                    token: settings.tokens[this.options.spot]
                })
            );
            return this;
        },

        play: function(e){
            e.preventDefault();
            this.model.play(Player.get('id'), this.options.idx);
        }
    });

    return View;
});