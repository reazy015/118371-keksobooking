'use strict';

window.map = (function () {
  var mapWidth = document.querySelector('.map__pinsoverlay');
  var MAX_Y = 500;
  var MIN_Y = 100;
  var MAX_X = mapWidth.clientWidth;
  var MIN_X = 0;
  var MAP_PIN_MAIN_WIDTH = 65;
  var MAP_PIN_MAIN_HEIGHT = 87;
  var ROOMS = ['1', '2', '3', '100'];
  var GUESTS = ['1', '2', '3', '0'];
  var MIN_PRICE = [0, 1000, 5000, 10000];
  var map = document.querySelector('.map');
  var pinMap = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.notice__form');
  var formFieldsets = form.querySelectorAll('fieldset');
  var roomNumber = form.querySelector('#room_number');
  var roomCapacity = form.querySelector('#capacity');
  var intitialDataArray = window.data;

  function showErrorMessage(msg) {
    console.log(msg);
  }

  function renderMapPins(posts) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < posts.length; i++) {
      fragment.appendChild(window.pin(posts[i]));
    }
    pinMap.appendChild(fragment);
  }

  function toggleFromDisability(fieldsetList, status) {
    fieldsetList.forEach(function (fieldset) {
      fieldset.disabled = status;
    });
  }

  function activateMap() {
    window.backend.load(renderMapPins, showErrorMessage)
    toggleFromDisability(formFieldsets, false);
    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    mainPin.removeEventListener('mouseup', activateMap);
  }

  toggleFromDisability(formFieldsets, true);
  window.formValidation();
  mainPin.addEventListener('mouseup', activateMap);
  mainPin.setAttribute('draggable', true);
  mainPin.addEventListener('mousedown', onMainPin);

  function onMainPin(evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
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
      window.utils.setAddressValue(inputX, inputY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
})();
