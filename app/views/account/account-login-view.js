define(function(require){
    var Backbone = require('backbone');
    var Player = require('models/player');

    var View = Backbone.View.extend({
        events: {
            'click button': 'loginEvent',
            'keyup input[name=email]': 'loginIfEnter'
        },

        getInputValue: function(){
            return this.$el.find('input[name=email]').val();
        },

        loginEvent: function(e){
            e.preventDefault();
            this.login(this.getInputValue());
        },

        loginIfEnter: function(e){
            if(e.keyCode === 13){
                this.login(this.getInputValue());
            }
        },

        login: function(email){
            Player.requestLogin(email);
        }
    });

    return View;
});