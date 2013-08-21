
define([
	'text!templates/imview.html',
], function( template ) {

	// _.templateSettings = {
	// 	interpolate: /\{\{(.+?)\}\}/g
	// };

	var IndividualMsg = Backbone.View.extend({
		tagName: 'ol',
		el: '#conversation',

		template: _.template( template ),

		initialize: function() {
			this.model.on('change', this.render, this);
		},

		render: function() {
			this.$el.append( this.template(this.model.toJSON()) );
			return this;
		}

	});

	return IndividualMsg;

});