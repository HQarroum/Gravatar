import gravatar from 'https://raw.githubusercontent.com/HQarroum/Gravatar/gh-pages/node_modules/gravatar.js/dist/index.esm.js'

const options = {

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
     * Default icon.
     */
    defaultIcon: 'identicon',
  
    /**
     * The default avatar size.
     */
    size: 200
  }
};

$(function () {

  let handle = undefined;

  /**
   * The avatar image.
   */
  const image = $('.avatar img');

  /**
   * When the image is loaded, we update the image element.
   */
  const done = function (url, profile) {
    image.attr('src', url);
    console.log(profile)
    $('#profile-id').text(profile.id);
    $('#profile-preferredUsername').text(profile.preferredUsername);
    $('#profile-email').text(profile.email);
    $('#profile-hash').text(profile.hash);
    $('#profile-hash').text(profile.hash);
    $('#profile-url').attr('href', profile.profileUrl);
    $('#profile-url').text(profile.profileUrl);
    showMessage('success');
  };

  /**
   * Called back when an error was hit while loading
   * the avatar. This might be the result of the user
   * not having a Gravatar profile.
   */
  const fail = function () {
    image.attr('src', image.data('default'));
    showMessage('error');
  };

  /**
   * Called back each time an input event is
   * triggered by the `email` input element.
   */
  const onInput = function (input) {
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
  const showMessage = function (className) {
    $('.message').css('display', 'none');
    $(`.${className}`).css('display', 'block');
  };

  /**
   * Listening on the input and loading the avatar
   * `options.delay` milliseconds later.
   */
  $('#email').on('input', function () {
    const self = $(this);
    const value = self.val();

    clearTimeout(handle);
    handle = setTimeout(async () => {
      try {
        const imageUrl = await gravatar.resolve(value, options.gravatar);
        const profiles = await gravatar.profiles(self.val());
        const p = profiles[0];
        p.email = value;
        done(imageUrl, p);
      } catch (e) {
        fail(e);
      }
    }, options.delay);
    onInput(self);
  });

  // Displaying the welcome message.
  showMessage('welcome');
});

