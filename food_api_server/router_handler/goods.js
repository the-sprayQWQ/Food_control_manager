//导入数据库操作模块
const db = require("../db/index");

//获取商品列表
exports.getgoods = (req,res) => {
    const sql = 'select * from goods where is_delete=0'
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

//添加商品
exports.addgoods = (req,res) => {
    //定义语句查询商品名称是否被占用
    const sql = 'select * from goods where goods_name=?'
    db.query(sql,req.body.goods_name,(err,results) => {
        if(err){
           return res.send(err.message)
        }
        if(results.length > 0){
           return res.send({
                status:1,
                message:'商品名称被占用,请更换后再试!'
            })
        }
        const sql1 = 'insert into goods set ?'
        db.query(sql1,req.body,(err,results) => {
            if(err){
                res.cc(err.message)
            }
            if (results.affectedRows != 1) {
                return res.cc("添加失败,请稍后重试!");
              }
              res.cc("添加成功!", 0);
        })
    })
}

//删除商品
exports.delgoods = (req,res) => {
    const sql = 'update goods set is_delete=1 where id=?'
    db.query(sql,req.params.id,(err,results) => {
        if (err) {
            return res.cc(err.message);
          }
          if (results.affectedRows != 1) {
            return res.cc("删除商品失败!");
          }
          res.cc("删除商品成功!", 0);
    })
}

//根据ID来更新商品信息
exports.updategoods = (req,res) => {
    //设置语句查询商品名称是否被占用
    const sql = 'select * from goods where id<>? and goods_name=?'
    db.query(sql,[req.body.id,req.body.goods_name],(err,results) => {
        if(err){
           return res.cc(err.message)
        }
        const sql1 = 'update goods set ? where id=?'
        db.query(sql1,[req.body,req.body.id],(err,results) => {
            if(err){
                return res.cc(err.message)
            }
            if(results.affectedRows != 1){
                res.cc('更新商品信息失败,稍后再试!')
            }
            res.cc('更新商品信息成功!',0)
        })
    })
}

exports.updategoodsImg = (req,res) => {
    const sql = 'select goods_pic from goods where id=?'

    db.query(sql,req.body.id,(err,results) => {
        if(err){
            return res.cc(err.message)
        }
        if(results.length != 1){
            return res.cc("查询失败,请稍后再试")
        }
        //设置sql语句来插入用户的新头像
        const sql1 = 'update goods set goods_pic=? where id=?'
        db.query(sql1,[req.body.goods_pic,req.body.id],(err,results) => {
            if(err){
                return res.cc(err.message)
            }
            if(results.affectedRows != 1){
                return res.cc('更新商品图片失败!')
            }
            res.cc('更新商品图片成功!',0)
        })
    })
}

exports.searchgoodsInfo = (req,res) => {
    const sql = "select * from goods where goods_name like '%"+ req.query.goods_name +"%' OR goods_category like '%" + req.query.goods_category + "%'OR goods_category like '%" + req.query.price + "%'"
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