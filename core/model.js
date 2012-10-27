var mongoose = require( 'mongoose' );



HOOK.once( 'SYS.express-configured', function( app ){
  LOAD( MODEL_DIR, function( file ){
    var name = file.replace( '.js', '' );
    require( MODEL_DIR + name );
    LOG.sys( 'Loading model: ' + name );

  }, function(){
    mongoose.connect( DB_URL );
    LOG.sys( 'All models loaded' );
    LOG.sys( 'Database connected at ' + DB_URL );

    HOOK.emit( 'SYS.models-loaded', app );
  });
});
