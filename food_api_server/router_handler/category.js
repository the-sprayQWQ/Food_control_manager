//导入数据库操作模块
const db = require("../db/index");


//获取商品分类
exports.getCategory = (req, res) => {
    const sql = 'select * from type where is_delete=0'
    db.query(sql, (err, results) => {
        if (err) {
            return res.send(err.message)
        }
        res.send({
            status: 0,
            message: '查询成功!',
            data: results
        })
    })
}

//添加商品分类
exports.addCategory = (req, res) => {
    //查询是否被占用
    const sql = 'select * from type where category_name=?'
    db.query(sql, req.body.category_name, (err, results) => {
        if (err) {
            return res.cc(err.message)
        }
        if (results.length > 0) {
            return res.send({
                status: 1,
                message: '分类名称被占用,请更换后再试!'
            })
        }
        const sql1 = 'insert into type set ?'
        db.query(sql1, req.body, (err, results) => {
            if (err) {
                return res.cc(err.message)
            }
            if (results.affectedRows != 1) {
                return res.cc("添加失败,请稍后重试!");
            }
            res.cc("添加成功!", 0);
        })
    })
}


//删除商品分类
exports.delCategory = (req, res) => {
    const sql = 'update type set is_delete=1 where id=?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) {
            return res.cc(err.message);
        }
        if (results.affectedRows != 1) {
            return res.cc("删除商品分类失败!");
        }
        res.cc("删除商品分类成功!", 0);
    })
}


exports.updateCategory = (req, res) => {
    //设置语句查询商品名称是否被占用
    const sql = 'select * from type where id<>? and category_name=?'
    db.query(sql, [req.body.id, req.body.category_name], (err, results) => {
        if (err) {
            return res.cc(err.message)
        }
        const sql1 = 'update type set ? where id=?'
        db.query(sql1, [req.body, req.body.id], (err, results) => {
            if (err) {
                return res.cc(err.message)
            }
            if (results.affectedRows != 1) {
                res.cc('更新商品信息失败,稍后再试!')
            }
            res.cc('更新商品信息成功!', 0)
        })
    })
}

exports.searchcategoryInfo = (req,res) => {
    const sql = "select * from type where category_name like '%"+ req.query.category_name +"%'"
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
