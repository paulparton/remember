define(function(require, exports, module) {

    //Module variables
    var randomNumber = require('randomNumber'),
        buttons = [],
        sequence = [],
        playersTurn = false,
        playersProgress = 0,
        playersScore = 0,
        gameBoard;

    //Public API
    exports.init = function(gb){

        //Store a reference to the gameboard
        gameBoard = gb;

        //Find the buttons on the gameboard
        buttonQuery = document.querySelectorAll('[data-game-button]');

        //Imitialize the buttons
        buttons = initButtons(buttonQuery);

        //Begin the game with the computers first move
        startComputerTurn();

    };

    //Private functions

    //Start the computers set of moves
    function startComputerTurn(){

        var sequenceCopy;

        //Add a new item to the sequence
        sequence.push(randomNumber(1,4));

        //Make a copy of the sequence to control the flow of the computers turn
        sequenceCopy = sequence.slice();

        //Perform the first computer move
        computerMove(sequenceCopy.shift());

        //Performs each computer move then trigger the players turn
        function computerMove(targetButton){

            //If there are no items left in the sequence
            if(!targetButton){

                //It's the players turn
                return startPlayerTurn();

            }

            //Find the button and press it
            for(var button in buttons){

                if(buttons.hasOwnProperty(button)){

                    if(buttons[button].id == targetButton){

                        simulateButtonPush(buttons[button]);

                        setTimeout(nextMove, 1000);

                    }

                }

            }

            //Perform the next computer move
            function nextMove(){
                return computerMove(sequenceCopy.shift());
            }

        }


    }

    //Start the players turn
    function startPlayerTurn(){

        playersTurn = true;

    }

    //Push a game button for the computer
    function simulateButtonPush(button){

        touchStart.apply(button.element);

        setTimeout(function(){

            touchEnd.apply(button.element);

        },500);


    }

    //Create game buttons from placeholder markup
    function initButtons(sourceButtons){

        var i,
            buttons = {};

        for (i=0; i < sourceButtons.length; i+=1){

            var newButton = {
                id: sourceButtons[i].getAttribute('data-game-button'),
                element: sourceButtons[i],
                colorOn: sourceButtons[i].getAttribute('data-color-on'),
                colorOff: sourceButtons[i].getAttribute('data-color-off')
            };

            sourceButtons[i].addEventListener('touchstart', touchStart);
            sourceButtons[i].addEventListener('touchend', touchEnd);
            sourceButtons[i].addEventListener('mousedown', touchStart);
            sourceButtons[i].addEventListener('mouseup', touchEnd);

            sourceButtons[i].style.boxShadow = "inset 0px 0px 10px 2px " + newButton.colorOn;
            sourceButtons[i].style.backgroundColor = newButton.colorOff;

            buttons[newButton.id] = newButton;

        }

        return buttons;

    }

    //When a game-button is pressed
    function touchStart(){

        var button = buttons[this.getAttribute('data-game-button')];

        //Start the button animation
        this.style.boxShadow = "inset 0px 30px 50px -20px " + button.colorOff;
        this.style.backgroundColor = button.colorOn;

        //If it is the players turn, process it
        if(playersTurn === true){
            console.log('players turn');
            checkPlayerTurn(button.id);
        }else{
            console.log('not the players turn ', playersTurn);
        }

    }

    //When a game-button is released
    function touchEnd(){

        var button = buttons[this.getAttribute('data-game-button')];

        //End the animation
        this.style.boxShadow = "inset 0px 0px 10px 2px " + button.colorOn;
        this.style.backgroundColor = button.colorOff;

    }

    //Process a players turn
    function checkPlayerTurn(buttonPressed){

        console.log('expected ' + sequence[playersProgress] + ' got ' +  buttonPressed);

        //If the user got the move wrong, the gam eit over
        if(sequence[playersProgress] != buttonPressed){
            alert("game over looser!");
            window.location = '../index.html';
            return false;
        }

        //If the player has made another correct move, add to their progress
        playersProgress+=1;

        //If the player has completed the last item in the sequence, their turn is over
        if(playersProgress == sequence.length){

            //Add to the user score
            playersScore +=1;

            //Display the user score (this shouldn't be here)
            document.querySelector('#user-score').innerText = playersScore;
            playersTurn = false;
            playersProgress = 0;

            //Pause, then start the computers next turn
            setTimeout(function(){
                startComputerTurn();
            },1000);

        }

    }

});
