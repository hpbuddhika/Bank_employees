const express = require("express");
const router = express.Router()

const {requireSignin,isAuth} = require("../controllers/auth")
const {userById,getAllEmployee} = require("../controllers/user")


router.get('/getAllEmployeeData/:userId',requireSignin,isAuth,getAllEmployee,(req,res)=>{
    
    const employeelist = req.profile.map((profile)=>{
         profile.salt = undefined;
         profile.hassed_password = undefined;
         profile.roll = undefined;
    })  

    console.log("employee list: ___"+ employeelist) 
   
    res.json({
        employeeList:req.profile 
    });
});

router.param("userId",userById);


 
module.exports = router;