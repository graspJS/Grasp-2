angular.module('Grasp.Canvas', ['ngDraggable', 'ngRoute'])

.controller('CanvasCTRL', function ($scope) {
  $scope.code = "";

  $scope.codeBlocks = [{name: "var", code: "var someVariable = 0;\n\n "},
                       {name: "function", code: "function someFunction() {  return 0; } "},
                       {name: "object", code: "var object = { key1: \'value1\',\n key2: \'value2\'\n};\n\n "},
                       {name: "stuff"},
                       {name: "stuff"}];

  $scope.droppedCodeBlocks = [];

  $scope.onDrop = function(data, event) {
    var index = $scope.droppedCodeBlocks.indexOf(data);
    if (index == -1)
      $scope.droppedCodeBlocks.push(data);
    $scope.code += data.code;
  };

  $scope.onDrag = function(data, event) {
    var index = $scope.droppedCodeBlocks.indexOf(data);
    if (index > -1) {
      $scope.droppedCodeBlocks.splice(index, 1);
    }
  }
});