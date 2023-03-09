//导入数据库操作模块
const db = require("../db/index");

//获取个人信息
exports.getuserinfo = (req,res) => {
    const sql = 'select id,username,nickname,email from users where id=?'
    db.query(sql,req.user.id,(err,results) => {
        if(err){
           return res.send(err.message)
        }
        if(results.length !== 1){
           return res.send({
                status:1,
                message:'查询失败,稍后重试!'
            })
        }
        res.send({
            status:0,
            message:'查询成功!',
            data:results[0]
        })
    })
}

//获取所有信息
exports.getallinfo = (req,res) => {
    const sql = 'select id,username,nickname,email from users where is_delete=0'
    db.query(sql,(err,results) => {
        if(err){
           return res.send(err.message)
        }
        res.send({
            status:0,
            message:'查询成功!',
            data:results
        })
    })
}

//添加用户信息
exports.adduserinfo = (req,res) => {
    //定义语句查询用户名是否重复
    const sql = 'select * from users where username=?'

    db.query(sql,req.body.username,(err,results) => {
        if(err){
            return res.send(err.message)
        }
        if (results.length === 1)
        return res.cc("用户名被占用，请更换后重试!");
  
      //定义一个语句来增加分类
      const sql1 = "insert into users set ?";
  
      db.query(sql1, req.body, (err, results) => {
        if (err) {
          return res.cc(err.message);
        }
        if (results.affectedRows != 1) {
          return res.cc("添加失败,请稍后重试!");
        }
        res.cc("添加成功!", 0);
      });
    })
}

//删除用户信息
exports.deluserinfo = (req,res) => {
    const sql = 'update users set is_delete=1 where id=?'
    db.query(sql,req.params.id,(err,results) => {
        if(err){
            return res.send(err.message)
        }
        if (results.affectedRows != 1) {
            return res.send({
                status:1,
                message:"删除用户失败!"
            });
        }
        res.send({
            status:0,
            message:'删除用户成功!'
        })
    })
}

//更新用户信息
exports.updateuserinfo = (req,res) => {
    const sql = 'update users set ? where id=?'
    db.query(sql,[req.body,req.body.id],(err,results) => {
        if(err){
           return res.send(err.message)
        }
        if(results.affectedRows != 1){
           return res.send({
                status:1,
                message:"更新失败,请稍后重试!"
            })
        }
        res.send({
            status:0,
            message:"更新成功!"
        })
    })
}

//修改用户密码
exports.updatepassword = (req,res) => {
    //根据id查询用户是否存在
    const sql = 'select * from users where id=?'

    db.query(sql,req.body.id,(err,results)=>{
        if(err){
            return res.cc(err.message)
        }
        if(results.length !== 1){
            return res.cc('用户不存在!')
        }
        //比较原密码是否正确
        const compareResult = req.body.oldpassword === results[0].password ? true : false
        if(!compareResult){
            return res.cc('输入的原密码不正确')
        }
        //密码正确
        const sql1 = 'update users set password=? where id=?'
        db.query(sql1,[req.body.password,req.body.id],(err,results) => {
            if(err){
                return res.cc(err.message)
            }
            if(results.affectedRows != 1){
                return res.cc('更新密码失败!')
            }
            res.cc('更新密码成功!',0)
        })
    })
}

//用户信息模糊搜索
exports.searchuserInfo = (req,res) => {
    const sql = "select * from users where username like '%"+ req.query.username +"%' OR nickname like '%" + req.query.nickname + "%' OR email like '%" + req.query.email + "%'"
    db.query(sql,(err,results) => {
        if(err){
            return res.cc(err.message)
        }
        res.send({
            status:0,
            message:'查询成功!',
            data:results
        })
    })
    

}