const express = require('express')

const router = express.Router()

const ordersHandler = require('../router_handler/orders')

//获取订单列表
router.get('/getOrders',ordersHandler.getOrders)

//添加订单
router.post('/addOrders',ordersHandler.addOrders)

//删除订单信息
router.get('/delOrders/:id',ordersHandler.delOrders)

//更新订单信息
router.post('/updateOrders',ordersHandler.updateOrders)

//查询订单信息
router.get('/searchOrders',ordersHandler.searchOrdersInfo)

module.exports = router