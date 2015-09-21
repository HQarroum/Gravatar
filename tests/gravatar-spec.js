var should  = require('should');
var gravatar = require('../lib');

describe('The gravatar module', function () {
    
    /**
     * Setting asynchronous function timeout
     * to 5 seconds.
     */
    this.timeout(5 * 1000);

    /**
     * Gravatar URL creation.
     */
    it('should return a valid Gravatar URL given an e-mail address', function () {
        var url = 'https://secure.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?default=404&rating=G&size=80';
        gravatar.get.url('beau@dentedreality.com.au').should.be.eql(url);
    });

    /**
     * Customizing Gravatar URL.
     */
    it('should return a valid Gravatar URL given an e-mail address and user options', function () {
        var url = 'https://secure.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?default=identicon&rating=pg&size=200';
        gravatar.get.url('beau@dentedreality.com.au', { defaultIcon: 'identicon', rating: 'pg', size: 200 }).should.be.eql(url);
    });

    /**
     * Profiles retrieval test.
     */
    it('should be able to retrieve a list of profiles associated with an e-mail address', function (done) {
        gravatar.get.profiles('beau@dentedreality.com.au').then(function (result) {
            Array.isArray(result).should.be.eql(true);
            should.exist(result[0]);
            done();
        }, function (err) {
            done(new Error(err));
        });
    });

    /**
     * Avatar resolution test.
     */
    it('should be able to resolve an avatar associated with an e-mail address', function (done) {
        gravatar.resolve('beau@dentedreality.com.au').then(function (url) {
            var urlRegexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            url.should.match(urlRegexp);
            done();
        }, function (err) {
            done(new Error(err));
        });
    });

    /**
     * Avatar resolution error test.
     */
    it('should be able to signal an error when avatar resolution failed', function (done) {
        gravatar.resolve('foo').then(function (url) {
            done(new Error());
        }, function (err) {
            done();
        });
    });
});