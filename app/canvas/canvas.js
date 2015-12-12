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
      } else if (array[i].type === "array") {
        code += "var " + array[i].name + " = [" + array[i].value + "];\n";
      } else if (array[i].type === "object") {
        code += "var " + array[i].name + " = {" + array[i].value + "};\n";
      } else if (array[i].type === "function") {
        code += "var " + array[i].name + " = function() {\n" + array[i].value + "\n};\n";
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

  // $scope.resize = function(codeBlock) {
  //   // var index = $scope.droppedCodeBlocks.indexOf(codeBlock);
  //   // if (!codeBlock.expanded) {
  //   //   document.getElementsByClassName("codeBlockDropped")[index].setAttribute("style", "height: 100px;");
  //   //   codeBlock.expanded = true; 
  //   // } else {
  //   //   document.getElementsByClassName("codeBlockDropped")[index].setAttribute("style", "height: 50px;");
  //   //   codeBlock.expanded = false; 
  //   // }
    
  // }

  // types of codeBlocks, such as variables, arrays, objects, and functions
  $scope.codeBlocks = [
    {
      type: 'variable',
      name: "noNameVar",
      expanded: false,
      value: undefined
    },
    {
      type: 'array',
      name: "noNameArray",
      expanded: false,
      value: undefined
    },
    {
      type: 'object',
      name: "noNameObject",
      expanded: false,
      value: "key: value"
    },
    {
      type: 'function',
      name: "noNameFunction",
      expanded: false,
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