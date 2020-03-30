// var test = (function (){
//     // var popupwin = window.open('http://www.google.com','anyname','width=10,height=1,left=5,top=3');
//     // setTimeout(function() { popupwin.close();}, 5000);
//     alert("salutttttt");
// })


// var popupwin = window.open('http://www.google.com','anyname','width=10,height=1,left=5,top=3');
// setTimeout(function() { popupwin.close();}, 5000);


var open = document.getElementById('open');
var close = document.getElementById('close');



function test() {
    var all = document.getElementById('all');
    var popupEl = document.getElementById('popup');

    // As a native plugin
    var popup = new Popup(popupEl, {
        width: 400,
        height: 300
    });

    // As a jQuery plugin
    // var popup = $('#popup').popup({
    //     width: 400,
    //     height: 300
    // });


    popup.open();
    all.style.transition = "1s -webkit-filter linear";
    all.style.filter = "blur(5px)";
    //popupEl.style.filter = "blur(0)";
    setTimeout(function() { popup.close(); all.style.filter = "blur(0)";}, 5000);
    //all.style.filter =  "blur(0)";
}


