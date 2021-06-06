import gravatar from '../lib/index.js';

describe('The gravatar module', function () {

  /**
   * Gravatar URL creation.
   */
  test('should return a valid Gravatar URL given an e-mail address', () => {
    const url = 'https://secure.gravatar.com/avatar/c38f77cb4c86487a5a551aa772c71938?d=404&r=G&s=80';
    expect(gravatar.url('hqm.post@gmail.com')).toEqual(url);
  });

  /**
   * Customizing Gravatar URL.
   */
  test('should return a valid Gravatar URL given an e-mail address and user options', () => {
    const url = 'https://secure.gravatar.com/avatar/c38f77cb4c86487a5a551aa772c71938?d=identicon&r=pg&s=200';
    expect(gravatar.url('hqm.post@gmail.com', { defaultIcon: 'identicon', rating: 'pg', size: 200 })).toEqual(url);
  });

  /**
   * Profiles retrieval test.
   */
  test('should be able to retrieve a list of profiles associated with an e-mail address', (done) => {
    gravatar.profiles('hqm.post@gmail.com').then((result) => {
      expect(Array.isArray(result)).toEqual(true);
      expect(result[0].id).toEqual('41212651');
      done();
    }, (err) => done(new Error(err)));
  });

  /**
   * Avatar resolution test.
   */
  test('should be able to resolve an avatar associated with an e-mail address', (done) => {
    gravatar.resolve('hqm.post@gmail.com').then((url) => {
      const urlRegexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      expect(url).toMatch(urlRegexp);
      done();
    }, (err) => done(new Error(err)));
  });

  /**
   * Avatar resolution error test.
   */
  test('should be able to signal an error when avatar resolution failed', (done) => {
    gravatar.resolve('foo').then(() => {
      done(new Error());
    }, () => done());
  });
});
