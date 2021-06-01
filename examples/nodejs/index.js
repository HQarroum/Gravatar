const gravatar = require('../..');

// The e-mail address of a user.
const email = 'example@example.com';

(async () => {
  // The URL of the avatar.
  console.log(await gravatar.get.url(email));

  // The profiles of the user.
  console.log(await gravatar.get.profiles(email));

  try {
    console.log(await gravatar.resolve(email));
  } catch (e) {
    console.log('The user does not have a Gravatar image.');
  }
})();
