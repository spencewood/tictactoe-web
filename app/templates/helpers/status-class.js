define(function(require){
    var Handlebars = require('handlebars');
    var _ = require('underscore');

    var getStatusClass = function(context, options){
        if(context.isComplete){
            return 'completed';
        }
        else if(_.result(context.isReady) && _.result(context.canPlay)){
            return 'ready active';
        }
        else{
            return 'waiting active';
        }
    };

    Handlebars.registerHelper('status-class', getStatusClass);
    return getStatusClass;
});