var mongoose, Schema, ObjectId, Model, model;

mongoose = require( 'mongoose' );
Schema   = mongoose.Schema;
ObjectId = Schema.ObjectId;



Model = {

  Channel : new Schema({

    name       : { type : String, required : true },
    url        : { type : String, required : true, index: true },
    root       : { type : String, required : true, index: true },
    protocol   : { type : String, required : true },
    user_count : { type : Number, 'default' : 0, index: true },
    created_at : { type : Number, 'default' : Date.now, index: true },
    updated_at : { type : Number, 'default' : Date.now }

  })
};



for( model in Model ){
  if( Model[ model ].updated_at !== undefined ){
    model.pre( 'save', function( next ){
      this.updated_at = Date.now();
      next();
    });
  }
}



module.exports = Model;
