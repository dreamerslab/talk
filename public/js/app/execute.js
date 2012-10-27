//--- execute ---------------------------------------------------------------------------------------

  var $body;
  
  $( function(){
    $body = $( 'body' );

    helper.connect( function(){
      model.time( function(){
        model.channel( function(){
          model.channels( function(){
            action.append_widget( function(){
              model.past_msgs( function( msgs ){
                action.append_msgs( msgs, function(){
                  model.watch_msg( action.auto_append_msg );
                  action.user_join( function( user ){
                    action.send_msg();
                  });
                });
              });
            });
          });
        });
      });
    });
    
  });
