const express = require('express')

const router = express.Router()

const category = require('../router_handler/category')

router.get('/getcategory',category.getCategory)

router.post('/addcategory',category.addCategory)

router.get('/delcategory/:id',category.delCategory)

router.post('/updatecategory',category.updateCategory)

router.get('/searchcategory',category.searchcategoryInfo)


module.exports = router
