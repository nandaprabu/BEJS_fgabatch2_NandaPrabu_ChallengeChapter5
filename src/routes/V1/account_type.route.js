const express = require('express');
const router = express.Router();
const {createTypeAccount,
  getTypeAccountControl
} = require('../../controllers/V1/account.controller')

router.post('/create', createTypeAccount);
router.get('/type', getTypeAccountControl)

module.exports = router;