define(function(require, exports, module) {

    var buttons = [];
    var sequence = [];
    var playersTurn = false;
    var playersProgress = 0;
    var playersScore = 0;
    var gameBoard;

    exports.init = function(gb){

        gameBoard = gb;
        buttonQuery = document.querySelectorAll('[data-game-button]');
        buttons = initButtons(buttonQuery);

        startComputerMove();

    };

    function startComputerMove(){

        playersTurn = false;
        playersProgress = 0;
        sequence.push(newRandomItem());
        var sequenceCopy = sequence.slice();
        var b = sequence.slice();

        console.log('/b/', b);
        function computerMove(targetButton){

            //If there are no items left in the sequence
            if(!targetButton){

                //It's the players turn
                startPlayerTurn();

                return false;

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

            function nextMove(){
                console.log('move to next move');
                return computerMove(sequenceCopy.shift());

            }

        }

        console.log('about to start computer move', sequenceCopy);

        computerMove(sequenceCopy.shift());

    }

    function startPlayerTurn(){
        console.log('it IS the players turn baby...');
        playersTurn = true;

    }

    function simulateButtonPush(button){

        touchStart.apply(button.element);

        setTimeout(function(){

            touchEnd.apply(button.element);

        },500);


    }

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

            sourceButtons[i].style.boxShadow = "inset 0px 0px 10px 2px " + newButton.colorOn;
            sourceButtons[i].style.backgroundColor = newButton.colorOff;

            buttons[newButton.id] = newButton;

        }

        return buttons;

    }

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

    function checkPlayerTurn(buttonPressed){

        console.log('expected ' + sequence[playersProgress] + ' got ' +  buttonPressed);

        if(sequence[playersProgress] != buttonPressed){
            alert("game over looser!");
            window.location = '../index.html';
            return false;
        }

        playersProgress+=1;

        if(playersProgress == sequence.length){

            playersScore +=1;

            document.querySelector('#user-score').innerText = playersScore;

            setTimeout(function(){
                startComputerMove();
            },1000);

        }

    }

    function touchEnd(){

        var button = buttons[this.getAttribute('data-game-button')];

        //End the animation
        this.style.boxShadow = "inset 0px 0px 10px 2px " + button.colorOn;
        this.style.backgroundColor = button.colorOff;

    }

    function newRandomItem(){

      var min = 1,
        max = 4;

      return Math.floor(Math.random() * (max - min + 1)) + min;

    }

});
