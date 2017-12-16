window.backend  = (function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';

  function createXHRRequest(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос привысле время ожидания')
    });

    xhr.timeout = 5000;
    return xhr;
  }

  return {
    load: function (onLoad, onError) {
      var xhr = createXHRRequest(onLoad, onError);
      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },

    save: function(data, onLoad, onError) {
      var xhr = createXHRRequest(onLoad, onError);
      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    }
  };

})();
