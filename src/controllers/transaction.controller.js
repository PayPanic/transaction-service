const { createTransaction } = require('../services/transaction.service');

async function handleCreateTransaction(req, res) {
    try {
        const { type, cardDetails } = req.body;
        const { paymentId } = req.params;

        if (!type || !cardDetails) {
            return res.status(400).json({ error: 'Missing type or cardDetails' });
        }

        const transaction = await createTransaction({ paymentId, type, cardDetails });

        res.status(201).json(transaction);
    } catch (error) {
        console.error('Transaction creation failed:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { handleCreateTransaction };
