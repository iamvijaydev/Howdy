
define([
	'text!templates/sendmsg.html',
], function( template ) {

	var SendMsg = Backbone.View.extend({
		tagName: 'section',
		id: 'msg_wrap',
		el: 'body',

		template: _.template( template ),

		events: {
			'keypress #msg': 'sendMsg'
		},

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.append( this.template );
			this.$_el = this.$('#msg');
			this.$_el.focus();
		},

		sendMsg: function( e ) {
			// in mobile, if connected users section is open, close it
			this.$el.hasClass('show_users') && this.$el.removeClass('show_users');

			if (e.which != 13 || e.which == 13 && this.$_el.val() == '') {
				return;
			};

			var self = this;
			var _notifyMsg = this.$_el.val();
			var _msg = this.linkify( _notifyMsg );

			_.delay(function() {
				Howdy.socket.emit('sendchat', _msg, _notifyMsg);
				self.$_el.val('');
			}, 1);
		},

		linkify: function( inputText ) {
		    // http://, https://, ftp://
			var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
			// www. sans http:// or https://
			var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
			// Email addresses
			var emailAddressPattern = /\w+@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6})+/gim;

			return inputText
				.replace(urlPattern, '<a target="_blank" href="$&">$&</a>')
				.replace(pseudoUrlPattern, '$1<a target="_blank" href="http://$2">$2</a>')
				.replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
		}
	});

	return SendMsg;

});