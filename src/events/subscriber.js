const { createKafkaInstance } = require('infra-lib/kafka/client');

const kafka = createKafkaInstance('transaction-service');

const consumer = kafka.consumer({ groupId: 'transaction-consumer-group' });

async function runConsumer() {
    try {
        await consumer.connect();
        console.log('[Kafka] Connected to broker');

        await consumer.subscribe({ topic: 'payment.created', fromBeginning: false });
        console.log('[Kafka] Subscribed to topic: payment.created');

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const event = JSON.parse(message.value.toString());
                console.log(`[Kafka] Event received on ${topic}:`, event);
                // TODO: business logic
            },
        });
    } catch (err) {
        console.error('[Kafka] Consumer error:', err);
    }
}

runConsumer();
