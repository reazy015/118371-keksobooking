'use strict';

window.card = (function () {
  var KEYCODE_ENTER = 13;
  var KEYCODE_ESC = 27;
  var map = document.querySelector('.map');
  var template = document.querySelector('template');
  var articleTemplate = template.content.querySelector('.map__card');
  var mapFiltersContainer = map.querySelector('.map__filters-container');

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
  };
})();
