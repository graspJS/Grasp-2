angular.module('Grasp.Canvas', ['Canvas.socket', 'ngDraggable', 'ngRoute', 'ngPopup'])

.controller('CanvasCTRL', function ($scope, socket, CanvasFactory) {
  $scope.isCanvasDraggable = false;
  $scope.isCanvasDroppable = true;

  // code generated from the combination of blocks on canvas
  $scope.code = "";

  // blocks available for user
  $scope.codeBlocks = CanvasFactory.codeBlocks;

  // storage for blocks currently on the canvas arranged in a matrix
  $scope.blockMatrix = CanvasFactory.matrix;

  // remove a block from the canvas
  $scope.deleteBlock = function (row, block) {
    var index = row.indexOf(block);
    row.splice(index, 1);
  }

  // handles any drop events on canvas
  $scope.onCanvasDrop = function(codeBlock, row) {
    // add codeBlock at row
    
    row.push(codeBlock);
    $scope.isCanvasDroppable = true;

    // add an extra empty row to the matrix if last row contains a codeBlock
    if ($scope.blockMatrix[$scope.blockMatrix.length-1].length > 0) {
      $scope.blockMatrix.push([]);
    }
  };

})

// ------------------- CANVAS FACTORY ------------------- 
.factory('CanvasFactory', function() {
  // blocks available for user
  var codeBlocks = [
                      {
                        type: 'number',
                        tag: '#',
                        name: 'no-name-number',
                        content: 0,
                        generateUniqueID: function() {
                          return this.name + this.content + "";
                        }
                      },
                      {
                        type: 'string',
                        tag: '~',
                        name: 'no-name-string',
                        content: '-- empty string --',
                        generateUniqueID: function() {
                          return this.name + this.content + "";
                        }
                      },
                      {
                        type: 'array',
                        tag: '[]',
                        name: 'no-name-array',
                        content: [],
                        generateUniqueID: function() {
                          return this.name + this.content + "";
                        }
                      },
                      {
                        type: 'object',
                        tag: '{}',
                        name: 'no-name-object',
                        content: {},
                        generateUniqueID: function() {
                          return this.name + this.content + "";
                        }
                      },
                      {
                        type: 'loop',
                        tag: 'O',
                        name: 'loop',
                        content: [[],[],[],[],[]],
                        generateUniqueID: function() {
                          return this.name + this.content + "";
                        }
                      }
                   ];

  // converts codeBlock into javascript code in the form of string
  var generateCode = function(matrix) {
    console.log("works");
  };

  var matrix = [
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  []
               ];

  return {
    codeBlocks: codeBlocks,
    generateCode: generateCode,
    matrix: matrix
  };
});
