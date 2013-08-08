define(function(require){
    var Backbone = require('backbone');
    var Player = require('models/player');
    var boardDetailItemSpotTemplate = require('hbs!templates/board/board-detail-item-spot');
    var settings = require('settings');

    var View = Backbone.View.extend({
        events: {
            'click a': 'play'
        },

        serialize: function(){
            return {
                token: settings.tokens[this.options.spot]
            };
        },

        beforeRender: function(){
            this.setElement(boardDetailItemSpotTemplate(this.serialize));
        },

        play: function(e){
            e.preventDefault();
            this.model.play(Player.get('id'), this.options.idx);
        }
    });

    return View;
});