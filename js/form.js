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

  return {
    formCheck: function () {

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

      function syncTimeInputs() {
        timeoutInput.selectedIndex = timeinInput.selectedIndex;
      }

      function syncRoomNumbersToCapacity() {
        roomCapacity.value = roomNumber.value;
      }

      function toggleErrorInput(input, state) {
        if (state) {
          input.style.boxShadow = '0 0 5px 2px red';
        } else {
          input.style.boxShadow = '';
        }
      }

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

      titleInput.addEventListener('invalid', checkValidity);
      titleInput.addEventListener('input', checkValidity);
      priceInput.addEventListener('invalid', checkValidity);
      priceInput.addEventListener('input', checkValidity);
      timeinInput.addEventListener('input', syncTimeInputs);
      timeoutInput.addEventListener('input', syncTimeInputs);
    }
  };
})();
