/**
 * This will return one instance, as we will only ever have one user per client
 */

define(function(require){
    var $ = require('jquery');
    var Backbone = require('backbone');
    var settings = require('settings');
    var storageController = require('controllers/storage-controller');

    var isLoggedIn = false;
    var loginStatusKnown = $.Deferred();

    var clearStorage = function(){
        storageController.remove(settings.playerStorage);
        isLoggedIn = false;
    };

    var storeToken = function(token){
        storageController.store(settings.playerStorage, token);
        isLoggedIn = true;
    };

    var getToken = function(){
        return storageController.get(settings.playerStorage);
    };

    var Player = Backbone.Model.extend({
        idAttribute: '_id',

        initialize: function(){
            var token = getToken();
            if(typeof token !== 'undefined' && token !== null){
                this.set('token', token);
            }

            this.on('change:token', this.storeToken.bind(this));
            this.on('change:token', this.whoAmI.bind(this));
        },

        loginStatusKnown: loginStatusKnown.promise,

        isLoggedIn: function(){
            return isLoggedIn;
        },

        getToken: function(){
            return getToken();
        },

        storeToken: function(){
            storeToken(this.get('token'));
        },

        logout: function(){
            clearStorage();
            this.trigger('loggedOut');
        },

        login: function(token){
            this.set('token', token);
            this.requestIdentity().done(function(){
                this.trigger('loggedIn');
            }.bind(this));
        },

        handleUserData: function(data){
            data.id = data._id;
            delete data._id;
            this.set(data, { silent: true });
            storeToken(data.token);
        },

        //ajax
        whoAmI: function(){
            var token = getToken();
            if(typeof token === 'undefined' || token === null){
                isLoggedIn = false;
                loginStatusKnown.resolve();
            }
            else{
                this.requestIdentity().always(loginStatusKnown.resolve);
            }

            return loginStatusKnown;
        },

        requestIdentity: function(){
            return $.ajax({
                url: settings.baseApiUrl + '/accounts/whoAmI'
            })
            .done(this.handleUserData.bind(this))
            .fail(this.logout.bind(this));
        },

        requestLogin: function(email){
            return $.ajax({
                type: 'POST',
                url: settings.baseApiUrl + '/accounts/requestLogin',
                data: {
                    email: email
                }
            });
        },

        leave: function(){
            return $.ajax({
                type: 'POST',
                url: '/players/leave',
                async: false,
                data: {
                    playerId: this.id
                }
            });
        }
    });

    return new Player();
});