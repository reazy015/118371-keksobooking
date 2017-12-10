window.data = (function () {

  return {
    generateInitialDataArray: function (objectsAmount) {
      var titles = [
        'Большая уютная квартира',
        'Маленькая неуютная квартира',
        'Огромный прекрасный дворец',
        'Маленький ужасный дворец',
        'Красивый гостевой домик',
        'Некрасивый негостеприимный домик',
        'Уютное бунгало далеко от моря',
        'Неуютное бунгало по колено в воде'
      ];
      var types = ['flat', 'house', 'bungalo'];
      var times = ['12:00', '13:00', '14:00'];
      var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
      var priceRange = {min: 1000, max: 1000000};
      var roomsRange = {min: 1, max: 5};
      var guestRange = {min: 1, max: 4};
      var xRange = {min: 300, max: 900};
      var yRange = {min: 100, max: 500};
      var data = [];
      var x = 0;
      var y = 0;

      for (var i = 1; i <= objectsAmount; i++) {
        x = window.utils.getRandomValue(xRange.max, xRange.min);
        y = window.utils.getRandomValue(yRange.max, yRange.min);
        data.push({
          author: {
            avatar: 'img/avatars/user' + window.utils.supplementNumberWithZero(i) + '.png'
          },
          offer: {
            title: titles[i - 1],
            address: x + ', ' + y,
            price: window.utils.getRandomValue(priceRange.max, priceRange.min),
            type: window.utils.getRandomArrayItem(types),
            rooms: window.utils.getRandomValue(roomsRange.max, roomsRange.min),
            guests: window.utils.getRandomValue(guestRange.max, guestRange.min),
            checkin: window.utils.getRandomArrayItem(times),
            checkout: window.utils.getRandomArrayItem(times),
            features: window.utils.getRandomArraySubset(features),
            description: '',
            photos: []
          },
          location: {
            x: x,
            y: y
          }
        });
      }

      return data;
    }
  }
})();
