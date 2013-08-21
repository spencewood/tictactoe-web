define(function(require, exports, module) {
    var Backbone = require('backbone');
    var Boards = require('collections/boards');
    var Player = require('models/player');
    var BoardCreateView = require('views/board/board-create-view');
    var BoardDetailView = require('views/board/board-detail-view');
    var AccountView = require('views/account/account-view');
    var SettingsFilterMenuView = require('views/settings/settings-filter-menu-view');

    new SettingsFilterMenuView({ el: '.filter-container' });
    new BoardDetailView({ el: '.board-detail-container' });
    new AccountView({ el: '.login-container' });
    new BoardCreateView({ el: '.board-create-container' });

    // Defining the application router.
    module.exports = Backbone.Router.extend({
        routes: {
            '': 'index',
            'my': 'my',
            'active': 'active',
            'completed': 'completed',
            'admin': 'admin',
            'accounts/login/:token': 'login',
            'accounts/logout': 'logout'
        },

        index: function(){
            Backbone.Events.trigger('filter:update', '');
        },

        my: function(){
            Backbone.Events.trigger('filter:update', 'my');
        },

        active: function(){
            Backbone.Events.trigger('filter:update', 'active');
        },

        completed: function(){
            Backbone.Events.trigger('filter:update', 'completed');
        },

        login: function(token){
            Player.set('token', token);
            this.navigate('', { trigger: true });
        },

        logout: function(){
            Player.logout();
            this.navigate('', { trigger: true });
        }
    });

    Player.whoAmI();
    Boards.fetch({ reset: true });
});