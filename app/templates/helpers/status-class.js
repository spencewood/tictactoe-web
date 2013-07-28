define(function(require){
    var Handlebars = require('handlebars');

    var getStatusClass = function(context, options){
        if(context.isComplete){
            return 'complete';
        }
        else if(context.isReady){
            return 'ready';
        }
        else{
            return 'waiting';
        }
    };

    Handlebars.registerHelper('status-class', getStatusClass);
    return getStatusClass;
});