
/**
* Project config for requirejs
*/
requirejs.config({
	baseUrl: 'js',

	paths: {
		text: 'lib/text',
		socketio: '../socket.io/socket.io'
	},

	shim: {
		'socketio': {
			exports: 'io'
		},

		'lib/jquery': {
			exports: '$'
		},

		'lib/underscore': {
			exports: '_'
	    },

	    'lib/backbone': {
			deps: ['lib/underscore', 'lib/jquery'],
			exports: 'Backbone'
	    },

	    'app': {
			deps: ['socketio', 'lib/jquery', 'lib/underscore', 'lib/backbone']
	    }
	}
});

/**
* Initiate the App
*/
require(['app'], function( App ) {

	window.Howdy = new App();

	console.log( Howdy );

});