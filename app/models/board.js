define(function(require){
    var Backbone = require('backbone');

    var Board = Backbone.Model.extend({
        idAttribute: '_id',

        toJSON: function(){
            var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
            json.isReady = this.get('players').length === 2;
            return json;
        }
    });

    return Board;
});