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
                board.set({
                    players: board.get('players').push(m.playerId)
                });
            }
            Backbone.Events.trigger('board:join', m);
        },

        leave: function(m){
            var board = Boards.get(m.boardId);
            if(board !== null){
                var index = board.indexOf(m.boardId);
                if(index >= 0){
                    var players = board.get('players');
                    players.splice(index, 1);
                    board.set({
                        players: players
                    });
                }
            }
            Backbone.Events.trigger('board:leave', m);
        },

        ready: function(m){
            Backbone.Events.trigger('board:ready', m);
        },

        move: function(m){
            var board = Boards.get(m.boardId);
            if(board !== null){

            }
            Backbone.Events.trigger('board:move', m);
        },

        complete: function(m){
            Backbone.Events.trigger('board:complete', m);
        }
    };

    return Controller;
});