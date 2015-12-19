var assert = require("chai").assert;
var expect = chai.expect;
var module = angular.module('Grasp', [
  'Grasp.Canvas',
  'Grasp.Auth',
  // 'Grasp.chat',
  'Canvas.socket',
  'ngRoute',
  'ngMaterial'
]);

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
            }));
        });
});
