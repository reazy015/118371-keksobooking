'use strict';

window.formValidation = (function () {
  var form = document.querySelector('.notice__form');
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

  function formCheck() {

    function checkValidity(evt) {
      commonValidity(evt);
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

    function commonValidity(evt) {
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

    timeinInput.addEventListener('change', window.synchronizeFields(timeinInput, timeoutInput, TIMES, TIMES, utils.syncValues));
    timeoutInput.addEventListener('change', window.synchronizeFields(timeoutInput, timeinInput, TIMES, TIMES, utils.syncValues));
    roomNumber.addEventListener('change', window.synchronizeFields(roomNumber, roomCapacity, ROOMS, GUESTS, utils.syncValues));
    roomCapacity.addEventListener('change', window.synchronizeFields(roomCapacity, roomNumber, ROOMS, GUESTS, utils.syncValues));
    houseType.addEventListener('change', window.synchronizeFields(houseType, priceInput, TYPES, MIN_PRICE, utils.syncValues));

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

    titleInput.addEventListener('invalid', checkValidity);
    titleInput.addEventListener('input', checkValidity);
    priceInput.addEventListener('invalid', checkValidity);
    priceInput.addEventListener('input', checkValidity);
  }

  return formCheck;
})();
