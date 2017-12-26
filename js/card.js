'use strict';

window.card = (function () {
  var KEYCODE_ENTER = 13;
  var KEYCODE_ESC = 27;
  var map = document.querySelector('.map');
  var template = document.querySelector('template');
  var articleTemplate = template.content.querySelector('.map__card');
  var mapFiltersContainer = map.querySelector('.map__filters-container');

  function renderMapPopup(post) {
    var popupTemplate = articleTemplate.cloneNode(true);
    var dictionary = {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'house': 'Дом'
    };
    var postType = popupTemplate.querySelector('h4');
    var feature = popupTemplate.querySelector('.popup__features');
    var featuresFragment = document.createDocumentFragment();
    var featureItem;

    popupTemplate.querySelector('.popup__avatar').src = post.author.avatar;
    popupTemplate.querySelector('h3').textContent = post.offer.title;
    popupTemplate.querySelector('small').textContent = post.offer.address;
    popupTemplate.querySelector('.popup__price').textContent = post.offer.price + '&#x20bd;/ночь';
    postType.textContent = dictionary[post.offer.type];
    postType.nextElementSibling.textContent = post.offer.rooms + ' комнаты для ' + post.offer.guests + ' гостей';
    postType.nextElementSibling.nextElementSibling.textContent = 'заезд после ' + post.offer.checkin + ' , выезд до ' + post.offer.checkout;
    popupTemplate.querySelector('.popup__features').textContent = '';


    for (var i = 0; i < post.offer.features.length; i++) {
      featureItem = document.createElement('li');
      featureItem.className = 'feature  feature--' + post.offer.features[i];
      featuresFragment.appendChild(featureItem);
    }
    feature.appendChild(featuresFragment);
    feature.nextElementSibling.textContent = post.offer.description;

    popupTemplate.addEventListener('click', function (evt) {
      var currentPopup = evt.target.parentNode;
      if (evt.target.classList.contains('popup__close')) {
        map.removeChild(currentPopup);
        window.pin.deactivateActiveMapPin();
      }
    });

    popupTemplate.addEventListener('keydown', function (evt) {
      var currentPopup = evt.target.parentNode;
      if (evt.target.classList.contains('popup__close') && evt.keyCode === KEYCODE_ENTER) {
        map.removeChild(currentPopup);
        window.pin.deactivateActiveMapPin();
      }
    });

    map.insertBefore(popupTemplate, mapFiltersContainer);
  }

  function closePopup(evt) {
    if (evt.keyCode === KEYCODE_ESC && map.querySelector('.popup') !== null) {
      var currentPopup = map.querySelector('.popup');
      map.removeChild(currentPopup);
      window.pin.deactivateActiveMapPin();
      document.removeEventListener('keydown', closePopup);
    }
  }

  return {
    showCard: function (post) {
      return function (evt) {
        if (map.querySelector('.popup') !== null) {
          var currentPopup = map.querySelector('.popup');
          map.removeChild(currentPopup);
        }
        renderMapPopup(post);
        window.pin.activateCurrentMapPin(evt);
        document.addEventListener('keydown', closePopup);
      };
    }
  };
})();
