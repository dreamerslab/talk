var mongoose = require( 'mongoose' );
var Channel  = mongoose.model( 'Channel' );
var url      = require( LIB_DIR + 'url' );
var data     = require( BASE_DIR + '/db/data' );
var _super   = require( './application' );



var _ = {
  render : function( res, channel ){
    res.render( 'channel/embedded', {
      layout  : 'layouts/embedded',
      title   : channel.name,
      channel : channel,
      host    : CONFIGS.host
    });
  }
};



module.exports = {

  embedded : function( req, res, next ){
    var params = req.query;

    if( params.url ){
      url.get( params.url, res, function( title, url ){
        var protocol = url.protocol || 'http';
        // remove trailing slash
        var _url     = ( url.host + url.relative || '' ).replace( /\/$/, '' );

        Channel.findOne({
          url : _url
        }, function( e, channel ){
          // if not found create it
          if( channel === null ){
            Channel.create( res, title, _url, url.host, protocol, function( channel ){
              _.render( res, channel );
            });
          }else{
            _.render( res, channel );
          }
        });
      });

      return;
    }

    res.redirect( '/' );
  },

  hottest : function( req, res, next ){
    Channel.index( 'user_count', function( e, channels ){
      res.render( 'home/index' ,{
        title    : '| Hottest Channels',
        desc     : 'Chat on the hottest channels!',
        channels : channels,
        nav      : data.nav_home,
        sub_nav  : data.sub_nav_hottest,
        action   : 'channel',
        btn      : 'GO'
      });
    });
  },

  related : function( req, res, next ){
    _super.check_params( 'params.root',
      req, res, function( params ){
        Channel.find({
          root : params.root
        }, function( e, channels ){
          res.render( 'home/index' ,{
            title    : '| Related Channels',
            desc     : 'Chat on the hottest channels!',
            channels : channels,
            nav      : data.nav_home,
            sub_nav  : data.sub_nav_related,
            action   : 'channel',
            btn      : 'GO'
          });
        });
      });
  }
};
