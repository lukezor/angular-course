(function () {
  'use strict';
  
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);
  
  
  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };
  
    return ddo;
  }

  function FoundItemsDirectiveController() {}
  
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
  
    var menu = this;
  
    menu.searchTerm = '';
    menu.found = [];
    menu.nothingFound = false;
  
    menu.narrowItDown = function () {
  
      if (!menu.searchTerm || menu.searchTerm.trim() === '') {
        menu.found = [];
        menu.nothingFound = true;
        return;
      }
  
      var promise =
        MenuSearchService.getMatchedMenuItems(menu.searchTerm);
  
      promise.then(function (foundItems) {
  
        menu.found = foundItems;
  
        menu.nothingFound =
          foundItems.length === 0;
      });
    };
  
    menu.removeItem = function (itemIndex) {
      menu.found.splice(itemIndex, 1);
      menu.nothingFound = menu.found.length === 0;
    };
  }
  
  
  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
  
    var service = this;
  
    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
          method: 'GET',
          url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
        })
        .then(function (response) {

          var matchedItems = [];
        
          for (var categoryKey in response.data) {
        
            var category = response.data[categoryKey];
        
            for (var i = 0; i < category.menu_items.length; i++) {
        
              var item = category.menu_items[i];
        
              if (
                item.description &&
                item.description.toLowerCase()
                  .indexOf(searchTerm.toLowerCase()) !== -1
              ) {
                matchedItems.push(item);
              }
            }
          }
        
          return matchedItems;
        });
      };
  }
  
  })();