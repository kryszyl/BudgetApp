var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }



    var data = {
        allItems: {
            expenses: [],
            incomes: []
        },
        totals:{
            expenses:0,
            incomes:0
        }
    }


})();

var UIController = (function () {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
        getInput: function () {


            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        },
        getDOMStrings: function () {
            return DOMStrings;
        }
    }

})();



var controller = (function (budgetCtrl, UICtrl) {

    var setListeners = function () {
        var DOMString = UICtrl.getDOMStrings();
        document.querySelector(DOMString.inputBtn).addEventListener('click', controlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                controlAddItem();
            }

        });
    }

    var controlAddItem = function () {
        // get filed input data
        var input = UIController.getInput();
        console.log(input);
        //add item to budget ctrl

        //add item to ui

        //calculate budget

        //display budget in ui
    };

    return {
        init: function () {
            console.log('app started')
            setListeners();
        }
    }

})(budgetController, UIController);

controller.init();