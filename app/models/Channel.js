var Channel = require( BASE_DIR + '/db/schema' ).Channel;



Channel.statics = {

  create : function( res, title, url, host, protocol, next ){
    new this({
      name     : title,
      url      : url,
      protocol : protocol,
      root     : host
    }).save( function( e, channel ){
      next( channel );
    });
  },

  index : function( sort, next ){
    this.find().sort( sort, -1 ).limit( 10 ).run( next );
  }
};



require( 'mongoose' ).model( 'Channel', Channel );


