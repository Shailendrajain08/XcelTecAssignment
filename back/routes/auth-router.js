const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const check_auth = require("../middleWare/check-Auth")


router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.json({ success: false, message: "Hash Error !" })
        } else {
            const user = new User({
                userName: req.body.userName,
                userEmail: req.body.userEmail,
                password: hash
            })

            user.save().then((_) => {
                res.json({
                    success: true,
                    message: "account has been created"
                })
            }).catch((err) => {
                if (err.code === 11000) {
                    return res.json({
                        success: false,
                        message: "Email is Already Exist !"
                    })
                }
                res.json({
                    success: false,
                    message: "Authentication Failed !"
                })
            })
        }
    })

})

router.post('/login', (req, res) => {
    User.find({ userEmail: req.body.userEmail }).exec().then((result) => {
        console.log("my Result",result.length)
        if (result.length < 1) {
            return res.json({
                success: false,
                message: "user not found!!"
            })
        }
        const user = result[0];
        bcrypt.compare(req.body.password, user.password, (err, ret) => {
            if (ret) {
                const payLoad = {
                    userId : user._id,
                }
                const token = jwt.sign(payLoad, "webBatch");
                return res.json({
                    token:token,
                    success: true,
                    message: "Login Successful"
                })
            }
            else{
                return res.json({
                    success: false,
                    message: "Password Does Not Match"
                })
            }
        })
    }).catch(err => {
        res.json({
            success: false,
            message: "Authentication"
        })
    })
})

router.get('/home', check_auth   ,(req, res)=>{
    const userId = '63cfdb7203ff4e92ed3ad074'
    User.findById(userId).exec().then((result)=>{
        res.json({success:true,
        data: result })
    }).catch(err =>{
        res.json({success:false, message:"Server Error"})
    })
})

module.exports = router;