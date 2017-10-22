//定时器
var a = 0;
var b = setInterval(function() {
  console.log(a++);
  if (a > 5) {
    clearInterval(b);
  } else {
    alert('间隔执行')
  }
}, 500);
// 间隔执行


setTimeout(function() {
  alert('延时执行，只执行一次');
}, 2000);
