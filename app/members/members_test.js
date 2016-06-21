
describe('myApp.members', function() {
  beforeEach(module('myApp.members'));

  describe('MembersCtrl', function() {
    var membersCtrl, $scope;
    beforeEach(function() {
      module(function($provide) {
        // comes from routes.js in the resolve: {} attribute
        $provide.value('user', {uid: 'test123'});
      });
      inject(function($controller) {
        $scope = {};
        membersCtrl = $controller('MembersCtrl', {$scope: $scope});
      });
    });

    it('assigns user in scope', function() {
      expect(typeof $scope.user).toBe('object');
      expect($scope.user.uid).toBe('test123');
    });
  });
});