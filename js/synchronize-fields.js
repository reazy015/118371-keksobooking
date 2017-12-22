'use strict';

window.synchronizeFields = (function () {
  return function (firstElement, secondElement, firstValue, secondValue, syncValues) {
    return function () {
      var currentValue = firstElement.value;
      var currentIndex = firstValue.indexOf(currentValue);

      syncValues(secondElement, secondValue[currentIndex]);
    };
  };
})();
