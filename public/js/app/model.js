//--- model -----------------------------------------------------------------------------------------

  var model, CACHE, TIMESTAMP, TIME_DIFF, CHANNEL_MSG_END, CHANNEL_MSG_TIMESTAMP;
  
  
  CACHE = {};
  CHANNEL_MSG_END = false;
  model = {
    
    time : function( callback ){
      helper.socket( 'general/time', function( data ){
        TIMESTAMP             = parseInt( data.body.time, 10 );
        CHANNEL_MSG_TIMESTAMP = TIMESTAMP;
        TIME_DIFF             = new Date().getTime() - TIMESTAMP;

        callback();
      });
    },
    
    channel : function( callback ){
      if( CACHE.channel ){
        callback( CACHE.channel );
        return;
      }

      helper.socket( 'channel/info', function( data ){
        CACHE.channel = data.body.channel;

        callback();
      }, {
        id : CHANNEL
      });
    },
    
    channels : function( callback ){
      helper.socket( 'channel/hottest', function( data ){
        CACHE.channels = data.body.channels;

        callback();
      });
    },
    
    user_join : function( name, callback ){
      helper.socket( 'user/join', function( data ){
        CACHE.user = data.body.user;

        callback( CACHE.user );
      }, {
        name : name,
        channel_id : CHANNEL
      });
    },
    
    past_msgs : function( callback ){
      helper.socket( 'msg/receive_from_channel', function( data ){
        CACHE.msgs = data.body.msgs;
        
        if( CACHE.msgs.length < 20 ) CHANNEL_MSG_END = true;
        
        // find the last msg and get its timestamp to CHANNEL_MSG_TIMESTAMP
        callback( CACHE.msgs );
      }, {
        channel_id : CHANNEL,
        timestamp : CHANNEL_MSG_TIMESTAMP
      });
    },
    
    watch_msg : function( callback ){
      helper.socket( 'msg/watch_channel', function( data ){
        var msg = data.body.msg;
        
        CACHE.msgs.push( msg );
        callback && callback( msg );
      }, {
        channel_id : CHANNEL
      });
    },
    
    send_msg : function( content ){
      helper.socket( 'msg/send_to_channel', function( data ){
        var msg = data.body.msg;
        
        CACHE.msgs.push( msg );
      }, {
        sender_id : CACHE.user._id,
        sender_name : CACHE.user.name,
        channel_id : CHANNEL,
        content : content
      });
    }
  };
