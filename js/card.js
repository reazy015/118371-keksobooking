window.card = (function () {
  var OBJECTS_QUANTITY = 8;
  var KEYCODE_ENTER = 13;
  var KEYCODE_ESC = 27;
  var map = document.querySelector('.map');
  var template = document.querySelector('template');
  var btnTemplate = template.content.querySelector('.map__pin');
  var articleTemplate = template.content.querySelector('.map__card');
  var pinMap = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.notice__form');
  var formFieldsets = form.querySelectorAll('fieldset');
  var intitialDataArray = window.data.generateInitialDataArray(OBJECTS_QUANTITY);
  var titleInput = form.querySelector('#title');
  var priceInput = form.querySelector('#price');
  var timeinInput = form.querySelector('#timein');
  var timeoutInput = form.querySelector('#timeout');
  var houseType = form.querySelector('#type');
  var roomNumber = form.querySelector('#room_number');
  var roomCapacity = form.querySelector('#capacity');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var allMapPins;

  return {
    renderMapPopup: function (post) {
      var popupTemplate = articleTemplate.cloneNode(true);
      var dictionary = {
        'flat': 'Квартира',
        'bungalo': 'Бунгало',
        'house': 'Дом'
      };
      var postType = popupTemplate.querySelector('h4');
      var features = popupTemplate.querySelector('.popup__features');
      var featuresFragment = document.createDocumentFragment();

      popupTemplate.querySelector('.popup__avatar').src = post.author.avatar;
      popupTemplate.querySelector('h3').textContent = post.offer.title;
      popupTemplate.querySelector('small').textContent = post.offer.address;
      popupTemplate.querySelector('.popup__price').innerHTML = post.offer.price + '&#x20bd;/ночь';
      postType.textContent = dictionary[post.offer.type];
      postType.nextElementSibling.textContent = post.offer.rooms + ' комнаты для ' + post.offer.guests + ' гостей';
      postType.nextElementSibling.nextElementSibling.textContent = 'заезд после ' + post.offer.checkin + ' , выезд до ' + post.offer.checkout;
      popupTemplate.querySelector('.popup__features').innerHTML = '';

      for (var i = 0; i < post.offer.features.length; i++) {
        var li = document.createElement('li');
        li.className = 'feature  feature--' + post.offer.features[i];
        featuresFragment.appendChild(li);
      }
      features.appendChild(featuresFragment);
      features.nextElementSibling.textContent = post.offer.description;

      popupTemplate.addEventListener('click', function (evt) {
        var currentPopup = evt.target.parentNode;
        if (evt.target.classList.contains('popup__close')) {
          map.removeChild(currentPopup);
          window.utils.deactivateActiveMapPin();
        }
      });

      popupTemplate.addEventListener('keydown', function (evt) {
        var currentPopup = evt.target.parentNode;
        if (evt.target.classList.contains('popup__close') && evt.keyCode === KEYCODE_ENTER) {
          map.removeChild(currentPopup);
          window.util.deactivateActiveMapPin();
        }
      });

      map.insertBefore(popupTemplate, mapFiltersContainer);
    },
    closePopup: function (evt) {
      if (evt.keyCode === KEYCODE_ESC && map.querySelector('.popup') !== null) {
        var currentPopup = map.querySelector('.popup');
        map.removeChild(currentPopup);
        window.utils.deactivateActiveMapPin();
        document.removeEventListener('keydown', this.closePopup);
      }
    }
  }
})();
