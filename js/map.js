'use strict';

window.map = (function () {
  var mapWidth = document.querySelector('.map__pinsoverlay');
  var MAX_Y = 500;
  var MIN_Y = 100;
  var MAX_X = mapWidth.clientWidth;
  var MIN_X = 0;
  var MAP_PIN_MAIN_WIDTH = 65;
  var MAP_PIN_MAIN_HEIGHT = 87;
  var map = document.querySelector('.map');
  var pinMap = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.notice__form');
  var formFieldsets = form.querySelectorAll('fieldset');

  function renderMapPins(posts) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < posts.length; i++) {
      fragment.appendChild(window.pin.createMapPin(posts[i]));
    }
    pinMap.appendChild(fragment);
  }

  function toggleFromDisability(fieldsetList, status) {
    fieldsetList.forEach(function (fieldset) {
      fieldset.disabled = status;
    });
  }

  function activateMap() {
    window.backend.load(renderMapPins);
    toggleFromDisability(formFieldsets, false);
    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    mainPin.removeEventListener('mouseup', activateMap);
  }

  function onMainPin(evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var newY = mainPin.offsetTop - shift.y;
      var newX = mainPin.offsetLeft - shift.x;

      if ((newY <= MAX_Y) && (newY >= MIN_Y)) {
        mainPin.style.top = newY + 'px';
      }
      if ((newX <= MAX_X) && (newX >= MIN_X)) {
        mainPin.style.left = newX + 'px';
      }
      var inputX = newX + MAP_PIN_MAIN_WIDTH / 2;
      var inputY = newY + MAP_PIN_MAIN_HEIGHT;
      window.formValidation.setAddressValue(inputX, inputY);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  toggleFromDisability(formFieldsets, true);
  window.formValidation.checkForm();
  mainPin.addEventListener('mouseup', activateMap);
  mainPin.setAttribute('draggable', true);
  mainPin.addEventListener('mousedown', onMainPin);
})();
