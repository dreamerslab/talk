var express, app;

express = require( 'express' );
app     = module.exports = express.createServer();



app.configure( function(){
  app.set( 'views', BASE_DIR + '/app/views' );
  app.set( 'view engine', 'html' );
  app.register( '.html', require( 'thunder' ));
  app.set( 'view options', {
    layout : 'layouts/default'
  });
  app.use( express.cookieParser());
  app.use( express.session({ secret: 'shitface' }));
  app.use( express.bodyParser());
  app.use( express.methodOverride());
  app.use( express.favicon());
  app.use( express[ 'static' ]( BASE_DIR + '/public' ));
  app.use( SECRET.get( 'EXPRESS.request' ));
  app.use( app.router );
  app.use( function( req, res, next ){
    res.render( 'error/404', {
      status: 404,
      title: 'Page Not Found',
      layout : 'layouts/error'
    });
  });
  app.use( function( err, req, res, next ){
    res.render( 'error/500', {
      status : err.status || 500,
      error : err,
      title : 'Internal Error',
      layout : 'layouts/error'
    });
    LOG.error( 500, res, err );
  });
});

app.configure( 'development', function(){
  app.use( express.errorHandler({ dumpExceptions : true, showStack : true }));
});

app.configure( 'production', function(){
  app.use( express.errorHandler());
});

HOOK.emit( 'SYS.express-configured', app );

