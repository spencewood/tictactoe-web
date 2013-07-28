define(function(require){
    var Backbone = require('backbone');

    var Board = Backbone.Model.extend({
        idAttribute: '_id'
    });

    return Board;
});