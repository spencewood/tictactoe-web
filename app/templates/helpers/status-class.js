define(function(require){
    var Handlebars = require('handlebars');
    var _ = require('underscore');

    var getStatusClass = function(context, options){
        if(_.result(context.isComplete)){
            return 'complete';
        }
        else if(_.result(context.isReady) && _.result(context.canPlay)){
            return 'ready';
        }
        else{
            return 'waiting';
        }
    };

    Handlebars.registerHelper('status-class', getStatusClass);
    return getStatusClass;
});