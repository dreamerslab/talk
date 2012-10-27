var mongoose = require( 'mongoose' );
var Channel  = mongoose.model( 'Channel' );
var url      = require( LIB_DIR + 'url' );
var data     = require( BASE_DIR + '/db/data' );
var _super   = require( './application' );



var _ = {
  render : function( res, code ){
    res.render( 'home/widget' ,{
      title  : '| Take Away This Chatroom',
      desc   : 'Your own chatroom is just one click away!',
      nav    : data.nav_widget,
      action : 'widget',
      btn    : 'Grab',
      code   : code || ''
    });
  }
};



module.exports = {

  index : function( req, res, next ){
    Channel.index( 'created_at', function( e, channels ){
      res.render( 'home/index' ,{
        title    : null,
        desc     : 'Check out the latest channels!',
        channels : channels,
        nav      : data.nav_home,
        sub_nav  : data.sub_nav_latest,
        action   : 'channel',
        btn      : 'GO'
      });
    });
  },

  about : function( req, res, next ){
    res.render( 'home/about' ,{
      layout : 'layouts/about',
      nav    : data.nav_about
    });
  },

  widget : function( req, res, next ){
    var params = req.query;

    if( params.url ){
      url.get( params.url, res, function( title, url ){
        var protocol = url.protocol || 'http';
        var _url     = ( url.host + url.relative || '' ).replace( /\/$/, '' );

        Channel.findOne({
          url : _url
        }, function( e, channel ){
          var tmp = '<link rel="stylesheet" href="' + CONFIGS.frontend + 'css/app.css" /><script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js"></script><script src="' + CONFIGS.host + 'socket.io/socket.io.js"></script>';
          var code;

          if( channel === null ){
            Channel.create( res, title, _url, url.host, protocol, function( channel ){
              code = tmp + '<script src="' + CONFIGS.frontend + 'script?id=' + channel._id + '"></script>';

              _.render( res, code );
            });

            return;
          }

          code = tmp + '<script src="' + CONFIGS.frontend + 'script?id=' + channel._id + '"></script>';

          _.render( res, code );
        });
      });

      return;
    }

    _.render( res );
  }
};
