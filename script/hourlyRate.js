
var expenseCalc = {

  outgoingID: 0,
  outgoingArr: [],

  // Initialise Functions
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },

   //Cache the Dom
  cacheDom: function() {
    this.$main = $("#main");
    this.$hoursWorked = this.$main.find('#inputHpweek');
    this.$rate = this.$main.find('#inputRate');
    this.$cost = this.$main.find('#inputCost');
    this.$btnCalc = this.$main.find('#btnCalc');
    this.$earningsW = this.$main.find('#outputWEarnings');
    this.$earningsY = this.$main.find('#outputYEarnings');
    this.$costPct = this.$main.find('#outputCost');
    this.$graph = this.$main.find('#graph');
    this.$outgoingSection = this.$main.find('#outgoings');
    this.$addForm = this.$main.find('#addInput');
    this.$eLabel = this.$main.find('.expenseLabel');
  },

  //Event binding
  bindEvents: function() {
    this.$btnCalc.on('click', this.calcExpenses.bind(this));
    this.$addForm.on('click', this.addForm.bind(this));
    this.$main.on('blur', '.expenseLabel', this.newLabel.bind(this));
    this.$main.on('focusin', '.labelDone', this.editLabel.bind(this));
    // this.$eLabel.on('focusout', this.editLabel2.bind(this));
  },

  addForm: function() {
    // var nExpenseName = $('<a>').html('New Expense').attr('class', 'expenseLabel')
    // var nLabel = $('<label>').html('New Expense').attr('class', 'expenseLabel');
    var nForm = $('<div>').attr('class', 'form-group');
    nForm.append('<input type="text" class="form-control expenseLabel" data-index="'+ this.outgoingID +'" placeholder="Expense name">');
    nForm.append('<input type="number" class="form-control" data-index="'+ this.outgoingID +'" id="" placeholder="Amount">');
      this.$outgoingSection.append(nForm);
      $('.expenseLabel').focus();
      this.outgoingID += 1;
  },

  newLabel: function(e) {
    // var $target = $(e.target).closest('label');
    // var targetVal = e.currentTarget.value;
    // var targetParent = $(e.currentTarget).parent();
    $(e.currentTarget).addClass('labelDone');

  },

  editLabel: function(e) {
    $(e.currentTarget).removeClass('labelDone');
  },

  calcExpenses: function() {
    var data = $('input');
    var expenceArr = [];

    for (var i = 2; i < data.length; i++) {
      if (i % 2 == 0) {

        var newExpense = {name: data.eq(i).val(), amount: data.eq(i+1).val() };
        expenceArr.push(newExpense);
      }

    }
    // for (var i = 0; i < this.outgoingArr.length; i++) {
    //   console.log(this.outgoingArr[i].name + ' : ' + this.outgoingArr[i].amount);
    // }
    // expenceArr.forEach(function(item){
    //   console.log(item.name + ' : ' + item.amount);
    // });
    this.outgoingArr = expenceArr;

    // var total = 0 ;
    //
    // this.outgoingArr.forEach(function(item){
    //
    //   total += parseInt(item.amount);
    // });
    // console.log("Total: " + total);
    this.renderChart();
  },

  renderChart: function() {

    var label = [];
    var data = [];
    var income = [parseInt($("#inputRate").val())];

    this.outgoingArr.forEach(function(item) {
      label.push(item.name);
      data.push(item.amount);
    });
    console.log(label);

    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [{
                label: 'Outgoings',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },
            // {
            //     label: 'Income',
            //     data: income,
            //     backgroundColor: [
            //         'rgba(255, 99, 132, 0.2)',
            //         'rgba(54, 162, 235, 0.2)',
            //         'rgba(255, 206, 86, 0.2)',
            //         'rgba(75, 192, 192, 0.2)',
            //         'rgba(153, 102, 255, 0.2)',
            //         'rgba(255, 159, 64, 0.2)',
            //         'rgba(75, 192, 192, 0.2)',
            //         'rgba(153, 102, 255, 0.2)',
            //         'rgba(255, 159, 64, 0.2)'
            //     ],
            //     borderColor: [
            //         'rgba(255,99,132,1)',
            //         'rgba(54, 162, 235, 1)',
            //         'rgba(255, 206, 86, 1)',
            //         'rgba(75, 192, 192, 1)',
            //         'rgba(153, 102, 255, 1)',
            //         'rgba(255, 159, 64, 1)',
            //         'rgba(75, 192, 192, 1)',
            //         'rgba(153, 102, 255, 1)',
            //         'rgba(255, 159, 64, 1)'
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
  },


  //Calculate the rates once user clicks calculate
  rateCalc: function() {
    var hours = this.$hoursWorked.val();
    var rate = this.$rate.val();
    var earningsPerW = hours * rate;
    var earningsPerY = earningsPerW * 52;
    var earningsPerM = earningsPerY / 12;
    var hoursWorkPerM = (hours * 52) / 12;
    //(30/100) * 100
    var cost = ((this.$cost.val() / earningsPerM) * 100).toFixed(2);
    this.$earningsW.html(earningsPerW);
    this.$earningsY.html(earningsPerY);
    this.$costPct.html(cost +" Hours: " + hoursWorkPerM);
    this.drawGraph(cost, hoursWorkPerM);
  },

  drawGraph: function(percent, hoursPerM) {
    this.$graph.html('');
    for (var i = 0; i < 100; i++) {
      var cube = $('<span>').data('i', i);
        if (i % 10 == 0 ) {
          this.$graph.append('<br>');
        }

        if (i < percent) {
          cube.attr('class', 'cube1');
        }else {
          cube.attr('class', 'cube0');
        }


      this.$graph.append(cube);
    }

  },
}
expenseCalc.init();
