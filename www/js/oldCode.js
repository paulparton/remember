


game.buttonPressed = function(element){

//If this has not been run from a valid game button, return an error
if(!this.id || !this.colorOff || !this.colorOn || !this.element){
    return false;
}

//If it is the players turn
if(game.playersTurn === true){

    game.checkPlayersTurn();

}

};
var game = (function(){

    //Public API
    var gameModule = {
      startGame: startGame,
      events: {
        touchStart:touchStart,
        touchEnd:touchEnd,
        //userTurn:userTurn
      }
    };

    return gameModule;

    //Private methods

    /**
    *
    * startGame - Start a new game
    * startLevel - Start a new level
    * endLevel - Complete a level
    * nextTurn - Play the next sequence
    * userTurn - Process a users input
    * gameOver - End a game
    *
    **/


    //Start a new game
    function startGame(gameBoard, gameLevel){


      function newRandomItem(){

        var min = 1,
          max = 4;

        return Math.floor(Math.random() * (max - min + 1)) + min;

      }

      //Draw the game
      gameBoard.appendChild(drawL(levels[0]));

      //Create an empty sequence and generate the first move
      var sequence = [],
      sequenceCopy;

      sequence.push(newRandomItem());

      //Run the first move
      startComputerTurn(sequence);

        //Which triggers the 'listen to user move' until the move ends

        //Which trigger game over or computerMove


        var score = 0,
        i;

      //Process a users turn
      function userTurn(source){

        //Has the user pressed the correct button?

        //Has the user completed the required sequence

      }

      function startComputerTurn(){

        sequenceCopy = sequence;
        console.log('starting computer turn: ', sequenceCopy);

        runSequence(sequenceCopy.shift());

      }

      function runSequence(item){

        if(item){

          console.log("running sequence item ", item);

          item = item - 1;

          var currentButtons = gameBoard.getElementsByClassName('game-button');

          //console.log(currentButtons);

          var tempEl = currentButtons[item];

          touchStart(tempEl, levels[0].buttons[item].colors[0], levels[0].buttons[item].colors[1]);

          setTimeout(function(){

            console.log('release item ', item);
            touchEnd(tempEl, levels[0].buttons[item].colors[1], levels[0].buttons[item].colors[0]);

            setTimeout(function(){
              return runSequence(sequenceCopy.shift());
            },500);

          },1000);

        }else{

          console.log('start the users turn');
          startUserTurn();

        }

      }

      //load the "gameLevel" template into the gameBoard

      //using information declared in the gameLevel template configure and start the game

    }



    function startUserTurn(){

      var currentMove = 0;

      //listenToInput(function(value){
        //var currentButtons = gameBoard.getElementsByClassName('game-button');
        //var i;

        //for (i=0; i<currentButtons.length; i+=1){

          levels[0].buttons.forEach(function(button){

            function buttonPress(el){

              var target = el.targetTouches[0].target;
              touchStart(target, button.colors[0], button.colors[1]);

            }

            function buttonRelease(el){
              console.log(el);
              var target = el.targetTouches[0].target;
              touchEnd(target,button.colors[1], button.colors[0]);
            }

            button.element.addEventListener('touchstart', buttonPress);
            button.element.addEventListener('touchend', buttonRelease);

          });


        //}

        alert('It is the users turn');

        //If the player answers incorrectly the game is over
        //if(value !== sequence[currentMove]){

          //gameOver();

        //}

        //If the player has correctly answered the last item in the sequence
        //if(value === sequence[currentMove] && sequence.length === currentMove){

          //startComputerTurn(sequence);

        //}



      //});

    }

    function gameOver(){

        alert("Game Over!");

    }

    function turnSuccess(){

    }

    function turnFail(){

    }
    function touchStart(el, boxColor, bgColor){

      console.log("touchStart " + el);

      el.style.boxShadow = "inset 0px 0px 10px 2px " + boxColor;
      el.style.backgroundColor = bgColor;
      console.log("touch start");

    }

    function touchEnd(el, boxColor, bgColor){
      console.log("touchEnd " + el);
      el.style.boxShadow = "inset 0px 30px 50px -20px " + boxColor;
      el.style.backgroundColor = bgColor;
      console.log("touch end");
    }

    function drawL(l){

        if(!l.buttons.forEach){
          alert('drawL must be given an array of buttons');
        }

        var container = document.createElement("div");
        var buttons = [];

        l.buttons.forEach(function(button, i){

          buttons[i] = document.createElement('div');
          buttons[i].className = button.class;
          button.element = buttons[i];
          container.appendChild(buttons[i]);

        });

        return container;

    }

})();



window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + "www/levels/level1.html", gotFile, fail);

function gotFile(file){

  file.file(function(e) {

    var reader = new FileReader();

    reader.onerror = function(data){};

    reader.onloadend = function(e) {



      //console.log("Text is: "+this.result);
      //gameBoard.innerHTML = this.result;

      startComputerTurn(sequence);

      setTimeout(function(){
        //startSequence(current);
      },8000);

      setTimeout(function(){
        //startSequence(current);
      },2000);


    };

    reader.readAsText(e);

  });

}

function fail(error){
  console.log('error inflicted by the fail whale');
}
