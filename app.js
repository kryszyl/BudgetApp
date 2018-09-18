var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calculatePercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round(this.value / totalIncome * 100);

        } else {
            this.percentage = -1;
        }

    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            expense: [],
            income: []
        },
        totals: {
            expense: 0,
            income: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;

            } else {
                ID = 0;
            }
            if (type === 'expense') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'income') {
                newItem = new Income(ID, des, val);
            }

            data.allItems[type].push(newItem);
            return newItem;
        },

        deleteItem: function (type, id) {

            var index, ids;
            ids = data.allItems[type].map(function (current) {
                return current.id;
            });

            index = ids.indexOf(id);
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }

        },

        calculateBudget: function () {
            calculateTotal('expense');
            calculateTotal('income');
            data.budget = data.totals.income - data.totals.expense;

            if (data.totals.income > 0) {
                data.percentage = Math.round((data.totals.expense / data.totals.income) * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentage: function () {
            data.allItems.expense.forEach(function (cur) {
                cur.calculatePercentage(data.totals.income);
            });
        },

        getPercentage: function () {
            var allPercentages = data.allItems.expense.map(function (cur) {
                return cur.getPercentage();
            });
            return allPercentages;
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalIncome: data.totals.income,
                totalExpense: data.totals.expense,
                percentage: data.percentage
            }
        },

        testing: function () {
            console.log(data);
        }
    };

})();

var UIController = (function () {

            var DOMStrings = {
                inputType: '.add__type',
                inputDescription: '.add__description',
                inputValue: '.add__value',
                inputBtn: '.add__btn',
                incomeContainer: '.income__list',
                expenseContainer: '.expenses__list',
                budgetLabel: '.budget__value',
                incomeLabel: '.budget__income--value',
                expenseLabel: '.budget__expenses--value',
                percentageLabel: '.budget__expenses--percentage',
                container: '.container',
                expensesPercLabel: 'item__percentage',
                dateLabel: '.budget__title--month'
            };

            var formatNumber = function (num, type) {
                var numSplit, int, dec, type;
                num = Math.abs(num);
                num = num.toFixed(2);

                numSplit = num.split('.');
                int = numSplit[0];
                if (int.length > 3) {
                    int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
                }
                dec = numSplit[1];



                return (type === 'exp' ? sign = '-' : sign = '+') + ' ' + int + '.' + dec;
            };

            var nodeListEach = function (list, callback) {
                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            };
                return {


                    getInput: function () {


                        return {
                            type: document.querySelector(DOMStrings.inputType).value,
                            description: document.querySelector(DOMStrings.inputDescription).value,
                            value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
                        };
                    },

                    //        displayPercentages: function(percentages){
                    //          var fields = document.querySelectorAll(DOMStrings.expensesPercLabel);
                    //            
                    //            var nodeListEach = function(list, callback){
                    //                for(var i = 0; i< list.length; i++){
                    //                    callback(list[i], i);
                    //                }
                    //            }
                    //        },


                    displayMonth: function () {
                        var now, year, month;
                        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                        now = new Date();
                        year = now.getFullYear();
                        month = now.getMonth();
                        document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ' ' + year;
                    },

                    changeType: function () {
                        var fields = document.querySelectorAll(
                            DOMStrings.inputType, +',' +
                            DOMStrings.inputDescription + ',' +
                            DOMStrings.inputValue
                       )
                        nodeListEach(fields, function(cur){
                           cur.classList.toggle('red-focus') 
                        });
                        
                        document.querySelector(DOMStrings.inputBtn).classList.toggle('red');
                        
                    },
                    getDOMStrings: function () {
                        return DOMStrings;
                    },

                    addListItem: function (obj, type) {
                        var html, newHtml, element;
                        //create HTML string with placeholder
                        if (type === 'income') {
                            element = DOMStrings.incomeContainer;
                            html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

                        } else if (type === 'expense') {
                            element = DOMStrings.expenseContainer;
                            html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                        }

                        newHtml = html.replace('%id%', obj.id).replace('%description%', obj.description).replace('%value%', formatNumber(obj.value, type));
                        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

                    },

                    deleteListItem: function (selectorId) {

                        var childElement = document.getElementById(selectorId)
                        childElement.parentNode.removeChild(childElement);
                    },

                    clearFields: function () {
                        var fields, fieldsArray;

                        fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

                        fieldsArray = Array.prototype.slice.call(fields);

                        fieldsArray.forEach(function (current, index, array) {
                            current.value = "";
                        });

                        fieldsArray[0].focus();
                    },

                    displayBudget: function (obj) {
                        var type;
                        obj.budget > 0 ? type = 'inc' : type = 'exp';
                        document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
                        document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalIncome, 'inc');
                        document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(obj.totalExpense, 'exp');

                        if (obj.percentage > 0) {
                            document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';

                        } else {
                            document.querySelector(DOMStrings.percentageLabel).textContent = '---';
                        }


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

                document.querySelector(DOMString.container).addEventListener('click', ctrlDeleteItem);
                document.querySelector(DOMString.inputType).addEventListener('change', UICtrl.changeType);
            }

            var updatePercentage = function () {
                // calc percentage
                budgetCtrl.calculatePercentage();
                //read from BController
                var percentages = budgetCtrl.getPercentage();
                // update the UI
                console.log(percentages);
            }

            var updateBudget = function () {
                //calculate budget
                budgetCtrl.calculateBudget();
                //return budget
                var budget = budgetCtrl.getBudget();
                //display budget in ui 
                UICtrl.displayBudget(budget);
            };
            var controlAddItem = function () {

                var input, newItem;
                // get filed input data
                input = UIController.getInput();
                //add item to budget ctrl
                if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
                    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
                    //add item to ui
                    UICtrl.addListItem(newItem, input.type);

                    UICtrl.clearFields();

                    // calculate and update budget

                    updateBudget();
                }


            };

            var ctrlDeleteItem = function (event) {

                var itemId, splitID, type, ID;
                itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
                if (itemId) {
                    splitID = itemId.split('-');
                    type = splitID[0];
                    ID = parseInt(splitID[1]);

                    budgetCtrl.deleteItem(type, ID);
                    UICtrl.deleteListItem(itemId);
                    updateBudget();
                }
            };

            return {
                init: function () {
                    console.log('app started')
                    UICtrl.displayMonth();
                    UICtrl.displayBudget({
                        budget: 0,
                        totalIncome: 0,
                        totalExpense: 0,
                        percentage: -1
                    });
                    setListeners();
                }
            }

        })(budgetController, UIController);

        controller.init();