$(document).ready(function() {

  //ie9 placeholder

  $('input, textarea').placeholder();


  //scroll-top-button

  $('.scroll-top-button').hide();

    $(window).scroll(function() {
      if ($(this).scrollTop() > 600) {
        $('.scroll-top-button').fadeIn();
      } else {
        $('.scroll-top-button').fadeOut();
      }
    });

    $('.scroll-top-button').click(function() {
      $('body,html').animate({
        scrollTop: 0
      }, 100);
      return false;
    });


  //hiding more than 25 tiles and show-more-button

  var firstHiddenTile = 12;
  var showTilesOnClick = 3;

  $('.tiles > li:nth-child(n+' + firstHiddenTile + ')').hide(); //initially hides tiles

  if (firstHiddenTile>$('.tiles li').length) { //initially hides button if there is nothing to show
    $('.show-more-button').css('visibility', 'hidden');
  };

  $('.show-more-button').click(function() { //shows tiles on click
    firstShownTile = firstHiddenTile;
    lastShownTile = firstShownTile + showTilesOnClick - 1;
    $('.tiles > li:nth-of-type(n+' + firstShownTile + '):nth-of-type(-n+' + lastShownTile + ')').fadeIn();
    firstHiddenTile = lastShownTile + 1;
    if (firstHiddenTile>$('.tiles li').length) {
      $('.show-more-button').css('visibility', 'hidden');
    };
  });

  //social-share-buttons

  (function() {
  if (window.pluso)if (typeof window.pluso.start == "function") return;
  if (window.ifpluso==undefined) { window.ifpluso = 1;
    var d = document, s = d.createElement('script'), g = 'getElementsByTagName';
    s.type = 'text/javascript'; s.charset='UTF-8'; s.async = true;
    s.src = ('https:' == window.location.protocol ? 'https' : 'http')  + '://share.pluso.ru/pluso-like.js';
    var h=d[g]('body')[0];
    h.appendChild(s);
  }})();

    //product-page-slider

    $('.slider-thumbnails img').click(function() {
      if($(this).hasClass('active-image')){}
      else{
      $('.slider-image-container img').fadeOut();
      $(this).clone().fadeIn().appendTo($('.slider-image-container'));
      $('.active-image').removeClass('active-image');
      $(this).addClass('active-image');}
    });

    var imagesOnRight = $('.slider-thumbnails img').length - 4;
    var imagesOnLeft = 0;

    $('.one').html(imagesOnRight);

    $('.slider-thumbnails-container').hover(function(){
      if($('.slider-thumbnails img').length > 4) {
        if(imagesOnRight>0) {
          $('.slider-arrow-right').fadeIn('fast');
        }
        if(imagesOnLeft>0) {
          $('.slider-arrow-left').fadeIn('fast');
        }
      }
    },function(){
    $('.slider-arrow-right, .slider-arrow-left').fadeOut('fast');
  });

    var isMoving = false;

    $('.slider-arrow-right').click(function() {
      if(isMoving == true) {}
      else {
        isMoving = true;
        $('.slider-thumbnails').animate({left:'-=106px'},500);
        imagesOnRight -= 1;
        imagesOnLeft += 1;
        $('.slider-arrow-left').fadeIn('fast');
        if(imagesOnRight == 0){
          $('.slider-arrow-right').fadeOut('fast');
        }
        $('.slider-image-container img').fadeOut();
        $('.active-image').next().clone().fadeIn().appendTo($('.slider-image-container'));
        $('.active-image').next().addClass('active-image')
        $('.active-image:first').removeClass('active-image');
      }
      setTimeout(function(){isMoving = false;},500);
    });

    $('.slider-arrow-left').click(function() {
      if(isMoving == true) {}
      else {
        isMoving = true;
        $('.slider-thumbnails').animate({left:'+=106px'},500);
        imagesOnLeft -= 1;
        imagesOnRight += 1;
        $('.slider-arrow-right').fadeIn('fast');
        if(imagesOnLeft == 0){
          $('.slider-arrow-left').fadeOut('fast');
        }
        $('.slider-image-container img').fadeOut();
        $('.active-image').prev().clone().fadeIn().appendTo($('.slider-image-container'));
        $('.active-image').prev().addClass('active-image')
        $('.active-image:last').removeClass('active-image');
      }
      setTimeout(function(){isMoving = false;},500);
    });

    //order-form

    $('.product-order-button').click(function(){
      $('.order-form').fadeIn();
    });

    $(document).mouseup(function (e){
    var container = $('.order-form');

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.fadeOut();
    }


  });

//gallery

  //setting max height to image container
  var maxPhotoHeight = 0;
  $('.photo-gallery__photo-list img').each(function() {
    var photoHeight = $(this).height();
    if (photoHeight > maxPhotoHeight) {
      maxPhotoHeight = photoHeight;
    }
  });
  $('.photo-gallery__photo-list').height(maxPhotoHeight);

  //setting total photos number
  var totalPhotos = $('.photo-gallery__photo-list img').length;
  $('.photo-gallery__total-photos-number').html(totalPhotos);

  //setting current photo number
  var currentPhotoNumber = 1;

  //arrow clicks

  $('.photo-gallery__arrow-right').click(function(){
    if ($('.photo-gallery__photo-list img').is(':animated')) return;
    else {
      $currentPhoto = $('.photo-gallery__current-image');
      $nextPhoto = $('.photo-gallery__current-image').next();
      if ($nextPhoto.length != true) {
        $nextPhoto = $('.photo-gallery__photo-list img:first-child');
      }
      $currentPhoto.fadeOut(600).removeClass('photo-gallery__current-image');
      $nextPhoto.fadeIn(600).addClass('photo-gallery__current-image');
      currentPhotoNumber += 1;
      if (currentPhotoNumber > totalPhotos) {
        currentPhotoNumber = 1;
      }
      $('.photo-gallery__current-photo-number').html(currentPhotoNumber);
    }
  });

  $('.photo-gallery__arrow-left').click(function(){
    if ($('.photo-gallery__photo-list img').is(':animated')) return;
    else {
      $currentPhoto = $('.photo-gallery__current-image');
      $prevPhoto = $('.photo-gallery__current-image').prev();
      if ($prevPhoto.length != true) {
        $prevPhoto = $('.photo-gallery__photo-list img:last-child');
      }
      $currentPhoto.fadeOut(600).removeClass('photo-gallery__current-image');
      $prevPhoto.fadeIn(600).addClass('photo-gallery__current-image');
      currentPhotoNumber -= 1;
      if (currentPhotoNumber == 0) {
        currentPhotoNumber = totalPhotos;
      }
      $('.photo-gallery__current-photo-number').html(currentPhotoNumber);
    }
  });

  //input mask for order-form
  $('.order-form input[type="tel"]').inputmask({
  mask: '+7 (999) 999-99-99',
  showMaskOnHover: false,
  showMaskOnFocus: true
  });

});
