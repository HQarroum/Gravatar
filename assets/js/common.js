/**
 * Our base configuration for RequireJS.
 */
requirejs.config({

    baseUrl: './assets',

    paths: {
        'gravatar': 'components/gravatar.js/lib/index',
        'blueimp-md5': 'components/blueimp-md5/js/md5.min',
        'popsicle': 'components/popsicle/popsicle',
        'proxify-url': 'components/proxify-url/lib/index',
        'es6-promise': 'components/es6-promise/promise.min',
        'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min'
    }
});

/**
 * Requiring the common assets for our application,
 * and registering the routes for the AJAX queries.
 */
define(['gravatar', 'jquery'], function (gravatar) {
    
    var options = {
        /**
         * The delay in milliseconds to wait
         * before loading the avatar.
         */
        delay: 2000,

        /**
         * Gravatar specific options.
         */
        gravatar: {

            /**
             * The default avatar size.
             */
            size: 200
        }
    };

    $(function () {

        var handle = undefined;

        /**
         * The avatar image.
         */
        var image = $('.avatar img');

        /**
         * Listening on the input and loading the avatar
         * `options.delay` milliseconds later.
         */
        $('#email').on('input', function () {
            var self = $(this);
            
            clearTimeout(handle);
            handle = setTimeout(function () {
                var url = gravatar.get.url(self.val(), {
                    size: 200,
                    defaultIcon: image.data('default')
                });
                image.attr('src', url);
            }, options.delay);
        });
    });
});