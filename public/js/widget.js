$( function(){
  var key_c, meta_enable, $textatea;

  key_c       = 67;
  meta_enable = false;
  $textatea   = $( '#code' );
  
  if( $textatea.val()){
    $( document ).keydown( function( e ){
      if([ 17, 91, 224 ].indexOf( e.keyCode ) > -1 ){
        meta_enable = true;
      }
    }).keyup( function( e ){
      if([ 17, 91, 224 ].indexOf( e.keyCode ) > -1 ){
        meta_enable = false;
      }
    });
    
    $textatea.
      mousedown( function( e ){
        if( e.button == 0 ){
          e.preventDefault();
        }
        $( this ).select();
      }).focus( function(){
        $( this ).select();
      }).focus().
      keydown( function( e ){
        if( e.keyCode != key_c ){
          e.preventDefault();
        }
      });
  }
});
