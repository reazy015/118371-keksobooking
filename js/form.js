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
    var inputValidityMeassage = input.validity.valueMissing ? 'Обязательное поле для заполнения' : '';

    input.setCustomValidity(inputValidityMeassage);
  }

  function toggleErrorInput(input, state) {
    input.style.boxShadow = state ? '0 0 5px 2px red' : '';
  }

  function setMinimumPrice(element, value) {
    element.min = value;
  }

  function successFormSend() {
    messagePopup('Данные успешно отправлены');
    form.reset();
    window.photoDownload.avatarPreview.src = 'img/muffin.png';
    window.photoDownload.photoContainer.querySelectorAll('img').forEach(function (image) {
      image.remove();
    });
  }

  function checkValidity(evt) {
    checkCommonValidity(evt);
    var input = evt.target;

    if (input.type === 'number') {
      var rangeUnderflowErrorMessage = input.validity.rangeUnderflow ? 'Значение должно быть не менее ' + input.min : '';
      var rangeOverflowErrorMessage = input.validity.rangeOverflow ? 'Значение должно быть не более ' + input.max : '';

      if (input.validity.rangeUnderflow) {
        input.setCustomValidity(rangeUnderflowErrorMessage);
        input.value = input.min;
      } else if (input.validity.rangeOverflow) {
        input.setCustomValidity(rangeOverflowErrorMessage);
        input.value = input.max;
      }
    }

    if (input.type === 'text') {
      var tooShortErrorMessage = input.validity.tooShort ? 'Поле должно быть не менее ' + input.minLength + ' символов' : '';
      var tooLongErrorMessage = input.validity.tooLong ? 'Поле должео быть не более ' + input.maxLength + ' символов' : '';

      if (input.validity.tooShort) {
        input.setCustomValidity(tooShortErrorMessage);
      } else if (input.validity.tooLong) {
        input.setCustomValidity(tooLongErrorMessage);
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
        } else if (formInputs[i].name === 'address' && formInputs[i].value !== null) {
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
