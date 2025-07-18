const { v4: uuidv4 } = require('uuid');
const { Transaction } = require('../models/transaction.model');
const { encryptCardDetails } = require('../utils/encryption');
const { sendToPaymentProvider } = require('../external/paymentProviderClient');
const { publishEvent } = require('../events/publisher');

async function createTransaction({ paymentId, type, cardDetails }) {
    const transaction = await Transaction.create({
        id: uuidv4(),
        paymentId,
        type,
        status: 'initiated',
    });

    const encryptedCard = encryptCardDetails(cardDetails);

    const response = await sendToPaymentProvider({
        paymentId,
        type,
        encryptedCardDetails: encryptedCard,
    });

    transaction.status = response.success ? 'processed' : 'failed';
    await transaction.save();

    await publishEvent('transaction.created', transaction);

    if (response.success) {
        await publishEvent('transaction.processed', {
            paymentId: transaction.paymentId,
            transactionId: transaction.id,
            status: 'processed',
        });
    } else {
        await publishEvent('transaction.failed', {
            paymentId: transaction.paymentId,
            transactionId: transaction.id,
            status: 'failed',
        });
    }

    return transaction;
}

module.exports = { createTransaction };
