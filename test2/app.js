(() => {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getToBuyItems();

    toBuy.markAsBought = (itemIndex) => ShoppingListCheckOffService.markAsBought(itemIndex);

    toBuy.check = () => ShoppingListCheckOffService.checkIfToBuyIsEmpty();

  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;

    alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();

    alreadyBought.check = () => ShoppingListCheckOffService.checkIfAnythingBoughtIsEmpty();
  }


  function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [
      {
        name: "Cookies",
        quantity: "1 package of"
      },
      {
        name: "Milk",
        quantity: "3 bottles of"
      },
      {
        name: "Beans",
        quantity: "1 package of"
      },
      {
        name: "Chips",
        quantity: "2 bags of"
      },
      {
        name: "Coca-Cola",
        quantity: "1 bottle of"
      }
    ];
    var alreadyBoughtItems = [];

    service.markAsBought = (index) => {
      var boughtItem = toBuyItems.splice(index, 1)[0];
      alreadyBoughtItems.push(boughtItem);
    };

    service.getToBuyItems = () => toBuyItems;

    service.getAlreadyBoughtItems = () => alreadyBoughtItems;

    service.checkIfToBuyIsEmpty = () => toBuyItems.length === 0

    service.checkIfAnythingBoughtIsEmpty = () => alreadyBoughtItems.length === 0;

  }

})();
