const express = require('express')

const router = express.Router()

const statusHandler = require('../router_handler/status')

router.get('/getStatus',statusHandler.getStatus)

router.post('/addStatus',statusHandler.addStatus)

router.get('/delStatus/:id',statusHandler.delStatus)

router.post('/updateStatus',statusHandler.updategoods)

router.get('/searchStatus',statusHandler.searchstatusInfo)

module.exports = router