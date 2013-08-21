var socket = io.connect('http://10.2.0.167:1000');

var hasNotification = window.webkitNotifications;

var userName = '';

var notification = {};


// as soon as the user connects ask for username
socket.on('connect', function(){
    // call the server-side function 'adduser' and send one parameter (prompt value)
    userName = prompt("Choose a username")
    socket.emit('adduser', userName);
});

// listener, whenever the server emits 'updatechat', this updates the chat body
socket.on('updatechat', function (timestamp, username, data) {
    var template = '<li>' + 
                        '<b>' + username + ': </b>' +
                        '<span>' + data + '</span>' +
                        '<small>' + timestamp + ' </small>' +
                    '</li>';
    $('#conversation').append( template );

    var d = $('#conversation')[0].scrollHeight;
    var s = 20;
    var t = Math.min(d / s, 50);
    $("#conv_wrap").stop().animate({
        scrollTop: $('#conversation')[0].scrollHeight
    }, 1000);

    if (username != userName) {
        var n = window.webkitNotifications.createNotification( 'howdy.png', 'Howdy!', username + ' says: ' + data );
        n.show();
        setTimeout(function() { n.cancel(); }, 1500);
    };
    
});

// listener, whenever the server emits 'updateusers', this updates the username list
socket.on('updateusers', function(data) {
  $('#users').empty();
  $('#users').append('<li>CONNECTED USERS</li>');
  $.each(data, function(key, value) {
    $('#users').append('<li>' + key + '</li>');
  });
});

// do this
var vj = function() {
    if( window.webkitNotifications.checkPermission() == 0 ) {
        $('#desk_notify').remove();
        return;
    }

    $('#desk_notify').show();

    $('#enable').on('click', function() {
        if (window.webkitNotifications.checkPermission() == 0) { 
            window.webkitNotifications.createNotification( 'howdy.png', 'Server', 'You have enabled destop notifications.').show();
            $('#desk_notify').remove();
        } else {
          window.webkitNotifications.requestPermission();
        }
    });

    $('#close').on('click', function() {
        $('#desk_notify').remove();
    });
};

// on load of page
$(function(){
    if (!"WebSocket" in window) {
        alert("Sorry your browser doesn't support web sockets");
        return;
    }

    if (hasNotification) {
        vj();
    };

    $('#data').focus();

    // when the client hits ENTER on their keyboard
    $('#data').keypress(function(e) {
        if(e.which == 13) {
            $(this).blur();
            var message = $('#data').val();
            $('#data').val('');

            // tell server to execute 'sendchat' and send along one parameter
            socket.emit('sendchat', message);
            $('#data').focus();
        }
    });

    $('#user_menu').on('click', function() {
        $('body').toggleClass('show_users');
    });
});