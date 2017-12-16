window.showCard = (function(){
  var map = document.querySelector('.map');
  function openPopup(post) {
    return function (evt) {
      if (map.querySelector('.popup') !== null) {
        var currentPopup = map.querySelector('.popup');
        map.removeChild(currentPopup);
      }
      window.card.renderMapPopup(post);
      window.utils.activateCurrentMapPin(evt);
      document.addEventListener('keydown', window.card.closePopup);
    };
  }

  return openPopup;
})();
