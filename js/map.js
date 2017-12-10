'use strict';

var OBJECTS_QUANTITY = 8;
var map = document.querySelector('.map');
var pinMap = document.querySelector('.map__pins');
var mainPin = document.querySelector('.map__pin--main');
var form = document.querySelector('.notice__form');
var formFieldsets = form.querySelectorAll('fieldset');
var intitialDataArray = window.data.generateInitialDataArray(OBJECTS_QUANTITY);


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
  renderMapPins(intitialDataArray);
  toggleFromDisability(formFieldsets, false);
  map.classList.remove('map--faded');
  form.classList.remove('notice__form--disabled');
  mainPin.removeEventListener('mouseup', activateMap);
}

toggleFromDisability(formFieldsets, true);
mainPin.addEventListener('mouseup', activateMap);
window.formValidation.formCheck();
