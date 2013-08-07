define(function(require, exports, module) {
    var Backbone = require('backbone');
    var Boards = require('collections/boards');
    var BoardCreateView = require('views/board/board-create-view');
    var BoardDetailView = require('views/board/board-detail-view');
    var AccountLoginView = require('views/account/account-login-view');
    var SettingsFilterMenu = require('views/settings/settings-filter-menu-view');


    var boardDetail = new BoardDetailView({ el: '.board-detail-container' });
    new AccountLoginView({ el: '.login-container' });
    new BoardCreateView({ el: '.board-create-container' });

    // Defining the application router.
    module.exports = Backbone.Router.extend({
        routes: {
            '': 'index',
            'admin': 'admin'
        },

        index: function(){
            new SettingsFilterMenu({ el: '.filter-container' });

            Boards.fetch({ reset: true });
        }
    });
});