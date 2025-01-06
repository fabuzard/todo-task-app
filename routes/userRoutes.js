const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate=require("../middleware/authMiddleware")

router.post('/register', userController.registerUser);
router.get('/users', userController.getUsers);
router.get('/user/:name', authenticate, userController.getUser);
router.delete('/delete/:name',userController.deleteUser)
router.patch('/update/:name',userController.updateUser)
router.delete('/deleteall',userController.deleteAllUser)
router.get('/test', (req, res) => {
    res.status(200).json({ message: 'This is a test route!' });
  });
module.exports = router;
