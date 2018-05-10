// ios 10 解决缩放问题
window.onload=function () { 
  // document.addEventListener('touchstart',function (event) {  
  //   if(event.touches.length>1){
  //     event.preventDefault() 
  //   }
  // }, { passive: false })
  document.addEventListener('touchmove', function (event) {
    console.log('touchmove scale', event)
    if (event.scale) {
      if (event.scale !== 1) { event.preventDefault(); }
    }
  }, { passive: false });
  var lastTouchEnd=0;  
  document.addEventListener('touchend',function (event) {
      var now=(new Date()).getTime()
      if(now-lastTouchEnd<=300){
        event.preventDefault()  
      }  
      lastTouchEnd=now
  }, { passive: false });
}  

// var phoneWidth =  parseInt(window.screen.width);  
// var phoneScale = phoneWidth/640;  
// var ua = navigator.userAgent;  
// if (/Android (\d+\.\d+)/.test(ua)){  
//     var version = parseFloat(RegExp.$1);  
//     if(version>2.3){  
//         document.write('<meta name="viewport" content="width=640, minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+', target-densitydpi=device-dpi">');  
//     }else{  
//         document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');  
//     }  
// } else {  
//     document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');  
// }