
define([
	'text!templates/conversations.html',
	'views/baseview',
	'models/immodel',
	'views/imview'
], function( template, BaseView, ImModel, ImView ) {

	var Conversations = BaseView.extend({
		tagName: 'section',
		id: 'conv_wrap',
		el: 'body',

		template: _.template( template ),

		events: {
			'click #enable': 'askPermission',
			'click #close': 'closeTip'
		},

		socketEvents: {
			'updatechat': 'updateChat'
		},

		initialize: function() {
			this.__initialize();
			this.render();

			this.imModel = new ImModel();
			this.imView = new ImView({ model: this.imModel });
		},

		render: function() {
			var self = this;

			this.$el.append( this.template );
			this.$_el = this.$('#conv_wrap');
			this.$__el = this.$('#conversation');

			_.delay(function() {
				if ( !!Howdy.hasNotify && Howdy.hasNotify.checkPermission() != 0 ) {
					self.$('#desk_notify').show();
				} else {
					self.closeTip();
				};
			}, 1);

		},

		askPermission: function() {
			window.webkitNotifications.requestPermission();
		},

		closeTip: function() {
			self.$('#desk_notify').remove();
		},

		updateChat: function(options) {
			this.imModel.set({
				timeStamp: options.timeStamp,
				userName: options.userName,
				dateTime: options.dateTime,
				msg: options.msg,
				notifyMsg: options.notifyMsg,
				color: options.color
			});

			var dist = this.$__el[0].scrollHeight;
			var velo = 10;
			var time = Math.max(dist / velo, 500);

			this.$_el.stop().animate({
				scrollTop: this.$_el[0].scrollHeight
			}, time);

			if ( options.userName != this.model.get('userName') ) {
				Howdy.notify( options.userName, options.notifyMsg );
			};
		}
	});

	return Conversations;

});