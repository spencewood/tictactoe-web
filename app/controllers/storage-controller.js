/**
 * Storage abstraction, used for local strorage access
 */
define(function(require){
    if(!'localStorage' in window){
        throw 'Local Storage not present';
    }

    var Controller = {
        get: function(item){
            return localStorage.getItem(item);
        },

        store: function(item, value){
            localStorage.setItem(item, value);
        },

        remove: function(item){
            localStorage.removeItem(item);
        }
    };

    return Controller;
});