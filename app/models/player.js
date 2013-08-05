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

            this.on('change:token', this.whoAmI.bind(this));
        },

        loginStatusKnown: function(){
            return loginStatusKnown.promise();
        },

        isLoggedIn: function(){
            return isLoggedIn;
        },

        getToken: function(){
            return getToken();
        },

        logout: function(){
            clearStorage();
            this.trigger('loggedOut');
        },

        handleUserData: function(data){
            data.id = data._id;
            delete data._id;
            this.set(data, { silent: true });
            storeToken(data.token);
            this.trigger('loggedIn');
        },

        //ajax
        whoAmI: function(){
            var token = this.get('token');
            if(typeof token === 'undefined'){
                isLoggedIn = false;
                loginStatusKnown.resolve();
            }
            else{
                $.ajax({
                    type: 'POST',
                    url: settings.baseApiUrl + '/accounts/whoAmI',
                    data: {
                        token: token
                    }
                })
                .done(this.handleUserData.bind(this))
                .fail(this.logout.bind(this))
                .always(loginStatusKnown.resolve);
            }

            return loginStatusKnown;
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