/**
 * //////////////////////////////////////
 * //////// Proxify URL module  /////////
 * //////////////////////////////////////
 *
 * An YQL wrapper used to generate a proxy URL
 * to a given resource.
 */

/**
 * Exporting the module appropriately given the
 * environment (AMD, Node.js and the browser).
 */
(function (name, definition) {
    if (typeof define === 'function' && define.amd) {
        // Defining the module in an AMD fashion.
        define(definition);
    } else if (typeof module !== 'undefined' && module.exports) {
        // Exporting the module for Node.js/io.js.
        module.exports = definition();
    } else {
        var instance = definition();
        var old      = this[name];

        /**
         * Allowing to scope the module
         * avoiding global namespace pollution.
         */
        instance.noConflict = function () {
            this[name] = old;
            return instance;
        };
        // Exporting the module in the global
        // namespace in a browser context.
        this[name] = instance;
    }
})('proxify', function () {

    var baseUrl = 'https://query.yahooapis.com/v1/public/yql';

    /**
     * @param object the key/value parameters pair
     * @returns {string} a properly encoded query string
     */
    var encodeParameters = function (object) {
        var params = [];

        for (var p in object) {
            if (object.hasOwnProperty(p)) {
                params.push(encodeURIComponent(p) + '=' + encodeURIComponent(object[p]));
            }
        }
        return params.join('&');
    };

    /**
     * @param url the URL to proxify
     * @param options the options indicating how to build
     * the URL.
     * @returns the YQL endpoint URL query string.
     */
    var createParameters = function (url, options) {
        var input  = options.inputFormat || 'json';
        var output = options.outputFormat || 'json';
        var params = {
            q: 'SELECT * FROM ' + input + ' WHERE url="' + url + '"',
            format: output,
            jsonCompat: 'new'
        };
        if (options.callback) {
            params.callback = options.callback;
        }
        if (options.jsonCompat === false) {
            delete params.jsonCompat;
        }
        return params;
    };

    /**
     * A function returning the proxy URL.
     */
    return function (url, options) {
        options = options || {};
        if (typeof url !== 'string') {
            throw new Error('An URL was expected');
        }
        return baseUrl + '?' + encodeParameters(createParameters(url, options));
    };
});