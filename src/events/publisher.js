const { createKafkaInstance } = require('infra-lib/kafka/client');
const kafka = createKafkaInstance('transaction-service');

const producer = kafka.producer();

(async () => await producer.connect())();

async function publishEvent(topic, data, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            await producer.send({
                topic,
                messages: [{ value: JSON.stringify(data) }],
            });
            break; // Success, exit the loop
        } catch (err) {
            console.error(`[Kafka] Failed to publish to topic "${topic}" (attempt ${attempt}):`, err.message);
            if (attempt === retries) throw err;
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
        }
    }
}

module.exports = { publishEvent };
