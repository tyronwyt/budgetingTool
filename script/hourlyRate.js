
var expenseCalc = {

  outgoingID: 0,
  outgoingArr: [],
  myChart: "",

  // Initialise Functions
  init: function() {
    this.cacheDom();
    this.bindEvents();
    this.renderChart();
  },

   //Cache the Dom
  cacheDom: function() {
    this.$main = $("#main");
    this.$hoursWorked = this.$main.find('#inputHpweek');
    this.$rate = this.$main.find('#inputRate');
    this.$cost = this.$main.find('#inputCost');
    // this.$btnCalc = this.$main.find('#btnCalc');
    this.$earningsW = this.$main.find('#outputWEarnings');
    this.$earningsY = this.$main.find('#outputYEarnings');
    this.$costPct = this.$main.find('#outputCost');
    this.$graph = this.$main.find('#graph');
    this.$outgoingSection = this.$main.find('#outgoings');
    this.$addForm = this.$main.find('#addInput');
    this.$eLabel = this.$main.find('.expenseLabel');
    this.$totalOutput = this.$main.find('#total');
  },

  //Event binding
  bindEvents: function() {
    // this.$btnCalc.on('click', this.calcExpenses.bind(this));
    this.$addForm.on('click', this.addForm.bind(this));
    this.$main.on('blur', '.expenseLabel', this.newLabel.bind(this));
    this.$main.on('focusin', '.labelDone', this.editLabel.bind(this));
    this.$main.on('blur', 'input', this.calcExpenses.bind(this));
  },

  // Add a new Expense form on button click
  addForm: function() {
    var nForm = $('<div>').attr('class', 'form-group');
    nForm.append('<input type="text" class="form-control expenseLabel" data-index="'+ this.outgoingID +'" placeholder="Expense name">');
    nForm.append('<input type="number" class="form-control" data-index="'+ this.outgoingID +'" id="" placeholder="Amount">');
    $(nForm).hide().appendTo($('#outgoings')).fadeIn();

      // this.$outgoingSection.append(nForm).slideDown();
      $('.expenseLabel').focus();
      this.outgoingID += 1;
  },

  newLabel: function(e) {
    $(e.currentTarget).addClass('labelDone');
  },

  editLabel: function(e) {
    $(e.currentTarget).removeClass('labelDone');
  },

  //Call this to take inputs and add them to array then render graph/chart
  calcExpenses: function() {
    var data = $('input');
    var expenceArr = [];

    expenceArr.push({name: "Income", amount: data.eq(0).val()});

    for (var i = 0; i < data.length; i++) {
      if (i % 2 == !0) {

        var newExpense = {name: data.eq(i).val(), amount: data.eq(i+1).val() };
        expenceArr.push(newExpense);
      }

    }
    this.outgoingArr = expenceArr;

    this.renderChart();
  },

  countTotal: function(income, expenses) {
    var total = 0;
    if (income && expenses > 0){
    if (income < expenses) {
      total = expenses - income;
      this.$totalOutput.text("You are in a deficit of: " + total).removeClass().addClass('alert alert-danger');

    } else {
      total = income - expenses;
      this.$totalOutput.text("You have a surplus of: " + total).removeClass().addClass('alert alert-success');
    };
  };
  },

  // use chart.js to render chart with input variables
  renderChart: function() {

    Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};


    var label = [];
    var data = [];
    var income = [parseFloat($("#inputRate").val())];
    var totalExpense = [];
    var expensesCount = 0;

// can be refactored

    this.outgoingArr.forEach(function(item) {
      label.push(item.name);
      data.push(item.amount);
      if (item.amount != ""){
      expensesCount += parseFloat(item.amount);
    };
    });
    label.insert(1, 'Total Expenses');
    data.insert(1, (expensesCount-income));
    var ctx = document.getElementById("myChart");

    if (this.myChart != ""){
      this.myChart.destroy();
    }

    this.countTotal(income, (expensesCount-income));

    this.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [{
                label: 'Income & Expenses',
                data: data,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    // 'rgba(54, 162, 235, 0.2)',
                    // 'rgba(255, 206, 86, 0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)',
                    // 'rgba(75, 192, 192, 0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    'rgba(255,99,132,1)',
                    // 'rgba(54, 162, 235, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },
            // {
            //     label: 'Total Expense',
            //     data: [expensesCount],
            //     backgroundColor: [
            //
            //         'rgba(255, 99, 132, 0.2)',
            //
            //     ],
            //     borderColor: [
            //
            //         'rgba(255,99,132,1)',
            //
            //     ],
            //     borderWidth: 1
            // }
          ],
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
  }

// Hourly Rate Calculator for future use
  //Calculate the rates once user clicks calculate
  // rateCalc: function() {
  //   var hours = this.$hoursWorked.val();
  //   var rate = this.$rate.val();
  //   var earningsPerW = hours * rate;
  //   var earningsPerY = earningsPerW * 52;
  //   var earningsPerM = earningsPerY / 12;
  //   var hoursWorkPerM = (hours * 52) / 12;
  //   var cost = ((this.$cost.val() / earningsPerM) * 100).toFixed(2);
  //   this.$earningsW.html(earningsPerW);
  //   this.$earningsY.html(earningsPerY);
  //   this.$costPct.html(cost +" Hours: " + hoursWorkPerM);
  //   this.drawGraph(cost, hoursWorkPerM);
  // },

  // drawGraph: function(percent, hoursPerM) {
  //   this.$graph.html('');
  //   for (var i = 0; i < 100; i++) {
  //     var cube = $('<span>').data('i', i);
  //       if (i % 10 == 0 ) {
  //         this.$graph.append('<br>');
  //       }
  //
  //       if (i < percent) {
  //         cube.attr('class', 'cube1');
  //       }else {
  //         cube.attr('class', 'cube0');
  //       }
  //
  //
  //     this.$graph.append(cube);
  //   }
  //
  // },
}
expenseCalc.init();
