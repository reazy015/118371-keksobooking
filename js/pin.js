'use strict';

window.pin = (function () {
  var map = document.querySelector('.map');
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

      btnTemplateClone.addEventListener('click', function (evt) {
        if (map.querySelector('.popup') !== null) {
          var currentPopup = map.querySelector('.popup');
          map.removeChild(currentPopup);
        }
        window.card.renderMapPopup(post);
        window.utils.activateCurrentMapPin(evt);
        document.addEventListener('keydown', window.card.closePopup);
      });

      return btnTemplateClone;
    }
  };
})();
