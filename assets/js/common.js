/**
 * Our base configuration for RequireJS.
 */
requirejs.config({

    baseUrl: '/assets',

    paths: {
        'gravatar': 'components/gravatar.js/lib/index',
        'blueimp-md5': 'components/blueimp-md5/js/md5.min',
        'popsicle': 'components/popsicle/popsicle',
        'proxify-url': 'components/proxify-url/lib/index'
    },

    // We need to declare the dependencies for the modules
    // that are not asynchronously loadable (AMD). That is,
    // modules that do not export their own functions in an
    // AMD fashion.
    shim: {
        'underscore': {
            exports: '_'
        }
    }
});

/**
 * Requiring the common assets for our application,
 * and registering the routes for the AJAX queries.
 */
define(['bootstrap'], function () {

});