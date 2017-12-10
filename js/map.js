'use strict';

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

function createMapPin(post) {
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
    renderMapPopup(post);
    activateCurrentMapPin(evt);
    document.addEventListener('keydown', closePopup);
  });

  return btnTemplateClone;
}

function closePopup(evt) {
  if (evt.keyCode === KEYCODE_ESC && map.querySelector('.popup') !== null) {
    var currentPopup = map.querySelector('.popup');
    map.removeChild(currentPopup);
    deactivateActiveMapPin();
    document.removeEventListener('keydown', closePopup);
  }
}

function renderMapPins(posts) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < posts.length; i++) {
    fragment.appendChild(createMapPin(posts[i]));
  }
  pinMap.appendChild(fragment);
}

function renderMapPopup(post) {
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
      deactivateActiveMapPin();
    }
  });

  popupTemplate.addEventListener('keydown', function (evt) {
    var currentPopup = evt.target.parentNode;
    if (evt.target.classList.contains('popup__close') && evt.keyCode === KEYCODE_ENTER) {
      map.removeChild(currentPopup);
      deactivateActiveMapPin();
    }
  });

  map.insertBefore(popupTemplate, mapFiltersContainer);
}

function getRandomArraySubset(array) {
  var arrayClone = array.slice();
  var subsetLength = window.utils.getRandomValue(array.length, 0);
  var subset = [];
  var item;

  for (var i = 0; i < subsetLength; i++) {
    item = arrayClone.splice(window.utils.getRandomValue(arrayClone.length - 1, 0), 1);
    subset.push(item[0]);
  }
  return subset;
}

function getRandomArrayItem(array) {
  return array[window.utils.getRandomValue(array.length - 1, 0)];
}

function supplementNumberWithZero(value) {
  return value < 10 ? '0' + value : value;
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

function deactivateActiveMapPin() {
  allMapPins = document.querySelectorAll('.map__pin');

  allMapPins.forEach(function (pin) {
    if (pin.classList.contains('map__pin--active')) {
      pin.classList.remove('map__pin--active');
    }
  });
}

function activateCurrentMapPin(evt) {
  deactivateActiveMapPin();
  evt.target.closest('.map__pin').classList.add('map__pin--active');
}

toggleFromDisability(formFieldsets, true);
mainPin.addEventListener('mouseup', activateMap);


function checkValidity(evt) {
  var input = evt.target;
  if (input.type === 'number') {
    if (input.validity.valueMissing) {
      input.setCustomValidity('Обязательное поле для заполнения');
    } else if (input.validity.rangeUnderflow) {
      input.setCustomValidity('Значение должно быть не менее ' + input.min);
      input.value = input.min;
    } else if (input.validity.rangeOverflow) {
      input.setCustomValidity('Значение должно быть не более ' + input.max);
      input.value = input.max;
    } else {
      input.setCustomValidity('');
    }
  }

  if (input.type === 'text') {
    if (input.validity.valueMissing) {
      input.setCustomValidity('Обязательно поле для заполнения');
    } else if (input.validity.tooShort) {
      input.setCustomValidity('Поле должно быть не менее ' + input.minLength + ' символов');
    } else if (input.validity.tooLong) {
      input.setCustomValidity('Поле должео быть не более ' + input.maxLength + ' символов');
    } else {
      input.setCustomValidity('');
    }
  }
}

function syncTimeInputs() {
  timeoutInput.selectedIndex = timeinInput.selectedIndex;
}

function toggleErrorInput(input, state) {
  state ? input.style.boxShadow = '0 0 5px 2px red' : input.style.boxShadow = '';
}

titleInput.addEventListener('invalid', checkValidity);
titleInput.addEventListener('input', checkValidity);
priceInput.addEventListener('invalid', checkValidity);
priceInput.addEventListener('input', checkValidity);
timeinInput.addEventListener('input', syncTimeInputs);
timeoutInput.addEventListener('input', syncTimeInputs);

houseType.addEventListener('change', function () {
  switch (houseType.value) {
    case 'bungalo':
      priceInput.setAttribute('min', 0);
      break;
    case 'flat':
      priceInput.setAttribute('min', 1000);
      break;
    case 'house':
      priceInput.setAttribute('min', 5000);
      break;
    case 'palace':
      priceInput.setAttribute('min', 10000);
      break;
    default:
      priceInput.setAttribute('min', 1000);
  }
});

function syncRoomNumbersToCapacity() {
  roomCapacity.value = roomNumber.value;
}

roomNumber.addEventListener('change', function () {
  switch (roomNumber.value) {
    case '1':
      syncRoomNumbersToCapacity();
      break;
    case '2':
      syncRoomNumbersToCapacity();
      break;
    case '3':
      syncRoomNumbersToCapacity();
      break;
    case '100':
      roomCapacity.value = '0';
      break;
    default:
      roomCapacity.value = '3';
  }
});

form.addEventListener('submit', function (evt) {
  var formFields = form.elements;

  for (var i = 0; i < formFields.length; i++) {
    if (formFields[i].name === 'address' && !formFields[i].value) {
      toggleErrorInput(formFields[i], true);
      evt.preventDefault();
    } else {
      toggleErrorInput(formFields[i], false);
    }
  }
});
