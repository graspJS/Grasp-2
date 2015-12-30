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

  // edite a block's attributes
  $scope.editBlock = function() {
    
  }

  // handles any drop events on canvas
  $scope.onCanvasDrop = function(codeBlock, row) {
    // add codeBlock at row
    row.push(codeBlock);

    // remove any empty rows to avoid wasted space in the matrix
    // for (var i = $scope.blockMatrix.length-1; i >= 0; i--) {
    //   if ($scope.blockMatrix[i].length === 0) {
    //     $scope.blockMatrix.splice(i, 1);
    //   }
    // }

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
                        content: 0
                      },
                      {
                        type: 'string',
                        tag: '~',
                        name: 'no-name-string',
                        content: '-- empty string --'
                      },
                      {
                        type: 'array',
                        tag: '[]',
                        name: 'no-name-array',
                        content: []
                      },
                      {
                        type: 'object',
                        tag: '{}',
                        name: 'no-name-object',
                        content: {}
                      },
                      {
                        type: 'loop',
                        tag: 'O',
                        name: 'loop',
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
