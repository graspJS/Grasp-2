angular.module('Grasp.Canvas', ['Canvas.socket', 'ngDraggable', 'ngRoute'])

.controller('CanvasCTRL', function ($scope, socket) {
  $scope.code = "";
  $scope.isCanvasDraggable=true;
  $scope.isCodeBlockDraggable=true;

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
        
        $scope.code = generateCode($scope.droppedCodeBlocks);
      },
      pop: function () {
        this.value.pop();
        $scope.code = generateCode($scope.droppedCodeBlocks);
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
        $scope.code = generateCode($scope.droppedCodeBlocks);
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
              $scope.code = generateCode($scope.droppedCodeBlocks);
            } else {
                this.value = data.value;
                this.storage.name = data.name;
                this.storage.value = data.value;
                $scope.code = generateCode($scope.droppedCodeBlocks);
              }
          } else {
            this.value = data;
            this.storage.value = data;
            $scope.code = generateCode($scope.droppedCodeBlocks);
          }
        },
        setKey: function (key) {
          this.key = key;
          $scope.code = generateCode($scope.droppedCodeBlocks);
        },
        addKeyValue: function(key, value) {
          this.storage[key] = value;
          $scope.code = generateCode($scope.droppedCodeBlocks);
        },
        objectKeys: function () {
          var keysArr = cloneObject($scope.codeBlocks[1]);
          keysArr.name = "Keys of " + this.name;
          keysArr.value = Object.keys(this.storage);
          $scope.droppedCodeBlocks.push(keysArr);
          $scope.code = generateCode($scope.droppedCodeBlocks);
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
        $scope.code = generateCode($scope.droppedCodeBlocks);
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
        $scope.code = generateCode($scope.droppedCodeBlocks);
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
        $scope.code = generateCode($scope.droppedCodeBlocks);
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
        $scope.code = generateCode($scope.droppedCodeBlocks);
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
          $scope.code = generateCode($scope.droppedCodeBlocks);
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
          $scope.code = generateCode($scope.droppedCodeBlocks);
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

  // stores the codeblocks dropped in canvas
  $scope.droppedCodeBlocks = [];

  // ON BLOCK DROP ====================================
  // When a codeblock is dropped, add it to array. Also regenerate code
  socket.on('onBlockAdded', function(data) {
    console.log('fuck jeff');
    $scope.droppedCodeBlocks.push(cloneObject(data));
  }); 
  $scope.onDrop = function(data, event) {
    if ($scope.isCanvasDraggable) {
      if (data.storage !== undefined) {
        data.storage = cloneObject(data.storage);
      }
      $scope.droppedCodeBlocks.push(cloneObject(data));
      $scope.code = generateCode($scope.droppedCodeBlocks);
      socket.emit('addBlock', cloneObject(data));
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
    document.getElementById(data.type).style.transform = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + data.position.x + ', ' + data.position.y + ', 0, 1)'; 
    document.getElementById(data.type).style.zIndex = 99999;
    document.getElementById(data.type).style.webkitTransform = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + data.position.x + ', ' + data.position.y + ', 0, 1)'; 
    document.getElementById(data.type).style.msTransform = 'matrix(1, 0, 0, 1, ' + data.position.x + ', ' + data.position.y + ')';
    /*
    transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + x + ', ' + y + ', 0, 1)',
                            'z-index': 99999,
                            '-webkit-transform': 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ' + x + ', ' + y + ', 0, 1)',
                            '-ms-transform': 'matrix(1, 0, 0, 1, ' + x + ', ' + y + ')'
    */
  })
  
  var typeArray = []; 
  $scope.typeArray = function() {
    typeArray = []; 
  } 

  $scope.moving1 = function(type) {
    typeArray.push(type);
  };
  $scope.moving = function(event) {
    var obj = {
      position: {x:event.tx, y:event.ty},
      type: typeArray[0]
    }; 
    socket.emit('changePosition', obj); 
  };

  $scope.promptKey = function (data, context) {
    for( var prop in data) {
      if (prop === context.key) {
        data[prompt("Enter new key")] = data[prop];
        delete data[prop];
      }
    }
     $scope.code = generateCode($scope.droppedCodeBlocks);
  }

  // ON DELETE BLOCK ===================================
  socket.on('onBlockDelete', function(data) {
    $scope.droppedCodeBlocks.splice(data, 1);
  }); 
  $scope.deleteCodeblock = function (data) {
    var index = $scope.droppedCodeBlocks.indexOf(data);
    $scope.droppedCodeBlocks.splice(index, 1);
    $scope.code = generateCode($scope.droppedCodeBlocks);
    socket.emit('deleteBlock', index); 
  }

    $scope.promptValue = function (data, context) {
    for( var prop in data) {
      if (prop === context.key) {
        var newVal = prompt("Enter new value");
         data[prop] = newVal;
      }
    }
    $scope.code = generateCode($scope.droppedCodeBlocks);
  }

  // setting variable values
  $scope.setVariable = function(data, name, value, event) {
    event.preventDefault();
    data.name = name || data.name;
    data.value = value || data.value;
    $scope.code = generateCode($scope.droppedCodeBlocks);
  };
});
