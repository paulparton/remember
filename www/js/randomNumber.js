define(function(require, exports, module) {

    module.exports = function(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

});
