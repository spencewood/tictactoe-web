define(function(require){
    var Backbone = require('backbone');
    var Player = require('models/player');
    var logoutTemplate = require('hbs!templates/account/logout');

    var View = Backbone.View.extend({
        events: {
        },
        
        template: logoutTemplate
    });

    return View;
});