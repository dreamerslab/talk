var fs     = require( 'fs' );
var dir    = BASE_DIR + '/app/embedded/';
var _super = require( './application' );



var _ = {

  read_file : function( path, res, next ){
    fs.readFile( path, function( e, data ){
      if( e ){
        return res.error( 500, res,
          '[script][build]: Having trouble with finding file : ' + path );
      }

      next( data );
    });
  },

  render : function( res, body ){
    res.writeHead( 200, {
      'Content-Type' : 'application/javascript; charset=utf-8'
    });

    LOG.response( 200, res );
    res.end( body , 'utf8' );
  }
};



module.exports = {

  build : function( req, res, next ){
    _super.check_params( 'params.id',
      req, res, function( params ){
        var id   = params.id;
        var file = dir + id + '.js';

        fs.exists( file, function( exists ){
          if( exists ){
            return _.read_file( file, res, function( data ){
              _.render( res, data );
            });
          }

          // does not exist, read ori file, replace channel_id and create file
          _.read_file( BASE_DIR + '/public/js/app.min.js', res, function( data ){
            var js = data.toString().replace( "CHANNEL=\"1\"", "CHANNEL=\"" + id + "\"");

            if( ENV !== 'dev' ){
              js = js.replace( "HOST=\"http://127.0.0.1:3000/\";", "HOST=\"http://api.talkpl.us/\";" ).
                      replace( "FRONTEND=\"http://127.0.0.1:4000/\";", "FRONTEND=\"http://talkpl.us/\";" );
            }

            _.render( res, js );
            fs.writeFile( file, js, function( e ){
              if( e ){
                 return res.error( 500, res,
                   '[js][build]: Having trouble with writing a file' );
              }

              LOG.debug( res._id,
                '[js][build]: Create embedded js', id );
            });
          });
        });
      });
  }
};
