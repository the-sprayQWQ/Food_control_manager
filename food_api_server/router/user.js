const express = require('express')

const router = express.Router()


const UserHandler = require('../router_handler/users')


router.post('/login',UserHandler.login)

router.post('/register',UserHandler.register)

module.exports = router