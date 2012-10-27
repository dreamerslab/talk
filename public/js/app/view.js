//--- view ------------------------------------------------------------------------------------------

  var view = {
  
    layout : function( yeild ){
      return '<div id="talk-plus-wrap">' + yeild + '</div>';
    },

    init : function(){
      var self, channel, yeild;
      
      self = this;
      channel = CACHE.channel;

      yeild = 
      '<div id="talk-plus-header">' +
        '<div>' +
          '<h3 id="talk-plus-logo"><a href="' + FRONTEND + '">talkpl.us</a></h3>' +
          '<h3 id="talk-plus-channel-title">' + helper.truncate( channel.name, 40 ) +
          '<a href="#" id="talk-plus-hide"><span>_</span></a></h3>' +
        '</div>' +
      '</div>' +
      '<div id="talk-plus-content">' + 
        '<div id="talk-plus-msgs"><ul></ul></div>' + 
        '<div id="talk-plus-users"></div>' + 
      '</div>' +
      '<div id="talk-plus-footer">' + 
        '<div id="talk-plus-form-wrap">' +
          '<form id="talk-plus-form">' +
            '<div id="talk-plus-join">' +
              '<label id="talk-plus-title">Name: </label>' + 
              '<input id="talk-plus-join-input" type="text"/>' +
              '<input id="talk-plus-join-btn" type="submit" value="Join"/>' +
            '</div>' + 
            '<div id="talk-plus-send" style="display: none;">' +
              '<input id="talk-plus-send-input" type="text"/>' +
              '<input id="talk-plus-send-btn" type="submit" value="Send"/>' +
            '</div>' +
          '</form>' + 
          '<div id="talk-plus-hot-topic">' +
            '<h3>Hot Channels: </h3><ul>' + 
            self.channels() + 
          '</ul></div>' +
        '</div>' +
      '</div>';

      return this.layout( yeild );
    },
    
    channels : function(){
      // will loop channels and animate later
      // var channels, i, out;
      // 
      // channels = CACHE.channels;
      // i        = channels.length;
      // out      = '';
      // 
      // for( ;i--; ){
      //   out += '<li><a href="' + channels[ i ].url + '">' + helper.truncate( channel[ i ].name, 30 ) + '</a></li>';
      // }
      
      var out, channels;
      
      channels = CACHE.channels;
      out = '<li><a href="http://' + channels[ 0 ].url + '">' + helper.truncate( channels[ 0 ].name, 36 ) + '</a></li>';
      return out;
    },

    msg : function( msg ){
      var name, content;
      
      name    = helper.escape( helper.truncate( msg.sender_name, 30 ));
      content = helper.escape( msg.content );
      
      return '<li>' +
        '<span class="talk-plus-msg-header">' + 
          '<span class="talk-plus-msg-user ' + helper.check_self( msg.sender_id ) + '">' + name + ' </span>' +
          '<span class="talk-plus-msg-time">'+ helper.local_time( msg.created_at ) +'</span>' +
        '</span>' +
        '<span class="talk-plus-msg-content">' + content +'</span>' +
      '</li>';
    },
    
    msgs : function( msgs ){
      var out, i;
      
      out = '';
      i = msgs.length;
      
      for( ;i--; ){
        out += this.msg( msgs[ i ]);
      }
      
      return out;
    }
  
  };
