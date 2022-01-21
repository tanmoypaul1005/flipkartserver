const mongoose=require('mongoose');
const categorySchema=new mongoose.Schema({
name:{type: String,required: true,trim:true},
categoryImage:{type: String},
categoryPicture:{type: String,required: true},
slug:{type: String},
parentId:{type: String},
type:{type: String}
},{timestamps:true});
module.exports=mongoose.model('category',categorySchema)