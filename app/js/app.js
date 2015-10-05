/**
* Define the app as a requirejs module
*
* @param {Class} User - Model for holding user data
* @param {Class} GetUserInfo - View for fetching user info
* @paran {Class} AppHeader - View for app header
* @param {Class} ConnectedUsers - View for showing the connected users
* @param {Class} Conversations - View for showing the user messages
*
* @return {Object} App - Return the app constructor
*/
define([
	'models/user',
	'views/getuserinfo',
	'views/appheader',
	'views/connectedusers',
	'views/conversations',
	'views/sendmsg'
], function( User, GetUserInfo, AppHeader, ConnectedUsers, Conversations, SendMsg ) {

	/**
	* The app
	*
	* @constructor
	*/
	var App = function() {
		this.models = {};
		this.views = {};

		// CHANGE THIS
		// your local server ip and desired port
		this.socket = io.connect('http://10.9.0.105:9999');

		this.hasNotify = window.webkitNotifications;

		this.init();
	};

	App.prototype.init = function() {
		var self = this;

		this.models.user = new User();

		this.views.getUserInfo = new GetUserInfo({ model: this.models.user });
			console.log(this.views.getUserInfo);
		this.views.appHeader = new AppHeader({ model: this.models.user });



		this.views.connectedUsers = new ConnectedUsers();
		this.views.conversations = new Conversations({ model: this.models.user });
		this.views.sendMsg = new SendMsg();
	};

	App.prototype.notify = function( userName, msg ) {
		if ( !!!this.hasNotify || msg === 'You have connected' ) {
			return;
		}

		var userName = userName === 'Server' ? 'Howdy!' : userName + ' - Howdy!'
		var notice = window.webkitNotifications.createNotification( 'howdy.png', userName, msg );
		notice.show();
		_.delay(function() {
			notice.cancel();
		}, 3000);
	};

	return App;

});
