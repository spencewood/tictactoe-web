define(function(require){
    var Backbone = require('backbone');
    var Board = require('models/board');

    var View = Backbone.View.extend({
        events: {
            'click button': 'create'
        },

        create: function(){
            new Board().save();
        }
    });

    return View;
});