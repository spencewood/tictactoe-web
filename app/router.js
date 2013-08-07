define(function(require, exports, module) {
    var Backbone = require('backbone');
    var Boards = require('collections/boards');
    var BoardCreateView = require('views/board/board-create-view');
    var BoardDetailView = require('views/board/board-detail-view');
    var AccountLoginView = require('views/account/account-login-view');
    var SettingsFilterMenuView = require('views/settings/settings-filter-menu-view');

    var filter = new SettingsFilterMenuView({ el: '.filter-container' });
    new BoardDetailView({ el: '.board-detail-container' });
    new AccountLoginView({ el: '.login-container' });
    new BoardCreateView({ el: '.board-create-container' });

    Boards.fetch({ reset: true });

    // Defining the application router.
    module.exports = Backbone.Router.extend({
        routes: {
            '': 'index',
            'my': 'my',
            'active': 'active',
            'completed': 'completed',
            'admin': 'admin'
        },

        index: function(){
            filter.navigate();
        },

        my: function(){
            filter.navigate('my');
        },

        active: function(){
            filter.navigate('active');
        },

        completed: function(){
            filter.navigate('completed');
        }
    });
});