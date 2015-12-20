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

             it('should render code after code is dropped into droppedCodeBlocks', inject(function ($controller){
                var scope = {};
                ctrl = $controller('CanvasCTRL', { $scope: scope });
                var array = scope.codeBlocks[1];
                scope.onDrop(array);
                expect(scope.code).to.deep.equal('var noNameArray = [];\n');
            }));
        });
      describe('Code block types test', function () {
            it('Set the name of a variable', inject(function ($controller){
              var scope = {};
              ctrl = $controller('CanvasCTRL', { $scope: scope });
              var variable = scope.codeBlocks[0];
              scope.onDrop(variable);
              var variable = scope.droppedCodeBlocks[0];
              var event = document.createEvent("MouseEvent");
              scope.setVariable(variable, "joe", 5, event);
              expect(scope.droppedCodeBlocks[0].name).to.deep.equal('joe');
            }));

            it('Set the name of a variable', inject(function ($controller){
              var scope = {};
              ctrl = $controller('CanvasCTRL', { $scope: scope });
              var object = scope.codeBlocks[2];
              scope.onDrop(object);
              var object = scope.droppedCodeBlocks[0];
              object.setKey("Key1")
              object.setValue("Value1")
              expect(scope.droppedCodeBlocks[0].key).to.deep.equal('Key1');
            }));

            it('It drops a variable value in an array', inject(function ($controller){
              var scope = {};
              ctrl = $controller('CanvasCTRL', { $scope: scope });
              var variable = scope.codeBlocks[0];
              var array = scope.codeBlocks[1];
              scope.onDrop(variable);
              scope.onDrop(array);
              scope.droppedCodeBlocks[1].value.push(variable);
              expect(scope.droppedCodeBlocks[1].value.length).to.deep.equal(1);
            }));
      })
});