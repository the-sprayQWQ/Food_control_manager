const express = require('express')

const router = express.Router()

const goods = require('../router_handler/goods')

//获取商品列表
router.get('/getgoods',goods.getgoods)

//添加商品
router.post('/addgoods',goods.addgoods)

//删除商品
router.get('/delgoods/:id',goods.delgoods)

//根据ID来更新商品信息
router.post('/updategoods',goods.updategoods)

//更新商品图片
router.post('/updategoodsImg',goods.updategoodsImg)

//模糊搜索商品信息
router.get('/searchgoodsInfo',goods.searchgoodsInfo)

module.exports = router