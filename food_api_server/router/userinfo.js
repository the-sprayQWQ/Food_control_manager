const express = require('express')

const router = express.Router()
const UserInfoHandler = require('../router_handler/userinfo')

//获取个人信息
router.get('/getuserinfo',UserInfoHandler.getuserinfo)

//获取所有人信息
router.get('/getallinfo',UserInfoHandler.getallinfo)

//添加用户信息
router.post('/adduserinfo',UserInfoHandler.adduserinfo)

//删除用户信息
router.get('/delusers/:id',UserInfoHandler.deluserinfo)

//更新用户信息
router.post('/updateuserinfo',UserInfoHandler.updateuserinfo)

//修改用户密码
router.post('/updatepassword',UserInfoHandler.updatepassword)

//模糊搜索用户信息
router.get('/searchuserinfo',UserInfoHandler.searchuserInfo)

module.exports = router