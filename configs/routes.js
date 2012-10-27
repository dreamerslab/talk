ROUTE.get( '/', 'home/index' ).
      get( '/about', 'home/about' ).
      get( '/widget', 'home/widget' ).
      get( '/grab', 'home/grab' ).
      get( '/channel/latest', 'home/index' ).
      get( '/channel/hottest', 'channel/hottest' ).
      get( '/channel/related', 'channel/related' ).
      get( '/channel', 'channel/embedded' ).
      get( '/script', 'js/build' );

