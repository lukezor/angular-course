(function () {
'use strict';

angular.module('LunchApp', [])
.controller('LunchController', LunchController);

LunchController.$inject = ['$scope'];
function LunchController($scope) {

  $scope.items = "";
  $scope.result = "";
  $scope.inputClass = "";
  $scope.messageClass = "";

  $scope.evaluate = function(){

    if (!$scope.items || $scope.items.trim() === "") { 
      // If the entire input is empty or contains only whitespace, show an error
      $scope.result = "Please enter data first";
      $scope.messageClass = "error";
      $scope.inputClass = "error-border";
      return;
    }

    var validItems = $scope.items
      .split(',') // Split the input using commas as separators.
      .map(function(item) { 
        return item.trim(); // Maps into an array, removing leading and trailing whitespace from each item.
      })
      .filter(function(item) {
        // Ignore empty items, such as those created by consecutive commas
        // (ex: "item1,,item2") or items containing only whitespace.
        return item.length > 0;
      });

    if (validItems.length === 0) {
      $scope.result = "Please enter data first";
      $scope.messageClass = "error";
      $scope.inputClass = "error-border";
    } 
    
    else if (validItems.length <= 3) {
      $scope.result = "Enjoy!";
      $scope.messageClass = "success";
      $scope.inputClass = "success-border";
    } 
    
    else {
      $scope.result = "Too much!";
      $scope.messageClass = "success";
      $scope.inputClass = "success-border";
    }
    
  }
}

})();
