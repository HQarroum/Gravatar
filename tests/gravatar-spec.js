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
        var url = 'https://secure.gravatar.com/avatar/c38f77cb4c86487a5a551aa772c71938?default=404&rating=G&size=80';
        gravatar.get.url('hqm.post@gmail.com').should.be.eql(url);
    });

    /**
     * Customizing Gravatar URL.
     */
    it('should return a valid Gravatar URL given an e-mail address and user options', function () {
        var url = 'https://secure.gravatar.com/avatar/c38f77cb4c86487a5a551aa772c71938?default=identicon&rating=pg&size=200';
        gravatar.get.url('hqm.post@gmail.com', { defaultIcon: 'identicon', rating: 'pg', size: 200 }).should.be.eql(url);
    });

    /**
     * Profiles retrieval test.
     */
    it('should be able to retrieve a list of profiles associated with an e-mail address', function (done) {
        gravatar.get.profiles('hqm.post@gmail.com').then(function (result) {
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
        gravatar.resolve('hqm.post@gmail.com').then(function (url) {
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
        gravatar.resolve('foo').then(function () {
            done(new Error());
        }, function () {
            done();
        });
    });
});
