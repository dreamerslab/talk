//--- helper ----------------------------------------------------------------------------------------

  var helper, SOCKET;
  
  helper = {
    
    connect : function( callback ){
      SOCKET = io.connect( HOST );
      callback();
    },
    
    socket : function( action, callback, params ){
      SOCKET.emit( 'req/' + action, params || null );
      SOCKET.on( 'res/' + action, function( data ){
        callback( data );
      });
    },
    
    truncate : function( str, length ){
      var _length, tmp;

      _length = length === undefined ? 20 : length;

      tmp = str.length > length ? 
        str.substr( 0, _length ) + '...' :
        str;

      return ( tmp.bytes() - 3 ) > length ? 
        tmp.substr( 0,  _length / ( tmp.bytes() / _length )) + '...' : 
        tmp;
    },
    
    local_time : function( timestamp ){
      var date, y, m, d, h, mm, s;
      
      date = new Date( parseInt( timestamp, 10 ) - TIME_DIFF );
      y = date.getFullYear();
      m = date.getMonth() + 1;
      d = date.getDate();
      h = date.getHours();
      mm = date.getMinutes();
      s = date.getSeconds();

      return y + '/' + m + '/' + d + ' ' + h + ':' + mm + ':' + s;
    },
    
    check_self : function( user_id ){
      var _user_id = CACHE.user ? CACHE.user._id : null;

      return user_id === _user_id ? 'talk-plus-msg-self' : '';
    },
    
    escape : function( str ){
      return str.replace( /&/g, '&amp;' ).
                 replace( /</g, '&lt;' ).
                 replace( />/g, '&gt;' );
    }
  };
