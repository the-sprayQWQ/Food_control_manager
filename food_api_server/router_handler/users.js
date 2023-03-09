//导入数据库操作模块
const db = require("../db/index");

//导入生成Token的包
const jwt = require('jsonwebtoken')

const config = require('../config')

exports.register = (req, res) => {
    const userinfo = req.body
    const sqlStr = 'select * from users where username=?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) {
            return res.cc(err.message)
        }
        //判断用户名是否被占用
        if (results.length > 0) {
            return res.cc("用户名被占用请更换其他用户名!")
        }
        //用户名可以使用
        const sql = 'insert into users set ?'
        db.query(sql,{username:userinfo.username,password:userinfo.password},(err,results) => {
            if(err){
               return res.cc(err.message)
            }
            if(results.affectedRows != 1){
                return res.cc('注册失败,请稍后重试!')
            }
            res.cc('注册成功!',0)
        })
    })
}

exports.login = (req, res) => {
    //获取到客户端发过来的数据
    const userInfo = req.body
    //定义语句查询用户名是否存在
    const sql = 'select * from users where username=?'
    //执行语句
    db.query(sql, userInfo.username, (err, results) => {
        if (err) {
            return res.send(err.message)
        }
        //查询的结果不止一条
        if (results.length !== 1) {
            return res.send({
                status: 1,
                message: '登录失败,请稍后重试!'
            })
        }
        //把密码与数据库中的密码进行比较是否匹配
        const compareResult = userInfo.password === results[0].password ? true : false
        if (!compareResult) {
            return res.send({
                status: 1,
                message: '登录失败!'
            })
        }
        //生成token
        const user = { ...results[0], password: '' }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        //登录成功回调
        res.send({
            status: 0,
            message: '登录成功!',
            token: 'Bearer ' + tokenStr
        })
    })

}