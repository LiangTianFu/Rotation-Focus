var loopPlayerInit = (function() {

  var $btnLeft = null;
  var $btnRight = null;
  var $btnPlay = null;
  var $imglist = null;
  origin = ['125px', '500px'],
    imgOrigin = ['125px', '800px'],
    imgAll = createImg([
      ['images/pic1.jpg', 'images/pic2.jpg', 'images/pic3.jpg', 'images/pic4.jpg'],
      ['images/pic5.jpg', 'images/pic6.jpg', 'images/pic7.jpg', 'images/pic8.jpg'],
      ['images/pic9.jpg', 'images/pic10.jpg', 'images/pic11.jpg', 'images/pic12.jpg'],
      ['images/pic13.jpg', 'images/pic14.jpg', 'images/pic15.jpg', 'images/pic16.jpg'],
      ['images/pic17.jpg', 'images/pic18.jpg', 'images/pic19.jpg', 'images/pic20.jpg'],
      ['images/pic21.jpg', 'images/pic22.jpg', 'images/pic23.jpg', 'images/pic24.jpg']
    ]),
    imgArrIndex = 0,
    imgAng = 45,
    imgTime = 300,
    rotating = false,
    autoTimer = null,
    autointerval = 3000;

  function init() {
    $btnLeft = $('.btn_left'),
      $btnRight = $('.btn_right'),
      $btnPlay = $('.btn_play'),
      $imglist = $('.mainBox ul li');

    configer();
    setEvent();
  }

  function configer() {
    var ang = 5,
      aint = -5;
    $imglist.transform({
      origin: origin
    })
    $imglist.each(function(i) {
      var $this = $(this);
      $this.transform({
        rotate: aint + (i * ang) + 'deg'
      });
    })
  }

  function setEvent() {
    $btnLeft.bind('click', function() {
      anigo(-1);
      // alert(imgAll[0][0]);
      return false;
    })
    $btnRight.bind('click', function() {
      anigo(1);
      return false;
    })
    $btnPlay.bind('click', function() {
      var play = 'play',
        pause = 'pause',
        $btn = $(this);
      if ($btn.text() == 'play') {
        $btn.text(pause);
        autoGo();
      } else {
        $btn.text(play);
        autoStop();
      }
      return false;
    })
  }

  function createImg(arr) {
    var imgArr = [];
    for (var i in arr) {
      imgArr[i] = [];
      for (var x in arr[i]) {
        imgArr[i][x] = new Image();
        imgArr[i][x].src = arr[i][x];
      }
    }

    return imgArr;
  }

  function anigo(d) {
    //当正在做动画，再点击时不会动，直到当前动画结束才进行下一个动画
    if (rotating) return false;
    rotating = true;

    imgArrIndex += d;
    //当图片索引值大于图片个数减1时，让索引值变为0，即又从头开始
    if (imgArrIndex > imgAll.length - 1) {
      imgArrIndex = 0;
    } else if (imgArrIndex < 0) {
      imgArrIndex = imgAll.length - 1;
    }

    //遍历存放图片的父盒子li
    $imglist.each(function(i) {
      var $thisItem = $(this);
      var $thisImg = $thisItem.children('img'); //当前下面所有的图片
      var $targetImg = $(imgAll[imgArrIndex][i]); //从图片数组中拿到图片并转为jq对象
      //判断点击是右箭头还是左箭头，并分别设置其旋转间隔，如点击右箭头则左面第一张时间最短，点击左箭头则右侧第一张时间最短
      var thisTime = (d === 1) ? imgTime * i : imgTime * ($imglist.length - 1 - i);
      $thisItem.append($targetImg); //把下一组的图片放入li中
      $thisImg.transform({
        origin: imgOrigin
      }); //当前图片设置圆心点
      //点击按钮时设置图片从左面或右面转出来，如点击右键，则图片旋转为正角45度，所以一开始图片要在负45度存放
      $targetImg.transform({
        origin: imgOrigin,
        rotate: (0 - d) * imgAng + 'deg'
      });
      //设置每个图片延时旋转

      // $thisimg.animate({
      //   rotate: imgAng * d + 'deg'
      // });
      // $targetImg.animate({
      //   rotate: '0deg'
      // });

      setTimeout(function() {
        $thisImg.animate({
          rotate: imgAng * d + 'deg'
        });
        $targetImg.animate({
          rotate: '0deg'
        }, 500, function() {
          $thisImg.remove();
          if (thisTime == ($imglist.length - 1) * imgTime) {
            rotating = false;
          }

        });
      }, thisTime);

    })
  }

  function autoGo() {
    clearInterval(autoTimer);
    anigo(1);
    autoTimer = setInterval(function() {
      anigo(1);
    }, autointerval);
  }

  function autoStop() {
    clearInterval(autoTimer);
  }

  return init;
})();
loopPlayerInit();
