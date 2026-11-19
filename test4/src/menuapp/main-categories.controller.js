(function () {
'use strict';

angular.module('MenuApp')
.controller('MainCategoriesController', MainCategoriesController);

MainCategoriesController.$inject = ['categories'];
function MainCategoriesController(categories) {
  var mainCtrl = this;
  mainCtrl.categories = categories;
}

})();
