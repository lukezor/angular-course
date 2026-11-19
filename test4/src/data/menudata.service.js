(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http'];
function MenuDataService($http) {
  var service = this;

  var categoriesUrl = 'https://coursera-jhu-default-rtdb.firebaseio.com/categories.json';
  var itemsBaseUrl = 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/';

  service.getAllCategories = function () {
    return $http({
      method: 'GET',
      url: categoriesUrl
    }).then(function (response) {
      return response.data;
    });
  };

  service.getItemsForCategory = function (categoryShortName) {
    return $http({
      method: 'GET',
      url: itemsBaseUrl + encodeURIComponent(categoryShortName) + '.json'
    }).then(function (response) {
      return response.data.menu_items;
    });
  };
}

})();
