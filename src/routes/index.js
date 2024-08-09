var express = require('express');
var router = express.Router();

const routesCust = require('./V1/customer.route')
const routesAcc = require('./V1/account.route')
const routeTrc = require('./V1/transaction.route')
const routeType = require('./V1/account_type.route')
const routeAuth = require('./V1/auth.route')


router.use("/v1/user", routesCust)
router.use("/v1/account", routesAcc)
router.use("/v1/transaction", routeTrc)
router.use("/v1/typeaccount", routeType)
router.use("/v1/auth", routeAuth)



module.exports = router;
