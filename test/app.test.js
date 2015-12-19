var assert = require("chai").assert;
var expect = chai.expect;

var module = angular.module('Grasp', [
  'Grasp.Canvas',
  'Grasp.Auth',
  // 'Grasp.chat',
  'Canvas.socket',
  'ngRoute',
  'ngMaterial',
  'Grasp.Choice'
])

describe('Code blocks', function () {
    beforeEach(angular.mock.module('Grasp'));
        describe('test describe', function() {
            it('codeBlocks list should be 10', inject(function ($controller) {
            var scope = {},
            ctrl = $controller('CanvasCTRL', { $scope: scope });
            expect(scope.codeBlocks.length).to.deep.equal(10);

            }));

            it('should drop code blocks in to droppedCodeBlocks', inject(function ($controller){
                var scope = {};
                ctrl = $controller('CanvasCTRL', { $scope: scope });
                var array = scope.codeBlocks[1];
                scope.droppedCodeBlocks.push(array);
                expect(scope.droppedCodeBlocks.length).to.deep.equal(1);
            }))
        });
  //  it('test it2', function() {
  //   // expect(true).to.be(true);
  //   expect('foo').to.be.a('string')
  // });
  //   it('sorts in descending order by default', function() {
  //       var users = ['jack', 'igor', 'jeff'];
  //       var sorted = sortUsers(users);
  //   expect(sorted).toEqual(['jeff', 'jack', 'igor']);
  // });
});
    // var Person;
    // beforeEach(module('Joy'));
    // beforeEach(inject(function (_Person_) {
    //     Person = _Person_;
    // }));

    // describe('Constructor', function () {
    //     it('assigns a name', function () {
    //         expect(new Person('Ben')).to.have.property('name', 'Ben');
    //     });
    // });
