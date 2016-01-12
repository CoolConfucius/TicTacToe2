'use strict'; 
$(document).ready(init); 

var xo = false; 
var gameover = false; 
var $display; 
var $timer; 
var $timer2;
var secx; 
var seco; 
var myTimer; 

function init() {
  $('#play').click(playClick); 
  $('#home').on('click', '.tile',(tileClick)); 
};

function tileClick(event){
  $display = $('#display');
  event.stopPropagation();
  event.preventDefault(); 
  var $this = $(this);
  if (!gameover && $this.text() === '') {
    var mark = '';
    if (xo) {
      mark = '\u2665';
      xo = false; 
      $display.text("\u2660's turn");
    } else {
      mark = '\u2660';
      xo = true; 
      $display.text("\u2665's turn");
    }
    $this.text(mark);     
    if (win(mark)) {
      gameover = true; 
      var $display = $('#display');
      var message = "Player " + mark + " wins!"
      $display.text(message); 
      window.clearTimeout(myTimer);
    };
  };
};

function playClick(event){
  $display = $('#display');
  $timer = $('#timer'); 
  $timer2 = $('#timer2'); 
  secx = 60; 
  seco = 60; 
  myTimer = window.setInterval(function(){
    if (xo) {
      if (seco > 0) {
        seco--;     
        $timer.text(seco);        
      } else {
        alert("Time is up! \u2665 loses!");
        $display.text("Time is up! \u2665 loses!")
        window.clearTimeout(myTimer);
      }
      
    } else {
      if (secx > 0) {
        secx--;     
        $timer2.text(secx);              
      } else {
        alert("Time is up! \u2660 loses!");
        $display.text("Time is up! \u2660 loses!")
        window.clearTimeout(myTimer);
      }
    }

  }, 200);
  xo = false; 
  gameover = false; 
  $display.text("\u2660's turn");
}


var win = function(xo) {
  var $t0 = $('#t0'); 
  var $t1 = $('#t1'); 
  var $t2 = $('#t2'); 
  var $t3 = $('#t3'); 
  var $t4 = $('#t4'); 
  var $t5 = $('#t5'); 
  var $t6 = $('#t6'); 
  var $t7 = $('#t7'); 
  var $t8 = $('#t8'); 
  return(
    check($t0, $t1, $t2, xo) || 
    check($t3, $t4, $t5, xo) || 
    check($t6, $t7, $t8, xo) || 
    check($t0, $t3, $t6, xo) || 
    check($t1, $t4, $t7, xo) || 
    check($t2, $t5, $t8, xo) || 
    check($t0, $t4, $t8, xo) || 
    check($t2, $t4, $t6, xo) 
    );
};

var check = function(t, t1, t2, xo){
  return (t.text()===xo && t1.text()===xo && t2.text()===xo);
};
