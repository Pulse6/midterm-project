$(function() {
  const socket = io.connect('http://localhost:3000');
  // const socket = io('127.0.0.1:8080/?access_token=1d845e53c4b4bd2e235a66fe9c042d75ae8e3c6ae', { path: '/socket.io' });
  const $messageForm = $('#message-form');
  const $message = $('#message');
  const $chat = $('#chat');
  const $userFormArea = $('#user-form-area');
  const $userForm = $('#user-form')
  const $username = $('#username');

  $userForm.submit(e => {
    e.preventDefault();
    socket.emit('new user', $username.val(), data => {
      if (data) {
        // const filterVal = 'blur(0px)'
        $userFormArea.fadeOut(400);
        // $(".conversation-title").css('filter', filterVal)
        // $(".conversation-wrapper").css('filter', filterVal)
        // $(".messaging-area").css('filter', filterVal)
      }
    });
    $username.val('');
  });

  $messageForm.submit(e => {
    e.preventDefault();
    socket.emit('send message', $message.val());
    $message.val('');
  });

  socket.on('new message', data => {
    $chat.append(
    `
    <div class="message-sent">
      <div class="bubble">${data.msg}</div>
      <div class="namestamp">
        <div class="name">${data.user}</div>
      </div>
    </div>
    `
    )
  });
})
