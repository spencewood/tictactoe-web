define(function(require){
    var Backbone = require('backbone');
    var Board = require('models/board');
    var boardCreateInactive = require('hbs!templates/board/board-create-inactive');

    var View = Backbone.View.extend({
        template: boardCreateInactive
    });

    return View;
});