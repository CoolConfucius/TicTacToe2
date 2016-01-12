$(document).ready(init); 

var xo = false; 
var gameover = false; 
var $display; 
var $timer; 
var secs; 

function init() {
  // $display = $('#display');
  $('#play').click(playClick); 
  $('#home').on('click', '.tile',(tileClick)); 
};

function tileClick(event){
  $display = $('#display');
  event.stopPropagation();
  event.preventDefault(); 
  console.log($display);
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
    };
  };
};

function playClick(event){
  $display = $('#display');
  $timer = $('#timer'); 
  secs = 0; 
  secx = 0; 
  seco = 0; 
  var myTimer = window.setInterval(function(){
    // console.log('hello?');
    // secs++;     
    // $timer.text(secs);
    if (xo) {
      seco++;     
      $timer.text(seco);
      if (seco >= 60) {
        alert("Time is up! \u2665 loses!");
      };
    } else {
      secx++;     
      $timer.text(secx);      
      if (seco >= 60) {
        alert("Time is up! \u2665 loses!");
      };
    }

  }, 200);
  var status = ""; 
  $('#t0').text(status); 
  $('#t1').text(status); 
  $('#t2').text(status); 
  $('#t3').text(status); 
  $('#t4').text(status); 
  $('#t5').text(status); 
  $('#t6').text(status); 
  $('#t7').text(status); 
  $('#t8').text(status); 
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
