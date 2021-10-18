var express = require('express');
var router = express.Router();
var Authenticate=require('../models/Authenticate');

router.post('/',function(req,res,next){
       
    Authenticate.validateUser(req.body.userEmail,req.body.userPassword,function(err,rows){

           if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }           
        });
    });
module.exports=router;