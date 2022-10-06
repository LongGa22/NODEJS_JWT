const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidation = require("mongoose-unique-validator");

const userSchema = new Schema({
    username: {
        type:String,
        require:true
    },
    email: {
        type: String,
        require:true,
        unique:true,
    },
    password: {
        type: String,
        require:true,
    },
    date:{
        type:Date,
        default : Date.now()
    }
});

userSchema.set("toJSON", {
    transform:( document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    },
});

userSchema.plugin(uniqueValidator, {message: "email da dc dung"});

const User = mongoose.model("user", userSchema);
module.exports = User;