const express = require('express');
const router = express.Router();
const auth_middleware = require('../../middlewares/auth.middleware')

const {HandlingAuthAdmin, 
    HandlingcreateAdmin,
    authenticate} = require('../../controllers/V1/auth.controller')

router.post('/register', HandlingcreateAdmin);
router.post('/login', HandlingAuthAdmin);
router.get('/authenticate', auth_middleware, authenticate)

module.exports = router;