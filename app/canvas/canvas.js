angular.module('Grasp.Canvas', ['Canvas.socket', 'ngDraggable', 'ngRoute', 'ngPopup'])

.controller('CanvasCTRL', function ($scope, socket) {
  $scope.code = "";
  $scope.isCanvasDraggable=true;
  $scope.isCodeBlockDraggable=true;
  var typeArray = undefined;
  // stores the codeblocks dropped in canvas
  $scope.droppedCodeBlocks = [];

  $scope.runCode = function() {
    var codeStr = $scope.code.split('\n').join("");
    eval(codeStr);
  }

  // generates code from droppedCodeBlocks
  generateCode = function(array) {
    // generate code from the array of codeBlocks received
    var code = "";
    for (var i = 0; i < array.length; i++) {
      if (array[i].type === "variable") {
        code += "var " + array[i].name + " = " + array[i].value + ";\n";
      } else if (array[i].type === "array") {
        code += "var " + array[i].name + " = [" + array[i].value + "];\n";
      } else if (array[i].type === "object") {
        code+= "var " + array[i].name + " = " + JSON.stringify(array[i].storage) + "\n";
      } else if (array[i].type === "function") {
        var arguments = array[i].parameters.join(", ");
        if (array[i].name === "Math.max" || array[i].name === "Math.min") {
          code += array[i].name + "(" + arguments + ");\n";
        } else {
          code += "var " + array[i].name + " = function(" + arguments + ") {\n" + array[i].definition + "\n};\n";
        }
        
      }
    }
    socket.emit('canvasChange', $scope.droppedCodeBlocks);
    $scope.code = code;
    return code;
  };

  // clone object
  var cloneObject = function(object) {
    var clone = {};

    for (var key in object) {
      if (Array.isArray(object[key])) {
        clone[key] = object[key].slice();
      } else {
        clone[key] = object[key];
      }
    }

    return clone;
  };

  // types of codeBlocks, such as variables, arrays, objects, and functions
  $scope.codeBlocks = [
    {
      type: 'variable',
      name: "noNameVar",
      value: "undefined"
    },
    {
      type: 'array',
      name: "noNameArray",
      value: [],
      push: function(data) {
        if (data.storage !== undefined) {
          this.value.push(data.storage);
        } else if (data.type === "function") {
          this.value.push(data.execute());
        } else {
          if (isNaN(Number(data.value))) {
            this.value.push(data.value);
          } else {
            this.value.push(Number(data.value));
          }
          
        }
        
        generateCode($scope.droppedCodeBlocks);
      },
      pop: function () {
        this.value.pop();
        generateCode($scope.droppedCodeBlocks);
      },
      indexOf: function () {
        var valTofind = prompt("Enter the value you wish to find.");
        if (!isNaN(Number(valTofind))) {
          valTofind = Number(valTofind);
        }

        alert(this.value.indexOf(valTofind));
      },
      slice: function () {
        var sliceNum = prompt("How many elements do you want to slice?");
        var sliceArr = cloneObject($scope.codeBlocks[1]);
        sliceArr.value = this.value.slice(sliceNum);
        sliceArr.name = "SlicedArray"
        $scope.droppedCodeBlocks.push(sliceArr);
        generateCode($scope.droppedCodeBlocks);
      }
    },
    {
      type: 'object',
      name: 'Object',
      key: "key",
      value: "value",
      storage: {},
        setValue: function (data, byInput) {
          if (!byInput) {
            if(data.type === "object") {
              this.value = data.storage;
            } else {
                this.value = data.value;
                this.storage.name = data.name;
                this.storage.value = data.value;
              }
          } else {
            this.value = data;
            this.storage.value = data;
          }
          generateCode($scope.droppedCodeBlocks);
        },
        setKey: function (key) {
          this.key = key;
          generateCode($scope.droppedCodeBlocks);
        },
        addKeyValue: function(key, value) {
          this.storage[key] = value;
          generateCode($scope.droppedCodeBlocks);
        },
        objectKeys: function () {
          var keysArr = cloneObject($scope.codeBlocks[1]);
          keysArr.name = "Keys of " + this.name;
          keysArr.value = Object.keys(this.storage);
          $scope.droppedCodeBlocks.push(keysArr);
          generateCode($scope.droppedCodeBlocks);
        }
    },
    {
      type: 'function',
      name: "add",
      parameters: [],
      definition: "  var total = 0;\n  for (var i = 0; i < arguments.length; i++) {\n    total += arguments[i];\n    }\n  return total;\n",
      addParam: function(data) {
        if (data.type === "function") {
          this.parameters.push(data.execute());
        } else {
          this.parameters.push(data.value);
        }
        generateCode($scope.droppedCodeBlocks);
      },
      execute: function () {
        var total = 0;
        for(var i = 0; i < this.parameters.length; i++) {
          total += Number(this.parameters[i]);
        }
        return total;
      },
      alertAnswer: function() {
        alert(this.execute());
      }
    },
    {
      type: "function",
      name: "subtract",
      parameters: [],
      definition: "  var total = this.parameters[0];\n  for (var i = 1; i < arguments.length; i++) {\n    total -= arguments[i];\n    }\n  return total;\n",
      addParam: function(data) {
        if (data.type === "function") {
          this.parameters.push(data.execute());
        } else {
          this.parameters.push(data.value);
        }
        generateCode($scope.droppedCodeBlocks);
      },
      execute: function () {
        var total = this.parameters[0];
        for(var i = 1; i < this.parameters.length; i++) {
          total -= Number(this.parameters[i]);
        }
        return total;
      },
      alertAnswer: function() {
        alert(this.execute());
      }
    },
    {
      type: "function",
      name: "multiply" ,
      parameters: [],
      definition: "  var total = this.parameters[0];\n  for (var i = 1; i < arguments.length; i++) {\n    total *= arguments[i];\n    }\n  return total;\n",
      addParam: function(data) {
        if (data.type === "function") {
          this.parameters.push(data.execute());
        } else {
          this.parameters.push(data.value);
        }
        generateCode($scope.droppedCodeBlocks);
      },
      execute: function () {
        var total = this.parameters[0];
        for(var i = 1; i < this.parameters.length; i++) {
          total *= Number(this.parameters[i]);
        }
        return total;
      },
      alertAnswer: function() {
        alert(this.execute());
      }
    },
    {
      type: "function",
      name: "divide" ,
      parameters: [],
      definition: "  var total = this.parameters[0];\n  for (var i = 1; i < arguments.length; i++) {\n    total /= arguments[i];\n    }\n  return total;\n",
      addParam: function(data) {
        if (data.type === "function") {
          this.parameters.push(data.execute());
        } else {
          this.parameters.push(data.value);
        }
        generateCode($scope.droppedCodeBlocks);
      },
      execute: function () {
        var total = this.parameters[0];
        for(var i = 1; i < this.parameters.length; i++) {
          total /= Number(this.parameters[i]);
        }
        return total;
      },
      alertAnswer: function() {
        alert(this.execute());
      }
    },
    {
      type: "loop",
      name: "for-loop",
      parameters: {count: 0, array: [], behavior: ""},
      addParam: function(data) {
        if (data.type === "variable") {
          this.parameters["count"] = data.value;
        } else if (data.type === "array") {
          this.parameters[data.name] = data.value;
        } else if (data.type === "function") {
          this.parameters["behavior"] = data.execute;
        }
        generateCode($scope.droppedCodeBlocks);
      },
      execute: function() {
        var count = this.parameters[0];
        var array = this.parameters[1].slice();
        for (count; count < array.length; count++) {
          this.parameters[2]();
        }
      }
    },
    {
      type: 'function',
      name: "Math.max",
      parameters: [],
      addParam: function (data) {
        if(isNaN(data.value)) {
          alert("Math.max may only take numbers!")
        } else {
          this.parameters.push(data.value)
          generateCode($scope.droppedCodeBlocks);
        }
      },
      execute: function () {
        if(this.parameters.length < 2) {
          return "Math.max must take at least two arguments";
        } else {
          return Math.max.apply(null, this.parameters);
        }
      },
      alertAnswer: function() {
        alert(this.execute());
      }
    },
    {
      type: "function",
      name: "Math.min",
      parameters: [],
      addParam: function (data) {
        if(isNaN(data.value)) {
          alert("Math.min may only take numbers!")
          return;
        } else {
          this.parameters.push(data.value)
          generateCode($scope.droppedCodeBlocks);
        }
      },
      execute: function () {
        if(this.parameters.length < 2) {
          return "Math.max must take at least two arguments";
        } else {
          return Math.min.apply(null, this.parameters);
        }
      },
      alertAnswer: function() {
        alert(this.execute());
      }
    }
  ];

  // ON ANY CHANGE IN CANVAS
  socket.on('onCanvasChange', function(data) {
    $scope.droppedCodeBlocks = data;
  });

  // ON BLOCK DROP ====================================
  // When a codeblock is dropped, add it to array. Also regenerate code
  $scope.onDrop = function(data, event) {
    if ($scope.isCanvasDraggable) {
      if (data.storage !== undefined) {
        data.storage = cloneObject(data.storage);
      }
      $scope.droppedCodeBlocks.push(cloneObject(data));
      generateCode($scope.droppedCodeBlocks);
      socket.emit('canvasChange', $scope.droppedCodeBlocks);
    }
  };

  $scope.turnOffDrag = function() {
    $scope.isCodeBlockDraggable = false;
  };

  $scope.turnOnDrag = function() {
    $scope.isCodeBlockDraggable = true;
  };

  $scope.onDragFromCanvas = function(data, event) {
    $scope.isCanvasDraggable = false;
  };

  $scope.onDragFromToolbox = function(event) {
    $scope.isCanvasDraggable = true;
  };

  socket.on('updatePosition', function(data) {
    var element = angular.element(document.getElementById(data.type));

    if (data.isDragging) {
      element.css({
        transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + data.position.x + ', ' + data.position.y + ', 0, 1)',
        'z-index': 99999,
        '-webkit-transform': 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + data.position.x + ', ' + data.position.y + ', 0, 1)',
        '-ms-transform': 'matrix(1, 0, 0, 1, ' + data.position.x + ', ' + data.position.y + ')'
      });
    } else {
      element.css({transform:'', 'z-index':'', '-webkit-transform':'', '-ms-transform':''});
    }
  })
  
  $scope.typeArray = function() {
    typeArray = undefined; 
  } 

  $scope.moving1 = function(type) {
    if (typeArray === undefined) {
      typeArray = type;
    }
  };
  $scope.moving = function(event) {
    var obj = {
      isDragging: true,
      position: {x:event.tx, y:event.ty},
      type: typeArray
    }; 
    socket.emit('changePosition', obj); 
  };

  $scope.onDragSuccess = function(event) {
    var obj = {
      isDragging: false,
      type: typeArray
    };
    socket.emit('changePosition', obj);
  }

  $scope.promptKey = function (data, context) {
    for( var prop in data) {
      if (prop === context.key) {
        data[prompt("Enter new key")] = data[prop];
        delete data[prop];
      }
    }
     generateCode($scope.droppedCodeBlocks);
  }

  // ON DELETE BLOCK ===================================
  $scope.deleteCodeblock = function (data) {
    var index = $scope.droppedCodeBlocks.indexOf(data);
    $scope.droppedCodeBlocks.splice(index, 1);
    generateCode($scope.droppedCodeBlocks);
    socket.emit('canvasChange', $scope.droppedCodeBlocks);
  }

    $scope.promptValue = function (data, context) {
    for( var prop in data) {
      if (prop === context.key) {
        var newVal = prompt("Enter new value");
         data[prop] = newVal;
      }
    }
    generateCode($scope.droppedCodeBlocks);
  }

  // setting variable values
  $scope.setVariable = function(data, name, value, event) {
    event.preventDefault();
    data.name = name || data.name;
    data.value = value || data.value;
    generateCode($scope.droppedCodeBlocks);
  };
});
