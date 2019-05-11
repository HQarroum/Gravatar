/**
 * ///////////////////////////////////////
 * ////////// Gravatar module ////////////
 * ///////////////////////////////////////
 *
 * This module offers object caching mechanisms for
 * third-party modules. It also allows to set a time-to-live
 * to the cached objects.
 */

/**
 * Exporting the `Gravatar` module appropriately given
 * the environment (AMD, Node.js and the browser).
 */
(function (name, definition) {
  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    // Defining the module in an AMD fashion.
    define(['blueimp-md5'], definition);
  } else if (typeof module !== 'undefined' && module.exports) {
    // Exporting the module for Node.js/io.js.
    module.exports = definition(
      require('blueimp-md5'),
      require('node-fetch')
    );
  } else {
    var instance = definition(this.md5, this.fetch);
    var old = this[name];

    /**
     * Allowing to scope the module
     * avoiding global namespace pollution.
     */
    instance.noConflict = function () {
      this[name] = old;
      return instance;
    };
    this[name] = instance;
  }
})('gravatar', function (md5, fetch_) {

  /**
   * Fetch polyfill.
   */
  var fetch = fetch_ || this.fetch;
  
  /**
   * The Gravatar service base URL.
   */
  var serviceUrl = 'https://secure.gravatar.com';

  /**
   * The default values associated with the
   * request.
   */
  var defaults = {

    /**
     * The default behaviour when no image is
     * associated with the given e-mail address.
     */
    defaultIcon: '404',

    /**
     * Defines whether to retrieve an avatar given
     * its category, or rating.
     * See https://en.gravatar.com/site/implement/images#rating
     */
    rating: 'G',

    /**
     * Defines the size of the image in pixels.
     */
    size: '80'
  };

  /**
   * Shorthand function to use with the fetch API
   * to obtain a JSON payload from a reponse.
   */
  var toJson = function (res) {
    return (res.json());
  };

  /**
   * Helper used to stringify the key/value pairs
   * of an object into a query string.
   */
  var encodeParameters = function (data) {
    var params = [];

    for (var d in data) {
      if (data.hasOwnProperty(d) && data[d]) {
        params.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
      }
    }
    return params.join('&');
  };

  /**
   * Returns a MD5-hashed representation
   * of the given e-mail address according to
   * Gravatar's specifications.
   * See https://en.gravatar.com/site/implement/hash/
   */
  var hash = function (email) {
    return md5(email.trim().toLowerCase());
  };

  /**
   * Helper used to build the actual avatar
   * endpoint URL.
   */
  var avatarUrl = function (email, options) {
    options = options || {};
    var serviceAvatar = serviceUrl + '/avatar/';
    var opts = {
      'default': options.defaultIcon || defaults.defaultIcon,
      rating: options.rating || defaults.rating,
      size: options.size || defaults.size
    };
    if (!email) { throw new Error('An email address is required'); }
    return serviceAvatar + hash(email) + '?' + encodeParameters(opts);
  };

  /**
   * Helper used to build the profile endpoint
   * URL.
   */
  var profileUrl = function (email, options) {
    options = options || {};
    if (!email) { throw new Error('An email address is required'); }
    return serviceUrl + '/'
      + (options.hash === false ? email : hash(email))
      + '.'
      + options.format;
  };

  return {
    get: {

      /**
       * Constructs the user avatar URL associated with
       * the given e-mail address.
       */
      url: function (email, options) {
        return avatarUrl(email, options);
      },

      /**
       * Retrieves the personal informations associated
       * with the owner of the given e-mail address.
       */
      profiles: function (email) {
        var url = profileUrl(email, { format: 'json' });

        return fetch(url)
          .then(toJson)
          .then(function (data) {
            return (Promise.resolve(data.entry));
          });
      }
    },

    /**
     * Tries to resolve the given e-mail address using the
     * given options. This method is handy to determine
     * whether an avatar actually exists on the Gravatar
     * service for the given e-mail address.
     * @returns a promise resolved if the avatar was able to
     * be retrieved, and rejected if the retrieval failed.
     */
    resolve: function (email, options) {
      var url = this.get.url(email, options);

      return fetch(url, { method: 'HEAD' }).then(function (response) {
        return (response.status === 200) ?
          Promise.resolve(url) :
          Promise.reject('Avatar does not exist');
      });
    }
  };
});
