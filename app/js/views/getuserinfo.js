/**
* Get the details from user
*/
define([
	'views/baseview'
], function( BaseView ) {

	var GetUserInfo = BaseView.extend({
		socketEvents: {
			'connect': 'onConnect'
		},

		initialize: function() {
			this.userName = prompt("Choose a username");
			this.userName = this.userName === '' ? 'An asshole who didnt set username' : this.userName;
			this.__initialize();

			this.colorArray = [
				'#16A085',
				'#2ECC71',
				'#27AE60',
				'#3498DB',
				'#2980B9',
				'#9B59B6',
				'#F1C40F',
				'#F39C12',
				'#E67E22',
				'#E74C3C',
				'#C0392B',
				'#BDC3C7',
				'#95A5A6',
				'#7F8C8D'
			];
		},

		randomColor: function() {
		    return this.colorArray[Math.floor( Math.random() * this.colorArray.length )];
		},

		onConnect: function() {

			console.log(this.userName);
			console.log(this.model);

			var color = this.randomColor();

			this.model.set({
				userName: this.userName,
				ready: true,
			});

			Howdy.socket.emit('adduser', {
				userName: this.userName,
				color: color
			});
		}
	});
	return GetUserInfo;

});
