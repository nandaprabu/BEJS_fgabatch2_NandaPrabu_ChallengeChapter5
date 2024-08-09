const express = require('express');
const router = express.Router();
const auth_middleware = require('../../middlewares/auth.middleware')
const {createTransactionControl,
  getAllTransactionControl,
  getTransactionIdControl } = require('../../controllers/V1/transaction.controller')

router.post('/createTransaction', createTransactionControl)
router.get('/', auth_middleware, getAllTransactionControl)
router.get('/:transactionId', getTransactionIdControl)

module.exports = router;