window.pin = (function () {
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
  }

})();
