const{Router}=require('express')
const router = Router()
const getUser = require('../controllers/getUserByID')
const registerUser = require('../controllers/register')
const loginUser = require('../controllers/login')


router.route('/register')
.post(registerUser)

router.route('/login')
.post(loginUser)



module.exports = router