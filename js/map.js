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
var formSubmitBtn = form.querySelector('.form__submit');
var formFieldsets = form.querySelectorAll('fieldset');
var intitialDataArray = generateInitialDataArray(OBJECTS_QUANTITY);
var titleInput = form.querySelector('#title');
var addressInput = form.querySelector('#address');
var priceInput = form.querySelector('#price');
var timeinInput = form.querySelector('#timein');
var timeoutInput = form.querySelector('#timeout');
var houseType = form.querySelector('#type');
var roomNumber = form.querySelector('#room_number');
var roomCapacity = form.querySelector('#capacity');
var mapFiltersContainer = map.querySelector('.map__filters-container');
var titleMinLength = 30;
var titleMaxLength = 100;
var allMapPins;

function generateInitialDataArray(objectsAmount) {
  var titles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var types = ['flat', 'house', 'bungalo'];
  var times = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var priceRange = {min: 1000, max: 1000000};
  var roomsRange = {min: 1, max: 5};
  var guestRange = {min: 1, max: 4};
  var xRange = {min: 300, max: 900};
  var yRange = {min: 100, max: 500};
  var data = [];
  var x = 0;
  var y = 0;

  for (var i = 1; i <= objectsAmount; i++) {
    x = getRandomValue(xRange.max, xRange.min);
    y = getRandomValue(yRange.max, yRange.min);
    data.push({
      author: {
        avatar: 'img/avatars/user' + supplementNumberWithZero(i) + '.png'
      },
      offer: {
        title: getRandomArrayItem(titles),
        address: x + ', ' + y,
        price: getRandomValue(priceRange.max, priceRange.min),
        type: getRandomArrayItem(types),
        rooms: getRandomValue(roomsRange.max, roomsRange.min),
        guests: getRandomValue(guestRange.max, guestRange.min),
        checkin: getRandomArrayItem(times),
        checkout: getRandomArrayItem(times),
        features: getRandomArraySubset(features),
        description: '',
        photos: []
      },
      location: {
        x: x,
        y: y
      }
    });
  }

  return data;
}

function createMapPin(post) {
  var btnTemplateClone = btnTemplate.cloneNode(true);
  var templateHeight = parseInt(getComputedStyle(mainPin).getPropertyValue('height'), 10);
  var templatePseudoElemHeight = parseInt(getComputedStyle(mainPin, ':after').getPropertyValue('border-top-width'), 10);

  btnTemplateClone.style.left = post.location.x + 'px';
  btnTemplateClone.style.top = post.location.y - templateHeight / 2 - templatePseudoElemHeight + 'px';
  btnTemplateClone.querySelector('img').src = post.author.avatar;

  btnTemplateClone.addEventListener('click', function (e) {
    if (map.querySelector('.popup') !== null) {
      var currentPopup = map.querySelector('.popup');
      map.removeChild(currentPopup);
    }
    renderMapPopup(post);
    activateCurrentMapPin(e);
  });

  btnTemplateClone.addEventListener('keydown', function (e) {
    if (e.keyCode === KEYCODE_ESC && map.querySelector('.popup') !== null) {
      var currentPopup = map.querySelector('.popup');
      map.removeChild(currentPopup);
      deactivateActiveMapPin();
    }
  });

  return btnTemplateClone;
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

  popupTemplate.addEventListener('click', function (e) {
    var currentPopup = e.target.parentNode;
    if (e.target.classList.contains('popup__close')) {
      map.removeChild(currentPopup);
      deactivateActiveMapPin();
    }
  });

  map.insertBefore(popupTemplate, mapFiltersContainer);
}

function getRandomValue(max, min) {
  return Math.floor(Math.random() * ((max + 1) - min) + min);
}

function getRandomArraySubset(array) {
  var arrayClone = array.slice();
  var subsetLength = getRandomValue(array.length - 1, 0);
  var subset = [];
  var item;

  for (var i = 0; i < subsetLength; i++) {
    item = arrayClone.splice(getRandomValue(arrayClone.length - 1, 0), 1);
    subset.push(item[0]);
  }
  return subset;
}

function getRandomArrayItem(array) {
  return array[getRandomValue(array.length - 1, 0)];
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

function activateCurrentMapPin(e) {
  deactivateActiveMapPin();
  e.target.closest('.map__pin').classList.add('map__pin--active');
}

toggleFromDisability(formFieldsets, true);
mainPin.addEventListener('mouseup', activateMap);

form.setAttribute('action', 'https://js.dump.academy/keksobooking');
form.setAttribute('method', 'post');
addressInput.setAttribute('readonly', true);
addressInput.setAttribute('required', '');
titleInput.setAttribute('required', '');
titleInput.setAttribute('minlength', titleMinLength);
titleInput.setAttribute('maxlength', titleMaxLength);
priceInput.setAttribute('min', 0);
priceInput.setAttribute('max', 1000000);
priceInput.setAttribute('required', '');
priceInput.setAttribute('type', 'number');

addressInput.addEventListener('invalid', function () {
  return addressInput.validity.valueMissing === true ? addressInput.setCustomValidity('Поле обязательное для заполнения') : addressInput.setCustomValidity('');
});

titleInput.addEventListener('invalid', function () {
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательно поле для заполнения');
  } else if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Поле должно быть не менее ' + titleMinLength + ' символов');
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity('Поле должео быть не более ' + titleMaxLength + ' символов');
  } else {
    titleInput.setCustomValidity('');
  }
});

priceInput.addEventListener('invalid', function () {
  if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Обязательное поле для заполнения');
  } else if (priceInput.validity.rangeUnderflow) {
    priceInput.setCustomValidity('Значение должно быть не менее ' + priceInput.min);
    priceInput.value = priceInput.min;
  } else if (priceInput.validity.rangeOverflow) {
    priceInput.setCustomValidity('Значение должно быть не более ' + priceInput.max);
    priceInput.value = priceInput.max;
  } else {
    priceInput.setCustomValidity('');
  }
});

timeinInput.addEventListener('change', function () {
  timeoutInput.selectedIndex = timeinInput.selectedIndex;
});

timeoutInput.addEventListener('change', function () {
  timeinInput.selectedIndex = timeoutInput.selectedIndex;
});

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

formSubmitBtn.addEventListener('click', function (e) {
  var formFields = form.elements;

  for (var i = 0; i < formFields.length; i++) {
    if (!formFields[i].validity.valid) {
      formFields[i].style.boxShadow = '0 0 5px 2px red';
      e.preventDefault();
    } else {
      formFields[i].style.boxShadow = '';
    }
  }
});
