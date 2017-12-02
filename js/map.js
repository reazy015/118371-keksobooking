'use strict';

var map = document.querySelector('.map');
var template = document.querySelector('template');
var btnTemplate = template.content.querySelector('.map__pin');
var articleTemplate = template.content.querySelector('.map__card');
var pinMap = document.querySelector('.map__pins');
var mainPin = document.querySelector('.map__pin--main');
var form = document.querySelector('.notice__form');
var formFieldsets = form.querySelectorAll('fieldset');
var intitialDataArray = generateInitialDataArray(8);
var popupCloseBtn = document.querySelector('.popup__close');
var allMapPins;
var mapPopup;
var keyCodes = {
  enter: 13,
  esc: 27
};

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

  for (var i = 0; i < objectsAmount; i++) {
    x = getRandomValue(xRange.max, xRange.min);
    y = getRandomValue(yRange.max, yRange.min);
    data.push({
      author: {
        avatar: 'img/avatars/user' + suplementWithZero(i) + '.png'
      },
      offer: {
        title: titles[i],
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
  var templateHeight = parseInt(getComputedStyle(mainPin).getPropertyValue('height'));
  var templatePseudoElemHeight = parseInt(getComputedStyle(mainPin, ':after').getPropertyValue('border-top-width'));

  btnTemplateClone.style.left = post.location.x + 'px';
  btnTemplateClone.style.top = post.location.y - templateHeight / 2 - templatePseudoElemHeight + 'px';
  btnTemplateClone.querySelector('img').src = post.author.avatar;

  btnTemplateClone.addEventListener('click', function(e){
    renderMapPopup(post);
    activateCurrentMapPin(e);
  });

  btnTemplateClone.addEventListener('keydown', function(e){
    if (e.keyCode === keyCodes.esc) {
      deactivateActiveMapPin();
      openClosePopup('none');
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

  popupTemplate.addEventListener('click', function(e){
    if (e.target.matches('.popup__close')) {
      deactivateActiveMapPin();
      openClosePopup('none');
    }
  })

  map.appendChild(popupTemplate);
}

function renderMap(dataArray) {
  renderMapPins(dataArray);
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
    item = arrayClone.splice(getRandomValue(arrayClone.length - 1, 0), 1)
    subset.push(item[0]);
  }
  return subset;
}

function getRandomArrayItem(array) {
  return array[getRandomValue(array.length - 1, 0)];
}

function suplementWithZero(value) {
  value = value == 0 ? 1 : value;
  return value < 10 ? '0' + value: value;
}

// Активируем/деактивируем поле
function setFormFieldsetsDisActive(fieldsetArray, status){
  fieldsetArray.forEach(function(fieldset) {
    fieldset.disabled = status
  });
}

// Активируем карту
function activateMap() {
  renderMap(intitialDataArray);
  openClosePopup('none');
  setFormFieldsetsDisActive(formFieldsets, false);
  map.classList.remove('map--faded');
  form.classList.remove('notice__form--disabled');
  mainPin.removeEventListener('mouseup', activateMap);
}

// Деактивируем активные указатели на карте
function deactivateActiveMapPin(){
  allMapPins = document.querySelectorAll('.map__pin');

  allMapPins.forEach(function(pin){
    if (pin.classList.contains('map__pin--active')) {
      pin.classList.remove('map__pin--active');
    }
  });
}
// Открываем/закрываем попап изменяя свойство элемента display  с none на block
function openClosePopup(status){
  mapPopup = document.querySelectorAll('.popup');
  mapPopup.forEach(function(item){
    item.style.display = status;
  })
}
// Активируем указатель на карте
function activateCurrentMapPin(e) {
  if (e.target.matches('.map__pin') || e.target.matches('.map__pin img')) {
    deactivateActiveMapPin();
    e.target.closest('.map__pin').classList.add('map__pin--active');
    openClosePopup('block');
  }
}

setFormFieldsetsDisActive(formFieldsets, true);
mainPin.addEventListener('mouseup', activateMap);
map.addEventListener('click', activateCurrentMapPin);
