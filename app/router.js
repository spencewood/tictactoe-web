define(function(require, exports, module) {
    var Backbone = require('backbone');
    var Boards = require('collections/boards');
    var BoardListView = require('views/board/board-list-view');
    var BoardCreateView = require('views/board/board-create-view');
    var BoardDetailView = require('views/board/board-detail-view');
    var AccountLoginView = require('views/account/account-login-view');

    // Defining the application router.
    module.exports = Backbone.Router.extend({
        routes: {
            '': 'index',
            'admin': 'admin'
        },

        index: function() {
            var boardDetail = new BoardDetailView({ el: '#main' });
            var boardList = new BoardListView({ el: '.board-list' });
            new AccountLoginView({ el: '.login-container' });
            new BoardCreateView({ el: '.board-create-container' });
            
            boardList.render();
            boardDetail.render();

            Boards.fetch({ reset: true });
        }
    });
});