1//rquire mongoose
const mongoose=require("mongoose");
2// require Shema
const Schema=mongoose.Schema;

3// create UserShema
const UserSchema=new Schema({

    name:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
module.exports=User=mongoose.model('User', UserSchema);