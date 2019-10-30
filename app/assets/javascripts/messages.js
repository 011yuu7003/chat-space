$(document).on('turbolinks:load', function() { 
$(function(){

  function buildMessage(message){
    let content = message.content ? `${message.content}` : "";
    let image = message.image ? `<img src= ${message.image}>` : "";
    var html = `<div class="message" data-id= "${message.id}" >
                  <div class="message__upper-info">
                    <p class="message__upper-info__taker">
                      ${message.user_name}
                    </p>
                    <p class="message__upper-info__date">
                      ${message.date}
                    </p>
                  </div>
                  <p class="message__text">
                  </p>
                  <p class="lower-message__content">
                    ${content}
                  </p>
                  ${image}
                </div>`
            
                
               return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    
    
    $.ajax({
      url: url,
      type: "POST", 
      data: formData,
      dataType: 'json',
      processData: false,
      contentType:  false,
      
    })
    .done(function(message){
      
      var html = buildMessage(message)
      $('.messages').append(html)
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      

    })
    .fail(function(){
      alert('エラーです。')
    })

    .always(() => {
      $(".submit-btn").removeAttr("disabled");
      });
  })

  
  var reloadMessages = function() {
    last_message_id = $(".message:last").data('id');
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      messages.forEach(function(message){
      var insertHTML = buildMessage(message)
      $('.messages').append(insertHTML)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      })

    })
    .fail(function() {
      console.log('error');
    });
  };
  if(document.URL.match("/messages")) {
    setInterval(reloadMessages, 5000);
  };
  
});
});
