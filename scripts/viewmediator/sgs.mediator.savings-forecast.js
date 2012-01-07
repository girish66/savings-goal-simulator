// Lazy initialize our namespace context: sgs.mediator.savingsforecastif (typeof(sgs) == 'undefined') sgs = { }if (typeof(sgs.mediator) == 'undefined') sgs.mediator = { }if (typeof(sgs.mediator.savingsforecast) == 'undefined') sgs.mediator.savingsforecast = { }if (typeof(console) != 'undefined' && console) console.info("sgs.mediator.savingsforecast loading!");sgs.mediator.savingsforecast.createViewMediator = function (pageSettings) {	// Create the view Savings Forecast view-specific view model	var viewModel = sgs.model.savingsforecast.initializeViewModel(pageSettings);		// Subscribe to changes in savingsGoalAmount and savingsTargetPerMonth 	// to synchronize our own equivalent value models	var savingsGoalModel = sgs.mediator.savingsgoal.getViewModel();		// Initialize the current savingsGoalAmount	viewModel.savingsGoalAmount(savingsGoalModel.savingsGoalAmount());		savingsGoalModel.savingsGoalAmount.subscribe(function(newValue) {		viewModel.savingsGoalAmount(newValue);	});	savingsGoalModel.savingsTargetPerMonth.subscribe(function(newValue) {		viewModel.savingsTargetPerMonth(newValue);	});	// Subscribe to changes in savingsPerMonth to synchronize our own equivalent value model	var consumptionscenariosModel = sgs.mediator.consumptionscenarios.getViewModel();	consumptionscenariosModel.savingsPerMonth.subscribe(function(newValue) {		viewModel.savingsPerMonth(newValue);	});	// Save the view model	sgs.mediator.savingsforecast.setViewModel(viewModel);		// Ask KnockoutJS to data-bind the view model to the view	var viewNode = $('#savings-forecast-view-container')[0];	ko.applyBindings(viewModel, viewNode);			if (typeof(console) != 'undefined' && console) console.info("sgs.mediator.savingsforecast ready!");}sgs.mediator.savingsforecast.setupViewDataBindings = function(x, y) {	// Declare the HTML element-level data bindings 	$("#savings-forecast-per-month")		.attr("data-bind","text: savingsPerMonth");	$("#forecast-variance-per-month")			.attr("data-bind","text: forecastVariancePerMonth");	$("#time-to-goal-in-months")			.attr("data-bind","text: timeToGoalInMonths");	// Ask KnockoutJS to data-bind the view model to the view	var viewNode = $('#savings-forecast-view')[0];	var viewModel = sgs.mediator.savingsforecast.getViewModel();	ko.applyBindings(viewModel, viewNode);	if (typeof(console) != 'undefined' && console) 		console.info("sgs.mediator.savingsforecast.setupViewDataBindings done!");}sgs.mediator.savingsforecast.getViewModel = function() {	return $(document).data("sgs.model.savingsforecast.viewmodel");}sgs.mediator.savingsforecast.setViewModel = function(viewModel) {	$(document).data("sgs.model.savingsforecast.viewmodel", viewModel);}