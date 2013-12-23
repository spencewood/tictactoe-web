define(function(require){
    var Boards = require('collections/boards');
    var Board = require('models/board');

    var Controller = {
        create: function(m){
            Boards.add([{ _id: m.boardId }]);
            Backbone.Events.trigger('board:create', m);
        },

        join: function(m){
            var board = Boards.get(m.boardId);
            if(board !== null){
                board.get('players').push(m.playerId);
                board.trigger('change:players');
            }
            Backbone.Events.trigger('board:join', m);
        },

        leave: function(m){
            var board = Boards.get(m.boardId);
            if(board !== null){
                var index = board.indexOf(m.boardId);
                if(index >= 0){
                    board.get('players').splice(index, 1);
                    board.set({ status: 'waiting' });
                    board.trigger('change:players');
                }
            }
            Backbone.Events.trigger('board:leave', m);
        },

        ready: function(m){
            var board = Boards.get(m.boardId);
            if(board !== null){
                board.set({ status: 'ready' });
            }
            Backbone.Events.trigger('board:ready', m);
        },

        play: function(m){
            var board = Boards.get(m.boardId);
            if(board !== null){
                board.set('spots', m.spots);
            }
            Backbone.Events.trigger('board:play', m);
        },

        complete: function(m){
            var board = Boards.get(m.boardId);
            if(board !== null){
                board.set({ status: 'complete' });
            }
            Backbone.Events.trigger('board:complete', m);
        }
    };

    return Controller;
});