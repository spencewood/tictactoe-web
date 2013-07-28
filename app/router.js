define(function(require, exports, module) {

    var Backbone = require("backbone");
    var Boards = require('collections/boards');
    var BoardListView = require('modules/board/board-list-view');

    // Defining the application router.
    module.exports = Backbone.Router.extend({
        routes: {
            "": "index"
        },

        index: function() {
            var boardList = new BoardListView();
            $('.board-list-container').append(boardList.el);
            boardList.render();

            Boards.fetch({ reset: true });
            console.log("Welcome to your / route.");
        }
    });

});