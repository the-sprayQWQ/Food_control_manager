const db = require('../db/index')

exports.getStatus = (req, res) => {
    const sql = 'select * from status where is_delete=0'
    db.query(sql, (err, results) => {
        if (err) {
            return res.cc(err.message)
        }
        res.send({
            status: 0,
            message: '查询成功!',
            data: results
        })
    })
}

exports.addStatus = (req, res) => {
    const sql = 'select * from status where status_name=?'
    db.query(sql, req.body, (err, results) => {
        if (err) {
            return res.cc(err.message)
        }
        if (results.length > 0) {
            return res.cc('状态名称被占用,请更换后重试!')
        }
        const sql1 = 'insert into status set ?'
        db.query(sql1, req.body, (err, results) => {
            if (err) {
                return res.cc(err.message)
            }
            if (results.affectedRows != 1) {
                return res.cc('添加失败,请稍后重试!')
            }
            res.cc('添加状态成功!', 0)
        })
    })
}

exports.delStatus = (req, res) => {
    const sql = 'update status set is_delete=1 where id=?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) {
            return res.cc(err.message)
        }
        if (results.affectedRows != 1) {
            return res.cc("删除状态失败!");
        }
        res.cc("删除状态成功!", 0);
    })
}

exports.updategoods = (req,res) => {
    //设置语句查询商品名称是否被占用
    const sql = 'select * from status where id<>? and status_name=?'
    db.query(sql,[req.body.id,req.body.status_name],(err,results) => {
        if(err){
           return res.cc(err.message)
        }
        const sql1 = 'update status set ? where id=?'
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

exports.searchstatusInfo = (req,res) => {
    const sql = "select * from status where status_name like '%"+ req.query.status_name +"%'"
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