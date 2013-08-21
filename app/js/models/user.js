
define(function() {

	var User = Backbone.Model.extend({
		defaults: {
			userName: 'user',
			screenSize: 0,
			mobileMode: 600,
			ready: false
		}
	});

	return User;

});