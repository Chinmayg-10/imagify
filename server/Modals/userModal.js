import mongoose from "mongoose";
const schema=mongoose.Schema;
const userSchema=new schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    creditBalance:{type:Number,default:10}
});
const userModal=mongoose.models.user || mongoose.model("user",userSchema);
export default userModal;