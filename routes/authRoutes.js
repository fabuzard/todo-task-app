const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate=require("../middleware/authMiddleware")

router.post('/login', authController.loginUser);
router.get('/validatetoken',authenticate,(req,res)=>{
    res.json({message:`token is valid`,user:req.user})
})

module.exports=router