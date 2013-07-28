define(function(require){
    var $ = require('jquery');
    var Backbone = require('backbone');
    var PUBNUB = require('pubnub');
    var settings = require('settings');
    var Boards = require('collections/boards');

    var pubnub = PUBNUB.init({ subscribe_key : settings.pubnub.subscribe_key });

    var channel = function(name){
        return name + (settings.isDevelopment ? '-dev' : '');
    };

    var boardCreatedDeferred = $.Deferred();
    pubnub.subscribe({
        channel: channel('board:created'),
        message: function(m){
            Boards.add([{ _id: m.boardId }]);
            Backbone.Events.trigger('board:created', m);
        },
        connect: boardCreatedDeferred.resolve
    });

});