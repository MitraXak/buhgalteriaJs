let start = document.getElementById("start"),
    budgetValue         = document.body.getElementsByClassName("budget-value")[0],
    daybudget           = document.body.getElementsByClassName("daybudget-value")[0],
    level               = document.body.getElementsByClassName("level-value")[0],
    expenses            = document.body.getElementsByClassName("expenses-value")[0],
    optionalExpensesValue    = document.body.querySelector(".optionalexpenses-value"),
    income              = document.body.getElementsByClassName("income-value")[0],
    monthsavings        = document.body.getElementsByClassName("monthsavings-value")[0],
    yearsavings         = document.body.getElementsByClassName("yearsavings-value")[0],
    inputItem           = document.body.getElementsByClassName("expenses-item"),
    buttonUtv1          = document.body.getElementsByTagName("button")[0],
    buttonUtv2          = document.body.getElementsByTagName("button")[1],
    optionalExpensesItem    = document.body.querySelectorAll(".optionalexpenses-item"),
    chooseIncome        = document.body.querySelector(".choose-income"),
    savings             = document.body.querySelector("#savings"),
    chooseSum           = document.body.querySelector(".choose-sum"),
    choosePercent       = document.body.querySelector(".choose-percent"),
    year                = document.body.querySelector(".year-value"),
    month               = document.body.querySelector(".month-value"),
    day                 = document.body.querySelector(".day-value"),
    expensesItemBtn     = document.body.querySelector(".expenses-item-btn"),
    optionalexpensesBtn = document.body.querySelector(".optionalexpenses-btn");
    countBudgetBtn      = document.body.querySelector(".count-budget-btn");
let money, time;

let appData = {
    budjet: money,
    mounthInCome: 0,
    yearInCome: 0,
    time: time,
    expenses:{

    },
    optionalExpenses:{

    },
    income: [],
    savings: false,
    button: false
};

//Событие расчета бюджета на месяц
start.addEventListener("click", function(){
    if(appData.button == false)
    {
        appData.button = true;
    }
    else{
        appData.button = false;
    }
    money = +prompt("Ваш бюджет на месяц? "),
	time = prompt("Введите дату в формате YYYY-MM-DD"); 

    while(isNaN(money) || money == '' || money == null){
      	money = +prompt("Ваш бюджет на месяц? "),
      	time = prompt("Введите дату в формате YYYY-MM-DD");
    }
	appData.budjet = money;
	appData.time = time;
	budgetValue.innerHTML = money.toFixed();
    year.value =    new Date(Date.parse(time)).getFullYear();
    month.value =   new Date(Date.parse(time)).getMonth() + 1;
    day.value =     new Date(Date.parse(time)).getDate(); 
});
//Выбор обязательный месячных расходов пользователем
expensesItemBtn.addEventListener("click", function(){
    if(appData.button == true){
        let sum = 0;
        for(let i = 0; i < inputItem.length; i++){
            let a = inputItem[i].value,
                b = inputItem[++i].value;
            if(typeof(a) === 'string' && typeof(a) != null
                && typeof(b) === 'string' && typeof(b) != null
                && a != '' && b != '' && a.length < 50){
                appData.expenses[a] = b;
                sum += +b;
            }else{
                i = i - 1;
            }
            expenses.textContent = sum;    
        }
    }
    else
    {
        alert('Нажмите сначала на кнопку "Начать расчет" !');
    }
})
//Доп росходы
optionalexpensesBtn.addEventListener('click', function(){
    if(appData.button == true){
        for(let i = 0; i < optionalExpensesItem.length; i++){
            let opt = optionalExpensesItem[i].value;
            appData.optionalExpenses[i] = opt;
            optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
        }
    }
    else
    {
        alert('Нажмите сначала на кнопку "Начать расчет" !');
    }
})
//расчет дневного бюджета и вывод на экран этого значения
countBudgetBtn.addEventListener('click', function(){
    if(appData.button == true){
        if(appData.budjet == undefined){
            budgetValue.textContent = 'Произошла ошибка';
        }
        else
        {
            let obRachod1 = 0;
            //Исходя из строки обязательные расходы
            if(expenses.textContent != '')
            {
                obRachod1 = +expenses.textContent;
            }
            appData.moneyPerDay = +((appData.budjet - obRachod1) / 30).toFixed(2);
            daybudget.textContent = appData.moneyPerDay;
            if(appData.moneyPerDay <= 100){
                level.textContent = "Минимальный уровень достатка";
            } else if(appData.moneyPerDay > 100 && appData.moneyPerDay <= 2000){
                level.textContent = "Средний уровень достатка";
            } else if(appData.moneyPerDay > 2000){
                level.textContent = "Высокий уровень достатка";
            } else{
                level.textContent = "Ошибка ввода";
            }
        }
    }
    else
    {
        alert('Нажмите сначала на кнопку "Начать расчет" !');
    }
});
//Ввод доп доходов и отоборажение их в меню
chooseIncome.addEventListener('input', function(){
    let items = chooseIncome.value;
    appData.income = items.split(",");
    income.textContent = ' ' + appData.income;
})
//изменять значение savings при нажатии на чекбокс
savings.addEventListener('click', function(){
    if(appData.savings == true)
    {
        appData.savings = false;
    }
    else
    {
        appData.savings = true;
    }
});
//расчитать процент при вводе суммы
chooseSum.addEventListener('input', function(){
    if(appData.savings == true)
    {
        let sum = +chooseSum.value;
        let persone = +choosePercent.value;
        //Расчитываю прибыль за год
        appData.yearInCome = sum/100  * persone;
        //Расчитываю прибыль за месяц
        appData.mounthInCome = sum/100/12 * persone;

        monthsavings.textContent = appData.mounthInCome.toFixed(1);
        yearsavings.textContent = appData.yearInCome.toFixed(1);
    }
});
//Расчитать процент от суммы при вводе в проценте
choosePercent.addEventListener('input', function(){
    if(appData.savings == true)
    {
        let sum = +chooseSum.value;
        let persone = +choosePercent.value;
        //Расчитываю прибыль за год
        appData.yearInCome = sum/100  * persone;
        //Расчитываю прибыль за месяц
        appData.mounthInCome = sum/100/12 * persone;

        monthsavings.textContent = appData.mounthInCome.toFixed(1);
        yearsavings.textContent = appData.yearInCome.toFixed(1);
    }
});
