const express = require('express')
const app = express()

//导入cors中间件
const cors = require('cors')
app.use(cors())

//导入joi包
const joi = require('joi')

//解决post表单的解析,注意只能解析对应格式的表单数据
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use((req,res,next)=>{
    //status默认值为1 默认处理失败的情况
    // @ts-ignore
    res.cc = function(err,status = 1){
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

const expressJwt = require('express-jwt')
const config = require('./config')

app.use(expressJwt({secret:config.jwtSecretKey}).unless({path:[/^\/api/]}))

const userRouter = require('./router/user')
const categoryRouter = require('./router/category')
const userinfoRouter = require('./router/userinfo')
const goodsRouter = require('./router/goods')
const ordersRouter = require('./router/order')
const statusRouter = require('./router/status')


app.use('/api',userRouter)
app.use('/cate',categoryRouter)
app.use('/my',userinfoRouter)
app.use('/goods',goodsRouter)
app.use('/order',ordersRouter)
app.use('/status',statusRouter)


app.use((err,req,res,next) =>{
    //验证失败导致的
    if(err instanceof joi.ValidationError){
       return res.cc(err)
    }
     //解析token失败
    if(err.name === 'UnauthorizedError'){
        return res.cc('身份认证失败!')
    }
    //未知的错误
     res.cc(err)
})


app.listen('80',()=>{
console.log('Server is running at http://127.0.0.1');
})