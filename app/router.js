define(function(require, exports, module) {

    var Backbone = require("backbone");
    var Boards = require('collections/boards');
    var BoardListView = require('views/board/board-list-view');
    var BoardCreateView = require('views/board/board-create-view')

    // Defining the application router.
    module.exports = Backbone.Router.extend({
        routes: {
            "": "index"
        },

        index: function() {
            var boardList = new BoardListView({ el: 'body' });
            var boardCreate = new BoardCreateView({ el: '.board-create-container' });
            boardList.render();

            Boards.fetch({ reset: true });
        }
    });

});