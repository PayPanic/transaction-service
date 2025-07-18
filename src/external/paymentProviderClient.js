/**
 * Simulates sending payment transaction to an external payment processor.
 * In a real-world scenario, this would make an HTTPS call to a secure API.
 */

async function sendToPaymentProvider({ paymentId, type, encryptedCardDetails }) {
    console.log(`Sending to external provider:
    Payment ID: ${paymentId}
    Type: ${type}
    Encrypted Card Details: ${encryptedCardDetails}
  `);

    // Simulate network delay and success/failure
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulate random success/failure
    const isSuccess = Math.random() < 0.9;

    return {
        success: isSuccess,
        message: isSuccess ? 'Transaction processed' : 'Transaction failed',
    };
}

module.exports = { sendToPaymentProvider };
