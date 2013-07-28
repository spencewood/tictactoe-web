define(function(require){
    var Backbone = require('backbone');
    var Board = require('models/board');
    var boardCreate = require('hbs!templates/board-create');

    var View = Backbone.View.extend({
        events: {
            'click button': 'create'
        },

        render: function(){
            this.$el.append(boardCreate());
        },

        create: function(){
            new Board().save();
        }
    });

    return View;
});