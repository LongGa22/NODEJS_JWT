const bcrypjs = require('bcryptjs');
const userService = require("../services/user.services");

exports.register =(req, res, next)=> {
    const {password} =req.body;
    const salt = bcrypjs.genSaltSync(10);

    req.body.password = bcrypjs.hashSync(password,salt)

    userService.register(red.body, (error, result)=>{
        if(error){
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.login =(req, res, next) =>{
    const{username,password} =req.body;

    userService.login({username,password}, (error, result)=>{
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message:"success",
            data: result,
        });
    });
};


exports.userProfile = (req, res, next) =>{
    return res.status(200).json({message: "Authorrized user"});
};