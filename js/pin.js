'use strict';

window.pin = (function () {
  var template = document.querySelector('template');
  var btnTemplate = template.content.querySelector('.map__pin');
  var mainPin = document.querySelector('.map__pin--main');

  return {
    createMapPin: function (post) {
      var btnTemplateClone = btnTemplate.cloneNode(true);
      var templateHeight = parseInt(getComputedStyle(mainPin).getPropertyValue('height'), 10);
      var templatePseudoElemHeight = parseInt(getComputedStyle(mainPin, ':after').getPropertyValue('border-top-width'), 10);

      btnTemplateClone.style.left = post.location.x + 'px';
      btnTemplateClone.style.top = post.location.y - templateHeight / 2 - templatePseudoElemHeight + 'px';
      btnTemplateClone.querySelector('img').src = post.author.avatar;

      btnTemplateClone.addEventListener('click', window.card.showCard(post));

      return btnTemplateClone;
    },
    deactivateActiveMapPin: function () {
      var allMapPins = document.querySelectorAll('.map__pin');
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
  };


})();
