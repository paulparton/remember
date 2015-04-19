define(function(require, exports, module) {

  var buttons = require('buttons').buttons;

  console.log('inside levels...', buttons);

  exports.levels = [
    {
      name:'level 1',
      buttons: [
        {
          colors:buttons[0].colors,
          class:"game-button level1-button level1-button1 red"
        },
        {
          colors:buttons[1].colors,
          class:"game-button level1-button level1-button2 blue"
        },
        {
          colors:buttons[2].colors,
          class:"game-button level1-button level1-button3 green"
        },
        {
          colors:buttons[3].colors,
          class:"game-button level1-button level1-button4 yellow"
        }
      ]
    }
  ];

});
