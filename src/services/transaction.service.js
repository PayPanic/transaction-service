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

    const topic = response.success ? 'transaction.success' : 'transaction.failed';

    await publishEvent(topic, transaction);

    return transaction;
}

module.exports = { createTransaction };
