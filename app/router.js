define(function(require, exports, module) {
    var $ = require('jquery');
    var Backbone = require('backbone');
    var Boards = require('collections/boards');
    var Player = require('models/player');
    var BoardListView = require('views/board/board-list-view');
    var BoardCreateView = require('views/board/board-create-view');
    var BoardDetailView = require('views/board/board-detail-view');

    // Defining the application router.
    module.exports = Backbone.Router.extend({
        routes: {
            "": "index"
        },

        index: function() {
            var boardDetail = new BoardDetailView({ el: '#main' });
            var boardList = new BoardListView({ el: '.board-list' });
            var boardCreate = new BoardCreateView({ el: '.board-create-container' });
            
            boardList.render();
            boardDetail.render();

            Boards.fetch({ reset: true });
        }
    });
});