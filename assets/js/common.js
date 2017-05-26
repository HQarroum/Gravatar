/**
 * Our base configuration for RequireJS.
 */
requirejs.config({

    baseUrl: './assets',

    paths: {
        'gravatar': 'components/gravatar.js/lib/index',
        'blueimp-md5': 'components/blueimp-md5/js/md5.min',
        'isomorphic-fetch': 'components/fetch/fetch',
        'proxify-url': 'components/proxify-url/lib/index',
        'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min',
        'bootstrap': 'components/bootstrap/dist/js/bootstrap.min',
        'lodash': 'components/lodash/lodash.min'
    },

    shim: {
        'bootstrap': {
            deps: [ 'jquery' ]
        },
        'isomorphic-fetch': {
            exports: 'fetch'
        }
    }
});

/**
 * Requiring the common assets for our application,
 * and registering the routes for the AJAX queries.
 */
define(['gravatar', 'lodash', 'jquery', 'bootstrap'], function (gravatar, _, $) {

    var options = {
        /**
         * The delay in milliseconds to wait
         * before loading the avatar.
         */
        delay: 1500,

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
        var profile  = undefined;

        /**
         * The avatar image.
         */
        var image = $('.avatar img');
        var template = $('#profile-template');
        var profileData = $('.profile-data');

        /**
         * When the image is loaded, we update the image element.
         */
        var done = function (url, profile) {
            image.attr('src', url);
            profileData.html(_.template(template.html())(profile));
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
            var value = self.val();
            var url;

            clearTimeout(handle);
            handle = setTimeout(function () {
                value && gravatar.resolve(value, options.gravatar)
                    .then(function (imageUrl) {
                        url = imageUrl;
                        return gravatar.get.profiles(self.val());
                    })
                    .then(function (profiles) {
                        var p  = profiles[0];
                        p.email = value;
                        done(url, p);
                    })
                    .catch(fail);
            }, options.delay);
            onInput(self);
        });

        // Displaying the welcome message.
        showMessage('welcome');
    });
});
