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
 * The Gravatar service base URL.
 */
const serviceUrl = 'https://secure.gravatar.com';

/**
 * The default values associated with the
 * request.
 */
const defaults = {

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
 * Helper used to stringify the key/value pairs
 * of an object into a query string.
 */
const encodeParameters = (p) => Object.entries(p).map((kv) => kv.map(encodeURIComponent).join('=')).join('&');

/**
 * Returns a MD5 hash associated with the given input.
 */
const md5 = (s) => { var k = [], i = 0; for (; i < 64;) { k[i] = 0 | Math.sin(++i % Math.PI) * 4294967296; } var b, c, d, h = [b = 0x67452301, c = 0xEFCDAB89, ~b, ~c], words = [], j = unescape(encodeURI(s)) + '\x80', a = j.length; s = (--a / 4 + 2) | 15; words[--s] = a * 8; for (; ~a;) { words[a >> 2] |= j.charCodeAt(a) << 8 * a--; } for (i = j = 0; i < s; i += 16) { a = h; for (; j < 64; a = [d = a[3], (b + ((d = a[0] + [b & c | ~b & d, d & b | ~d & c, b ^ c ^ d, c ^ (b | ~d)][a = j >> 4] + k[j] + ~~words[i | [j, 5 * j + 1, 3 * j + 5, 7 * j][a] & 15]) << (a = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][4 * a + j++ % 4]) | d >>> -a)), b, c]) { b = a[1] | 0; c = a[2]; } for (j = 4; j;) h[--j] += a[j]; } for (s = ''; j < 32;) { s += ((h[j >> 3] >> ((1 ^ j++) * 4)) & 15).toString(16); } return s; }

/**
 * Returns a MD5-hashed representation
 * of the given e-mail address according to
 * Gravatar's specifications.
 * See https://en.gravatar.com/site/implement/hash/
 */
const hash = (email) => md5(email.trim().toLowerCase());

/**
 * Returns the result of fetch given the environment.
 */
const fetch = async function () {
  return (typeof window !== 'undefined' ? window.fetch(...arguments) : await import('node-fetch').then((f) => f.default(...arguments)));
};

export default {
  /**
   * Constructs the user avatar URL associated with
   * the given e-mail address.
   */
  url(email, options = {}) {
    const opts = {
      d: options.defaultIcon || defaults.defaultIcon,
      r: options.rating || defaults.rating,
      s: options.size || defaults.size
    };

    return (`${serviceUrl}/avatar/${hash(email)}?${encodeParameters(opts)}`);
  },

  /**
  * Retrieves the personal informations associated
  * with the owner of the given e-mail address.
  */
  async profiles(email, options = { format: 'json' }) {
    const url = `${serviceUrl}/${(options.hash === false ? email : hash(email))}.${options.format}`;

    return (fetch(url)
      .then((res) => res.json())
      .then((data) => data.entry));
  },

  /**
   * Tries to resolve the given e-mail address using the
   * given options. This method is handy to determine
   * whether an avatar actually exists on the Gravatar
   * service for the given e-mail address.
   * @returns a promise resolved if the avatar was able to
   * be retrieved, and rejected if the retrieval failed.
   */
  async resolve(email, options = {}) {
    const url = this.url(email, options);

    return (fetch(url, { method: 'HEAD' }).then((response) => {
      return (response.status === 200) ? url : Promise.reject('Avatar does not exist');
    }));
  }
};
