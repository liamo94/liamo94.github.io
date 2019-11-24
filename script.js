console.log(`Liam O'Donnell`);


// document.getElementById ("myButton").addEventListener ("click", myFunction, false);

function myFunction() {
  alert("Hello! I am an alert box!!");
}


var LoadImage = (() => {

  var showImage = function () {
    console.log('called again');
    var images = document.querySelectorAll('img[data-src]');
    console.log(images);
    images.forEach(img => {
      img.setAttribute('src', img.getAttribute('data-src'));
      img.onload = function () {
        img.removeAttribute('data-src');
      };
    });
  };

  return {
    showImage: showImage
  }
})();

var checkImageLoc = function () {
  if (document.querySelectorAll('img')[0].getBoundingClientRect().y < screen.height) {
    // console.log(document.querySelectorAll('img')[0].getBoundingClientRect().y);
    console.log('he div is there');
    LoadImage.showImage();
    document.removeEventListener('scroll', checkImageLoc, true);
  }
};

function init() {
  console.log('called');
  // document.addEventListener('scroll', checkImageLoc, true);
  LoadImage.showImage();
};

LoadImage.showImage();

