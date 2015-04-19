/**
define(function(require, exports, module) {

  var modules = {};

  //Levels are modules?

  var x = game.createLevel({
    name: 'level1',
    order:0,
    styles: {},
    buttons:[
      {
        colors:game.buttons[0].colors,
        colors:game.defaultButtons.buttonZero.colors,
        class:"level1-button level1-button1 red"
      },
      {
        colors:game.buttons[1].colors,
        class:"level1-button level1-button2 blue"
      },
      {
        colors:buttons[2].colors,
        class:"level1-button level1-button3 green"
      },
      {
        colors:buttons[3].colors,
        class:"level1-button level1-button4 yellow"
      }
    ]

  });


  //possible game modules?
  modules.loadGame = {
    init: function(levelId){
      //Initial game setup. Trigger drawGame.
    }
  };

  moduels.drawGame = {
    init: function(LevelDefinition){
      //Trigger drawScore and drawButtons from LevelDefinition
    }
  };

  modules.gameStart = {
      init: function(){
        //Trigger the computers first move
      }
  };

  modules.gameEnd = {
    init: function(){
      //Destroy all game data and display game over
    }
  };

  modules.drawButton = {
      init: function(buttonDefinition){
        //Return a game button element
      }
  };

  modules.buttonPush = {
      init: function(button, caller){
        //Display the button being pushed, and if the caller is the user notify userMove
      }
  };

  modules.buttonRelease = {
    init: function(button){
      //return the state of a button back to normal
    }
  };

  modules.drawScore = {
      init: function(){
        //create the GUI to display the users score
      },
      update: function(){
        //update the score displayed for the user
      }
  };

  modules.computerTurn = {

    //Initiate the computers turn, generate the new item in the sequence
    //Call computer move and pass the sequence.

  };

  modules.computerMove = {
    init: function(){
      //Display the computers current move to the user then give control back to the user.
    }
  };

  modules.userTurn = {
    init: function(){
        //notify the user that it is their turn
    }
  };
  modules.userMove = {
    init: function(){
      //if the move made by the user is correct let them continue
      //if the move was correct and was also the last move of the sequence, it's the computers turn
      //if the move was incorrect, the game is over.
    }
  };




});
*/
