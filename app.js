
var budgetController = (function(){



})();


var uiController = (function(){
    var DOMStrings = {
        inputType : '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };
    return {
      getInput : function(){

        return{
            type : document.querySelector(DOMStrings.inputType).value, // either inc or exp 
            description : document.querySelector(DOMStrings.inputDescription).value,
            value : document.querySelector(DOMStrings.inputValue).value
        }
      },
      getDOMStrings : function() { 
          return DOMStrings;
      }
    };
})();

var appController = (function(budgetCtrl, uiCtrl){

var setupEventListeners = function(){
    var DOM = uiCtrl.getDOMStrings();

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function (event) {
       if(event.keyCode === 13 || event.which === 13){
        ctrlAddItem();
           
       }

    });
};

var ctrlAddItem = function(){
        // get field input data
var input = uiCtrl.getInput();
console.log(input);
        // add the item to budget controller

        // add the item to UI

        // calculate the budget

        //display the budget on the UI
};

return {
    init: function(){
        console.log('Application has started.');
        setupEventListeners();
    }
};


})(budgetController, uiController);

appController.init();