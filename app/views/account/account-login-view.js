define(function(require){
    var Backbone = require('backbone');
    var Player = require('models/player');
    var requestLoginFormTemplate = require('hbs!templates/account/request-login-form');

    var View = Backbone.View.extend({
        events: {
            'click button': 'loginEvent',
            'keyup input[name=email]': 'loginIfEnter'
        },

        template: requestLoginFormTemplate,

        beforeRender: function(){
            this.$el.addClass('login');
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
            Player.requestLogin(email).fail(this.handleError.bind(this));
        },

        handleError: function(xhr, status){
            this.$el.removeClass('login').addClass('error');
            console.log(status);
        }
    });

    return View;
});