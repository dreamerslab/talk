//--- action ------------------------------------------------------------------------------------------

  var action, $hide, $wrap, $msg_wrap, $channels, $form,
  $join_block, $join_input, $join_btn,
  $send_block, $send_input, $send_btn;
  
  action = {
    
    check_status : function(){
      $.cookie( 'status' ) !== 'open' && this.hide();
      return this;
    },

    append_widget : function( callback ){
      $body.append( view.init());
      
      $hide       = $( '#talk-plus-channel-title' );
      $wrap       = $( '#talk-plus-wrap' );
      $msg_wrap   = $( '#talk-plus-msgs' ).find( 'ul' );
      $channels   = $( '#talk-plus-hot-topic' ).find( 'ul' );
      $form       = $( '#talk-plus-form' );
      $join_block = $( '#talk-plus-join' );
      $join_input = $( '#talk-plus-join-input' );
      $join_btn   = $( '#talk-plus-join-btn' );
      $send_block = $( '#talk-plus-send' );
      $send_input = $( '#talk-plus-send-input' );
      $send_btn   = $( '#talk-plus-send-btn');
      
      this.check_status().
           toggle().
           focus( $join_input ).
           stop_submit();
      
      callback();
    },
    
    append_msg : function( msg, callback ){
      if( msg ){
        $msg_wrap.append( view.msg( msg ));
        this.scroll_controll();
      }
      
      callback();
      
      return this;
    },
    
    append_msgs : function( msgs, callback ){
      if( msgs.length > 0 ){
        $msg_wrap.append( view.msgs( msgs ));
        this.scroll_controll();
      }
      
      callback();
      
      return this;
    },
    
    send_msg : function(){
      var self = this;
      
      this.focus( $send_input );
      $send_btn.bind( 'click', function( e ){
        self.validate( $send_input, function( val ){
          model.send_msg( val );
        });
      });
      
      $send_input.keydown( function( e ){
        if( e.keyCode === 13 ){
          $send_btn.click();
        }
      });
      
      return this;
    },
    
    auto_append_msg : function( msg ){
      var fn = function(){};
      
      action.append_msg( msg, function(){
        model.watch_msg( fn );
      });
    },
    
    user_join : function( callback ){
      var self = this;
      
      $join_btn.bind( 'click', function( e ){
        self.validate( $join_input, function( val ){
          model.user_join( val, function( user ){
            callback();
          });
          $join_block.hide();
          $send_block.show();
        });
      });
      
      return this;
    },
    
    validate : function( $input, callback ){
      var val = $input.val();

      if( val ){
        $input.val( '' );
        callback( val );
      }
      
      return this;
    },
    
    stop_submit : function(){
      $form.submit( function( e ){
        e.preventDefault();
      });
      
      return this;
    },
    
    focus : function( $input ){
      $input.focus();
      
      return this;
    },
    
    hide : function(){
      $wrap.css( 'bottom', -254 );
      $hide.addClass( 'talk-plus-hidden' );
      $.cookie( 'status', 'close', { expires: 7, path: '/' });
    },
    
    show : function(){
      $wrap.css( 'bottom', 0 );
      $hide.removeClass( 'talk-plus-hidden' );
      $.cookie( 'status', 'open', { expires: 7, path: '/' });
    },
    
    toggle : function(){
      var self = this;
      
      $hide.click( function(){
        var $this = $( this );
        if( $this.hasClass( 'talk-plus-hidden' )){
          self.show();
        }else{
          self.hide();
        }
      });
      
      return this;
    },
    
    scroll_controll : function(){
      // when scrolling if scrollTop != $obj height, scroll to the end
      $msg_wrap.parent().scrollTop( $msg_wrap.height());
      
      return this;
    }
  
  };
