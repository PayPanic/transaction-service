const express = require('express');
const router = express.Router();
const {
    handleCreateTransaction,
} = require('../controllers/transaction.controller');

router.post('/:paymentId', handleCreateTransaction);

module.exports = router;
