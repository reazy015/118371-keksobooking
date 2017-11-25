'use strict';

var initialData = [
  {
    "author": {
      "avatar": "img/avatars/user01.png"
    },

    "offer": {
      "title": "Большая уютная квартира",
      "address": "{{location.x}}, {{location.y}}",
      "price": Math.floor(Math.random() * (100000 - 100)) + 100,
      "type": "flat",
      "rooms": Math.floor(Math.random() * (5 - 1)) + 1,
      "guests": Math.random(),
      "checkin": "12:00",
      "checkout": "14:00",
      "features": ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"],
      "description": "",
      "photos": []
    },

    "location": {
      "x": Math.floor(Math.random() * (900 - 300)) + 300,
      "y": Math.floor(Math.random() * (500 - 100)) + 100
    }

  },
  {
    "author": {
      "avatar": "img/avatars/user02.png"
    },

    "offer": {
      "title": "Маленькая неуютная квартира",
      "address": "{{location.x}}, {{location.y}}",
      "price": Math.floor(Math.random() * (100000 - 100)) + 100,
      "type": "flat",
      "rooms": Math.floor(Math.random() * (5 - 1)) + 1,
      "guests": Math.random(),
      "checkin": "12:00",
      "checkout": "14:00",
      "features": ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"],
      "description": "",
      "photos": []
    },

    "location": {
      "x": Math.floor(Math.random() * (900 - 300)) + 300,
      "y": Math.floor(Math.random() * (500 - 100)) + 100
    }
  },
  {
    "author": {
      "avatar": "img/avatars/user03.png"
    },

    "offer": {
      "title": "Огромный прекрасный дворец",
      "address": "{{location.x}}, {{location.y}}",
      "price": Math.floor(Math.random() * (100000 - 100)) + 100,
      "type": "flat",
      "rooms": Math.floor(Math.random() * (5 - 1)) + 1,
      "guests": Math.random(),
      "checkin": "12:00",
      "checkout": "14:00",
      "features": ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"],
      "description": "",
      "photos": []
    },

    "location": {
      "x": Math.floor(Math.random() * (900 - 300)) + 300,
      "y": Math.floor(Math.random() * (500 - 100)) + 100
    }
  },
  {
    "author": {
      "avatar": "img/avatars/user04.png"
    },

    "offer": {
      "title": "Маленький ужасный дворец",
      "address": "{{location.x}}, {{location.y}}",
      "price": Math.floor(Math.random() * (100000 - 100)) + 100,
      "type": "flat",
      "rooms": Math.floor(Math.random() * (5 - 1)) + 1,
      "guests": Math.random(),
      "checkin": "12:00",
      "checkout": "14:00",
      "features": ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"],
      "description": "",
      "photos": []
    },

    "location": {
      "x": Math.floor(Math.random() * (900 - 300)) + 300,
      "y": Math.floor(Math.random() * (500 - 100)) + 100
    }
  },
  {
    "author": {
      "avatar": "img/avatars/user05.png"
    },

    "offer": {
      "title": "Красивый гостевой домик",
      "address": "{{location.x}}, {{location.y}}",
      "price": Math.floor(Math.random() * (100000 - 100)) + 100,
      "type": "flat",
      "rooms": Math.floor(Math.random() * (5 - 1)) + 1,
      "guests": Math.random(),
      "checkin": "12:00",
      "checkout": "14:00",
      "features": ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"],
      "description": "",
      "photos": []
    },

    "location": {
      "x": Math.floor(Math.random() * (900 - 300)) + 300,
      "y": Math.floor(Math.random() * (500 - 100)) + 100
    }
  },
  {
    "author": {
      "avatar": "img/avatars/user06.png"
    },

    "offer": {
      "title": "Некрасивый негостеприимный домик",
      "address": "{{location.x}}, {{location.y}}",
      "price": Math.floor(Math.random() * (100000 - 100)) + 100,
      "type": "flat",
      "rooms": Math.floor(Math.random() * (5 - 1)) + 1,
      "guests": Math.random(),
      "checkin": "12:00",
      "checkout": "14:00",
      "features": ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"],
      "description": "",
      "photos": []
    },

    "location": {
      "x": Math.floor(Math.random() * (900 - 300)) + 300,
      "y": Math.floor(Math.random() * (500 - 100)) + 100
    }
  },
  {
    "author": {
      "avatar": "img/avatars/user07.png"
    },

    "offer": {
      "title": "Уютное бунгало далеко от моря",
      "address": "{{location.x}}, {{location.y}}",
      "price": Math.floor(Math.random() * (100000 - 100)) + 100,
      "type": "flat",
      "rooms": Math.floor(Math.random() * (5 - 1)) + 1,
      "guests": Math.random(),
      "checkin": "12:00",
      "checkout": "14:00",
      "features": ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"],
      "description": "",
      "photos": []
    },

    "location": {
      "x": Math.floor(Math.random() * (900 - 300)) + 300,
      "y": Math.floor(Math.random() * (500 - 100)) + 100
    }
  },
  {
    "author": {
      "avatar": "img/avatars/user08.png"
    },

    "offer": {
      "title": "Неуютное бунгало по колено в воде",
      "address": "{{location.x}}, {{location.y}}",
      "price": Math.floor(Math.random() * (100000 - 100)) + 100,
      "type": "flat",
      "rooms": Math.floor(Math.random() * (5 - 1)) + 1,
      "guests": Math.random(),
      "checkin": "12:00",
      "checkout": "14:00",
      "features": ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"],
      "description": "",
      "photos": []
    },

    "location": {
      "x": Math.floor(Math.random() * (900 - 300)) + 300,
      "y": Math.floor(Math.random() * (500 - 100)) + 100
    }
  }
]

var cardTemplate = document.querySelector('.card-template');
var btnTemplate = cardTemplate.content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

function createBtns(template, data){
  var fragment = document.createDocumentFragment();

  data.forEach(function(x){
    var templateClone = template.cloneNode(true);

    templateClone.style.left = x.location.x + 'px';
    templateClone.style.top = x.location.y + 'px';
    templateClone.querySelector('img').src = x.author.avatar;

    fragment.appendChild(templateClone);
  });

  return fragment;
}

function drawMapPins(mapPins){
  mapPins.appendChild(createBtns(btnTemplate, initialData));
}

drawMapPins(mapPins);
