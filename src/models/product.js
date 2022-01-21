const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
name:{type: String,required:true,trim:true},
slug:{type: String,required:true },
quantity:{type:Number,required:true},
price:{type:Number,required:true},
description:{type: String,trim:true,required:true},
offer:{type:Number},
productPicture:{type:String,required:true},
picture: [
    { img: { type: String } }
],
reviews:[
{
    userId:{type:mongoose.Schema.Types.ObjectID,ref:"user"},
    review:String
}
],
category:{type:mongoose.Schema.Types.ObjectID,ref:"category"},
createdBy:{type:mongoose.Schema.Types.ObjectID,ref:"User"},
updatedAt:Date,

},{timestamps:true});
module.exports=mongoose.model('Product',productSchema)