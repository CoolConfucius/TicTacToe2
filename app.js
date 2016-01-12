'use strict'; 
$(document).ready(init); 

var xo = false; 
var state = 'pregame'; 
var $display; 
var $timer; 
var $timer2;
var secx; 
var seco; 
var myTimer; 
var $reset; 
var $play; 
var $name, $name2; 
var name = '';
var name2 = ''; 

function init() {
  $reset = $('#reset'); 
  $timer = $('#timer'); 
  $timer2 = $('#timer2'); 
  $play = $('#play');
  $display = $('#display');
  $name = $('#name');
  $name2 = $('#name2');
  $('#play').click(playClick); 
  $('#home').on('click', '.tile',(tileClick)); 
  $('#reset').click(resetClick);
};

function tileClick(event){
  console.log(state);
  if (state === 'game') {
    var $this = $(this);
    if (state!=='gameover' && $this.text() === '') {
      var mark = '';
      if (xo) {
        mark = '\u2665';
        xo = false; 
        console.log(name);
        $display.text(name + " \u2660's turn");        
      } else {
        mark = '\u2660';
        xo = true; 
        console.log(name2);
        $display.text(name2 + " \u2665's turn");
      }
      $this.text(mark);     
      if (win(mark)) {
        $reset.text("Play again");
        state = 'gameover';
        $display = $('#display');
        var winner;
        if (xo) { winner = name;} else {winner = name2;};
        var message = winner + " " + mark + " wins!"
        $display.text(message); 
        window.clearTimeout(myTimer);
        $('#home').off();
      };
    };
    
  };
};

function playClick(event){
  name = $name.val();
  name2 = $name2.val();
  state = "game";
  secx = 60; 
  seco = 60; 
  myTimer = window.setInterval(function(){
    if (state === 'game') {
      if (xo) {
        if (seco > 0) {
          seco--;     
          $timer.text(seco);        
        } else {
          $display.text("Time is up! "+name2+" \u2665 loses!")
          window.clearTimeout(myTimer);
          $('#home').off();
        }
        
      } else {
        if (secx > 0) {
          secx--;     
          $timer2.text(secx);              
        } else {
          $display.text("Time is up! "+name+" \u2660 loses!")
          window.clearTimeout(myTimer);
          $('#home').off();
        }
      }
      
    };

  }, 200);
  xo = false; 
  state = 'game';
  $display.text(name + " \u2660's turn");
  $('#play').off(); 
}

function resetClick(event){
  window.clearTimeout(myTimer);
  var clear = ""; 
  $('#t0').text(clear); 
  $('#t1').text(clear); 
  $('#t2').text(clear); 
  $('#t3').text(clear); 
  $('#t4').text(clear); 
  $('#t5').text(clear); 
  $('#t6').text(clear); 
  $('#t7').text(clear); 
  $('#t8').text(clear); 
  $('#home').on('click', '.tile',(tileClick)); 
  xo = false; 
  $display.text('Hit Play');
  $play.click(playClick); 
  $timer.text('60');
  $timer2.text('60');
  $reset.text('');
  state = "pregame";
  name = '';
  name2 = '';
  $name.text('');
  $name2.text('');
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

