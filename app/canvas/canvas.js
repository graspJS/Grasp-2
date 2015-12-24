angular.module('Grasp.Canvas', ['Canvas.socket', 'ngDraggable', 'ngRoute', 'ngPopup'])

.controller('CanvasCTRL', function ($scope, socket, CanvasFactory) {
  // are canvas blocks draggable?
  $scope.isCanvasDraggable = false;

  // are blocks droppable on canvas?
  $scope.isCanvasDroppable = true;

  // code generated from the combination of blocks on canvas
  $scope.code = "";

  // blocks available for user
  $scope.codeBlocks = [1,2,3,4,5];

  // storage for blocks currently on the canvas arranged in a matrix
  $scope.blockMatrix = [[],[],[],[],[],[],[],[],[],[]];

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

  $scope.toggleCanvasDroppable = function() {
    console.log("FIRE");
    $scope.isCanvasDroppable = !$scope.isCanvasDroppable;
  }

})

.factory('CanvasFactory', function() {
  // blocks available for user
  var codeBlocks = [];

  // converts codeBlock into javascript code in the form of string
  var generateCode = function(matrix) {
    console.log("works");
  };

  return {
    codeBlocks: codeBlocks,
    generateCode: generateCode
  };
});