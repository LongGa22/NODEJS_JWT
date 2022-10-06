const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth.js");
const { response } = require("express");
 
async function login({ username, password}, callback){
    const user = await User.findOne({username});

    if(user != null){
        if(bcrypt.compareSync(password,user.password)){
            const token = auth.generrateAccessToken(username);
            return callback(null, {...user.toJSON(),token});
        }
        else{
            return callback({
                message: "tk or mk ko dung"
            });
        }
    }
    else{
        return callback({
            message: "tk or mk ko dung"
        });
    }
}

async function register(params, callback){
    if(params.username === undefined){
        return callback({ message: "yeu cau tk"});
    }
    const user = new User(params);
    user.save()
    .then((response) =>{
        return callback(null, response);
    })
    .catch((error) =>{
        return callback(error);
    });
}

module.exports = {
login,
register,
};
