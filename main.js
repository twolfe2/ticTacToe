$(document).ready(init);


//0 represent empty square
//1 represents O
//2 represents X
function init() {
  
  // var turn = Math.floor(Math.random()*2);
  // turn%2 === 0 ? $('#turn').text("X's turn") : $('#turn').text("O's turn");
  var count;
  var turn;
  var gameBoard = [[0,0,0],[0,0,0],[0,0,0]];
  console.log(gameBoard);
  //newGame();
  
  //$('#newGame').on('click',newGame);
  $('#startGame').on('click', newGame);

  var name1 = "";
  var name2 = "";
  //p1=x
  var p1R = [0,0,0];
  var p1C = [0,0,0];
  var p1D = [0,0];

  var p2R = [0,0,0];
  var p2C = [0,0,0];
  var p2D = [0,0];

  


  function makeMove(event) {
    //console.log(event);
    //console.log(event.target.classList[0]);
    var player = turn%2;
    if(player === 0) {
      $(this).append("<span>X</span>");
      $(this).children('span').addClass("animated zoomIn");
      //$(this).text("X");
      //$(event.target).addClass("animated zoomIn");
      

    } else {
      $(this).append("<span>O</span>");
      $(this).children('span').addClass("animated zoomIn");

    }
    //player === 0 ? $(this).text("X").addClass("animated zoomIn") : .addClass("animated zoomIn");
    //make it so this square can NOT be clicked again
    $(this).off("click");
    count++;
    

    var row = parseInt(event.target.classList[0]);
    if(player === 0){
      p1R[row]++;
      p1C[event.target.id%3]++;

      if(row === 1 && event.target.id%3 === 1)
      {
        p1D[0]++;
        p1D[1]++;

      }else if(row === event.target.id%3) { 
        p1D[0]++; 
      } else if((row===0 && event.target.id%3 === 2) || (row===2 && event.target.id%3 === 0)){
        p1D[1]++;
      }
      
      //fix diagnal logic 

      console.log(p1D);
    } else {
      p2R[row]++;
      p2C[event.target.id%3]++;
      if(row === 1 && event.target.id%3 === 1)
      {
        p2D[0]++;
        p2D[1]++;

      }else if(row === event.target.id%3) { 
        p2D[0]++; 
      } else if((row===0 && event.target.id%3 === 2) || (row===2 && event.target.id%3 === 0)){
        p2D[1]++;
      }
    }
    console.log(p2D);
    if(isWinner(player)){
      alert(`${player ? name2 : name1} wins`);
      newGame();
    } else if (isOver()) {
      alert('Cats game, no one wins');
      newGame();
    }
    turn++;
    turn%2 === 0 ? $('#turn').text(`It is ${name1}'s turn`) : $('#turn').text(`It is ${name2}'s turn`);

  }

  //check to see if there is a winner or cats game
  function checkStatus() {
    if(gameBoard[0][0] && gameBoard[0][0] === gameBoard[0][1] === gameBoard[0][2]) {
      return true
    }

  }

  function isWinner(player) {
    //console.log(player);
    if(player === 0) {
      var row = p1R.some(elem => elem === 3);
      var col = p1C.some(elem => elem === 3);
      var diag =p1D.some(elem => elem === 3);
      return row || col || diag;
    } else {
      var row = p2R.some(elem => elem === 3);
      var col = p2C.some(elem => elem === 3);
      var diag =p2D.some(elem => elem === 3);
      return row || col || diag;
    }



  }

  function newGame() {
    $('.square').empty();
    $('.square').off('click');
    $('.square').removeClass('zoomIn');
    
    name1 = $('#name1').val();
    name2 = $('#name2').val();

    $('#name1').val('');
    $('#name2').val('');
    //$('#name1').val();
    //console.log(name2);
    //re enable clicking on all elements
    $('.square').on('click',makeMove);
    count=0;
    turn = Math.floor(Math.random()*2);
    turn%2 === 0 ? $('#turn').text(`It is ${name1}'s turn`) : $('#turn').text(`It is ${name2}'s turn`);
    gameBoard = [[0,0,0],[0,0,0],[0,0,0]];

    p1R = [0,0,0];
    p1C = [0,0,0];
    p1D = [0,0];

    p2R = [0,0,0];
    p2C = [0,0,0];
    p2D = [0,0];

    
  }


  function isOver() {
    return count > 8;
  }





}