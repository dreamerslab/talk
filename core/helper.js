HOOK.once( 'SYS.express-configured', function( app ){
  app.helpers({
    js : function( scripts ){
      var tmp, i, j;

      tmp = '';
      i   = 0;
      j   = scripts.length;

      for( ; i < j; i++ ){
        tmp = tmp + '<script src="/js/' + scripts[ i ]+ '.js"></script> ';
      }
      
      return tmp;
    },
    
    css : function( styles ){
      var tmp, i, j;

      tmp = '';
      i   = 0;
      j   = styles.length;

      for( ; i < j; i++ ){
        tmp = tmp + ' <link href="/css/' + styles[ i ] + '.css" rel="stylesheet" /> ';
      }
      return tmp;
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
    }
  });

  app.dynamicHelpers({
    scripts : function( req, res ){
      return []; //this will be available in all views
    },
    
    styles : function( req, res ){
      return [ 'common' ]; //this will be available in all views
    }
  });
});
