//导入数据库模块
const db = require('../db/index')

//查询订单
exports.getOrders = (req,res) => {
    const sql = 'select * from orders where order_isdelete=0'
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

//添加订单
exports.addOrders = (req,res) =>{
    const sql = 'insert into orders set ?'
    db.query(sql,req.body,(err,results) => {
        if(err){
           return res.cc(err)
        }
        if(results.affectedRows != 1){
           return res.cc("添加失败,请稍后重试!")
        }
        res.cc("添加成功!", 0);
    })
}

//删除订单
exports.delOrders = (req,res) => {
    const sql = 'update orders set order_isdelete=1 where id=?'
    db.query(sql,req.params.id,(err,results) => {
        if(err){
            return res.cc(err.message)
        }
        if (results.affectedRows != 1) {
            return res.cc("删除订单信息失败!");
        }
            res.cc('删除订单信息成功!',0)
    })
}

//修改订单信息
exports.updateOrders = (req,res) => {
    const sql = 'update orders set ? where id=?'
    db.query(sql,[req.body,req.body.id],(err,results) => {
        if(err){
           return res.cc(err.message)
        }
        if(results.affectedRows != 1){
           return res.cc('更新订单信息失败!')
        }
        res.cc('更新订单信息成功',0)
    })
}

exports.searchOrdersInfo = (req,res) => {
    const sql = "select * from orders where goods_name like '%"+ req.query.goods_name +"%' OR order_states like '%" + req.query.order_states + "%'"
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