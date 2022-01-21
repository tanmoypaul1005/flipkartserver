const User=require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid= require('shortid');

exports.signup=(req,res)=>{
    User.findOne({email:req.body.email})
    .exec(async(error,user)=>{
    if(user)return res.status(400).json({
        massage:"User AllReady register"
    });
    const {firstName,lastName,email,password}=req.body;
    const hash_password=await bcrypt.hash(password,10)
        const _user=new User({firstName,lastName,email,hash_password,
        username:shortid.generate(),role:'user'
        });
    
        _user.save((error,data)=>{
        if(error){
        return res.status(400).json({ 
        message:"Something is wrong",
        
        });
        }
            if(data){
                return res.status(201).json({
                massage:"User Created successfully",
                data
                })
            }
        })
    });
}


exports.signin=(req,res)=>{
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(error) return res.status(400).json({message:error});
        if(user){
          
          if(user.authenticate(req.body.password) && user.role==="user"){
              const token=jwt.sign({_id:user._id, role:user.role},process.env.JWT_SECRET,{expiresIn:'1d'})
              const {_id,firstName,lastName,email,password,role}=user;
              res.status(200).json({
                  token, 
                  user:{_id,firstName,lastName,email,password,role}
              })
          }
        else{
            return res.status(400).json({message:'Somethings went wrong'});
        }

        }else{
            return res.status(403).json({message:'Somethings is wrong'});
        }

    })
}

exports.signOut=(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({message:'SignOut Successfully...!'})
}