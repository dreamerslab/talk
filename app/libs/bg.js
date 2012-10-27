var packer    = require( 'node.packer' );
var js_path   = BASE_DIR + '/public/js/';
var main_path = js_path + 'app/';
var lib_path  = js_path + 'libs/';

packer({
  input : [
    main_path + 'start.js',
    main_path + 'native.js',
    main_path + 'config.js',
    main_path + 'helper.js',
    main_path + 'model.js',
    main_path + 'view.js',
    main_path + 'action.js',
    main_path + 'execute.js',
    main_path + 'end.js'
  ],
  output   : js_path + 'app.js',
  callback : function( err, stdout, stderr ){
    if( err ){
      return LOG.error( 500, {
        _id : null
      }, err );
    }

    packer({
      minify   : true,
      uglify   : false,
      input    : js_path + '/app.js',
      output   : js_path + '/app.min.js',
      callback : function( err, stdout, stderr ){
        if( err ){
          return LOG.error( 500, {
            _id : null
          }, err );
        }

        LOG.debug( null, '[bg_jobs][prepare] Assets builded' );
      }
    });
  }
});
