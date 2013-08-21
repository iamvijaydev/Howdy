
define(function() {

	var ImModel = Backbone.Model.extend({
		defaults: {
			timeStamp: '',
			dateTime: '',
			userName: '',
			msg: '',
			notifyMsg: '',
			color: ''
		}
	});

	return ImModel;

});