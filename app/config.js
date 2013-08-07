// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.
require.config({
    paths: {
        // Make vendor easier to access.
        'vendor': '../vendor',

        // Opt for Lo-Dash Underscore compatibility build.
        'underscore': '../vendor/jam/lodash/dist/lodash.underscore',

        'pubnub': '../vendor/other/pubnub-3.5.3.min'
    },

    shim: {
        pubnub: {
            exports: 'PUBNUB'
        }
    },

    hbs: {
        disableI18n: true,
        helperPathCallback: function(name){
            return 'templates/helpers/' + name;
        }
    }
});