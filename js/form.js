'use strict';

window.formValidation = (function () {
  var form = document.querySelector('.notice__form');
  var formInputs = form.querySelectorAll('input');
  var titleInput = form.querySelector('#title');
  var priceInput = form.querySelector('#price');
  var timeinInput = form.querySelector('#timein');
  var timeoutInput = form.querySelector('#timeout');
  var houseType = form.querySelector('#type');
  var roomNumber = form.querySelector('#room_number');
  var roomCapacity = form.querySelector('#capacity');
  var ROOMS = ['1', '2', '3', '100'];
  var GUESTS = ['1', '2', '3', '0'];
  var MIN_PRICE = [0, 1000, 5000, 10000];
  var TIMES = ['12:00', '13:00', '14:00'];
  var TYPES = ['bungalo', 'flat', 'house', 'palace'];

  function checkCommonValidity(evt) {
    var input = evt.target;

    if (input.validity.valueMissing) {
      input.setCustomValidity('Обязательное поле для заполнения');
    } else {
      input.setCustomValidity('');
    }
  }

  function toggleErrorInput(input, state) {
    if (state) {
      input.style.boxShadow = '0 0 5px 2px red';
    } else {
      input.style.boxShadow = '';
    }
  }

  function setMinimumPrice(element, value) {
    element.min = value;
  }

  function successFormSend() {
    messagePopup('Данные успешно отправлены');
    form.reset();
  }

  function checkValidity(evt) {
    checkCommonValidity(evt);
    var input = evt.target;
    if (input.type === 'number') {
      if (input.validity.rangeUnderflow) {
        input.setCustomValidity('Значение должно быть не менее ' + input.min);
        input.value = input.min;
      } else if (input.validity.rangeOverflow) {
        input.setCustomValidity('Значение должно быть не более ' + input.max);
        input.value = input.max;
      }
    }

    if (input.type === 'text') {
      if (input.validity.tooShort) {
        input.setCustomValidity('Поле должно быть не менее ' + input.minLength + ' символов');
      } else if (input.validity.tooLong) {
        input.setCustomValidity('Поле должео быть не более ' + input.maxLength + ' символов');
      }
    }
  }

  function messagePopup(msg) {
    var popup = document.createElement('div');
    popup.classList.add('user-pop');
    popup.textContent = msg;
    document.body.insertAdjacentElement('afterbegin', popup);

    document.addEventListener('click', removePopup);
  }

  function removePopup() {
    var popup = document.querySelector('.user-pop');
    if (popup) {
      document.body.removeChild(popup);
      document.removeEventListener('click', removePopup);
    }
  }

  function syncValues(element, value) {
    element.value = value;
  }

  function checkForm() {
    window.synchronizeFields(roomCapacity, roomNumber, ROOMS, GUESTS, syncValues)();
    window.synchronizeFields(roomNumber, roomCapacity, ROOMS, GUESTS, syncValues)();

    timeinInput.addEventListener('change', window.synchronizeFields(timeinInput, timeoutInput, TIMES, TIMES, syncValues));
    timeoutInput.addEventListener('change', window.synchronizeFields(timeoutInput, timeinInput, TIMES, TIMES, syncValues));
    roomNumber.addEventListener('change', window.synchronizeFields(roomNumber, roomCapacity, ROOMS, GUESTS, syncValues));
    roomCapacity.addEventListener('change', window.synchronizeFields(roomCapacity, roomNumber, ROOMS, GUESTS, syncValues));
    houseType.addEventListener('change', window.synchronizeFields(houseType, priceInput, TYPES, MIN_PRICE, syncValues));
    houseType.addEventListener('change', window.synchronizeFields(houseType, priceInput, TYPES, MIN_PRICE, setMinimumPrice));

    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      for (var i = 0; i < formInputs.length; i++) {
        if (formInputs[i].name === 'address' && formInputs[i].value === '') {
          toggleErrorInput(formInputs[i], true);
        } else if (formInputs[i].name === 'address' && formInputs[i].value === '') {
          window.backend.save(new FormData(form), successFormSend, messagePopup);
          toggleErrorInput(formInputs[i], false);
        }
      }
    });

    titleInput.addEventListener('invalid', checkValidity);
    titleInput.addEventListener('input', checkValidity);
    priceInput.addEventListener('invalid', checkValidity);
    priceInput.addEventListener('input', checkValidity);
  }

  checkForm();

})();
