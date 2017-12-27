'use strict';

window.photoDownload = (function () {
  var FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];
  var WIDTH_PHOTO = 40;
  var HEIGHT_PHOTO = 44;

  var fieldForAvatar = document.querySelector('#avatar');
  var fieldForPhoto = document.querySelector('#images');
  var avatarPreview = document.querySelector('.notice__preview img');
  var zoneForAvatar = document.querySelector('.notice__photo .drop-zone');
  var photoContainer = document.querySelector('.form__photo-container');
  var zoneForPhoto = photoContainer.querySelector('.drop-zone');
  fieldForAvatar.name = 'avatar';
  fieldForPhoto.name = 'files';

  function readerFiles(file, filePreview) {
    var fileName = file.name.toLowerCase();

    var fileType = FILE_TYPES.some(function (ad) {
      return fileName.endsWith(ad);
    });

    if (fileType) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        filePreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  function onImageDragover(evt) {
    evt.preventDefault();
  }

  function onLoadAvatar(avatar) {
    readerFiles(avatar, avatarPreview);
  }

  function onLoadPhoto(photoItem) {
    var photo = photoItem;
    var photoImg = document.createElement('img');
    photoImg.style.width = WIDTH_PHOTO + 'px';
    photoImg.style.height = HEIGHT_PHOTO + 'px';
    photoContainer.appendChild(photoImg);
    readerFiles(photo, photoImg);
  }

  zoneForAvatar.addEventListener('dragover', onImageDragover);
  zoneForPhoto.addEventListener('dragover', onImageDragover);
  fieldForAvatar.addEventListener('change', function () {
    var avatar = fieldForAvatar.files[0];
    onLoadAvatar(avatar);
  });

  zoneForAvatar.addEventListener('drop', function (evt) {
    evt.preventDefault();
    fieldForAvatar.files = evt.dataTransfer.files;
  });

  fieldForPhoto.addEventListener('change', function () {
    Array.from(fieldForPhoto.files).forEach(function (photoItem) {
      onLoadPhoto(photoItem);
    });
  });

  zoneForPhoto.addEventListener('drop', function (evt) {
    evt.preventDefault();
    fieldForPhoto.files = evt.dataTransfer.files;
  });

  return {
    avatarPreview: avatarPreview,
    photoContainer: photoContainer
  };
})();
