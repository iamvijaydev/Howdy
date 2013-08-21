
define([
	'text!templates/appheader.html',
], function( template ) {

	var AppHeader = Backbone.View.extend({
		tagName: 'header',
		id: 'app_header',
		el: 'body',

		template: _.template( template ),

		events: {
			'click #user_menu': 'toggleConnectedUsers'
		},

		initialize: function() {
			this.resize();
			$(window).on('resize.app', _.bind(this.resize, this));
			this.render();
		},

		render: function() {
			this.$el.append( this.template );
			return this;
		},

		remove: function() {
			$(window).off('resize.app');
			Backbone.View.prototype.remove.call( this );
		},

		resize: function() {
			var screenSize = $(window).width();
			this.model.set( 'screenSize', screenSize );

			if ( screenSize <= this.model.get('mobileMode') ) {
				this.$el.addClass('mobile');
			} else {
				this.$el.removeClass('mobile');
			}
		},

		toggleConnectedUsers: function() {
			this.$el.hasClass('mobile') && this.$el.toggleClass('show_users');
		}
	});

	return AppHeader;

});