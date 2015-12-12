angular.module('Grasp.Canvas', ['ngDraggable', 'ngRoute'])

.controller('CanvasCTRL', function ($scope) {
  $scope.code = "";
  var generateCode = function(array) {
    // generate code from the array of codeBlocks received
    var code = "";

    for (var i = 0; i < array.length; i++) {
      if (array[i].type === "variable") {
        code += "var " + array[i].name + " = " + array[i].value + ";\n";
      }
    }

    return code;
  }

  var cloneObject = function(object) {
    var clone = {};

    for (var key in object) {
      clone[key] = object[key];
    }

    return clone;
  }

  $scope.codeBlocks = [
    {
      type: 'variable',
      name: "name",
      value: undefined
    }
  ];

  $scope.droppedCodeBlocks = [];

  $scope.onDrop = function(data, event) {
    $scope.droppedCodeBlocks.push(cloneObject(data));
    $scope.code = generateCode($scope.droppedCodeBlocks);
  };

  $scope.onDrag = function(data, event) {

  }

  $scope.setName = function(data, name, value, $event) {
    $event.preventDefault();
    data.name = name || data.name;
    data.value = value || data.value;
    $scope.code = generateCode($scope.droppedCodeBlocks);
  }
});