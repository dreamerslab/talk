$( function(){
  $( '#header-form' ).validate({
    errorLabelContainer : $( '#error-container' ),
    rules : {
      url : {
        required : true,
        url : true
      }
    }
  });
});