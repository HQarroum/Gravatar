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
        'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min',
        'bootstrap': 'components/bootstrap/dist/js/bootstrap.min'
    }
});

/**
 * Requiring the common assets for our application,
 * and registering the routes for the AJAX queries.
 */
define(['gravatar', 'jquery', 'bootstrap'], function (gravatar) {
    
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
         * When the image is loaded, we update the image element.
         */
        var done = function (url) {
            image.attr('src', url);
            showMessage('success');
        };

        /**
         * Called back when an error was hit while loading
         * the avatar. This might be the result of the user
         * not having a Gravatar profile.
         */
        var fail = function () {
            image.attr('src', image.data('default'));
            showMessage('error');
        };

        /**
         * Called back each time an input event is
         * triggered by the `email` input element.
         */
        var onInput = function (input) {
            if (input.val().length) {
                showMessage('typing');
            } else {
                showMessage('welcome');
            }
            image.attr('src', image.data('default'));
        };

        /**
         * Displays the message associated with
         * the given `className`.
         */
        var showMessage = function (className) {
            $('.message').css('display', 'none');
            $('.' + className).css('display', 'block');
        };

        /**
         * Listening on the input and loading the avatar
         * `options.delay` milliseconds later.
         */
        $('#email').on('input', function () {
            var self = $(this);
            
            clearTimeout(handle);
            handle = setTimeout(function () {
                gravatar.resolve(self.val(), options.gravatar)
                    .then(done)
                    .catch(fail);
            }, options.delay);
            onInput(self);
        });

        // Displaying the welcome message.
        showMessage('welcome');
    });
});