module.exports = {

  check_params : function( conditions, req, res, next ){
    var buf = 'var params = req.query || req.body; if( ' + conditions + ' ){ LOG.debug( req._id,"[application/check_params] All required params found", "' + conditions + '" ); next( params ); }else{ res.error( 40, res, "Missing params" ); }';
    return new Function( 'req', 'res', 'next', buf )( req, res, next );
  }
};
