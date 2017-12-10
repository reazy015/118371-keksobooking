window.utils = (function () {
  var allMapPins;

  return {
    getRandomValue: function (max, min) {
        return Math.floor(Math.random() * ((max + 1) - min) + min);
    },
    supplementNumberWithZero: function (value) {
      return value < 10 ? '0' + value : value;
    },
    getRandomArrayItem: function (array) {
      return array[this.getRandomValue(array.length - 1, 0)];
    },
    getRandomArraySubset: function (array) {
      var arrayClone = array.slice();
      var subsetLength = this.getRandomValue(array.length, 0);
      var subset = [];
      var item;

      for (var i = 0; i < subsetLength; i++) {
        item = arrayClone.splice(this.getRandomValue(arrayClone.length - 1, 0), 1);
        subset.push(item[0]);
      }
      return subset;
    },
    deactivateActiveMapPin: function () {
      allMapPins = document.querySelectorAll('.map__pin');
      allMapPins.forEach(function (pin) {
        if (pin.classList.contains('map__pin--active')) {
          pin.classList.remove('map__pin--active');
        }
      });
    },
    activateCurrentMapPin: function (evt) {
      this.deactivateActiveMapPin();
      evt.target.closest('.map__pin').classList.add('map__pin--active');
    }
  }
})();
