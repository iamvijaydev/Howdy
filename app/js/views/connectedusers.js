/**
*
* @extends BaseView
*/
define([
	'text!templates/connectedusers.html',
	'views/baseview'
], function( template, BaseView ) {

	var ConnectedUsers = BaseView.extend({
		tagName: 'section',
		id: 'connected_users',
		el: 'body',

		template: _.template( template ),

		socketEvents: {
			'updateusers': 'updateUsers'
		},

		initialize: function() {
			this.__initialize();
			this.render();
		},

		render: function() {
			this.$el.append( this.template );
			this.updateUsers();
			return this;
		},

		updateUsers: function( users ) {
			var self = this;
			var $_el = this.$('#users');

			$_el.empty()
			_.each(users, function(value, key) {
				$_el.append('<li style="color: ' + value.color + ';border-color: ' + value.color + '"><strong>' + value.userName + '</strong></li>');
			});	
		}
	});

	return ConnectedUsers;

});