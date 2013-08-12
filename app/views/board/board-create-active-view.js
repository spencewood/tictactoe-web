define(function(require){
    var Backbone = require('backbone');
    var Board = require('models/board');
    var boardCreateActive = require('hbs!templates/board/board-create-active');

    var View = Backbone.View.extend({
        events: {
            'click button': 'create'
        },

        template: boardCreateActive,

        create: function(e){
            e.preventDefault();
            new Board().save();
        }
    });

    return View;
});