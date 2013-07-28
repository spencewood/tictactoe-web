define(function(require){
    var Backbone = require('backbone');
    var Board = require('models/board');
    var settings = require('settings');

    var Boards = Backbone.Collection.extend({
        model: Board,
        url: settings.baseApiUrl + '/boards'
    });

    return new Boards();
});