define(function(require){
    var $ = require('jquery');
    var Backbone = require('backbone');
    var PUBNUB = require('pubnub');
    var settings = require('settings');
    var BoardController = require('controllers/board-controller');

    var pubnub = PUBNUB.init({ subscribe_key : settings.pubnub.subscribe_key });

    var channel = function(name){
        return name + (settings.isDevelopment ? '-dev' : '');
    };

    var boardCreateDeferred = $.Deferred();
    pubnub.subscribe({
        channel: channel('board:create'),
        message: BoardController.create,
        connect: boardCreateDeferred.resolve
    });
/*
    var boardJoinDeferred = $.Deferred();
    pubnub.subscribe({
        channel: channel('board:join'),
        message: BoardController.join,
        connect: boardJoinDeferred.resolve
    });

    var boardLeaveDeferred = $.Deferred();
    pubnub.subscribe({
        channel: channel('board:leave'),
        message: BoardController.leave,
        connect: boardLeaveDeferred.resolve
    });

    var boardReadyDeferred = $.Deferred();
    pubnub.subscribe({
        channel: channel('board:ready'),
        message: BoardController.ready,
        connect: boardReadyDeferred.resolve
    });

    var boardMoveDeferred = $.Deferred();
    pubnub.subscribe({
        channel: channel('board:move'),
        message: BoardController.move,
        connect: boardMoveDeferred.resolve
    });

    var boardCompleteDeferred = $.Deferred();
    pubnub.subscribe({
        channel: channel('board:complete'),
        message: BoardController.complete,
        connect: boardCompleteDeferred.resolve
    });
*/
    return {
        boardCreate: boardCreateDeferred/*,
        boardJoin: boardJoinDeferred,
        boardLeave: boardLeaveDeferred,
        boardReady: boardReadyDeferred,
        boardMove: boardMoveDeferred,
        boardComplete: boardCompleteDeferred*/
    };
});