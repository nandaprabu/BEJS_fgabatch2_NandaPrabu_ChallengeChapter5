const express = require('express');
const router = express.Router();
const { 
  createUserController, 
  getAllUsersController,
  getUserbyIdController } = require('../../controllers/V1/customer.controller')

router.post('/createCustomer', createUserController);
router.get('/', getAllUsersController);
router.get('/:userId', getUserbyIdController)


module.exports = router;