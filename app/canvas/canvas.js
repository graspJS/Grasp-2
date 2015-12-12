angular.module('Grasp.Canvas', ['ngDraggable', 'ngRoute'])

.controller('CanvasCTRL', function ($scope) {
  $scope.code = "";

  // generates code from droppedCodeBlocks
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

  // clone object
  var cloneObject = function(object) {
    var clone = {};

    for (var key in object) {
      clone[key] = object[key];
    }

    return clone;
  }

  // types of codeBlocks, such as variables, arrays, objects, and functions
  $scope.codeBlocks = [
    {
      type: 'variable',
      name: "name",
      value: undefined
    }
  ];

  // stores the codeblocks dropped in canvas
  $scope.droppedCodeBlocks = [];

  // when a codeblock is dropped, add it to array. Also regenerate code
  $scope.onDrop = function(data, event) {
    $scope.droppedCodeBlocks.push(cloneObject(data));
    $scope.code = generateCode($scope.droppedCodeBlocks);
  };

  // not sure what to do with this yet
  $scope.onDrag = function(data, event) {

  }

  // setting variable values
  $scope.setVariable = function(data, name, value, $event) {
    $event.preventDefault();
    data.name = name || data.name;
    data.value = value || data.value;
    $scope.code = generateCode($scope.droppedCodeBlocks);
  }
});