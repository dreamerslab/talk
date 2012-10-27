var http = require( 'http' );
var _    = {};



_.ok = function( res, client_res, url, callback ){
  var data = '';

  client_res.setEncoding( 'utf8' );

  client_res.on( 'data', function( chunk ){
    data += chunk;
  }).on( 'end', function(){
    var match = data.toString().match( /<title>(.*)<\/title>/ );
    var title = match ? match[ 1 ] : 'No page title';

    callback( title, url );
  });
};

_.redirect = function( res, client_res, url, callback ){
  var _url = parseUri( client_res.headers.location ).host.length === 0 ?
    url.host +  client_res.headers.location:
    client_res.headers.location;

  this.get( _url, res, callback );
};

_.not_found = function( res, client_res, url, callback ){
  LOG.error( 44, res, '[libs][url][get] Requested page not found' );
};

_[ '200' ] = _[ '304' ] = _.ok;
_[ '301' ] = _[ '302' ] = _.redirect;
_[ '404' ] = _.not_found;

_.get = function( str, res, callback ){
    var url = parseUri( str );

    if( !url.host ){
      return res.error( 42, res, '[libs][url][get] Wrong url format : ' + str );
    }

    http.get({
      host: url.host,
      port: url.port,
      path: url.relative
    }, function( client_res ){
      var status = client_res.statusCode;

      if( _[ status ] !== undefined ){
        return _[ status ]( res, client_res, url, callback );
      }

      LOG.error( 43, res, '[libs][url][get] Unknown status : ' + status );
    }).on( 'error', function( e ){

      LOG.error( 500, res, '[libs][url][get] Error : ' + e.message );
    });
};



module.exports = {
  get : _.get
};



// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
function parseUri( str ){
  var o   = parseUri.options;
  var m   = o.parser[ o.strictMode ? 'strict' : 'loose' ].exec( str );
  var uri = {};
  var i   = 14;

  while( i-- ) uri[ o.key[ i ]] = m[ i ] || '';

  uri[ o.q.name ] = {};
  uri[ o.key[ 12 ]].replace( o.q.parser, function( $0, $1, $2 ){
    if( $1 ) uri[ o.q.name ][ $1 ] = $2;
  });

  return uri;
};



parseUri.options = {
  strictMode : false,
  key        : [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host',
    'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
    ],
  q        : {
    name   : 'queryKey',
    parser : /(?:^|&)([^&=]*)=?([^&]*)/g
  },
  parser   : {
    strict : /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose  :  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  }
};
