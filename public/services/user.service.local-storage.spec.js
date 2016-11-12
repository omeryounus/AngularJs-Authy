// Be descriptive with titles here. The describe and it titles combined read like a sentence.
describe('UserService factory', function() {
    var service;

    // Before each test load our api.users module
    beforeEach(angular.mock.module('app'));

    // Before each test set our injected Users factory (_Users_) to our local Users variable
    beforeEach(inject(function(_UserService_) {
        service = _UserService_;
    }));

    // A simple test to verify the Users factory exists
    it('should exist', function() {
        expect(service).toBeDefined();
    });
});